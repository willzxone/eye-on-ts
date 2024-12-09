 
import {INFERENCE_API_ENDPOINT, VIDEO_API_ENDPOINT} from '@/demo/DemoConfig';

export type Settings = {
  videoAPIEndpoint: string;
  inferenceAPIEndpoint: string;
};

// Key used to store the settings in the browser's local storage.
export const SAM2_SETTINGS_KEY = 'SAM2_SETTINGS_KEY';

export type Action =
  | {type: 'load-state'}
  | {type: 'change-video-api-endpoint'; url: string}
  | {type: 'change-inference-api-endpoint'; url: string};

export const DEFAULT_SETTINGS: Settings = {
  videoAPIEndpoint: VIDEO_API_ENDPOINT,
  inferenceAPIEndpoint: INFERENCE_API_ENDPOINT,
};

export function settingsReducer(state: Settings, action: Action): Settings {
  function storeSettings(newState: Settings): void {
    localStorage.setItem(SAM2_SETTINGS_KEY, JSON.stringify(newState));
  }

  switch (action.type) {
    case 'load-state': {
      try {
        const serializedSettings = localStorage.getItem(SAM2_SETTINGS_KEY);
        if (serializedSettings != null) {
          return JSON.parse(serializedSettings) as Settings;
        } else {
          // Store default settings in local storage. This will populate the
          // settings in the local storage on first app load or when user
          // cleared the browser cache.
          storeSettings(state);
        }
      } catch {
        // Could not parse settings. Using default settings instead.
      }
      return state;
    }
    case 'change-video-api-endpoint':
      state.videoAPIEndpoint = action.url;
      break;
    case 'change-inference-api-endpoint':
      state.inferenceAPIEndpoint = action.url;
      break;
  }

  // Store the settings state on every change
  storeSettings(state);

  return state;
}
