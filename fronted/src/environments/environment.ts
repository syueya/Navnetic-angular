// 开发环境配置文件
import { Environment } from '../app/common/interfaces/Environment';
import { version } from 'version';

export const environment = {
  production: false,
  backEndUrl: 'http://localhost:22680',
  version: version
} as Environment;
