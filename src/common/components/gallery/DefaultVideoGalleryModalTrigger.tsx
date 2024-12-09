 
import ResponsiveButton from '@/common/components/button/ResponsiveButton';
import type {VideoGalleryTriggerProps} from '@/common/components/gallery/DemoVideoGalleryModal';
import {ImageCopy} from '@carbon/icons-react';

export default function DefaultVideoGalleryModalTrigger({
  onClick,
}: VideoGalleryTriggerProps) {
  return (
    <ResponsiveButton
      color="ghost"
      className="hover:!bg-black"
      startIcon={<ImageCopy size={20} />}
      onClick={onClick}>
      Change video
    </ResponsiveButton>
  );
}
