/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APPLICATION_ID: string;
    readonly VITE_ACCESS_KEY: string;
    readonly VITE_SECRET_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}