import { socketConnector, restConnector, wasmConnector } from '@uwdata/mosaic-core';
import { createAPIContext } from '@uwdata/vgplot';

export { parseSpec, astToDOM, astToESM } from '@uwdata/mosaic-spec';
export const vg = createAPIContext();

// make API accesible for console debugging
self.vg = vg;

export const { coordinator, namedPlots } = vg.context;

export function clear() {
  coordinator.clear();
  namedPlots.clear();
}

let wasm;

export async function setDatabaseConnector(type, options) {
  let connector;
  switch (type) {
    case 'socket':
      connector = socketConnector('ws://3.26.104.147:3000//');
      break;
    case 'rest':
      connector = restConnector(options);
      break;
    case 'wasm':
      connector = wasm || (wasm = wasmConnector(options));
      break;
    default:
      throw new Error(`Unrecognized connector type: ${type}`);
  }
  console.log('Database Connector', type);
  coordinator.databaseConnector(connector);
}
