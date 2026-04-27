import * as migration_20250216_223816 from './20250216_223816';
import * as migration_20250219_220827_add from './20250219_220827_add';
import * as migration_20250220_125333_add from './20250220_125333_add';
import * as migration_20260105_131622 from './20260105_131622';
import * as migration_20260314_152530 from './20260314_152530';
import * as migration_20260314_161654 from './20260314_161654';
import * as migration_20260323_000315 from './20260323_000315';
import * as migration_20260404_182150 from './20260404_182150';
import * as migration_20260404_184843 from './20260404_184843';
import * as migration_20260404_223234 from './20260404_223234';
import * as migration_20260412_123012 from './20260412_123012';
import * as migration_20260417_120000 from './20260417_120000';
import * as migration_20260419_100000 from './20260419_100000';
import * as migration_20260427_103803 from './20260427_103803';

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
    name: '20260314_161654',
  },
  {
    up: migration_20260323_000315.up,
    down: migration_20260323_000315.down,
    name: '20260323_000315',
  },
  {
    up: migration_20260404_182150.up,
    down: migration_20260404_182150.down,
    name: '20260404_182150',
  },
  {
    up: migration_20260404_184843.up,
    down: migration_20260404_184843.down,
    name: '20260404_184843',
  },
  {
    up: migration_20260404_223234.up,
    down: migration_20260404_223234.down,
    name: '20260404_223234',
  },
  {
    up: migration_20260412_123012.up,
    down: migration_20260412_123012.down,
    name: '20260412_123012',
  },
  {
    up: migration_20260417_120000.up,
    down: migration_20260417_120000.down,
    name: '20260417_120000',
  },
  {
    up: migration_20260419_100000.up,
    down: migration_20260419_100000.down,
    name: '20260419_100000',
  },
  {
    up: migration_20260427_103803.up,
    down: migration_20260427_103803.down,
    name: '20260427_103803'
  },
];
