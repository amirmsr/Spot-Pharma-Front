import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchUserData } from "../../CheckAuth";
import {Sessions} from "../../types";
import { baseUrl } from "../../config";






export default function UserHome(){
  
    const [isAdmin, setIsadmin] = useState(false);
    const token = localStorage.getItem("token");
    

    //fetch profil
    const { data: user, isLoading } = useQuery("userProfile", () => fetchUserData(token));

    useEffect(() => {
      if (!isLoading && user?.role === 1) {
        setIsadmin(true);
      }
    }, [isLoading, user]);

    

    //get user sessions
    const { data: userSessions } = useQuery(
      "UserSessions",
      async () => {
        const token = localStorage.getItem("token");
        const userId = user.id;
    
        const response = await fetch(
          `${baseUrl}/inscrit_session/${userId}`,
          {
            headers: {
              token: `${token}`,
            },
          }
        );
    
        if (!response.ok) {
          throw new Error("failed to fetch sessions");
        }
        const data = await response.json();
        return data;
      },
      {
        enabled: !!user, // Active la requête si user est défini
      }
    );
        
  

    //get user sessions
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: allSession } = useQuery("AllSessions", async () => {
      const response = await fetch(`${baseUrl}/sessions`);
      if (!response.ok) {
        throw new Error("failed to fetch sessions");
      }
      const data = await response.json();
      return data;
    }, {
      enabled: !!userSessions, // Active la requête si userSessions est défini
    });
    const filteredSessions = allSession?.filter((session: { id: any; }) => userSessions.some((userSession: { id_session: any; }) => userSession.id_session === session.id));







  //desinscription

  const { mutate: desinscriptionMutation } = useMutation(async (desinscription: { id_user: string; id_session: string; }) => {
    try {
      const headers = { token: `${token}` };
      const response = await fetch(`${baseUrl}/session_inscrit`, {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(desinscription),
      });
  
      if (response.ok) {
        const json = await response.json();
        alert("Votre désinscription est bien prise en compte")
        return json;
      } else {
        // Gérer l'erreur de duplication ici
        alert("Vous vous êtes déjà inscrit")
      }
    } catch (error) {
      // Gérer d'autres erreurs ici
      console.error(error);
      throw error;
    }
  }); 

  
    //fetch tous les inscrits
    const { data: allinscrits, } = useQuery("AllInscrit", async () => {
      try {
        const headers = { token: `${token}` };
        const response = await fetch(`${baseUrl}/users`,{
          headers
        });  
        if (!response.ok) {
          throw new Error("Failed to fetch all inscrits");
        }
        const data = await response.json();
        return data;
      } catch (err) {
        throw new Error("An error occurred while fetching inscrits");
      }
    });


    const handleVideo = async (sessionVideo: any, sessionRelease: any) => {
        if (sessionVideo == "" && sessionRelease == "") {
            return;
        }

        const dateRelease = new Date(sessionRelease);
        const dateActuelle = new Date();
        const dateLimite = new Date(dateRelease.getTime() + 2 * 60 * 60 * 1000);
        console.log(dateRelease, dateLimite)

        if (dateActuelle >= dateRelease && dateActuelle <= dateLimite) {
            window.open(sessionVideo, '_blank');
        }
    };
  
  const handleDesinscription=(sessionId : number)=>{
    const userId = user?.id as number;
    if (userId) {
      const desinscription = {
        id_user: userId.toString(),
        id_session: sessionId.toString(),
      };
      desinscriptionMutation(desinscription)        
    } else {
      console.log("userId n'est pas défini.");
    }
  }


    
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    // Rediriger l'utilisateur vers la page de connexion
    window.location.href = "/connexion";
  };


 const handleReplay = async (sessionVideo: any) => {
     if (sessionVideo == "" || sessionVideo == null) {
         alert("Le replay sera bientôt disponible")
         return;
     }

     window.open("https://bcombrun.com/Spot-Pharma-Image/Replay/" + sessionVideo, '_blank');
 };
    
  return (
    <div className='homeMainDiv'>
      
      <div>
          <div>
          <h1 style={{color:'white'}}>Bienvenue {user?.name}</h1>
          <br />
          <h3 style={{color:'white'}}>Voici les sessions où vous êtes inscrit</h3>
          <br /> <br />
          <div className="container ">
          
          <div className="row">
            
            {filteredSessions?.slice(0.3).map((element:Sessions)=>(
            <div key={element.id} className="col-md-4 ">
              <div className="session">
              <div style={{height:'60px'}}>  
              </div>  

              <br /> 

              <p style={{fontSize:'1.3rem',color:'#23A082' }}>{element.type} :</p>    
              <p style={{fontSize:'1.3rem'}}>{element.description}</p>
              <p style={{color:'#23A082',fontSize:'1.3rem'}}>{element.jours}</p>
              <p style={{color:'#23A082',fontSize:'1.3rem'}}>{element.session_date}</p>
              <br />
              <div>
                  <center>
                      <p className="infoSession">
                          L'accès au live sera disponible 5 minutes avant l'heure de la session
                      </p>
                  </center>
              </div>
              <br />
                  {new Date() > new Date(new Date(element.date_release).getTime() + 2 * 60 * 60 * 1000) ? (
                      <center>
                          <button className="btnMain2" onClick={() => handleReplay(element.replay)} >
                              Voir le replay <span><FontAwesomeIcon icon={faCirclePlay} style={{ color: '#23A082' }} /></span>
                          </button>
                      </center>
                  ) : (
                      <center>
                          <button className="btnMain2" onClick={() => handleVideo(element.video, element.date_release)} > Accédez au live <span><FontAwesomeIcon icon={faCirclePlay} style={{color:'#23A082'}} /></span></button>
                      </center>
                  )}
              <br /><br />
              <button onClick={()=>handleDesinscription(element.id)} className="btnMain2">
                Se désinscrire
              </button>

          </div>
            
            </div>
            
            ))}
            
          </div>
        </div>
          <button className="btnMain2" onClick={handleLogout}>Déconnexion</button>
        </div>
      </div>
    </div>

  );
    


}