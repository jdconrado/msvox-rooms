import { z } from 'zod';

export const RoomSchema = z.object({
  id: z.string(),
  name: z.string(),
  participants: z.array(z.any()),
  createdAt: z.date(),
});
