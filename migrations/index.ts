import * as migration_20250216_223816 from './20250216_223816';

export const migrations = [
  {
    up: migration_20250216_223816.up,
    down: migration_20250216_223816.down,
    name: '20250216_223816'
  },
];
