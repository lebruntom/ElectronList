import React, { useContext } from "react";

import Button from "../ui/Button";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase.config";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="w-56 bg-secondary fixed top-0 left-0 h-screen p-2 flex flex-col">
      {currentUser !== null && (
        <Button type="button" onClick={() => signOut(auth)}>
          logOut
        </Button>
      )}
      <Link to="/">Accueil</Link>
      <Link to="/lists">Lists</Link>
    </div>
  );
};

export default Navigation;
