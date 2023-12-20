import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
       <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-evenly items-center pe-8">
        <Link to="/" className="text-white font-bold text-lg flex items-center">
          <span role="img" aria-label="Splitwise App" className="mr-1"><img width="35" height="35" src="https://img.icons8.com/color/48/cash-in-hand.png" alt="cash-in-hand"/></span>
          SpendShare
        </Link>      
        </div>
    </nav>
    </section>
  );
};

export default Topbar;
