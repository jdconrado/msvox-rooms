import { z } from 'zod';

export const RoomParticipantSchema = z.object({
  id: z.string(),
  actorId: z.string(),
  createdAt: z.date(),
});
