// 开发环境配置文件
import { Environment } from '@common/interfaces/Environment';
import { version } from 'version';
import { navName } from 'navName';

export const environment = {
  production: false,
  backEndUrl: 'http://localhost:22680',
  version: version,
  navName: navName
} as Environment;
