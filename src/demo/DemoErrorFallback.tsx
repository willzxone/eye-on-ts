 
import LoadingStateScreen from '@/common/loading/LoadingStateScreen';
import {FallbackProps} from 'react-error-boundary';

export default function DemoErrorFallback(_props: FallbackProps) {
  return (
    <LoadingStateScreen
      title="Well, this is embarrassing..."
      description="This demo is not optimized for your device. Please try again on a different device with a larger screen."
      linkProps={{to: '..', label: 'Back to homepage'}}
    />
  );
}
