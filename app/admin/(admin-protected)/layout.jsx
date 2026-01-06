import AdminSidebar from '@/src/admin/components/admin_sidebar';
import AdminHeader from '@/src/admin/components/admin_header';
import AdminAuthWrapper from '@/src/admin/components/admin_auth_wrapper';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Admin panel for platform management',
};

export default function AdminLayout({ children }) {
  return (
    <AdminAuthWrapper>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-72">
          {/* Header */}
          <AdminHeader />

          {/* Content */}
          <main className="flex-1 overflow-y-auto pt-20 p-8">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthWrapper>
  );
}
