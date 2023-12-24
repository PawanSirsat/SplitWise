import { Link} from "react-router-dom";

const Topbar = () => {

  return (
    <section className="topbar">
       <nav className="bg-gray-800 p-4">
      <div className="container font-sans mx-auto flex justify-evenly items-center pe-8">
        <Link to="/" className="text-white font-bold text-lg flex items-center">
          <span role="img" aria-label="Splitwise App" className="mr-1 pr-2"><img width="40" height="40" src="/assets/images/split-logo.png" alt="cash-in-hand"/></span>
          Splitwise
        </Link>      
        </div>
    </nav>
    </section>
  );
};

export default Topbar;
