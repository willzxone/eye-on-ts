 
import PrimaryCTAButton from '@/common/components/button/PrimaryCTAButton';
import RestartSessionButton from '@/common/components/session/RestartSessionButton';
import ToolbarBottomActionsWrapper from '@/common/components/toolbar/ToolbarBottomActionsWrapper';
import {
  MORE_OPTIONS_TOOLBAR_INDEX,
  OBJECT_TOOLBAR_INDEX,
} from '@/common/components/toolbar/ToolbarConfig';
import {ChevronRight} from '@carbon/icons-react';

type Props = {
  onTabChange: (newIndex: number) => void;
};

export default function EffectsToolbarBottomActions({onTabChange}: Props) {
  function handleSwitchToMoreOptionsTab() {
    onTabChange(MORE_OPTIONS_TOOLBAR_INDEX);
  }

  return (
    <ToolbarBottomActionsWrapper>
      <RestartSessionButton
        onRestartSession={() => onTabChange(OBJECT_TOOLBAR_INDEX)}
      />
      <PrimaryCTAButton
        onClick={handleSwitchToMoreOptionsTab}
        endIcon={<ChevronRight />}>
        Next
      </PrimaryCTAButton>
    </ToolbarBottomActionsWrapper>
  );
}
