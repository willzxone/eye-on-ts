 
import {backgroundEffects} from '@/common/components/effects/EffectsUtils';
import EffectVariantBadge from '@/common/components/effects/EffectVariantBadge';
import ToolbarActionIcon from '@/common/components/toolbar/ToolbarActionIcon';
import ToolbarSection from '@/common/components/toolbar/ToolbarSection';
import useVideoEffect from '@/common/components/video/editor/useVideoEffect';
import {EffectIndex} from '@/common/components/video/effects/Effects';
import {activeBackgroundEffectAtom} from '@/demo/atoms';
import {useAtomValue} from 'jotai';

export default function BackgroundEffects() {
  const setEffect = useVideoEffect();
  const activeEffect = useAtomValue(activeBackgroundEffectAtom);

  return (
    <ToolbarSection title="Background" borderBottom={false}>
      {backgroundEffects.map(backgroundEffect => {
        return (
          <ToolbarActionIcon
            variant="toggle"
            key={backgroundEffect.title}
            icon={backgroundEffect.Icon}
            title={backgroundEffect.title}
            isActive={activeEffect.name === backgroundEffect.effectName}
            badge={
              activeEffect.name === backgroundEffect.effectName && (
                <EffectVariantBadge
                  label={`${activeEffect.variant + 1}/${activeEffect.numVariants}`}
                />
              )
            }
            onClick={() => {
              if (activeEffect.name === backgroundEffect.effectName) {
                setEffect(backgroundEffect.effectName, EffectIndex.BACKGROUND, {
                  variant:
                    (activeEffect.variant + 1) % activeEffect.numVariants,
                });
              } else {
                setEffect(backgroundEffect.effectName, EffectIndex.BACKGROUND);
              }
            }}
          />
        );
      })}
    </ToolbarSection>
  );
}
