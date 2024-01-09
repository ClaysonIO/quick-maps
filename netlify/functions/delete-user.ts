import {Handler, HandlerEvent, HandlerContext} from "@netlify/functions";
import {isAuthorized} from "./Utilities/isAuthorized";
import {MongoDB} from "./Utilities/MongoDB";
import {userSchema} from "./add-users";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    if (!await isAuthorized(context, true)) return {statusCode: 401};
    const mongo = new MongoDB({});

    const user = userSchema.pick({_id: true}).parse(JSON.parse(event.body ?? '{}'));

    if (user._id) {
        // Add addresses to the database
        const result = await mongo.DeleteMany({
            collection: 'quick-maps_users',
            filter: {_id: {$oid: user._id}},
        });
        console.log("RESULT", result, user);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({}),
    };
};

export {handler};