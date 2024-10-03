// 生产环境配置文件
import { Environment } from '../app/common/interfaces/Environment';
import { version } from 'version';

export const environment = {
  production: true,
  backEndUrl: '',
  version: version
} as Environment;
