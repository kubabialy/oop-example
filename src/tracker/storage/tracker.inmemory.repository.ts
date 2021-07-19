import { createHash } from 'crypto';
import { Tracker } from '../tracker.interface';
import { TrackerRepository } from '../tracker.repository';

export class TrackerInMemoryRepository implements TrackerRepository {
  private readonly trackers = {};
  findOne(id: string): Tracker | null {
    return this.trackers[id] ?? null;
  }

  store(tracker: Tracker): void {
    const hash = createHash('sha256');

    tracker.id = hash.read() as string;

    this.trackers[tracker.id] = tracker;
  }
}
