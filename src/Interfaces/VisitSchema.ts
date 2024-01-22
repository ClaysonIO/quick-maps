import {z} from "zod";

export const VisitSchema = z.object({
    id: z.string(),
    address: z.string(),
    dateTime: z.string(),
    resolution: z.string(),
    email: z.string(),
    notes: z.string()
});

export type IVisit = z.infer<typeof VisitSchema>