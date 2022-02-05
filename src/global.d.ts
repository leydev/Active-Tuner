/* eslint-disable @typescript-eslint/naming-convention */
import type { Theme } from './store/enums';

/**
 * Here you can declare the types of libs third-party
 */

declare global {
  interface Window {
    webkitAudioContext: {
      new(contextOptions?: AudioContextOptions): AudioContext;
      prototype: AudioContext;
    }
  }

  type FunctionVoid = () => void;

  namespace Render2D {
    interface Wave {
      color: string,
      width: number,
    }

    interface Text {
      font: string;
      align: CanvasTextAlign;
      value: string;
      color: string;
    }

    interface Parameters {
      bufferLength: number;
      canvas?: HTMLCanvasElement;
      background?: string;
      wave?: Wave;
      text?: Text;
    }

    type CallbackFrame = FunctionVoid;
  }

  export namespace Store {
    export interface ConfigState {
      theme: Theme;
      firstTime: boolean;
    }

    export interface Action<T = string, P = Record<string, unknown>> {
      type: T;
      payload: P
    }

    export interface ReducerRoot {
      config: ConfigState
    }
  }

}

export { };
