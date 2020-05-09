import { h, Component, Element, Prop, State, Watch, Method, Event, EventEmitter, Host } from '@stencil/core';
import { throttle } from 'throttle-debounce';
import { round } from '../../utils/round';

/**
 * A simple web component to include another website in an iFrame at a fixed aspect ratio.
 */
@Component({
  tag: 'framer-frame',
  styleUrl: 'frame.css',
  shadow: true,
})
export class Frame {

  elFrame!: HTMLIFrameElement;
  resizeListener: () => void;
  containerStyle: { width: number, height: number };
  wasRecentlyUpdated: boolean = true;

  @Element() el: HTMLFramerFrameElement;

  /**
   * The URL to load.
   */
  @Prop() url: string;

  @Watch('url')
  urlChanged() {
    this.wasRecentlyUpdated = true;
  }

  /**
   * The emulated width.
   */
  @Prop() fwidth: number;

  /**
   * The emulated height.
   */
  @Prop() fheight: number;

  /**
   * Whether to calculate the size based on height instead of width. Requires you to define a height using CSS.
   */
  @Prop() useHeight: boolean = false;

  /**
   * Don't render the frame. Useful when the frame is hidden on load.
   */
  @Prop() disabled: boolean = false;

  @Watch('disabled')
  disabledChanged() {
    if (!this.disabled) {
      this.handleResizing();

      this.wasRecentlyUpdated = true;
    }
  }

  @State() elSize: {
    width: number,
    height: number,
  };

  /**
   * Focus the iFrame.
   */
  @Method()
  async focusFrame() {
    this.elFrame.focus();
  }

  /**
   * Get the iFrame element.
   */
  @Method()
  async getFrame() {
    return this.elFrame;
  }

  /**
   * Fires when the frame has initially loaded.
   */
  @Event({ bubbles: true }) frameLoaded: EventEmitter<void>;

  handleResizing() {
    this.elSize = {
      width: this.el.clientWidth,
      height: this.el.clientHeight,
    };
  }

  componentWillLoad() {
    this.resizeListener = throttle(250, this.handleResizing.bind(this));
    window.addEventListener('resize', this.resizeListener, { passive: true });
  }

  componentDidLoad() {
    this.disabledChanged();
  }

  componentDidUpdate() {
    if (this.wasRecentlyUpdated) {
      this.wasRecentlyUpdated = false;
    }
  }

  componentDidUnload() {
    window.removeEventListener('resize', this.resizeListener);
  }

  getFrameStyle() {
    return {
      width: this.fwidth + 'px',
      height: this.fheight + 'px',
      transform: !this.elSize ? null : this.useHeight ? `scale(${this.containerStyle.height / this.fheight})` : `scale(${this.containerStyle.width / this.fwidth})`,
    };
  }

  getContainerStyle() {
    const containerStyle = {
      width: !this.elSize ? null : round(this.fwidth * (this.elSize.width / this.fwidth), 2),
      height: !this.elSize ? null : round(this.fheight * (this.elSize.width / this.fwidth), 2),
    };

    if (!this.elSize) {
      return;
    }

    if (this.useHeight) {
      const differenceFactor = this.elSize.height / containerStyle.height;
      containerStyle.height = this.elSize.height;
      containerStyle.width = containerStyle.width * differenceFactor;
    } else {
      const differenceFactor = this.elSize.width / containerStyle.width;
      containerStyle.height = containerStyle.height * differenceFactor;
      containerStyle.width = this.elSize.width;
    }

    this.containerStyle = containerStyle;

    return {
      width: containerStyle.width + 'px',
      height: containerStyle.height + 'px',
    };
  }

  render() {
    if (this.disabled) {
      return;
    }

    return (
      <Host>
        <div class="container" style={this.getContainerStyle()}>
          <iframe
            style={this.getFrameStyle()}
            src={this.url}
            frameBorder="0"
            ref={el => this.elFrame = el}
            onLoad={() => this.frameLoaded.emit()}
          ></iframe>
        </div>
      </Host>
    );
  }

}
