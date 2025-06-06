 
import AllVideoGalleryModalTrigger from '@/common/components/gallery/AllVideoGalleryModalTrigger';
import {
  frameIndexAtom,
  sessionAtom,
  uploadingStateAtom,
  VideoData,
} from '@/demo/atoms';
import {spacing} from '@/theme/tokens.stylex';
import {Close} from '@carbon/icons-react';
import stylex from '@stylexjs/stylex';
import {useSetAtom} from 'jotai';
import {ComponentType, useCallback, useRef} from 'react';
import {Modal} from 'react-daisyui';
import DemoVideoGallery from './DemoVideoGallery';

const styles = stylex.create({
  container: {
    position: 'relative',
    minWidth: '85vw',
    minHeight: '85vh',
    overflow: 'hidden',
    color: '#fff',
    boxShadow: '0 0 100px 50px #000',
    borderRadius: 16,
    border: '2px solid transparent',
    background:
      'linear-gradient(#1A1C1F, #1A1C1F) padding-box, linear-gradient(to right bottom, #FB73A5,#595FEF,#94EAE2,#FCCB6B) border-box',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: spacing[3],
    zIndex: 10,
    cursor: 'pointer',
    ':hover': {
      opacity: 0.7,
    },
  },
  galleryContainer: {
    position: 'absolute',
    top: spacing[4],
    left: 0,
    right: 0,
    bottom: 0,
    overflowY: 'auto',
  },
});

export type VideoGalleryTriggerProps = {
  onClick: () => void;
};

type Props = {
  trigger?: ComponentType<VideoGalleryTriggerProps>;
  showUploadInGallery?: boolean;
  onOpen?: () => void;
  onSelect?: (video: VideoData, isUpload?: boolean) => void;
  onUploadVideoError?: (error: Error) => void;
};

export default function AllVideoGalleryModal({
  trigger: VideoGalleryModalTrigger = AllVideoGalleryModalTrigger,
  showUploadInGallery = false,
  onOpen,
  onSelect,
  onUploadVideoError,
}: Props) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const setFrameIndex = useSetAtom(frameIndexAtom);
  const setUploadingState = useSetAtom(uploadingStateAtom);
  const setSession = useSetAtom(sessionAtom);

  function openModal() {
    const modal = modalRef.current;
    if (modal != null) {
      modal.style.display = 'grid';
      modal.showModal();
    }
  }

  function closeModal() {
    const modal = modalRef.current;
    if (modal != null) {
      modal.close();
      modal.style.display = 'none';
    }
  }

  const handleSelect = useCallback(
    async (video: VideoData, isUpload?: boolean) => {
      closeModal();
      setFrameIndex(0);
      onSelect?.(video, isUpload);
      setUploadingState('default');
      setSession(null);
    },
    [setFrameIndex, onSelect, setUploadingState, setSession],
  );

  function handleUploadVideoStart() {
    setUploadingState('uploading');
    closeModal();
  }

  function handleOpenVideoGalleryModal() {
    onOpen?.();
    openModal();
  }

  return (
    <>
      <VideoGalleryModalTrigger onClick={handleOpenVideoGalleryModal} />
      <Modal ref={modalRef} {...stylex.props(styles.container)}>
        <div onClick={closeModal} {...stylex.props(styles.closeButton)}>
          <Close size={28} />
        </div>
        <Modal.Body>
          <div {...stylex.props(styles.galleryContainer)}>
            <DemoVideoGallery
              showUploadInGallery={showUploadInGallery}
              onSelect={video => handleSelect(video)}
              onUpload={video => handleSelect(video, true)}
              onUploadStart={handleUploadVideoStart}
              onUploadError={onUploadVideoError}
              heading={<h3 className="mb-2">
                Select all videos for object classification
              </h3>}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
