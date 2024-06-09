const baseSystem = '/api/system';
export const routePaths = {
  rooms: {
    system: `${baseSystem}/rooms`,
  },
  roomSession: {
    system: `${baseSystem}/rooms/:roomId/sessions`,
  },
};
