import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {MongoDB} from "./Utilities/MongoDB";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const { user } = context.clientContext!;
    if(!user) return {statusCode: 401};

    const mongo = new MongoDB({userId: user.sub});

    //Get all journals tied to this user
    const addresses = await mongo.Find({collection: 'addresses'});

    return {
        statusCode: 200,
        body: JSON.stringify({
            addresses
        }),
    };
};

export { handler };