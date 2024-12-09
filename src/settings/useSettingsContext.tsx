 
import {useContext} from 'react';
import {SettingsContext} from '@/settings/SettingsContextProvider';

export default function useSettingsContext() {
  return useContext(SettingsContext);
}
