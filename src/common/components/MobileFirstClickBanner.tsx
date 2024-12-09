 
import ChangeVideoModal from '@/common/components/gallery/ChangeVideoModal';
import {DEMO_SHORT_NAME} from '@/demo/DemoConfig';
import {spacing} from '@/theme/tokens.stylex';
import {ImageCopy} from '@carbon/icons-react';
import stylex from '@stylexjs/stylex';
import {Button} from 'react-daisyui';

const styles = stylex.create({
  container: {
    position: 'relative',
    backgroundColor: '#000',
    padding: spacing[5],
    paddingVertical: spacing[6],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[4],
  },
});

export default function MobileFirstClickBanner() {
  return (
    <div {...stylex.props(styles.container)}>
      <div className="flex text-white text-lg">
        Click an object in the video to start
      </div>
      <div className="text-sm text-[#A7B3BF]">
        <p>
          You&apos;ll be able to use {DEMO_SHORT_NAME} to make fun edits to any
          video by tracking objects and applying visual effects. To start, click
          any object in the video.
        </p>
      </div>
      <div className="flex items-center">
        <ChangeVideoModal
          videoGalleryModalTrigger={MobileVideoGalleryModalTrigger}
          showUploadInGallery={true}
        />
      </div>
    </div>
  );
}

type MobileVideoGalleryModalTriggerProps = {
  onClick: () => void;
};

function MobileVideoGalleryModalTrigger({
  onClick,
}: MobileVideoGalleryModalTriggerProps) {
  return (
    <Button
      color="ghost"
      startIcon={<ImageCopy size={20} />}
      onClick={onClick}
      className="text-white p-0">
      Change video
    </Button>
  );
}
