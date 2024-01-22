import {z} from 'zod';

export const GroupSchema = z.object({
    id: z.string(),
    name: z.string(),
    color: z.string(),
});

export type IGroup = z.infer<typeof GroupSchema>;