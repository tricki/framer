import { getDevices } from "./getDevices";

export function getDeviceByName(name: string) {
  const devices = getDevices();

  return devices.find(device => device.name === name);
}
