 
type EventMap<WorkerEventMap> = {
  type: keyof WorkerEventMap;
  listener: (ev: WorkerEventMap[keyof WorkerEventMap]) => unknown;
};

export class EventEmitter<WorkerEventMap> {
  listeners: EventMap<WorkerEventMap>[] = [];

  trigger<K extends keyof WorkerEventMap>(type: K, ev: WorkerEventMap[K]) {
    this.listeners
      .filter(listener => type === listener.type)
      .forEach(({listener}) => {
        setTimeout(() => listener(ev), 0);
      });
  }

  addEventListener<K extends keyof WorkerEventMap>(
    type: K,
    listener: (ev: WorkerEventMap[K]) => unknown,
  ): void {
    // @ts-expect-error Incorrect typing. Not sure how to correctly type it
    this.listeners.push({type, listener});
  }

  removeEventListener<K extends keyof WorkerEventMap>(
    type: K,
    listener: (ev: WorkerEventMap[K]) => unknown,
  ): void {
    this.listeners = this.listeners.filter(
      existingListener =>
        !(
          existingListener.type === type &&
          existingListener.listener === listener
        ),
    );
  }

  destroy() {
    this.listeners.length = 0;
  }
}
