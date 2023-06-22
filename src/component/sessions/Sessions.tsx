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
  const {data: elements, isLoading, isError}= useQuery("Sessions", async ()=>{

    const response = await fetch ("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sessions",{
      
    })
    if (!response.ok){
      throw new Error("failed to fetch sessions")
    }
    const data = await response.json();
    return data
  })

  if (isLoading) {
    return <div>Chargement...</div>;
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
      <div className="container ">
        
        <div className="row ">
          
          {elements.slice(0.3).map((element:Sessions)=>(
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


             {/*  image invité */}

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
            {/* les button */}
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
            <a href="https://cp.sync.com/mfs-60:0f8ece58ae8ab3f1a014cbed2f01a0b0=============================/u/7(cut).mp4?cachekey=60:0f8ece58ae8ab3f1a014cbed2f01a0b0=============================&datakey=gMCLC12UtF24Bj4lPCzgCOgwQ5A2Djha3HXzPEQ/kNlg683A3d7XFsN6tKfEMTALQjvpRuR/FQQY1cXoJt4TAYlJwWj2ve4EoQoajnXEGTtXnW9AxWsTyiYHtyS2WowpNJHxsfrQ3I8PBIv+x29EPkJw+Jt1jyG2KrGPkkC0VfzoOVp+BU7T07uQBtUe8v1+A7Q3EjdBnUYPxszl/1EYknvC6dQahljw/zK2dQuK3itIuQioYeAI/bzbBulFPe33up3q3B1h7RPsHy4fa28OV+Dw8nmt/jsQruQIRiTj3J0KdHzvvnT//xHJ0bYsWpdukHCjNvF5UCSjv87UtKB+pA&mode=101&api_version=1&header1=Q29udGVudC1UeXBlOiB2aWRlby9tcDQ&header2=Q29udGVudC1EaXNwb3NpdGlvbjogaW5saW5lOyBmaWxlbmFtZT0iNyhjdXQpLm1wNCI7ZmlsZW5hbWUqPVVURi04Jyc3KGN1dCkubXA0Ow&servtime=1687446704015&engine=cp-3.1.38&userid=766260000&deviceid=1839060000&devicetypeid=3&access_token=67797f819d242f4431587ce729e8f7bbbddd1abb6e5aff172b6f4bdd29c26911">
            <button className="btnMain2">
              Voir le Replay
            </button>
            </a>
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
