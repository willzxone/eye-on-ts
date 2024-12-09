 
import {Tracklet} from '@/common/tracker/Tracker';
import {CanvasForm} from 'pts';
import {AbstractEffect, EffectFrameContext} from './Effect';

export default class EraseBackgroundEffect extends AbstractEffect {
  constructor() {
    super(3);
  }

  apply(
    form: CanvasForm,
    context: EffectFrameContext,
    _tracklets: Tracklet[],
  ): void {
    const fillColor = ['#000', '#fff', '#0f0'][this.variant % 3];
    form.fillOnly(fillColor).rect([
      [0, 0],
      [context.width, context.height],
    ]);
  }
}
