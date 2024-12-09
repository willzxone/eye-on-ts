 
import {Tracklet} from '@/common/tracker/Tracker';
import {CanvasForm} from 'pts';
import {AbstractEffect, EffectFrameContext} from './Effect';

export default class DesaturateEffect extends AbstractEffect {
  constructor() {
    super(3);
  }

  apply(form: CanvasForm, context: EffectFrameContext, _tracklets: Tracklet[]) {
    form.ctx.save();
    form.ctx.filter = ['contrast(100%)', 'contrast(150%)', 'contrast(50%)'][
      this.variant % 3
    ];
    form.image([0, 0], context.frame);
    form.ctx.globalCompositeOperation = 'hue';
    form.fillOnly('#fff').rect([
      [0, 0],
      [context.width, context.height],
    ]);
    form.ctx.restore();
  }
}
