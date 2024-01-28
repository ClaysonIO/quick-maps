import {z} from "zod";

export const GeocodeSchema = z.object({
    id: z.string(),
    address: z.string(),
    latitude: z.number(),
    longitude: z.number()
});

export type IGeocode = z.infer<typeof GeocodeSchema>