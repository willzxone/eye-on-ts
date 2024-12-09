 
import {Tracklet} from '@/common/tracker/Tracker';
import {CanvasForm} from 'pts';
import {AbstractEffect, EffectFrameContext} from './Effect';
import {EffectLayer} from './EffectUtils';

export default class EraseForegroundEffect extends AbstractEffect {
  constructor() {
    super(3);
  }

  apply(
    form: CanvasForm,
    context: EffectFrameContext,
    _tracklets: Tracklet[],
  ): void {
    const effect = new EffectLayer(context);
    const fillColor = ['#fff', '#000', '#0f0'][this.variant % 3];
    for (const mask of context.masks) {
      effect.image(mask.bitmap as ImageBitmap);
      effect.composite('source-in');
      effect.fill(fillColor);
    }
    form.image([0, 0], effect.canvas);
  }
}
