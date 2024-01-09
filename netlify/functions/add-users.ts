import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {MongoDB} from "./Utilities/MongoDB";
import {z} from "zod";
import {isAuthorized} from "./Utilities/isAuthorized";

export const userSchema = z.object({
    email: z.string().email(),
    _id: z.string().optional(),
    active: z.boolean().optional(),
    isAdmin: z.boolean().optional(),
})

export type IUser = z.infer<typeof userSchema>;

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    if(!await isAuthorized(context, true)) return {statusCode: 401};
    const mongo = new MongoDB({});

    const documents = JSON.parse(event.body ?? '{}').users ?? [];

    const users = z.array(userSchema).parse(documents.map((x: any)=>({email: x.toLowerCase(), active: true})));

    // Add addresses to the database
    await mongo.InsertMany({documents: users, collection: 'quick-maps_users'});

    return {
        statusCode: 200,
        body: JSON.stringify({}),
    };
};

export { handler };