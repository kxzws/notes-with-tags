import Dexie, { Table } from 'dexie';

import { Note } from './utils/types';

export class SubDexie extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super('kxzws-notes-db');
    this.version(1).stores({ notes: 'id, text, tags' });
  }
}

export const db = new SubDexie();
