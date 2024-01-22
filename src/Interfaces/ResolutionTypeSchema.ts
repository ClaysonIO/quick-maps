import {z} from "zod";

export const ResolutionTypeSchema = z.object({
    id: z.string(),
    name: z.string()
});

export type IResolutionType = z.infer<typeof ResolutionTypeSchema>