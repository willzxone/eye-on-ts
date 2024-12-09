 
import BackgroundEffects from '@/common/components/effects/BackgroundEffects';
import EffectsToolbarBottomActions from '@/common/components/effects/EffectsToolbarBottomActions';
import EffectsToolbarHeader from '@/common/components/effects/EffectsToolbarHeader';
import HighlightEffects from '@/common/components/effects/HighlightEffects';
import useMessagesSnackbar from '@/common/components/snackbar/useDemoMessagesSnackbar';
import {useEffect, useRef} from 'react';

type Props = {
  onTabChange: (newIndex: number) => void;
};

export default function EffectsToolbar({onTabChange}: Props) {
  const isEffectsMessageShown = useRef(false);
  const {enqueueMessage} = useMessagesSnackbar();

  useEffect(() => {
    if (!isEffectsMessageShown.current) {
      isEffectsMessageShown.current = true;
      enqueueMessage('effectsMessage');
    }
  }, [enqueueMessage]);

  return (
    <div className="flex flex-col h-full">
      <EffectsToolbarHeader />
      <div className="grow overflow-y-auto">
        <HighlightEffects />
        <BackgroundEffects />
      </div>
      <EffectsToolbarBottomActions onTabChange={onTabChange} />
    </div>
  );
}
