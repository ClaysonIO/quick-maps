import {z} from "zod";

export const GeocodeSchema = z.object({
    id: z.string(),
    address: z.string(),
    lat: z.number(),
    lng: z.number()
});

export type IGeocode = z.infer<typeof GeocodeSchema>