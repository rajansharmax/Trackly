import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

const BaseLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <>
            <Header />
            <Navbar />
            <Sidebar />
            {children}
            <Footer />
        </>
    );
};

export default BaseLayout;