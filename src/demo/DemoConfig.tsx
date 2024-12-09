 
import {Effects} from '@/common/components/video/effects/Effects';

type EffectLayers = {
  background: keyof Effects;
  highlight: keyof Effects;
};

export const DEMO_SHORT_NAME = 'EYE-ON';
export const RESEARCH_BY_META_AI = '';
export const DEMO_FRIENDLY_NAME = 'Eye On Everythiing';
export const VIDEO_WATERMARK_TEXT = `Modified with ${DEMO_FRIENDLY_NAME}`;
export const PROJECT_GITHUB_URL = 'https://github.com';
export const AIDEMOS_URL = '';
export const ABOUT_URL = '';
export const EMAIL_ADDRESS = 'f219075@cfd.nu.edu.pk';
export const BLOG_URL = '';

export const VIDEO_API_ENDPOINT = 'http://localhost:7263';
export const INFERENCE_API_ENDPOINT = 'http://localhost:7263';

export const demoObjectLimit = 3;

export const DEFAULT_EFFECT_LAYERS: EffectLayers = {
  background: 'Original',
  highlight: 'Overlay',
};

export const MAX_UPLOAD_FILE_SIZE = '70MB';
