import axios, {AxiosRequestConfig} from "axios";

function simplePost<T>(config: AxiosRequestConfig<any>): Promise<T>{
    return new Promise((resolve, reject)=>{
        axios(config)
            .then(result=>{
                resolve(result.data as T);
            })
            .catch(reject);
    })
}

export class MongoDB{

    private readonly database: string;
    private readonly dataSource: string;
    private readonly dataAPIAppId: string;
    private readonly apiKey: string;

    constructor({database, dataSource, dataAPIAppId, apiKey}: {database?: string, dataSource?: string, dataAPIAppId?: string, apiKey?: string}) {
        this.database = database ?? process.env.MONGO_DATABASE ?? "";
        this.dataSource = dataSource ?? process.env.MONGO_DATA_SOURCE ?? "";
        this.dataAPIAppId = dataAPIAppId ?? process.env.MONGO_DATA_API_APP_ID ?? "";
        this.apiKey = apiKey ?? process.env.MONGO_API_KEY ?? "";
    }

    private buildData({
                          collection,
                          filter,
                          projection,
                          document,
                          documents,
                          update,
                          upsert
                      }: {
        update?: any,
        upsert?: boolean,
        document?: any,
        documents?: any[],
        collection: string,
        filter?: {[key: string]: any},
        projection?: {[key: string]: any}
    }){
        return JSON.stringify({
            collection,
            database: this.database,
            dataSource: this.dataSource,
            filter,
            projection,
            document,
            documents,
            update,
            upsert
        });
    }

    private buildConfig({action, data}: {action: string, data: string}){
        console.log("DATA", data)
        return ({
            method: 'post',
            url: `https://data.mongodb-api.com/app/${this.dataAPIAppId}/endpoint/data/v1/action/${action}`,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': this.apiKey,
            },
            data: data
        })
    }


    public FindOne<T>({collection, filter, projection}: {collection: string, filter?: {[key: string]: any}, projection?: {[key: string]: any}}): Promise<T>{
        return simplePost<T>(this.buildConfig({
            action: 'findOne',
            data: this.buildData({
                collection,
                filter: {...filter},
                projection
            })})
        )
    }

    public Find<T>({collection, filter, projection}: {collection: string, filter?: {[key: string]: any}, projection?: {[key: string]: any}}): Promise<T>{
        return simplePost<{documents: T}>(this.buildConfig({
            action: 'find',
            data: this.buildData({
                collection,
                filter: {...filter},
                projection
            })}))
            .then(({documents})=>documents);
    }

    public InsertOne<T>({document, collection, filter, projection}: {document?: T, collection: string, filter?: {[key: string]: any}, projection?: {[key: string]: any}}): Promise<T>{
        return simplePost<T>(this.buildConfig({
            action: 'insertOne',
            data: this.buildData({
                collection,
                projection,
                document: {...document}
            })})
        )
    }

    public InsertMany<T>({documents, collection, filter, projection}: {documents?: T[], collection: string, filter?: {[key: string]: any}, projection?: {[key: string]: any}}): Promise<{insertedIds: string[]}>{
        return simplePost<{ insertedIds: string[] }>(
            this.buildConfig({
                action: 'insertMany',
                data: this.buildData({
                    collection,
                    projection,
                    documents: documents?.map(x=>({...x})) ?? []
                })
            })
        )
    }

    public UpdateOne<T>({update, upsert, collection, filter, projection}: {
        update?: any,
        upsert?: boolean,
        collection: string,
        filter?: {[key: string]: any},
        projection?: {[key: string]: any}}): Promise<T>{
        return simplePost<T>(this.buildConfig({
            action: 'updateOne',
            data: this.buildData({
                collection,
                filter: {...filter},
                projection,
                update,
                upsert
            })})
        )
    }

    public UpdateMany<T>({update, upsert, collection, filter, projection}: {
        update?: any,
        upsert?: boolean,
        collection: string,
        filter?: {[key: string]: any},
        projection?: {[key: string]: any}}): Promise<T>{
        return simplePost<T>(this.buildConfig({
            action: 'updateMany',
            data: this.buildData({
                collection,
                filter: {...filter},
                projection,
                update,
                upsert
            })})
        )
    }

    public DeleteMany<T>({update, upsert, collection, filter, projection}: {
        update?: any,
        upsert?: boolean,
        collection: string,
        filter?: {[key: string]: any},
        projection?: {[key: string]: any}}): Promise<T>{
        return simplePost<T>(this.buildConfig({
            action: 'deleteMany',
            data: this.buildData({
                collection,
                filter: {...filter},
                projection,
                update,
                upsert
            })})
        )
    }

    public async GetHighestId({collection}: {collection: string}): Promise<number>{
        const item = await simplePost<{documents: {id: number}[]}>(this.buildConfig({
            action: 'find',
            data: JSON.stringify({
                collection,
                database: this.database,
                dataSource: this.dataSource,
                sort: {id: -1},
                limit: 1
            })
        }))

        return item.documents[0]?.id ?? -1;
    }
}