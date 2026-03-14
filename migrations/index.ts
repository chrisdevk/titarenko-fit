import * as migration_20250216_223816 from './20250216_223816';
import * as migration_20250219_220827_add from './20250219_220827_add';
import * as migration_20250220_125333_add from './20250220_125333_add';
import * as migration_20260105_131622 from './20260105_131622';
import * as migration_20260314_152530 from './20260314_152530';
import * as migration_20260314_161654 from './20260314_161654';

export const migrations = [
  {
    up: migration_20250216_223816.up,
    down: migration_20250216_223816.down,
    name: '20250216_223816',
  },
  {
    up: migration_20250219_220827_add.up,
    down: migration_20250219_220827_add.down,
    name: '20250219_220827_add',
  },
  {
    up: migration_20250220_125333_add.up,
    down: migration_20250220_125333_add.down,
    name: '20250220_125333_add',
  },
  {
    up: migration_20260105_131622.up,
    down: migration_20260105_131622.down,
    name: '20260105_131622',
  },
  {
    up: migration_20260314_152530.up,
    down: migration_20260314_152530.down,
    name: '20260314_152530',
  },
  {
    up: migration_20260314_161654.up,
    down: migration_20260314_161654.down,
    name: '20260314_161654'
  },
];
