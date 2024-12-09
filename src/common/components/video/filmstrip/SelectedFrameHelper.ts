 
export default class SelectedFrameHelper {
  private frames = 0;
  private frameToWidthRatio = 1;
  private selectedIndex = 0;
  private scanning = false;

  constructor(totalFrames: number, totalWidth: number, index?: number) {
    this.reset(totalFrames, totalWidth, index);
  }

  reset(totalFrames: number, totalWidth: number, index?: number) {
    this.frames = totalFrames;
    this.frameToWidthRatio = totalWidth / this.frames;
    if (index != null) {
      this.select(index);
    }
  }

  select(index: number) {
    this.selectedIndex = index >= this.frames ? this.frames - index : index;
  }

  toPosition(index: number) {
    return index * this.frameToWidthRatio;
  }

  toIndex(position: number) {
    return Math.floor(position / this.frameToWidthRatio);
  }

  get index(): number {
    return this.selectedIndex;
  }

  get position(): number {
    return this.selectedIndex * this.frameToWidthRatio;
  }

  scan(state: boolean) {
    this.scanning = state;
  }

  get isScanning(): boolean {
    return this.scanning;
  }
}
