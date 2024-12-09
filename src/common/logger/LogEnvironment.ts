 
import {LogLevel} from '@/common/logger/Logger';

// Only enable debug logging in modes that are set in MODES_WITH_LOGGER. The
// default is always error only.
export const LOG_LEVEL: LogLevel =
  import.meta.env.MODE === 'production' ? 'debug' : 'error';
