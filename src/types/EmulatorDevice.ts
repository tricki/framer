export type EmulatorDevice = {
  name: string,
  width: number,
  height: number,
  dpr?: number,
  mode?: string;
  defaultLandscape?: boolean;
};
