import {HandlerContext} from "@netlify/functions";
import {MongoDB} from "./MongoDB";

export async function isAuthorized(context: HandlerContext, isAdmin: boolean): Promise<boolean> {
    const {user} = context.clientContext!;
    if (!user || !user.email) return false;
    const mongo = new MongoDB({});
    const {document: dbUser} = await mongo.FindOne<{
        document: { _id: string, email: string, isAdmin: boolean }
    }>({collection: 'quick-maps_users', filter: {email: user.email.toLowerCase(), active: true}});

    if (!dbUser) {
        await mongo.UpdateOne({
            collection: 'quick-maps_users',
            filter: {email: user.email.toLowerCase()},
            update: {
                $set: {
                    email: user.email.toLowerCase(),
                    isAdmin: false,
                    active: false
                }
            },
            upsert: true
        });
        return false;
    }
    if (isAdmin && !dbUser.isAdmin) return false;
    return true;
}