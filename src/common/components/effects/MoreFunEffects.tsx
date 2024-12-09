 
import {moreEffects} from '@/common/components/effects/EffectsUtils';
import EffectVariantBadge from '@/common/components/effects/EffectVariantBadge';
import ToolbarActionIcon from '@/common/components/toolbar/ToolbarActionIcon';
import ToolbarSection from '@/common/components/toolbar/ToolbarSection';
import useVideoEffect from '@/common/components/video/editor/useVideoEffect';
import {EffectIndex} from '@/common/components/video/effects/Effects';
import {activeHighlightEffectAtom} from '@/demo/atoms';
import {useAtomValue} from 'jotai';

export default function MoreFunEffects() {
  const setEffect = useVideoEffect();
  const activeEffect = useAtomValue(activeHighlightEffectAtom);

  return (
    <ToolbarSection title="Selected Objects" borderBottom={true}>
      {moreEffects.map(effect => {
        return (
          <ToolbarActionIcon
            variant="toggle"
            key={effect.title}
            icon={effect.Icon}
            title={effect.title}
            isActive={activeEffect.name === effect.effectName}
            badge={
              activeEffect.name === effect.effectName && (
                <EffectVariantBadge
                  label={`${activeEffect.variant + 1}/${activeEffect.numVariants}`}
                />
              )
            }
            onClick={() => {
              setEffect(effect.effectName, EffectIndex.HIGHLIGHT);
            }}
          />
        );
      })}
    </ToolbarSection>
  );
}
