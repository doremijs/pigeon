declare namespace NodeJS {
  export interface ProcessEnv {
    AUTH_SECRET: string
    NODE_ENV?: 'development' | 'staging' | 'production'
  }
}
