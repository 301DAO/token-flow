interface EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'production';
  readonly VERCEL_URL: string;
  readonly NEXTAUTH_URL: string;
  readonly NEXTAUTH_SECRET: string;
  readonly ALCHEMY_API_KEY: string;
  readonly NEXT_PUBLIC_ENABLE_TESTNETS: string;
}

declare namespace NodeJS {
  type ProcessEnv = EnvironmentVariables;
}
