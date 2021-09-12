import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const links = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Discover",
      href: "/discover",
    },
    {
      title: "Create Campaign",
      href: "/create",
    },
  ];

  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="bg-white shadow-sm py-3">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-between items-center">
          <div>
            {links.map((link) => {
              return (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`text-sm mx-4 cursor-pointer duration-100${
                      pathname === link.href ? ` font-medium` : ""
                    } hover:opacity-60`}
                  >
                    {link.title}
                  </span>
                </Link>
              );
            })}
          </div>
          <div>
            <Link href={"/"}>
              <img
                className="h-10 cursor-pointer"
                src={"/blockfunder-logo.png"}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
