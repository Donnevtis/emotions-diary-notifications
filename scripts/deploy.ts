import { MiBtoByte } from './utils';
import environment from './environment';
import { deploy } from './function-service';
import { FunctionConfig } from './types';

const { FUNCTION_ID, DB_URL, BOT_TOKEN, JWT_KEY, WEB_APP_URL } = environment;

const partial: FunctionConfig = {
  functionId: FUNCTION_ID,
  runtime: 'nodejs16',
  entrypoint: 'index.handler',
  resources: {
    memory: MiBtoByte(128),
  },
  executionTimeout: { seconds: 10 },
  environment: {
    DB_URL,
    BOT_TOKEN,
    JWT_KEY,
    WEB_APP_URL,
  },
};

deploy(partial, 'dist/');
