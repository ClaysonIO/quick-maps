import {Handler, HandlerEvent, HandlerContext} from "@netlify/functions";
import {isAuthorized} from "./Utilities/isAuthorized";
import {MongoDB} from "./Utilities/MongoDB";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    if (!await isAuthorized(context, true)) return {statusCode: 401};
    const mongo = new MongoDB({});

    const user = JSON.parse(event.body ?? '{}');

    console.log("PATCHING USER", user)
    // Add addresses to the database
    const users = await mongo.UpdateMany({
        collection: 'quick-maps_users',
        filter: {_id: {$oid: user._id}},
        update: {
            $set: {active: user.active}
        }
    });

    return {
        statusCode: 200,
        body: JSON.stringify(users),
    };
};

export {handler};