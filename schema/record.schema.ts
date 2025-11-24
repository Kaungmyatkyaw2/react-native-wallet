import * as z from "zod";

export const CreateRecordSchema = z.object({
  type: z.string(),
  title: z.string(),
  amount: z.number().min(1),
  category_id: z.string(),
  payment_method_id: z.string(),
});

export type CreateRecordType = z.infer<typeof CreateRecordSchema>;
