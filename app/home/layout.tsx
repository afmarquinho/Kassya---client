import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import Sidebar from "@/src/components/sidebar";


export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex h-full w-full`}>
      <Sidebar/>
      <div>
        <Header/>
        <main>{children}</main>
        <Footer/>
      </div>
    </div>
  );
}
