import {z} from "zod";
import {GeocodeSchema} from "./GeocodeSchema.ts";
import {VisitSchema} from "./VisitSchema.ts";
import {ResolutionTypeSchema} from "./ResolutionTypeSchema.ts";
import {AddressSchema} from "./AddressSchema.ts";

export const MergedAddressSchema = z.object({
    id: z.string(),
    address: z.string(),
    occupants: z.array(AddressSchema),
    geocode: GeocodeSchema.optional(),
    visits: z.array(VisitSchema),
    status: ResolutionTypeSchema.optional()
});
export type IMergedAddress = z.infer<typeof MergedAddressSchema>