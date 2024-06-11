import { Logger } from '@nestjs/common';
import { getDefaultIPAddress, getIPAddresses } from './helpers';

const APP_VARIABLES = {
  NODE_ENV: process.env.NODE_ENV || 'local',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  APP_URL: process.env.APP_URL || 'http://localhost',
  APP_PORT: parseInt(process.env.APP_PORT || '3000'),
  APP_PAGINATION_LIMIT: parseInt(process.env.APP_PAGINATION_LIMIT || '25'),

  // MONGODB
  MONGODB_URI:
    process.env.MONGODB_URI ||
    'mongodb://local_mongo_user:a3QwRjJ3c2V0@localhost:27017/ms-project?authSource=admin',

  // MEDIASOUP
  MEDIASOUP_MEDIA_CODECS: [
    // Opus for Audio - Good for varying network conditions
    {
      kind: 'audio',
      mimeType: 'audio/opus',
      clockRate: 48000,
      channels: 2,
    },
    // VP8 for Video - Well-suited for real-time communication and varying bandwidths
    {
      kind: 'video',
      mimeType: 'video/VP8',
      clockRate: 90000,
    },
    // VP9 for Video - Better compression, suitable for high-quality video at lower bitrates
    {
      kind: 'video',
      mimeType: 'video/VP9',
      clockRate: 90000,
      parameters: {
        'profile-id': 2,
      },
    },
    // H264 as an alternative for Video - Offers compatibility with a wide range of devices
    {
      kind: 'video',
      mimeType: 'video/H264',
      clockRate: 90000,
      parameters: {
        'packetization-mode': 1,
        'profile-level-id': '42e01f', // Baseline profile for compatibility
      },
    },
  ],
  MEDIASOUP_MAX_ROUTERS_PER_WORKER: parseInt(
    process.env.MEDIASOUP_MAX_ROUTERS_PER_WORKER || '1000',
  ),
  MEDIASOUP_LISTEN_IP: process.env.MEDIASOUP_LISTEN_IP || '0.0.0.0',
  MEDISOUP_ANOUNCED_IP: process.env.MEDISOUP_ANOUNCED_IP || '127.0.0.1',
  MEDIASOUP_MIN_PORT: parseInt(process.env.MEDIASOUP_MIN_PORT || '10000'),
  MEDIASOUP_MAX_PORT: parseInt(process.env.MEDIASOUP_MAX_PORT || '19999'),
};

const logger = new Logger('AppVariables');

logger.log('NODE ENV:', APP_VARIABLES.NODE_ENV);
logger.log('LOG LEVEL:', APP_VARIABLES.LOG_LEVEL);

if (!process.env.MEDISOUP_ANOUNCED_IP && APP_VARIABLES.NODE_ENV !== 'local') {
  logger.warn(
    'No MEDISOUP_ANOUNCED_IP was provided. Defaulting to the first available IP address.',
  );
  APP_VARIABLES.MEDISOUP_ANOUNCED_IP = getDefaultIPAddress();
  logger.warn('MEDISOUP_ANOUNCED_IP:', APP_VARIABLES.MEDISOUP_ANOUNCED_IP);
}

getIPAddresses();
// Export the variables
export { APP_VARIABLES };
