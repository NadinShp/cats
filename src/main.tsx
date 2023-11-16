import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./core/query-client.ts";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
