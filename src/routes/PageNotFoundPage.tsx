 
import LoadingStateScreen from '@/common/loading/LoadingStateScreen';

export default function PageNotFoundPage() {
  return (
    <LoadingStateScreen
      title="Page not found"
      description="It looks like you might be in the wrong place."
      linkProps={{
        to: '..',
        label: 'Click here to access the SAM 2 Demo',
      }}
    />
  );
}
