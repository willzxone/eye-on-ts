 
import useMessagesSnackbar from '@/common/components/snackbar/useDemoMessagesSnackbar';
import useVideo from '@/common/components/video/editor/useVideo';
import useInputVideo from '@/common/components/video/useInputVideo';
import {
  activeTrackletObjectIdAtom,
  isPlayingAtom,
  isStreamingAtom,
  labelTypeAtom,
  trackletObjectsAtom,
} from '@/demo/atoms';
import {useAtomValue, useSetAtom} from 'jotai';
import {useState} from 'react';

export default function useRestartSession() {
  const [isLoading, setIsLoading] = useState<boolean>();
  const isPlaying = useAtomValue(isPlayingAtom);
  const isStreaming = useAtomValue(isStreamingAtom);
  const setActiveTrackletObjectId = useSetAtom(activeTrackletObjectIdAtom);
  const setTracklets = useSetAtom(trackletObjectsAtom);
  const setLabelType = useSetAtom(labelTypeAtom);
  const {clearMessage} = useMessagesSnackbar();

  const {inputVideo} = useInputVideo();
  const video = useVideo();

  async function restartSession(onRestart?: () => void) {
    if (video === null || inputVideo === null) {
      return;
    }

    setIsLoading(true);
    if (isPlaying) {
      video.pause();
    }
    if (isStreaming) {
      await video.abortStreamMasks();
    }
    await video?.startSession(inputVideo.path);
    video.frame = 0;
    setActiveTrackletObjectId(0);
    setTracklets([]);
    setLabelType('positive');
    onRestart?.();
    clearMessage();
    setIsLoading(false);
  }

  return {isLoading, restartSession};
}
