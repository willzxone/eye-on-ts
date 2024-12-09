 
export default class CreateFilmstripError extends Error {
  override name = 'CreateFilmstripError';
  constructor(message?: string) {
    super(message);
  }
}
