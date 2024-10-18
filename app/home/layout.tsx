import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import Sidebar from "@/src/components/sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <Sidebar />
      <div className="flex-1 px-2 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
