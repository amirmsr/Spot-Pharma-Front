import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from 'react-query';

export default function App() {
  const [showNav, setShowNav] = useState(false);

  const [isConnected, setIsconnected] = useState(false);

  useQuery("userProfile", async ()=>{

  const token = localStorage.getItem("token");
  if (!token){
    throw new Error("token missing");
  }

  const response = await fetch ("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/home",{
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
    <MDBNavbar expand='lg' style={{backgroundColor:'#23A082'}}>
      <MDBContainer fluid>       
        <MDBNavbarToggler
          type='button'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNav(!showNav)}          
        >
          <FontAwesomeIcon icon={faBars} style={{color: "white",}} />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNav} style={{backgroundColor:'#23A082'}}>
          <MDBNavbarNav >
            <MDBNavbarItem>
              <MDBNavbarLink><a href="https://spot-pharma-front.vercel.app/">Accueil</a></MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink><a href="https://spot-pharma-front.vercel.app/sessions"> Sessions</a></MDBNavbarLink>
            </MDBNavbarItem>           
            <MDBNavbarItem>
              <MDBNavbarLink><a href="https://spot-pharma-front.vercel.app/intervenants"> Intervenants</a></MDBNavbarLink>
            </MDBNavbarItem>           
            <MDBNavbarItem>
              <MDBNavbarLink><a href="https://spot-pharma-front.vercel.app/sponsors"> Sponsors</a></MDBNavbarLink>
            </MDBNavbarItem>           
            <MDBNavbarItem>
              <MDBNavbarLink> <a href="https://spot-pharma-front.vercel.app"> Stand 3D</a></MDBNavbarLink>
            </MDBNavbarItem>           
            <MDBNavbarItem>
              <MDBNavbarLink> <a href="https://spot-pharma-front.vercel.app/replay"> Replay</a></MDBNavbarLink>
            </MDBNavbarItem>      
            {isConnected ? (
                  <MDBNavbarItem>
                  <MDBNavbarLink>
                     <a
                      href="https://spot-pharma-front.vercel.app/home"
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
                  </MDBNavbarLink>
                  </MDBNavbarItem>  
            ):(
                  <MDBNavbarItem>
                  <MDBNavbarLink>
                    <a
                    href="https://spot-pharma-front.vercel.app/connexion"
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
                  </MDBNavbarLink>
                  </MDBNavbarItem>  
            )}     
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}