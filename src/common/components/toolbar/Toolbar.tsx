 
import useListenToStreamingState from '@/common/components/toolbar/useListenToStreamingState';
import useToolbarTabs from '@/common/components/toolbar/useToolbarTabs';
import useVideo from '@/common/components/video/editor/useVideo';
import useVideoEffect from '@/common/components/video/editor/useVideoEffect';
import {EffectIndex} from '@/common/components/video/effects/Effects';
import useScreenSize from '@/common/screen/useScreenSize';
import {
  codeEditorOpenedAtom,
  isPlayingAtom,
  isStreamingAtom,
} from '@/demo/atoms';
import {useAtom, useAtomValue, useSetAtom} from 'jotai';
import {useCallback, useEffect} from 'react';
import DesktopToolbar from './DesktopToolbar';
import MobileToolbar from './MobileToolbar';
import {OBJECT_TOOLBAR_INDEX} from './ToolbarConfig';

export default function Toolbar() {
  const [tabIndex, setTabIndex] = useToolbarTabs();
  const video = useVideo();
  const setIsPlaying = useSetAtom(isPlayingAtom);
  const [isStreaming, setIsStreaming] = useAtom(isStreamingAtom);
  const codeEditorOpened = useAtomValue(codeEditorOpenedAtom);
  const {isMobile} = useScreenSize();
  const setEffect = useVideoEffect();

  const resetEffects = useCallback(() => {
    setEffect('Original', EffectIndex.BACKGROUND, {variant: 0});
    setEffect('Overlay', EffectIndex.HIGHLIGHT, {variant: 0});
  }, [setEffect]);

  const handleStopVideo = useCallback(() => {
    if (isStreaming) {
      video?.abortStreamMasks();
    } else {
      video?.pause();
    }
  }, [video, isStreaming]);

  const handleTabChange = useCallback(
    (newIndex: number) => {
      if (newIndex === OBJECT_TOOLBAR_INDEX) {
        handleStopVideo();
        resetEffects();
      }

      setTabIndex(newIndex);
    },
    [handleStopVideo, resetEffects, setTabIndex],
  );

  useListenToStreamingState();

  useEffect(() => {
    function onPlay() {
      setIsPlaying(true);
    }
    function onPause() {
      setIsPlaying(false);
    }

    video?.addEventListener('play', onPlay);
    video?.addEventListener('pause', onPause);
    return () => {
      video?.removeEventListener('play', onPlay);
      video?.removeEventListener('pause', onPause);
    };
  }, [video, resetEffects, setIsStreaming, setIsPlaying]);

  if (codeEditorOpened) {
    return null;
  }

  return isMobile ? (
    <MobileToolbar tabIndex={tabIndex} onTabChange={handleTabChange} />
  ) : (
    <DesktopToolbar tabIndex={tabIndex} onTabChange={handleTabChange} />
  );
}
