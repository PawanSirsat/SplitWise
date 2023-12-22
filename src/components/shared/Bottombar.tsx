import { Link, useLocation } from "react-router-dom";

import { bottombarLinks } from "@/constants";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <Link
  key={`bottombar-${link.label}`}
  to={link.route}
  className={`${
    isActive ? "rounded-[10px]" : ""
  } flex-center flex-col gap-1 p-2 transition`}
  style={isActive ? { backgroundColor: '#1CC29F' } : {}}
>
            <img
              src={link.imgURL}
              alt={link.label}
              width={25}
              height={25}
              className={`${isActive && "invert-white"}`}
            />
            <p className="font-semibold text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
