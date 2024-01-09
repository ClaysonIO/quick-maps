import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {MongoDB} from "./Utilities/MongoDB";
import {isAuthorized} from "./Utilities/isAuthorized";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    if(!await isAuthorized(context, false)) return {statusCode: 401};
    const mongo = new MongoDB({});

    const {_id, visit} = JSON.parse(event.body ?? '{}');
    const { user } = context.clientContext!;

    await mongo.UpdateOne({
        collection: 'quick-maps_addresses',
        filter: {_id},
        update: {
            $set: {
              status: visit.status
            },
            $push: {
                history: {
                    ...visit,
                    user: user.email,
                    date: new Date()
                }
            }
        }
    });

    return {
        statusCode: 200,
        body: JSON.stringify({}),
    };
};

export { handler };