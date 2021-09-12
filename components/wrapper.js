import { Footer } from "./footer";
import { Header } from "./header";

export const Wrapper = ({ children, bgClassName = "bg-gray-50" }) => {
  return (
    <div
      className={`flex flex-col min-h-screen justify-between ${bgClassName}`}
    >
      <Header />
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  );
};
