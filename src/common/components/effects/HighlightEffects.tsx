 
import EffectVariantBadge from '@/common/components/effects/EffectVariantBadge';
import ToolbarActionIcon from '@/common/components/toolbar/ToolbarActionIcon';
import ToolbarSection from '@/common/components/toolbar/ToolbarSection';
import useVideoEffect from '@/common/components/video/editor/useVideoEffect';
import {EffectIndex} from '@/common/components/video/effects/Effects';
import {
  activeHighlightEffectAtom,
  activeHighlightEffectGroupAtom,
} from '@/demo/atoms';
import {useAtomValue} from 'jotai';

export default function HighlightEffects() {
  const setEffect = useVideoEffect();
  const activeEffect = useAtomValue(activeHighlightEffectAtom);
  const activeEffectsGroup = useAtomValue(activeHighlightEffectGroupAtom);

  return (
    <ToolbarSection title="Selected Objects" borderBottom={true}>
      {activeEffectsGroup.map(highlightEffect => {
        return (
          <ToolbarActionIcon
            variant="toggle"
            key={highlightEffect.title}
            icon={highlightEffect.Icon}
            title={highlightEffect.title}
            isActive={activeEffect.name === highlightEffect.effectName}
            badge={
              activeEffect.name === highlightEffect.effectName && (
                <EffectVariantBadge
                  label={`${activeEffect.variant + 1}/${activeEffect.numVariants}`}
                />
              )
            }
            onClick={() => {
              if (activeEffect.name === highlightEffect.effectName) {
                setEffect(highlightEffect.effectName, EffectIndex.HIGHLIGHT, {
                  variant:
                    (activeEffect.variant + 1) % activeEffect.numVariants,
                });
              } else {
                setEffect(highlightEffect.effectName, EffectIndex.HIGHLIGHT);
              }
            }}
          />
        );
      })}
    </ToolbarSection>
  );
}
