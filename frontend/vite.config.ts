import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/




export default defineConfig(({mode}) =>{
    const env = loadEnv(mode, process.cwd(), '')

    return {base : "/" ,
    plugins: [react()],
    server: {
        port: 8081,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:8081",
    },
    preview: {
        port: 8081,
        strictPort: true,
    },
    define: {
        __GOOGLE_API__: JSON.stringify(env.GOOGLE_API_KEY)
    }}
})
