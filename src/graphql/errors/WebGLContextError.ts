 
export default class WebGLContextError extends Error {
  override name = 'WebGLContextError';
  constructor(message?: string) {
    super(message);
  }
}
