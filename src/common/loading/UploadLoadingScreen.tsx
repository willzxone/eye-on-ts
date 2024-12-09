 
import ChangeVideoModal from '@/common/components/gallery/ChangeVideoModal';
import type {VideoGalleryTriggerProps} from '@/common/components/gallery/DemoVideoGalleryModal';
import LoadingStateScreen from '@/common/loading/LoadingStateScreen';
import {uploadingStateAtom} from '@/demo/atoms';
import {ImageCopy} from '@carbon/icons-react';
import {useAtomValue} from 'jotai';
import OptionButton from '../components/options/OptionButton';

export default function UploadLoadingScreen() {
  const uploadingState = useAtomValue(uploadingStateAtom);

  if (uploadingState === 'error') {
    return (
      <LoadingStateScreen
        title="Uh oh, we cannot process this video"
        description="Please upload another video, and make sure that the video’s file size is less than 70Mb. ">
        <div className="max-w-[250px] w-full mx-auto">
          <ChangeVideoModal
            videoGalleryModalTrigger={UploadLoadingScreenChangeVideoTrigger}
          />
        </div>
      </LoadingStateScreen>
    );
  }

  return (
    <LoadingStateScreen
      title="Uploading video..."
      description="Sit tight while we upload your video."
    />
  );
}

function UploadLoadingScreenChangeVideoTrigger({
  onClick,
}: VideoGalleryTriggerProps) {
  return (
    <OptionButton
      variant="gradient"
      title="Change video"
      Icon={ImageCopy}
      onClick={onClick}
    />
  );
}
