 
import {Tracklet} from '@/common/tracker/Tracker';
import {CanvasForm} from 'pts';
import {AbstractEffect, EffectFrameContext} from './Effect';

export default class OriginalEffect extends AbstractEffect {
  constructor() {
    super(3);
  }

  apply(
    form: CanvasForm,
    context: EffectFrameContext,
    _tracklets: Tracklet[],
  ): void {
    form.ctx.save();
    if (this.variant % 3 === 1) {
      form.ctx.filter = 'saturate(120%) contrast(120%)';
    } else if (this.variant % 3 === 2) {
      form.ctx.filter = 'brightness(70%) contrast(115%)';
    }

    form.image([0, 0], context.frame);
    form.ctx.restore();

    if (this.variant % 3 === 2) {
      form.fillOnly('#00000066').rect([
        [0, 0],
        [context.width, context.height],
      ]);
    }
  }
}
