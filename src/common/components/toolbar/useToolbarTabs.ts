 
import {toolbarTabIndex} from '@/demo/atoms';
import {useAtom} from 'jotai';

type State = [tabIndex: number, setTabIndex: (tabIndex: number) => void];

export default function useToolbarTabs(): State {
  return useAtom(toolbarTabIndex);
}
