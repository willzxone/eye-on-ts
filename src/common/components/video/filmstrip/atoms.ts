 
import {atom} from 'jotai';
import SelectedFrameHelper from './SelectedFrameHelper';

export const selectedFrameHelperAtom = atom<SelectedFrameHelper | null>(null);
