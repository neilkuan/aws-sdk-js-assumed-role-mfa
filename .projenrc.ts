import { typescript } from 'projen';
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: 'main',
  name: 'aws-sdk-js-assumed-role-mfa',
  projenrcTs: true,
  deps: [
    '@aws-sdk/client-s3',
    '@aws-sdk/client-sts',
    '@aws-sdk/credential-providers',
    'chalk',
    'aws-sdk',
    'promptly',
    '@types/promptly',
    'ts-node',
  ],
  keywords: [
    'aws-sdk-js',
    'aws-sdk-js-v3',
    'aws-sdk-js-v2',
    'mfa',
  ],
  release: false,
});
project.addTask('run-sdk-v2', {
  exec: 'AWS_SDK_LOAD_CONFIG=1 ts-node src/index-v2.ts',
});
project.addTask('run-sdk-v3', {
  exec: 'AWS_SDK_LOAD_CONFIG=1 ts-node src/index-v3.ts',
});
project.synth();