import { z } from 'zod'

export const newTaskSchema = z.object({
  title: z.string().min(1, {
    message: 'Task name is a required field',
  }),
  description: z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
  icon: z.string().min(1, {
    message: 'Icon is a required field',
  }),
  status: z
    .enum(['IN_PROGRESS', 'COMPLETED', 'WONT_DO'])
    .optional()
    .transform((val) => (val === null ? undefined : val)),
})
