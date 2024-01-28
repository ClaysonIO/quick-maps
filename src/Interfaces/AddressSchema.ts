import {z} from "zod";

export const AddressSchema = z.object({
    id: z.string(),
    address: z.string(),
    name: z.string(),
    groupId: z.string(),
});

export type IAddress = z.infer<typeof AddressSchema>

