/// 此文件为解决ts-node/esm和tsconfig-paths无法同时使用的问题
/// https://github.com/TypeStrong/ts-node/discussions/1450#discussioncomment-1749469

import { resolve as resolveTs } from 'ts-node/esm';
import * as tsConfigPaths from 'tsconfig-paths';
import { pathToFileURL } from 'url';

const { absoluteBaseUrl, paths } = tsConfigPaths.loadConfig();
const matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);

export function resolve(specifier, ctx, defaultResolve) {
  const match = matchPath(specifier);
  return match ? resolveTs(pathToFileURL(`${match}`).href, ctx, defaultResolve) : resolveTs(specifier, ctx, defaultResolve);
}

export { load, getFormat, transformSource } from 'ts-node/esm';
