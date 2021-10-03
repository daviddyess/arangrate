import { join } from 'path';
import program from 'commander';
import packageInfo from '../package.json';
import { getLogger } from 'logade';
import { Arangrate } from 'arangrate';
const log = getLogger('migrate');

const arangrate = new Arangrate({
  path: join(
    __dirname,
    process.env.DEV_DATA ? 'migrations/dev' : 'migrations/prod'
  ),
  table: 'migrations'
});

program
  .version(packageInfo.version)
  .arguments('[target]')
  .action(async (target) => {
    try {
      log.info(
        `Performing target ${
          process.env.DEV_DATA ? 'DEVELOPMENT' : 'PRODUCTION'
        } migration!`
      );
      await arangrate.migrate(target ? target : 'max');
      log.info(
        `Migration target for ${
          process.env.DEV_DATA ? 'DEVELOPMENT' : 'PRODUCTION'
        } completed!`
      );
    } catch (error) {
      const {
        stack,
        code = 'unknown',
        detail,
        position,
        schema,
        table,
        column
      } = error;

      let message = `Code ${code} `;

      if (schema && table) {
        message += `on ${schema}.${table} `;

        if (column) {
          message += `.${column}`;
        }
      } else {
        message += `at offset ${position} `;
      }

      if (detail) {
        message += `- ${detail}`;
      }

      log.error(`Message: ${message}`);
      log.error(`Error: ${stack}`);
    }
  });

export default function migrate() {
  program.parse(process.argv);
}
