 
import ToolbarHeaderWrapper from '@/common/components/toolbar/ToolbarHeaderWrapper';
import useVideoEffect from '@/common/components/video/editor/useVideoEffect';
import {
  EffectIndex,
  effectPresets,
} from '@/common/components/video/effects/Effects';
import {BLUE_PINK_FILL} from '@/theme/gradientStyle';
import {MagicWandFilled} from '@carbon/icons-react';
import {useCallback, useRef} from 'react';
import {Button} from 'react-daisyui';

export default function EffectsToolbarHeader() {
  const preset = useRef(0);
  const setEffect = useVideoEffect();

  const handleTogglePreset = useCallback(() => {
    preset.current++;
    const [background, highlight] =
      effectPresets[preset.current % effectPresets.length];
    setEffect(background.name, EffectIndex.BACKGROUND, {
      variant: background.variant,
    });
    setEffect(highlight.name, EffectIndex.HIGHLIGHT, {
      variant: highlight.variant,
    });
  }, [setEffect]);

  return (
    <ToolbarHeaderWrapper
      title="Add effects"
      description="Apply visual effects to your selected objects and the background. Keeping clicking the same effect for different variations."
      bottomSection={
        <div className="flex mt-1">
          <Button
            color="ghost"
            size="md"
            className={`font-medium bg-black !rounded-full hover:!bg-gradient-to-br ${BLUE_PINK_FILL} border-none`}
            endIcon={<MagicWandFilled size={20} className="text-white " />}
            onClick={handleTogglePreset}>
            Surprise Me
          </Button>
        </div>
      }
      className="pb-4"
    />
  );
}
