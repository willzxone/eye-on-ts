 
import type {VideoGalleryTriggerProps} from '@/common/components/gallery/DemoVideoGalleryModal';
import DemoVideoGalleryModal from '@/common/components/gallery/DemoVideoGalleryModal';
import useVideo from '@/common/components/video/editor/useVideo';
import Logger from '@/common/logger/Logger';
import {isStreamingAtom, uploadingStateAtom, VideoData} from '@/demo/atoms';
import {useAtomValue, useSetAtom} from 'jotai';
import {ComponentType, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import AllVideoGalleryModal from './AllVideoGalleryModal';

type Props = {
  videoGalleryModalTrigger?: ComponentType<VideoGalleryTriggerProps>;
  showUploadInGallery?: boolean;
  onChangeVideo?: () => void;
};

export default function ChangeVideoModal({
  videoGalleryModalTrigger: VideoGalleryModalTriggerComponent,
  showUploadInGallery = true,
  onChangeVideo,
}: Props) {
  const isStreaming = useAtomValue(isStreamingAtom);
  const setUploadingState = useSetAtom(uploadingStateAtom);
  const video = useVideo();
  const navigate = useNavigate();

  const handlePause = useCallback(() => {
    video?.pause();
  }, [video]);

  function handlePauseOrAbortVideo() {
    if (isStreaming) {
      video?.abortStreamMasks();
    } else {
      handlePause();
    }
  }

  function handleSwitchVideos(video: VideoData) {
    // Retain any search parameter
    navigate(
      {
        pathname: location.pathname,
        search: location.search,
      },
      {
        state: {
          video,
        },
      },
    );
    onChangeVideo?.();
  }

  function handleUploadVideoError(error: Error) {
    setUploadingState('error');
    Logger.error(error);
  }

  return (
    <div>
      <DemoVideoGalleryModal
        trigger={VideoGalleryModalTriggerComponent}
        showUploadInGallery={showUploadInGallery}
        onOpen={handlePauseOrAbortVideo}
        onSelect={handleSwitchVideos}
        onUploadVideoError={handleUploadVideoError}
      />
      <AllVideoGalleryModal
        trigger={VideoGalleryModalTriggerComponent}
        showUploadInGallery={showUploadInGallery}
        onOpen={handlePauseOrAbortVideo}
        onSelect={handleSwitchVideos}
        onUploadVideoError={handleUploadVideoError}
      />
    </div>
  );
}
