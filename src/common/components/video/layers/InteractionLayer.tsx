 
import useVideo from '@/common/components/video/editor/useVideo';
import {getPointInImage} from '@/common/components/video/editor/VideoEditorUtils';
import {SegmentationPoint} from '@/common/tracker/Tracker';
import {labelTypeAtom} from '@/demo/atoms';
import stylex from '@stylexjs/stylex';
import {useAtomValue} from 'jotai';
import {MouseEvent} from 'react';

const styles = stylex.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

type Props = {
  onPoint: (point: SegmentationPoint) => void;
};

export default function InteractionLayer({onPoint}: Props) {
  const video = useVideo();
  // Use labelType to swap positive and negative points. The most important use
  // case is the switch between positive and negative label for left mouse
  // clicks.
  const labelType = useAtomValue(labelTypeAtom);

  return (
    <div
      {...stylex.props(styles.container)}
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        const canvas = video?.getCanvas();
        if (canvas != null) {
          const point = getPointInImage(event, canvas);
          onPoint([...point, labelType === 'positive' ? 1 : 0]);
        }
      }}
      onContextMenu={event => {
        event.preventDefault();
        const canvas = video?.getCanvas();
        if (canvas != null) {
          const point = getPointInImage(event, canvas);
          onPoint([...point, labelType === 'positive' ? 0 : 1]);
        }
      }}
    />
  );
}