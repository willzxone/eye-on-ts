 
import MobileObjectsToolbar from '@/common/components/annotations/MobileObjectsToolbar';
import MobileEffectsToolbar from '@/common/components/effects/MobileEffectsToolbar';
import MoreOptionsToolbar from '@/common/components/options/MoreOptionsToolbar';

type Props = {
  tabIndex: number;
  onTabChange: (newIndex: number) => void;
};

export default function MobileToolbar({tabIndex, onTabChange}: Props) {
  const tabs = [
    <MobileObjectsToolbar key="objects" onTabChange={onTabChange} />,
    <MobileEffectsToolbar key="effects" onTabChange={onTabChange} />,
    <MoreOptionsToolbar key="more-options" onTabChange={onTabChange} />,
  ];

  return (
    <div className="relative flex flex-col bg-black">{tabs[tabIndex]}</div>
  );
}
