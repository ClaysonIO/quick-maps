import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {MongoDB} from "./Utilities/MongoDB";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const { user } = context.clientContext!;
    if(!user) return {statusCode: 401};
    const mongo = new MongoDB({});
    const dbUser = await mongo.FindOne({collection: 'quick-maps_users', filter: {email: user.email}});
    if(!dbUser) return {statusCode: 401};

    const {ts} = JSON.parse(event.body ?? '{}');


    //Get all journals tied to this user
    const journals = await mongo.Find({collection: 'quick-maps_addresses'});

    return {
        statusCode: 200,
        body: JSON.stringify({
            journals
        }),
    };
};

export { handler };