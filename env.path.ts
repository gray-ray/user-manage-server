import * as fs from 'fs';
import * as path from 'path';

// @nestjs/config
const isProd = process.env.NODE_ENV === 'production';

function parseEnv() {
  const localEnv = path.resolve('.env');
  const prodEnv = path.resolve('.env.prod');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少必要的环境配置文件');
  }
  const filePath = isProd ? prodEnv : localEnv;
  return filePath;
}

export default parseEnv();
