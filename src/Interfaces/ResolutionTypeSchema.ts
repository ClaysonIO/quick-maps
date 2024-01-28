import {z} from "zod";

export const ResolutionTypeSchema = z.object({
    id: z.string(),
    color: z.string(),
    name: z.string(),
    description: z.string(),
});

export type IResolutionType = z.infer<typeof ResolutionTypeSchema>