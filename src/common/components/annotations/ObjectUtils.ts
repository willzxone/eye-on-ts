 
import {BaseTracklet} from '@/common/tracker/Tracker';

export function getObjectLabel(tracklet: BaseTracklet) {
  return `Object ${tracklet.id + 1}`;
}
