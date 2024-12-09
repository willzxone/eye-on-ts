 
import {Effects} from '@/common/components/video/effects/Effects';
import {Tracklet} from '@/common/tracker/Tracker';
import {RLEObject} from '@/jscocotools/mask';
import {CanvasForm} from 'pts';

export type EffectLayers = {
  background: keyof Effects;
  highlight: keyof Effects;
};

export type EffectOptions = {
  variant: number;
};

export type EffectInit = {
  width: number;
  height: number;
  gl?: WebGL2RenderingContext;
  canvas?: OffscreenCanvas;
};

export type EffectMask = {
  bitmap: ImageBitmap | RLEObject;
  bounds: [[number, number], [number, number]];
};

export type EffectActionPoint = {
  objectId: number;
  position: [number, number];
};

export type EffectFrameContext = {
  frameIndex: number;
  totalFrames: number;
  fps: number;
  width: number;
  height: number;
  masks: EffectMask[];
  maskColors: string[];
  frame: ImageBitmap;
  timeParameter?: number;
  actionPoint: EffectActionPoint | null;
};

export interface Effect {
  variant: number;
  numVariants: number;
  nextVariant(): void;
  setup(init: EffectInit): Promise<void>;
  update(options: EffectOptions): Promise<void>;
  cleanup(): Promise<void>;
  apply(
    form: CanvasForm,
    context: EffectFrameContext,
    tracklets: Tracklet[],
  ): void;
}

export abstract class AbstractEffect implements Effect {
  public numVariants: number;
  public variant: number;

  constructor(numVariants: number) {
    this.numVariants = numVariants;
    this.variant = 0;
  }

  nextVariant() {
    // Cycle through variants
    this.variant = (this.variant + 1) % this.numVariants;
  }

  async setup(_init: EffectInit): Promise<void> {
    // noop
  }

  async update(options: EffectOptions): Promise<void> {
    this.variant = options.variant;
  }

  async cleanup(): Promise<void> {
    // noop
  }

  abstract apply(
    form: CanvasForm,
    context: EffectFrameContext,
    tracklets: Tracklet[],
  ): void;
}
