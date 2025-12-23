'use client';

import '../src/styles/globals.css';
import { PromptStyles } from '@/src/components/Prompts';
import { LogoutProvider } from '@/src/context/LogoutContext';
import { LoginProvider } from '@/src/context/LoginContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#FAF9F5' }}>
        <LoginProvider>
          <LogoutProvider>
            <PromptStyles />
            {children}
          </LogoutProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
