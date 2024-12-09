 
import {
  DecodeEvent,
  EffectUpdateEvent,
  EncodingCompletedEvent,
  EncodingStateUpdateEvent,
  FilmstripEvent,
  FrameUpdateEvent,
  LoadStartEvent,
  RenderingErrorEvent,
} from './VideoWorkerBridge';
import {EffectOptions} from './effects/Effect';
import type {Effects} from './effects/Effects';

export type Request<A, P> = {
  action: A;
} & P;

// REQUESTS

export type SetCanvasRequest = Request<
  'setCanvas',
  {
    canvas: OffscreenCanvas;
  }
>;
export type SetSourceRequest = Request<
  'setSource',
  {
    source: string;
  }
>;
export type PlayRequest = Request<'play', unknown>;
export type PauseRequest = Request<'pause', unknown>;
export type StopRequest = Request<'stop', unknown>;
export type FrameUpdateRequest = Request<
  'frameUpdate',
  {
    index: number;
  }
>;
export type FilmstripRequest = Request<
  'filmstrip',
  {
    width: number;
    height: number;
  }
>;
export type SetEffectRequest = Request<
  'setEffect',
  {
    name: keyof Effects;
    index: number;
    options?: EffectOptions;
  }
>;

export type EncodeVideoRequest = Request<'encode', unknown>;

export type EnableStatsRequest = Request<'enableStats', unknown>;

export type VideoWorkerRequest =
  | SetCanvasRequest
  | SetSourceRequest
  | PlayRequest
  | PauseRequest
  | StopRequest
  | FrameUpdateRequest
  | FilmstripRequest
  | SetEffectRequest
  | EncodeVideoRequest
  | EnableStatsRequest;

export type VideoWorkerRequestMessageEvent = MessageEvent<VideoWorkerRequest>;

// RESPONSES

export type ErrorResponse = Request<
  'error',
  {
    error: unknown;
  }
>;

export type DecodeResponse = Request<'decode', DecodeEvent>;

export type EncodingStateUpdateResponse = Request<
  'encodingStateUpdate',
  EncodingStateUpdateEvent
>;

export type EncodingCompletedResponse = Request<
  'encodingCompleted',
  EncodingCompletedEvent
>;

export type FilmstripResponse = Request<'filmstrip', FilmstripEvent>;

export type PlayResponse = Request<'play', unknown>;

export type PauseResponse = Request<'pause', unknown>;

export type FrameUpdateResponse = Request<'frameUpdate', FrameUpdateEvent>;

export type RenderingErrorResponse = Request<
  'renderingError',
  RenderingErrorEvent
>;

// HTMLVideoElement events https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#events

export type LoadStartResponse = Request<'loadstart', LoadStartEvent>;

export type EffectUpdateResponse = Request<'effectUpdate', EffectUpdateEvent>;

export type VideoWorkerResponse =
  | ErrorResponse
  | FilmstripResponse
  | DecodeResponse
  | EncodingStateUpdateResponse
  | EncodingCompletedResponse
  | PlayResponse
  | PauseResponse
  | FrameUpdateResponse
  | LoadStartResponse
  | RenderingErrorResponse
  | EffectUpdateResponse;

export type VideoWorkerResponseMessageEvent = MessageEvent<VideoWorkerResponse>;
