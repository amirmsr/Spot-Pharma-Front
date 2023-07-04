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
  invites_descriptions: "";
  invites_images: "";
  invites2: "";
  invites_descriptions2: "";
  invites_images2: "";
  sponsors: "";
  sponsors_descriptions: "";
  sponsors_images: "";
  video_titre: "";
  video: "";
}


function Session() {
  const navigate = useNavigate()
  
   //get user data
  const [isConnected, setIsconnected] = useState(false);
  const [isAdmin, setIsadmin] = useState(false);

  const {data: user}= useQuery("userProfile", async ()=>{
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
        const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/session_inscrit", {
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
      const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sessions", {});
      if (!response.ok) {
        throw new Error("Failed to fetch sessions");
      }
      const data = await response.json();
      return data;
    } catch (err) {
      throw new Error("An error occurred while fetching sessions");
    }
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
            <div className="sessionHeader">
            {element.sponsors_images && (
                <img
                  style={{ width: "100%", paddingTop:"40px", paddingBottom:"30px"  }}
                  src={"../uploads/LogoSponsors/" + element.sponsors_images}
                  alt=""
                ></img>
              )}
            </div>

            <div style={{height:'60px',backgroundColor:'red'}}>
              <h3>{element.titre}</h3>   
            </div>  

            <br /> 

            <p style={{fontSize:'1.3rem',color:'#7DBA33' }}>{element.type} :</p>    
            <p>{element.description}</p>
            <p style={{color:'#7DBA33',fontSize:'1.3rem'}}>{element.session_date}</p>   

            <br /><br />     

            <div className="container">
              <div className="row">


                <div className="col">
                  <div className="invite">             
                    {element.invites_images && (
                    <img
                      src={"../uploads/intervenant/" + element.invites_images}
                      alt=""
                    ></img>
                    )}
                  <p>{element.invites}</p>
                  <p>{element.invites_descriptions}</p>
                  </div>    
                </div>


                <div className="col">
                  <div className="invite">             
                    {element.invites_images2 && (
                    <img
                      src={"../uploads/intervenant/" + element.invites_images2}
                      alt=""
                    ></img>
                    )}
                  <p>{element.invites2}</p>
                  <p>{element.invites_descriptions2}</p>
                  </div>    
                </div>




              </div>
            </div>






            <br /><br />
            {isConnected ? (
              <center>
                <button
                  className="btnMain2"
                  onClick={() => handleInscription(element.id, element.titre)}
                >
                  S'inscrire à la session
                </button>
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
            <br />
          <center>
            <a href="https://bcombrun.com/spot-pharma/video/Film_Dermatologie.mp4">
            <button className="btnMain2">
              Voir le Replay
            </button>
            </a>
             <br /><br />
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
