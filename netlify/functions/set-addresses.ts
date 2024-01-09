import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {MongoDB} from "./Utilities/MongoDB";
import {isAuthorized} from "./Utilities/isAuthorized";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    if(!await isAuthorized(context, true)) return {statusCode: 401};
    const mongo = new MongoDB({});

    const documents = JSON.parse(event.body ?? '{}').addresses ?? [];

    // Add addresses to the database
    await mongo.DeleteMany({collection: 'quick-maps_addresses', filter: {}});
    await mongo.InsertMany({documents, collection: 'quick-maps_addresses'});

    return {
        statusCode: 200,
        body: JSON.stringify({}),
    };
};

export { handler };