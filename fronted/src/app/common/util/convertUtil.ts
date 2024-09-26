/* eslint-disable @typescript-eslint/no-explicit-any */
import { coerceCssPixelValue } from '@angular/cdk/coercion';

/**
 * 将数字转换为 CSS 像素值字符串
 * @param value 要转换的数字
 * @returns CSS 像素值字符串
 */
export function toCssPixel(value: number | string): string {
  return coerceCssPixelValue(value);
}

/**
 * 将字符串转换为 Base64 编码
 * @param input 要编码的字符串
 * @returns Base64 编码后的字符串
 */
export function stringToBase64(input: string): string {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    // 在浏览器环境中
    return window.btoa(input);
  } else {
    throw new Error('Environment not supported.');
  }
}

/**
 * 将 Base64 编码转换为字符串
 * @param base64 要解码的 Base64 编码
 * @returns 解码后的字符串
 */
export function base64ToString(base64: string): string {
  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    // 在浏览器环境中
    return window.atob(base64);
  } else {
    throw new Error('Environment not supported.');
  }
}

/**
 * 将字节数转换为可读文件大小格式
 * @param size 要转换的字节数
 * @returns 可读格式的字符串
 */
export function formatBytes(size: number): string {
  // 检查输入是否为 null 或 undefined
  if (size === null || size === 0 || size === undefined) {
    return `0 B`;
  }

  // 检查输入是否为数字
  if (typeof size !== 'number' || isNaN(size)) {
    return `0 B`;
  }
  // 定义单位
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
  let unitIndex = 0;

  // 转换大小
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  // 保留两位小数并省略多余的0
  const formattedSize = size % 1 === 0 ? size.toString() : size.toFixed(2).replace(/\.?0+$/, '');

  return `${formattedSize} ${units[unitIndex]}`;
}


/**
 * 将数字枚举转换为数字数组
 * @param enumObj 
 * @returns 
 */
export function getEnumNumberValues(enumObj: any): number[] {
  return Object.values(enumObj).filter(value => typeof value === 'number') as number[];
}