 
import RestartSessionButton from '@/common/components/session/RestartSessionButton';
import {
  EFFECT_TOOLBAR_INDEX,
  OBJECT_TOOLBAR_INDEX,
} from '@/common/components/toolbar/ToolbarConfig';
import {ChevronLeft} from '@carbon/icons-react';
import {Button} from 'react-daisyui';
import ToolbarBottomActionsWrapper from '../toolbar/ToolbarBottomActionsWrapper';

type Props = {
  onTabChange: (newIndex: number) => void;
};

export default function MoreOptionsToolbarBottomActions({onTabChange}: Props) {
  function handleReturnToEffectsTab() {
    onTabChange(EFFECT_TOOLBAR_INDEX);
  }

  return (
    <ToolbarBottomActionsWrapper>
      <Button
        color="ghost"
        onClick={handleReturnToEffectsTab}
        className="!px-4 !rounded-full font-medium text-white hover:bg-black"
        startIcon={<ChevronLeft />}>
        Edit effects
      </Button>
      <RestartSessionButton
        onRestartSession={() => onTabChange(OBJECT_TOOLBAR_INDEX)}
      />
    </ToolbarBottomActionsWrapper>
  );
}