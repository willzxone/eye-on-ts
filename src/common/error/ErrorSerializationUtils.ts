 
import CreateFilmstripError from '@/graphql/errors/CreateFilmstripError';
import DrawFrameError from '@/graphql/errors/DrawFrameError';
import WebGLContextError from '@/graphql/errors/WebGLContextError';
import {errorConstructors} from 'serialize-error';

export function registerSerializableConstructors() {
  // @ts-expect-error Wrong `errorConstructors` types
  errorConstructors.set('DrawFrameError', DrawFrameError);
  // @ts-expect-error Wrong `errorConstructors` types
  errorConstructors.set('CreateFilmstripError', CreateFilmstripError);
  // @ts-expect-error Wrong `errorConstructors` types
  errorConstructors.set('WebGLContextError', WebGLContextError);
}
