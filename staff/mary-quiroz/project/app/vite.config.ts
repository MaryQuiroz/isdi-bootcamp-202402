import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    // fs: {
    //   allow: ['c:/users/cielu/isdi-bootcamp-202402/staff/mary-quiroz/project/*',
      
    //   ],
    // },
  },
  plugins: [react()],
})
