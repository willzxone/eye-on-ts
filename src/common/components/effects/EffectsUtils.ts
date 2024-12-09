 
import {Effects} from '@/common/components/video/effects/Effects';
import type {CarbonIconType} from '@carbon/icons-react';
import {
  AppleDash,
  Asterisk,
  Barcode,
  CenterCircle,
  ColorPalette,
  ColorSwitch,
  Development,
  Erase,
  FaceWink,
  Humidity,
  Image,
  Overlay,
  TextFont,
} from '@carbon/icons-react';

export type DemoEffect = {
  title: string;
  Icon: CarbonIconType;
  effectName: keyof Effects;
};

export const backgroundEffects: DemoEffect[] = [
  {title: 'Original', Icon: Image, effectName: 'Original'},
  {title: 'Erase', Icon: Erase, effectName: 'EraseBackground'},
  {
    title: 'Gradient',
    Icon: ColorPalette,
    effectName: 'Gradient',
  },
  {
    title: 'Pixelate',
    Icon: Development,
    effectName: 'Pixelate',
  },
  {title: 'Desaturate', Icon: ColorSwitch, effectName: 'Desaturate'},
  {title: 'Text', Icon: TextFont, effectName: 'BackgroundText'},
  {title: 'Blur', Icon: Humidity, effectName: 'BackgroundBlur'},
  {title: 'Outline', Icon: AppleDash, effectName: 'Sobel'},
];

export const highlightEffects: DemoEffect[] = [
  {title: 'Original', Icon: Image, effectName: 'Cutout'},
  {title: 'Erase', Icon: Erase, effectName: 'EraseForeground'},
  {title: 'Gradient', Icon: ColorPalette, effectName: 'VibrantMask'},
  {title: 'Pixelate', Icon: Development, effectName: 'PixelateMask'},
  {
    title: 'Overlay',
    Icon: Overlay,
    effectName: 'Overlay',
  },
  {title: 'Emoji', Icon: FaceWink, effectName: 'Replace'},
  {title: 'Burst', Icon: Asterisk, effectName: 'Burst'},
  {title: 'Spotlight', Icon: CenterCircle, effectName: 'Scope'},
];

export const moreEffects: DemoEffect[] = [
  {title: 'Noisy', Icon: Barcode, effectName: 'NoisyMask'},
];