import { z } from 'zod';

// Enum para os status possíveis de uma tarefa
export const TaskStatusEnum = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'], {
  required_error: 'O status da tarefa é obrigatório.',
  invalid_type_error: "Status inválido. Use 'PENDING', 'IN_PROGRESS' ou 'COMPLETED'.",
});

// Schema para criação de uma nova tarefa
export const CreateTaskSchema = z.object({
  title: z.string({
    required_error: 'O título da tarefa é obrigatório.',
    invalid_type_error: 'O título da tarefa deve ser uma string.',
  }).min(3, { message: 'O título da tarefa deve ter pelo menos 3 caracteres.' })
    .max(150, { message: 'O título da tarefa não pode exceder 150 caracteres.' }),
  description: z.string({
    invalid_type_error: 'A descrição da tarefa deve ser uma string.',
  }).max(1000, { message: 'A descrição da tarefa não pode exceder 1000 caracteres.' })
    .optional(),
  status: TaskStatusEnum.optional().default('PENDING'), // Status opcional, padrão 'PENDING'
  dueDate: z.string({
    invalid_type_error: 'A data de vencimento deve ser uma string no formato ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ).',
  }).datetime({ message: "Formato de data inválido. Use o formato ISO 8601." })
    .optional()
    .nullable(), // Permite enviar null para não ter data de vencimento
});

// Schema para atualização de uma tarefa
// Todos os campos são opcionais na atualização
export const UpdateTaskSchema = z.object({
  title: z.string({
    invalid_type_error: 'O título da tarefa deve ser uma string.',
  }).min(3, { message: 'O título da tarefa deve ter pelo menos 3 caracteres.' })
    .max(150, { message: 'O título da tarefa não pode exceder 150 caracteres.' })
    .optional(),
  description: z.string({
    invalid_type_error: 'A descrição da tarefa deve ser uma string.',
  }).max(1000, { message: 'A descrição da tarefa não pode exceder 1000 caracteres.' })
    .optional()
    .nullable(),
  status: TaskStatusEnum.optional(),
  dueDate: z.string({
    invalid_type_error: 'A data de vencimento deve ser uma string no formato ISO 8601.',
  }).datetime({ message: "Formato de data inválido. Use o formato ISO 8601." })
    .optional()
    .nullable(),
});

// Inferência de tipos a partir dos schemas do Zod
export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
