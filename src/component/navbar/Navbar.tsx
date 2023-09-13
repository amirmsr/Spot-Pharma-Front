import React, { useEffect, useState } from 'react';
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
import { fetchUserData } from '../../CheckAuth';


export default function App() {

  const [showNav, setShowNav] = useState(false);
  const [isConnected, setIsconnected] = useState(false);
  const [isAdmin, setIsadmin] = useState(false);
  const token = localStorage.getItem("token");

  //fetch profil
  const { data: user } = useQuery("userProfile", () => fetchUserData(token));

  useEffect(() => {
    if (user) {
      setIsconnected(true);
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === 1) {
      setIsadmin(true);
    }
  }, [user]);


  return (
    <MDBNavbar expand='lg' style={{backgroundColor:'#23A082'}} className='navbarElement'>
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
              <MDBNavbarLink><a href="https://spot-pharma.vercel.app/">Accueil</a></MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink><a href="https://spot-pharma.vercel.app/sessions"> Sessions</a></MDBNavbarLink>
            </MDBNavbarItem>           
            <MDBNavbarItem>
              <MDBNavbarLink><a href="https://spot-pharma.vercel.app/intervenants"> Intervenants</a></MDBNavbarLink>
            </MDBNavbarItem>           
            <MDBNavbarItem>
              <MDBNavbarLink><a href="https://spot-pharma.vercel.app/sponsors"> Partenaires</a></MDBNavbarLink>
            </MDBNavbarItem>           
            <MDBNavbarItem>
              <MDBNavbarLink> <a href="https://spot-pharma.vercel.app"> Stands 3D</a></MDBNavbarLink>
            </MDBNavbarItem>           
            <MDBNavbarItem>
              <MDBNavbarLink> <a href="https://spot-pharma.vercel.app/replay"> Replays</a></MDBNavbarLink>
            </MDBNavbarItem>  
            {isConnected && isAdmin ? (
              <MDBNavbarItem>
                <MDBNavbarLink> <a href="https://spot-pharma.vercel.app/utilisateurs"> Utilisateurs</a></MDBNavbarLink>
              </MDBNavbarItem>      
            ):null}              
            {isConnected ? (
                  <MDBNavbarItem>
                  <MDBNavbarLink>
                     <a
                      href="https://spot-pharma.vercel.app/home"
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
              <div style={{display:'flex'}}>                      
                  <MDBNavbarItem>
                  <MDBNavbarLink>
                    <a
                    href="https://spot-pharma.vercel.app/inscription"
                    style={{
                      border: "1.5px solid white",
                      padding: "5px 10px 5px 10px",
                      borderRadius: "15px",
                      textDecoration: "none", 
                      color: "white",
                    }}
                    >
                    {" "}
                    <span className='btnNavbar'>Créer votre compte</span>  <span style={{ opacity: 0 }}>.</span>{" "}
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
                   </a>
                  </MDBNavbarLink>
                  </MDBNavbarItem>  

                  <MDBNavbarItem>
                  <MDBNavbarLink>
                    <a
                    href="https://spot-pharma.vercel.app/connexion"
                    style={{
                      border: "1.5px solid white",
                      padding: "5px 10px 5px 10px",
                      borderRadius: "15px",
                      textDecoration: "none", 
                      color: "white",
                    }}
                    >
                    {" "}
                    <span className='btnNavbar'>Connexion</span> <span style={{ opacity: 0 }}>.</span>{" "}
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
                   </a>
                  </MDBNavbarLink>
                  </MDBNavbarItem>
              </div>                  
            )}     
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}