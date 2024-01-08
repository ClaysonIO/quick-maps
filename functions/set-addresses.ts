import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {MongoDB} from "./Utilities/MongoDB";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const { user } = context.clientContext!;
    if(!user) return {statusCode: 401};

    const mongo = new MongoDB({userId: user.sub});

    const documents = JSON.parse(event.body ?? '{}').addresses ?? [];

    // Add addresses to the database
    await mongo.InsertMany({documents, collection: 'addresses'});

    return {
        statusCode: 200,
        body: JSON.stringify({}),
    };
};

export { handler };