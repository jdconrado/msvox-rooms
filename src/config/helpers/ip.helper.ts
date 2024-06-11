import { networkInterfaces } from 'os';

export const getIPAddresses = (): { interface: string; address: string }[] => {
  const interfaces = networkInterfaces();
  const addresses: { interface: string; address: string }[] = [];

  for (const name of Object.keys(interfaces)) {
    console.log('Detected network interface: ', name);
    for (const iface of interfaces[name]!) {
      console.log('- Detected address: ', iface);
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({
          interface: name,
          address: iface.address,
        });
      }
    }
  }

  return addresses;
};

export const getDefaultIPAddress = (): string => {
  const addresses = getIPAddresses();
  if (addresses.length > 0) {
    const address = addresses.find((addr) =>
      addr.interface.toLowerCase().includes('eth0'),
    );
    if (address) {
      return address.address;
    }
  }

  return addresses[0].address;
};
