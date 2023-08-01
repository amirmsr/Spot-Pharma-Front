import { faCirclePlay, faPen, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate} from "react-router-dom";



interface Sessions {
  id: number;
  titre: "";
  session_date: "";
  type: "";
  description:"";
  invites: "";
  invites_images: "";
  invites2: "";
  invites_images2: "";
  invites3: "";
  invites_images3: "";
  invites4: "";
  invites_images4: "";
  sponsors_images: "";
  video_titre: "";
  video: "";
}


function Session() {
  const navigate = useNavigate()
  const [isConnected, setIsconnected] = useState(false);
  const [isAdmin, setIsadmin] = useState(false);
  const token = localStorage.getItem("token");


  //get user data
  const {data: user}= useQuery("userProfile", async ()=>{
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
    const data = await response.json();
    return data
  })

  useEffect(() => {
    if (user) {
      setIsconnected(true);
    }
  }, [user]);
  console.log(user)
  useEffect(() => {
    if (user?.role === 1) {
      setIsadmin(true);
    }
  }, [user]);
  


  //inscrire a une session   
  const { mutate: inscriptionMutation } = useMutation(async (inscription: { id_user: string; id_session: string; }) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { token: `${token}` };
      const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/session_inscrit", {  //https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/session_inscrit
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inscription),
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log(json);
        alert("Votre inscription est bien prise en compte")
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


  const handleInscription = async (elementId: number, elementTitre: string) => {
    const userId = user?.id as number;
    console.log(userId);
  
    if (userId) {
      const inscription = {
        id_user: userId.toString(),
        id_session: elementId.toString(),
      };
      inscriptionMutation(inscription)        
    } else {
      console.log("userId n'est pas défini.");
    }
  };




  // fetch les sessions
  const { data: elements, isLoading, isError } = useQuery("Sessions", async () => {
    try {
      const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sessions", {});   //https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sessions
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error("An error occurred while fetching sessions");
    }
  });
  

  //get user sessions
  const { data: userSessions } = useQuery(
    "UserSessions",
    async () => {
      const token = localStorage.getItem("token");
      const userId = user.id;

      const response = await fetch(
        `https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/inscrit_session/${userId}`,
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
    
  const filteredSessions = elements?.filter((session: { id: any; }) => userSessions?.some((userSession: { id_session: any; }) => userSession.id_session === session.id));


  const userSessionId: number[] = [];

  filteredSessions?.map((filteredSession: any) => {
    const sessionId = filteredSession.id;
    userSessionId.push(sessionId);
    return filteredSession
  });

  console.log(userSessionId)

  userSessionId?.map((id: number) => {
    const foundSession = elements.find((element: any) => element.id === id);
    if (foundSession) {
      console.log(`User session with id ${id} found.`);
    }
    return userSessionId
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }
  
  if (isError) {
    console.log('erreuuuur')
  }
  console.log(elements)
  if (!elements || elements.length === 0) {
    return <div>Aucune session disponible</div>;
  }
    

  

  const handleSession = async (sessionId: number) => {
      navigate(`SessionsDetails/${sessionId}`)
  };

  const handleNotconnected = () => {
    alert("Vous devez vous connecter pour vous inscrire à la session  ");
  };

  
  const handleEdit=(sessionId: number)=>{
    navigate(`edit/${sessionId}`)
  }

  const handleEditIntervenant1=(sessionId: number)=>{
    navigate(`editIntervenant1/${sessionId}`)
  }










  return (
    <div className="container">
      <br></br> <br></br> <br></br> <br></br>
      <h1 style={{ margin: "0", color: "#7DBA33" }}>Toutes les</h1>
      <p style={{ fontSize: "2rem", margin: "0" }}>Sessions</p>
      <br></br><br /><br />
      <div className="container ">
        
        <div className="row ">
          
          {elements?.slice(0.3).map((element:Sessions)=>(
          <div key={element.id} className="col-md-4 ">
            <div className="session">
            <div>
              {isAdmin ?(
                <FontAwesomeIcon onClick={() => handleEdit(element.id)} icon={faPenToSquare} style={{color:'#23A082', fontSize:'1.5rem',position:'absolute', marginTop:'10px',marginLeft:'150px', cursor:'pointer'}}/>
              ):null}              
            </div>
            <div className="sessionHeader">
            {element.sponsors_images && (
                <img
                  style={{ width: "100%", paddingTop:"40px", paddingBottom:"30px"  }}
                  src={"https://bcombrun.com/Spot-Pharma-Image/LogoSponsors/" + element.sponsors_images}
                  alt=""
                ></img>
              )}
            </div>

            <div style={{height:'60px'}}>
              <h3>{element.titre}</h3>   
            </div>  

            <br /> 

            <p style={{fontSize:'1.3rem',color:'#23A082' }}>{element.type} :</p>    
            <p style={{fontSize:'1.3rem', height:'100px'}}>{element.description}</p>
            <p style={{color:'#23A082',fontSize:'1.3rem'}}>{element.session_date}</p>   

            <br /><br />     

            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="invite">     
                    <div>
                      {isAdmin ?(
                        <div className="container">
                          <div className="row">
                            <div className="col">
                            <FontAwesomeIcon onClick={() => handleEditIntervenant1(element.id)} icon={faPen} style={{color:'#23A082', fontSize:'1.2rem', cursor:'pointer'}} />                        
                            </div>
                            <div className="col">
                            <FontAwesomeIcon icon={faXmark} style={{color:'#23A082', fontSize:'1.2rem', cursor:'pointer'}}/>
                            </div>
                          </div>
                        </div>                       
                      ):null}              
                    </div>        
                    {element.invites_images && (
                    <img                      
                      src={"https://bcombrun.com/Spot-Pharma-Image/Intervenant/" + element.invites_images}
                      alt=""
                    ></img>
                    )}
                   
                    <br /><br />
                  <p>{element.invites}</p>
                  </div>    
                </div>

              </div>
            </div>

            <br /><br />
            {isConnected ? (
              <center>
               {userSessionId.includes(element.id)?(
                <button className="btnMain2"> Accédez au live <span><FontAwesomeIcon icon={faCirclePlay} style={{color:'#23A082'}} /></span></button>
               ):(
                  <button className="btnMain2" onClick={() => handleInscription(element.id, element.titre)}> S'inscrire à la session </button>
               )}                 
              </center>
            ) : (
              <center>
                <button
                  className="btnMain2"
                  onClick={() => handleNotconnected()}
                >
                  S'inscrire à la session
                </button>
              </center>
            )}
            <center>
            {/* <a href="https://bcombrun.com/spot-pharma/video/Film_Dermatologie.mp4">
            <button className="btnMain2">
              Voir le Replay
            </button>
            </a> */}
            <br />
             {isAdmin ?(
              <button onClick={() => handleSession(element.id)} className="btnMain2">
              Voir les inscrits
              </button>
             ):null}
            </center>        
        </div>
        </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Session;
