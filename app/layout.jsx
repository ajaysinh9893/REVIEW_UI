'use client';

import '../src/styles/globals.css';
import { PromptStyles } from '@/src/components/Prompts';
import { LogoutProvider } from '@/src/context/LogoutContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#FAF9F5' }}>
        <LogoutProvider>
          <PromptStyles />
          {children}
        </LogoutProvider>
      </body>
    </html>
  );
}
