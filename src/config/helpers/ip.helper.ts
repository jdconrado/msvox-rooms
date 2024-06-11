import { networkInterfaces } from 'os';

export const getIPAddresses = (): string[] => {
  const interfaces = networkInterfaces();
  const addresses: string[] = [];

  for (const name of Object.keys(interfaces)) {
    console.log('Detected network interface: ', name);
    for (const iface of interfaces[name]!) {
      console.log('- Detected address: ', iface);
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push(iface.address);
      }
    }
  }

  return addresses;
};
