/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Use jsdom to simulate a browser environment
    environment: 'jsdom',
    
    // Run this file before each test (for setup)
    setupFiles: ['./src/setupTests.ts'],
    
    // Make 'describe', 'it', 'expect' available globally
    globals: true, 
  },
});
