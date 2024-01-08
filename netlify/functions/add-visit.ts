import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import {MongoDB} from "./Utilities/MongoDB";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    const { user } = context.clientContext!;
    if(!user || !user.email) return {statusCode: 401};
    const mongo = new MongoDB({});
    const dbUser = await mongo.FindOne({collection: 'quick-maps_users', filter: {
        email: user.email
    }});
    if(!dbUser) return {statusCode: 401};

    const {_id, visit} = JSON.parse(event.body ?? '{}');

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