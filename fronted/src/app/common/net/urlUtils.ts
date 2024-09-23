import { environment } from '@env/environment';


/**
 * 拼接相对地址为完整的 URL
 * @param relativeUrl 相对地址
 * @returns 完整的 URL
 */
export function getFullUrl(relativeUrl: string): string {
  // 如果是生产环境，使用当前浏览器地址和端口
  if (environment.production) {
    const currentUrl = window.location.origin;
    return new URL(relativeUrl, currentUrl).href;
  }

  // 如果是开发环境，使用环境配置中的 backEndUrl
  return new URL(relativeUrl, environment.backEndUrl).href;
}


/**
 * 处理请求的URL，确保其格式正确
 * @param reqUrl 请求的相对地址
 * @returns 完整的URL
 */
export function processUrl(reqUrl: string): string {
  // 处理静态资源请求
  if (reqUrl.startsWith('assets')) {
    return `./${reqUrl.startsWith('/') ? reqUrl.substring(1) : reqUrl}`;
  }

  // 处理非绝对URL
  if (!reqUrl.startsWith('https://') && !reqUrl.startsWith('http://')) {
    return getFullUrl(reqUrl);
  }

  return reqUrl;
}
