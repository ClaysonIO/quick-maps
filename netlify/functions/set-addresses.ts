import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {MongoDB} from "./Utilities/MongoDB";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const { user } = context.clientContext!;
    if(!user) return {statusCode: 401};
    const mongo = new MongoDB({});
    const {document: dbUser} = await mongo.FindOne<{document: { _id: string, email: string, isAdmin: boolean }}>({collection: 'quick-maps_users', filter: {email: user.email}});

    if(!dbUser?.isAdmin) return {statusCode: 401};


    const documents = JSON.parse(event.body ?? '{}').addresses ?? [];

    // Add addresses to the database
    await mongo.InsertMany({documents, collection: 'quick-maps_addresses'});

    return {
        statusCode: 200,
        body: JSON.stringify({}),
    };
};

export { handler };