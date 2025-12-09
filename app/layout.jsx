import '../src/styles/globals.css';
import Sidebar from '@/src/components/Sidebar';

export const metadata = {
  title: 'Review UI - Reputation Management',
  description: 'Manage your online reputation with AI-powered review management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
