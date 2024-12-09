 
import {OBJECT_TOOLBAR_INDEX} from '@/common/components/toolbar/ToolbarConfig';
import useToolbarTabs from '@/common/components/toolbar/useToolbarTabs';
import useVideo from '@/common/components/video/editor/useVideo';
import {
  activeTrackletObjectIdAtom,
  frameIndexAtom,
  isPlayingAtom,
  isStreamingAtom,
  sessionAtom,
  streamingStateAtom,
  trackletObjectsAtom,
} from '@/demo/atoms';
import {DEFAULT_EFFECT_LAYERS} from '@/demo/DemoConfig';
import {useSetAtom} from 'jotai';
import {useCallback} from 'react';

type State = {
  resetEditor: () => void;
  resetEffects: () => void;
  resetSession: () => void;
};

export default function useResetEditor(): State {
  const video = useVideo();

  const setSession = useSetAtom(sessionAtom);
  const setActiveTrackletObjectId = useSetAtom(activeTrackletObjectIdAtom);
  const setTrackletObjects = useSetAtom(trackletObjectsAtom);
  const setFrameIndex = useSetAtom(frameIndexAtom);
  const setStreamingState = useSetAtom(streamingStateAtom);
  const setIsPlaying = useSetAtom(isPlayingAtom);
  const setIsStreaming = useSetAtom(isStreamingAtom);
  const [, setDemoTabIndex] = useToolbarTabs();

  const resetEffects = useCallback(() => {
    video?.setEffect(DEFAULT_EFFECT_LAYERS.background, 0, {variant: 0});
    video?.setEffect(DEFAULT_EFFECT_LAYERS.highlight, 1, {variant: 0});
  }, [video]);

  const resetEditor = useCallback(() => {
    setFrameIndex(0);
    setSession(null);
    setActiveTrackletObjectId(0);
    setTrackletObjects([]);
    setStreamingState('none');
    setIsPlaying(false);
    setIsStreaming(false);
    resetEffects();
    setDemoTabIndex(OBJECT_TOOLBAR_INDEX);
  }, [
    setFrameIndex,
    setSession,
    setActiveTrackletObjectId,
    setTrackletObjects,
    setStreamingState,
    setIsPlaying,
    setIsStreaming,
    resetEffects,
    setDemoTabIndex,
  ]);

  const resetSession = useCallback(() => {
    setSession(prev => {
      if (prev === null) {
        return prev;
      }
      return {...prev, ranPropagation: false};
    });
    setActiveTrackletObjectId(null);
    resetEffects();
  }, [setSession, setActiveTrackletObjectId, resetEffects]);

  return {resetEditor, resetEffects, resetSession};
}
