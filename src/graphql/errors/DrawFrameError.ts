 
export default class DrawFrameError extends Error {
  override name = 'DrawFrameError';
  constructor(message?: string) {
    super(message);
  }
}
