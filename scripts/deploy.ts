import { MiBtoByte } from './utils';
import environment from './environment';
import { deploy } from './function-service';
import { FunctionConfig } from './types';

const { FUNCTION_ID, LOCKBOX_ID, LOCKBOX_VERSION, SA_ID } = environment;

const partial: FunctionConfig = {
  functionId: FUNCTION_ID,
  runtime: 'nodejs16',
  entrypoint: 'index.handler',
  resources: {
    memory: MiBtoByte(128),
  },
  executionTimeout: { seconds: 10 },
  secrets: [
    {
      id: LOCKBOX_ID,
      versionId: LOCKBOX_VERSION,
      environmentVariable: 'AWS_ACCESS_KEY_ID',
      key: 'SA_KEY_ID',
    },
    {
      id: LOCKBOX_ID,
      versionId: LOCKBOX_VERSION,
      environmentVariable: 'AWS_SECRET_ACCESS_KEY',
      key: 'SA_KEY_SECRET',
    },
    {
      id: LOCKBOX_ID,
      versionId: LOCKBOX_VERSION,
      environmentVariable: 'BOT_TOKEN',
      key: 'BOT_TOKEN',
    },
    {
      id: LOCKBOX_ID,
      versionId: LOCKBOX_VERSION,
      environmentVariable: 'JWT_KEY',
      key: 'JWT_KEY',
    },
    {
      id: LOCKBOX_ID,
      versionId: LOCKBOX_VERSION,
      environmentVariable: 'WEB_APP_URL',
      key: 'WEB_APP_URL',
    },
    {
      id: LOCKBOX_ID,
      versionId: LOCKBOX_VERSION,
      environmentVariable: 'DB_ENDPOINT',
      key: 'DB_ENDPOINT',
    },
    {
      id: LOCKBOX_ID,
      versionId: LOCKBOX_VERSION,
      environmentVariable: 'REGION',
      key: 'REGION',
    },
  ],
  serviceAccountId: SA_ID,
};

deploy(partial, 'dist/');
