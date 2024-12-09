 
import ChangeVideoModal from '@/common/components/gallery/ChangeVideoModal';
import type {VideoGalleryTriggerProps} from '@/common/components/gallery/DemoVideoGalleryModal';
import useScreenSize from '@/common/screen/useScreenSize';
import {ImageCopy} from '@carbon/icons-react';
import OptionButton from './OptionButton';

type Props = {
  onChangeVideo: () => void;
};
export default function GalleryOption({onChangeVideo}: Props) {
  return (
    <ChangeVideoModal
      videoGalleryModalTrigger={GalleryTrigger}
      showUploadInGallery={false}
      onChangeVideo={onChangeVideo}
    />
  );
}

function GalleryTrigger({onClick}: VideoGalleryTriggerProps) {
  const {isMobile} = useScreenSize();

  return (
    <OptionButton
      variant="flat"
      title={isMobile ? 'Gallery' : 'Browse gallery'}
      Icon={ImageCopy}
      onClick={onClick}
    />
  );
}
