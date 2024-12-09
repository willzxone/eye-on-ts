 
import useVideo from '@/common/components/video/editor/useVideo';
import {
  activeBackgroundEffectAtom,
  activeHighlightEffectAtom,
} from '@/demo/atoms';
import {useSetAtom} from 'jotai';
import {useCallback, useEffect} from 'react';
import {EffectUpdateEvent} from '../VideoWorkerBridge';
import {EffectOptions} from '../effects/Effect';
import Effects, {EffectIndex, Effects as EffectsType} from '../effects/Effects';

export default function useVideoEffect() {
  const video = useVideo();
  const setBackgroundEffect = useSetAtom(activeBackgroundEffectAtom);
  const setHighlightEffect = useSetAtom(activeHighlightEffectAtom);

  // The useEffect will listen to any effect updates from the worker. The
  // worker is the source of truth, which effect and effect variant is
  // currently applied. The main thread will be notified whenever an effect
  // or effect variant changes.
  useEffect(() => {
    function onEffectUpdate(event: EffectUpdateEvent) {
      if (event.index === EffectIndex.BACKGROUND) {
        setBackgroundEffect(event);
      } else {
        setHighlightEffect(event);
      }
    }
    video?.addEventListener('effectUpdate', onEffectUpdate);
    return () => {
      video?.removeEventListener('effectUpdate', onEffectUpdate);
    };
  }, [video, setBackgroundEffect, setHighlightEffect]);

  return useCallback(
    (name: keyof EffectsType, index: EffectIndex, options?: EffectOptions) => {
      video?.setEffect(name, index, options);
      const effect = Effects[name];
      const effectVariant = options?.variant ?? 0;

      if (index === EffectIndex.BACKGROUND) {
        setBackgroundEffect({
          name,
          variant: effectVariant,
          numVariants: effect.numVariants,
        });
      } else {
        setHighlightEffect({
          name,
          variant: options?.variant ?? 0,
          numVariants: effect.numVariants,
        });
      }
    },
    [video, setBackgroundEffect, setHighlightEffect],
  );
}
