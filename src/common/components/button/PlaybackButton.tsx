 
import {OBJECT_TOOLBAR_INDEX} from '@/common/components/toolbar/ToolbarConfig';
import Tooltip from '@/common/components/Tooltip';
import useVideo from '@/common/components/video/editor/useVideo';
import {isPlayingAtom, streamingStateAtom, toolbarTabIndex} from '@/demo/atoms';
import {PauseFilled, PlayFilledAlt} from '@carbon/icons-react';
import {useAtomValue} from 'jotai';
import {useCallback, useEffect} from 'react';

export default function PlaybackButton() {
  const tabIndex = useAtomValue(toolbarTabIndex);
  const streamingState = useAtomValue(streamingStateAtom);
  const isPlaying = useAtomValue(isPlayingAtom);
  const video = useVideo();

  const isDisabled =
    tabIndex === OBJECT_TOOLBAR_INDEX &&
    streamingState !== 'none' &&
    streamingState !== 'full';

  const handlePlay = useCallback(() => {
    video?.play();
  }, [video]);

  const handlePause = useCallback(() => {
    video?.pause();
  }, [video]);

  const handleClick = useCallback(() => {
    if (isDisabled) {
      return;
    }
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isDisabled, isPlaying, handlePlay, handlePause]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const callback = {
        KeyK: handleClick,
      }[event.code];
      if (callback != null) {
        event.preventDefault();
        callback();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [handleClick]);

  return (
    <Tooltip message={`${isPlaying ? 'Pause' : 'Play'} (k)`}>
      <button
        disabled={isDisabled}
        className={`group !rounded-full hover:!bg-white !bg-white !w-10 !h-10 flex items-center justify-center ${getButtonStyles(isDisabled)}`}
        onClick={handleClick}>
        {isPlaying ? (
        <i className="fa-solid fa-pause text-black bg-white rounded-full size-6 flex items-center justify-center"></i>
      ) : (
        <i className="fa-solid fa-play text-black bg-white rounded-full size-6 flex items-center justify-center"></i>
      )}
      </button>
    </Tooltip>
  );
}

function getButtonStyles(isDisabled: boolean): string {
  if (isDisabled) {
    return '!bg-gray-600 !text-graydark-700';
  }
  return `!text-black bg-white`;
}
