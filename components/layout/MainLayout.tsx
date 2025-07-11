import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

export function MainLayout({
  children,
  isAdmin,
  isAuthenticated,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isAdmin={isAdmin} isAuthenticated={isAuthenticated} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
