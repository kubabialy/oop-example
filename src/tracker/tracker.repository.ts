import {Injectable} from '@nestjs/common';
import { Tracker } from './tracker.interface';

@Injectable()
export interface TrackerRepository {
  store(tracker: Tracker): void;
  findOne(id: string): Tracker | null;
}
