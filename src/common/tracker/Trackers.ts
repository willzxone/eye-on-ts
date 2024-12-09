 
import {SAM2Model} from './SAM2Model';

export type Headers = {[name: string]: string};

export type TrackerOptions = {
  inferenceEndpoint: string;
};

export type Trackers = {
  'SAM 2': typeof SAM2Model;
};

export const TRACKER_MAPPING: Trackers = {
  'SAM 2': SAM2Model,
};
