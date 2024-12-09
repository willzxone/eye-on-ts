 
import {useAtomValue} from 'jotai';
import {videoAtom} from './atoms';

export default function useVideo() {
  return useAtomValue(videoAtom);
}
