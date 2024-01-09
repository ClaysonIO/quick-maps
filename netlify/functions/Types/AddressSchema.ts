import { z } from "zod"

export const visitResolutionSchema = z.union([
    z.literal("not-visited"),
    z.literal("address-correct"),
    z.literal("not-resolved"),
    z.literal("no-answer"),
    z.literal("no-access"),
    z.literal("moved"),
    z.literal("deceased"),
    z.literal("other")
])

export const AddressVisitSchema = z.object({
    date: z.coerce.date(),
    status: visitResolutionSchema,
    notes: z.string(),
    user: z.string()
})

export const AddressSchema = z.object({
    _id: z.string(),
    address: z.string(),
    url: z.string(),
    names: z.array(z.string()),
    lat: z.number(),
    lng: z.number(),
    groupId: z.string().optional(),
    status: visitResolutionSchema,
    history: z.array(AddressVisitSchema)
})

export type VisitResolution = z.infer<typeof visitResolutionSchema>
export type IAddressVisit = z.infer<typeof AddressVisitSchema>
export type IAddress = z.infer<typeof AddressSchema>