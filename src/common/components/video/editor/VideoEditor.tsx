 
import {VideoData} from '@/demo/atoms';
import stylex, {StyleXStyles} from '@stylexjs/stylex';
import {useSetAtom} from 'jotai';
import {PropsWithChildren, RefObject, useEffect, useRef} from 'react';
import Video, {VideoRef} from '../Video';
import {videoAtom} from './atoms';

const MAX_VIDEO_WIDTH = 1280;

const styles = stylex.create({
  editorContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '0.375rem',
    overflow: {
      default: 'clip',
      '@media screen and (max-width: 768px)': 'visible',
    },
  },
  videoContainer: {
    position: 'relative',
    flexGrow: 1,
    overflow: 'hidden',
    width: '100%',
    maxWidth: MAX_VIDEO_WIDTH,
  },
  layers: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },
  loadingMessage: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    padding: '6px 10px',
    backgroundColor: '#6441D2CC',
    color: '#FFF',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '8px',
    fontSize: '0.8rem',
  },
});

export type InteractionLayerProps = {
  style: StyleXStyles;
  videoRef: RefObject<VideoRef>;
};

export type ControlsProps = {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onPreviousFrame?: () => void;
  onNextFrame?: () => void;
};

type Props = PropsWithChildren<{
  video: VideoData;
  layers?: React.ReactNode;
  loading?: boolean;
}>;

export default function VideoEditor({
  video: inputVideo,
  layers,
  loading,
  children,
}: Props) {
  const videoRef = useRef<VideoRef>(null);
  const setVideo = useSetAtom(videoAtom);

  // Initialize video atom
  useEffect(() => {
    setVideo(videoRef.current);
    return () => {
      setVideo(null);
    };
  }, [setVideo]);

  return (
    <div {...stylex.props(styles.editorContainer)}>
      <div {...stylex.props(styles.videoContainer)}>
        <Video
          ref={videoRef}
          src={inputVideo.url}
          width={inputVideo.width}
          height={inputVideo.height}
          loading={loading}
        />
        <div {...stylex.props(styles.layers)}>{layers}</div>
      </div>
      {children}
    </div>
  );
}
