import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";



interface Sessions {
  id: number;
  titre: "";
  session_date: "";
  type: "";
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

   //get user data
  const [isConnected, setIsconnected] = useState(false);

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
  





  //inscrire a une session   
 
 
  const HandleInscription = async (elementId: number, elementTitre: string) => {
    const userId = user?.id as number;
    console.log(userId);
  
    if (userId) {
      const inscription = {
        id_user: userId.toString(),
        id_session: elementId.toString(),
      };
      inscriptionMutation(inscription)
      alert("Votre inscription est bien prise en compte")
      
      
    } else {
      console.log("userId n'est pas défini.");
    }
  };

  const { mutate: inscriptionMutation } = useMutation(async (inscription: { id_user: string; id_session: string; }) => {
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
    const json = await response.json();
    console.log(json);
    return json;
  });
 




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


  


  


  const handleNotconnected = () => {
    alert("Vous devez vous connecter pour vous inscrire à la session  ");
  };





  return (
    <div className="container">
      <br></br> <br></br> <br></br> <br></br>
      <h1 style={{ margin: "0", color: "#7DBA33" }}>Toutes les</h1>
      <p style={{ fontSize: "2rem", margin: "0" }}>Sessions</p>
<br></br>
      {/* <div className="container ">
        
        <div className="row ">
          
          {elements?.slice(0.3).map((element:Sessions)=>(
          <div key={element.id} className="col-md-4 ">
            <div className="session">
            <div className="sessionHeader">
            {element.sponsors_images && (
                <img
                  style={{ width: "100%", height: "200px" }}
                  src={"../uploads/LogoSponsors/" + element.sponsors_images}
                  alt=""
                ></img>
              )}
            </div>
            <h2>{element.titre}</h2>
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
                  onClick={() => HandleInscription(element.id, element.titre)}
                >
                  S`inscrire à la session
                </button>
              </center>
            ) : (
              <center>
                <button
                  className="btnMain2"
                  onClick={() => handleNotconnected()}
                >
                  S`inscrire à la session
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
          </center>
        </div>
           

           

           



          
          </div>
          
          ))}
          
        </div>
      </div> */}

    
    </div>
  );
}

export default Session;
