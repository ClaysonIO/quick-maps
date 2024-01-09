import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {isAuthorized} from "./Utilities/isAuthorized";
import {MongoDB} from "./Utilities/MongoDB";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    if(!await isAuthorized(context, true)) return {statusCode: 401};
    const mongo = new MongoDB({});

    // Add addresses to the database
    const users = await mongo.Find({collection: 'quick-maps_users'});

    return {
        statusCode: 200,
        body: JSON.stringify(users),
    };
};

export { handler };