import { z } from 'zod';

export const CreateGerbangSchema = z.object({
  IdCabang: z.number().min(1, { message: 'id cabang is required' }),
  NamaGerbang: z.string().min(1, { message: 'nama gerbang is required' }),
  NamaCabang: z.string().min(1, { message: 'nama cabang is required' }),
});

export const EditGerbangSchema = z.object({
  id: z.number(),
  IdCabang: z.number().min(1, { message: 'id cabang is required' }),
  NamaGerbang: z.string().min(1, { message: 'nama gerbang is required' }),
  NamaCabang: z.string().min(1, { message: 'nama cabang is required' }),
});
