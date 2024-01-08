import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {MongoDB} from "./Utilities/MongoDB";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const { user } = context.clientContext!;
    if(!user) return {statusCode: 401};

    const {ts} = JSON.parse(event.body ?? '{}');
    const mongo = new MongoDB({userId: user.sub});

    //Get all journals tied to this user
    const journals = await mongo.Find({collection: 'addresses'});

    return {
        statusCode: 200,
        body: JSON.stringify({
            journals
        }),
    };
};

export { handler };