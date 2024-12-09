 
import {INFERENCE_API_ENDPOINT, VIDEO_API_ENDPOINT} from '@/demo/DemoConfig';
import ApprovableInput from '@/settings/ApprovableInput';
import useSettingsContext from '@/settings/useSettingsContext';

export default function SAMVSettings() {
  const {settings, dispatch} = useSettingsContext();

  return (
    <div>
      <ApprovableInput
        label="Video API Endpoint"
        defaultValue={VIDEO_API_ENDPOINT}
        initialValue={settings.videoAPIEndpoint}
        onChange={url => dispatch({type: 'change-video-api-endpoint', url})}
      />
      <ApprovableInput
        label="Inference API Endpoint"
        defaultValue={INFERENCE_API_ENDPOINT}
        initialValue={settings.inferenceAPIEndpoint}
        onChange={url => dispatch({type: 'change-inference-api-endpoint', url})}
      />
    </div>
  );
}
