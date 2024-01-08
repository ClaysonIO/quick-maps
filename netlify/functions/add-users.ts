import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {MongoDB} from "./Utilities/MongoDB";
import {z} from "zod";

const userSchema = z.object({
    email: z.string().email(),
    _id: z.string().optional(),
})

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const { user } = context.clientContext!;
    if(!user || !user.email) return {statusCode: 401};
    const mongo = new MongoDB({});
    const {document: dbUser} = await mongo.FindOne<{document: { _id: string, email: string, isAdmin: boolean }}>({collection: 'quick-maps_users', filter: {email: user.email.toLowerCase()}});

    if(!dbUser?.isAdmin) return {statusCode: 401};


    const documents = JSON.parse(event.body ?? '{}').users ?? [];

    const users = z.array(userSchema).parse(documents.map(x=>({email: x.toLowerCase()})));

    // Add addresses to the database
    await mongo.InsertMany({documents: users, collection: 'quick-maps_users'});

    return {
        statusCode: 200,
        body: JSON.stringify({}),
    };
};

export { handler };