import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-500 to-violet-600 text-white font-sans">
      <Header />
      <main className="flex-grow pt-24 px-6 pb-16">{children}</main>
      <Footer />
    </div>
  );
}
