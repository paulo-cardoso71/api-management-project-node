import { z } from 'zod';

// Schema para criação de um novo projeto
export const CreateProjectSchema = z.object({
  name: z.string({
    required_error: 'O nome do projeto é obrigatório.',
    invalid_type_error: 'O nome do projeto deve ser uma string.',
  }).min(3, { message: 'O nome do projeto deve ter pelo menos 3 caracteres.' })
    .max(100, { message: 'O nome do projeto não pode exceder 100 caracteres.' }),
  description: z.string({
    invalid_type_error: 'A descrição do projeto deve ser uma string.',
  }).max(500, { message: 'A descrição do projeto não pode exceder 500 caracteres.' })
    .optional(), // Descrição é opcional
});

// Schema para atualização de um projeto
// Todos os campos são opcionais na atualização
export const UpdateProjectSchema = z.object({
  name: z.string({
    invalid_type_error: 'O nome do projeto deve ser uma string.',
  }).min(3, { message: 'O nome do projeto deve ter pelo menos 3 caracteres.' })
    .max(100, { message: 'O nome do projeto não pode exceder 100 caracteres.' })
    .optional(),
  description: z.string({
    invalid_type_error: 'A descrição do projeto deve ser uma string.',
  }).max(500, { message: 'A descrição do projeto não pode exceder 500 caracteres.' })
    .optional()
    .nullable(), // Permite enviar null para limpar a descrição
});

// Inferência de tipos a partir dos schemas do Zod
export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectDto = z.infer<typeof UpdateProjectSchema>;
