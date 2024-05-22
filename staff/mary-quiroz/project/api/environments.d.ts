// environments.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      MONGODB_URL: string;
      JWT_SECRET: string;
      // Añade aquí otras variables de entorno que necesites
    }
  }