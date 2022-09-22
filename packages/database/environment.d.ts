interface EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'production';
  readonly AWS_REGION: string;
  readonly AWS_ACCESS_KEY_ID: string;
  readonly AWS_SECRET_ACCESS_KEY: string;
  readonly DYNAMODB_LOCAL_ENDPOINT: string;
}

declare namespace NodeJS {
  type ProcessEnv = EnvironmentVariables;
}
