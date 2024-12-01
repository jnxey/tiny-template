import { resolve } from 'path';
import os from 'os';

/**
 * 判断数据类型
 */
export const getType = (value: any): string => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
export const isNumber = (value: any): boolean => getType(value) === 'number';
export const isString = (value: any): boolean => getType(value) === 'string';
export const isArray = (value: any): boolean => getType(value) === 'array';
export const isObject = (value: any): boolean => getType(value) === 'object';
export const isBoolean = (value: any): boolean => getType(value) === 'boolean';
export const isFunction = (value: any): boolean => getType(value).toLowerCase().indexOf('function') > -1;
export const isNull = (value: any): boolean => getType(value) === 'null';
export const isUndefined = (value: any): boolean => getType(value) === 'undefined';
export const isPromise = (value: any): boolean => getType(value) === 'promise';
export const isNode = (value: any): boolean => !isNull(value) && !isUndefined(value) && Boolean(value.nodeName) && Boolean(value.nodeType);
export const isElement = (value: any): boolean => isNode(value) && value.nodeType === 1;
export const isEmpty = (value: any): boolean => value === undefined || value === '' || value === null;

/*
 * 获取静态文件目录
 */
export function getStoragePath(pathString?: string) {
  const rootDir = process.cwd();
  if (!!pathString) {
    return resolve(rootDir, 'storage', pathString);
  } else {
    return resolve(rootDir, 'storage');
  }
}

/**
 *  获取json
 */
export function getJSON(value?: string, def?: any) {
  if (!value) return def;
  try {
    return JSON.parse(value);
  } catch (e) {
    return def;
  }
}

/**
 *  打印报错
 */
export function printError(error: Error) {
  console.log('Error start-------------------');
  console.trace(error);
  console.log('Error end-------------------');
}

/**
 * async错误处理
 * @param promise 传进去的请求函数
 * @param errorExt - 拓展错误对象
 * @return Promise 返回一个Promise
 */
export function awaitTo<P1, P2>(promise, errorExt?: string): Promise<[P1 | null, P2 | null]> {
  return promise.then((data) => [data, null]).catch((err) => [null, err]);
}

/**
 * 获取本机 IPv4 地址
 * @returns {string[]} - 返回所有本地 IPv4 地址数组
 */
export function getLocalIPS(): string[] {
  const networkInterfaces = os.networkInterfaces();
  const ips: string[] = [];
  for (const interfaceName in networkInterfaces) {
    if (networkInterfaces.hasOwnProperty(interfaceName)) {
      const iface = networkInterfaces[interfaceName];
      iface?.forEach((info) => {
        if (info.family === 'IPv4' && !info.internal) {
          ips.push(info.address);
        }
      });
    }
  }

  return ips;
}
