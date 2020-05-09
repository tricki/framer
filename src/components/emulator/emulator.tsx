import { Component, h, Prop, State, Watch, Method, Host } from '@stencil/core';

import { EmulatorDevice } from '../../types/EmulatorDevice';
import { getDeviceByName } from '../../utils/getDeviceByName';

@Component({
  tag: 'framer-emulator',
  styleUrl: 'emulator.css',
})
export class Emulator {

  elFrame: HTMLFramerFrameElement;

  /**
   * The URL to load.
   */
  @Prop() url: string;

  /**
   * Don't render the emulator. Useful when the emulator is hidden on load.
   */
  @Prop() disabled: boolean = false;

  /**
   * The name of the device to emulate.
   */
  @Prop() deviceName: string = 'iPhone 6/7/8';

  @Watch('deviceName')
  deviceNameChanged() {
    this.device = getDeviceByName(this.deviceName);

    if (this.landscape === null) {
      this.landscape = !!this.device.defaultLandscape;
    }
  }

  /**
   * Show the device in landscape mode.
   */
  @Prop({
    mutable: true,
  }) landscape: boolean = null;

  /**
   * Emulate the design of Ionic Framework applications.
   */
  @Prop() ionicMode: boolean = false;

  /**
   * Whether to calculate the size based on height instead of width. Requires a defined height.
   */
  @Prop() useHeight: boolean = false;

  @State() device: EmulatorDevice;

  /**
   * Focus the iFrame.
   */
  @Method()
  async focusFrame() {
    this.elFrame.focusFrame();
  }

  componentWillLoad() {
    this.deviceNameChanged();
  }

  getUrl() {
    if (!this.ionicMode || !this.device || !this.device.mode) {
      return this.url;
    }

    //TODO ensure parameter in correct position (e.g. if there's a hash in the URL)
    return this.url + '?ionic:mode=' + this.device.mode;
  }

  render() {
    if (!this.device) {
      return;
    }

    return (
      <Host>
        <framer-frame
          ref={el => this.elFrame = el as HTMLFramerFrameElement}
          disabled={this.disabled}
          url={this.getUrl()}
          useHeight={this.useHeight}
          fwidth={this.landscape ? this.device.height : this.device.width}
          fheight={this.landscape ? this.device.width : this.device.height}
        ></framer-frame>
      </Host>
    );
  }
}
