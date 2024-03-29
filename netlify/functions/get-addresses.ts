import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {MongoDB} from "./Utilities/MongoDB";
import {isAuthorized} from "./Utilities/isAuthorized";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    if(!await isAuthorized(context, false)) return {statusCode: 401};
    const mongo = new MongoDB({});

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