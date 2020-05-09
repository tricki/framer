import { EmulatorDevice } from "../types/EmulatorDevice";

const devices: EmulatorDevice[] = [
  {
    name: 'Desktop',
    width: 1080,
    height: 1920,
    dpr: 1,
    mode: 'md',
    defaultLandscape: true,
  },
  {
    name: 'iPhone 6/7/8',
    width: 375,
    height: 667,
    dpr: 2,
    mode: 'ios',
  },
  {
    name: 'iPhone 6/7/8 Plus',
    width: 414,
    height: 736,
    dpr: 3,
    mode: 'ios',
  },
  {
    name: 'iPhone X',
    width: 375,
    height: 812,
    dpr: 3,
    mode: 'ios',
  },
  {
    name: 'iPad',
    width: 768,
    height: 1024,
    dpr: 2,
    mode: 'ios',
  },
  {
    name: 'iPad Pro',
    width: 1024,
    height: 1366,
    dpr: 2,
    mode: 'ios',
  },
  {
    name: 'Pixel 2',
    width: 411,
    height: 731,
    dpr: 2.6,
    mode: 'md',
  },
  {
    name: 'Samsung Galaxy S4/S5/S6/S7',
    width: 360,
    height: 640,
    dpr: 3,
    mode: 'md',
  },
  {
    name: 'Samsung Galaxy S8',
    width: 360,
    height: 740,
    dpr: 4,
    mode: 'md',
  },
  {
    name: 'Samsung Galaxy Tab S4',
    width: 800,
    height: 1280,
    dpr: 2,
    mode: 'md',
  },
];

export function getDevices(): EmulatorDevice[] {
  return devices;
}
