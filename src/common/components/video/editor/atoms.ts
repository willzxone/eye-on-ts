 
import {atom} from 'jotai';
import {VideoRef} from '../Video';

export const videoAtom = atom<VideoRef | null>(null);
