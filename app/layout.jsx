'use client';

import '../src/styles/globals.css';
import { PromptStyles } from '@/src/components/Prompts';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#FAF9F5' }}>
        <PromptStyles />
        {children}
      </body>
    </html>
  );
}
