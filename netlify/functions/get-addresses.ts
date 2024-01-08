import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {MongoDB} from "./Utilities/MongoDB";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const { user } = context.clientContext!;
    if(!user && !user.email) return {statusCode: 401};
    const mongo = new MongoDB({});
    const {document: dbUser} = await mongo.FindOne<{document: { _id: string, email: string, isAdmin: boolean }}>({collection: 'quick-maps_users', filter: {email: user.email}});
    if(!dbUser) return {statusCode: 401};

    //Get all journals tied to this user
    const addresses = await mongo.Find({collection: 'quick-maps_addresses'});

    return {
        statusCode: 200,
        body: JSON.stringify({
            addresses
        }),
    };
};

export { handler };