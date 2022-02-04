declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

interface Window {
  webkitAudioContext: {
    new(contextOptions?: AudioContextOptions): AudioContext;
    prototype: AudioContext;
  }
}

// Store types and enuns

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum ActionConfig {
  SET_THEME = 'SET_THEME',
}

export namespace Store {
  export interface ConfigState {
    theme: Theme
  }

  export interface Action<T = string, P = Record<string, unknown>> {
    type: T;
    payload: P
  }

  export interface ReducerRoot {
    config: ConfigState
  }
}
