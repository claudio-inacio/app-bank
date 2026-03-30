// src/mocks/browser.js
import { setupWorker } from 'msw/browser'
import { handlers } from './handlres'

 
export const worker = setupWorker(...handlers)