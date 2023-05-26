import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";



function Navbar() {

  const [isConnected, setIsconnected] = useState(false);

  useQuery("userProfile", async ()=>{

  const token = localStorage.getItem("token");
  if (!token){
    throw new Error("token missing");
  }

  const response = await fetch ("http://localhost:8800/home",{
    headers: {
      token: `${token}`,
    }
  })
  if (!response.ok){
    throw new Error("failed to fetch user profil")
  }
  setIsconnected(true)
  const data = await response.json();
  return data
    
    
    
  })


  return (
    <div className="navbar">
      <ul style={{ listStyle: "none" }}>
        <li>
          <a href="http://localhost:5173/"> Accueil</a>
          <a href="http://localhost:5173/sessions"> Sessions</a>
          {/* <a href="http://localhost:5173/addsessions"> Ajouter sessions</a> */}
          <a href="http://localhost:5173/intervenants"> Intervenants</a>
          <a href="http://localhost:5173/add"> Stand 3D</a>
          <a href="http://localhost:5173/add" style={{ marginRight: "10px" }}>
            {" "}
            Replays
          </a>
          {isConnected ? (
            <a
              href="http://localhost:5173/home"
              style={{
                border: "1.5px solid white",
                padding: "5px 10px 5px 10px",
                borderRadius: "15px",
              }}
            >
              {" "}
              Mon compte <span style={{ opacity: 0 }}>.</span>{" "}
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
            </a>
          ) : (
            <a
              href="http://localhost:5173/connexion"
              style={{
                border: "1.5px solid white",
                padding: "5px 10px 5px 10px",
                borderRadius: "15px",
              }}
            >
              {" "}
              Se connecter <span style={{ opacity: 0 }}>.</span>{" "}
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
            </a>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
