interface EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'production';
  readonly MY_AWS_REGION: string;
  readonly MY_AWS_ACCESS_KEY_ID: string;
  readonly MY_AWS_SECRET_ACCESS_KEY: string;
  readonly DYNAMODB_LOCAL_ENDPOINT: string;
}

declare namespace NodeJS {
  type ProcessEnv = EnvironmentVariables;
}
