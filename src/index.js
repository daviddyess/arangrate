import 'dotenv/config';
export {
  aql,
  db,
  createCollection,
  createEdgeCollection,
  dropCollection
} from 'utils';
export { migrate as arangrate } from 'migrate';
