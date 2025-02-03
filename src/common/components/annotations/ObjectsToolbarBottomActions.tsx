 
import ClearAllPointsInVideoButton from '@/common/components/annotations/ClearAllPointsInVideoButton';
import CloseSessionButton from '@/common/components/annotations/CloseSessionButton';
import TrackAndPlayButton from '@/common/components/button/TrackAndPlayButton';
import ToolbarBottomActionsWrapper from '@/common/components/toolbar/ToolbarBottomActionsWrapper';
import {
  EFFECT_TOOLBAR_INDEX,
  OBJECT_TOOLBAR_INDEX,
} from '@/common/components/toolbar/ToolbarConfig';
import {streamingStateAtom} from '@/demo/atoms';
import {useAtomValue} from 'jotai';

type Props = {
  onTabChange: (newIndex: number) => void;
};

export default function ObjectsToolbarBottomActions({onTabChange}: Props) {
  const streamingState = useAtomValue(streamingStateAtom);

  const isTrackingEnabled =
    streamingState !== 'none' && streamingState !== 'full';

  function handleSwitchToEffectsTab() {
    onTabChange(EFFECT_TOOLBAR_INDEX);
  }

  return (
    <ToolbarBottomActionsWrapper>
      <ClearAllPointsInVideoButton
        onRestart={() => onTabChange(OBJECT_TOOLBAR_INDEX)}
      />
      {isTrackingEnabled && <TrackAndPlayButton />}
      {/* {streamingState === 'full' && (
        <CloseSessionButton onSessionClose={handleSwitchToEffectsTab} />
      )} */}
    </ToolbarBottomActionsWrapper>
  );
}
