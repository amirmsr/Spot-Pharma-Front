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
            <a href="https://m118.syncusercontent.com/mfs-60:0f8ece58ae8ab3f1a014cbed2f01a0b0=============================/p/7(cut).mp4?allowdd=0&datakey=Gtm9ko5VkjhzKsGRDN30uvwSI/d2nnPDfUYpVFLT496GF0T9AOGtGaSMQZa3I+r3s/Wq1HWHZjzA5WuuwgXElzv9xdUL3cT6UK4yRibnpEesQrPg2fH2zloq4W2k+Sl2NsSRwamuX5u+Xk7bCUGfPc4vFkaEJMmPpcx18Mbl7EjrLY4tVgQSuGj/O+4ptF7vYVGapEdu5v6+BEc6VJ950phgjU5/GPgRfFLuG60s+wETyNQgRkNQddqP/tfwj+3lJzp/zhDlQN9fH6ciZsoeVI2OLd5TRA/U+49li78IPtaT1YAdm6zMg2foTbCdDjJQdtV3sdkKirEyXja9GNLraw&engine=ln-3.1.38&errurl=kRfzAK9JkhLTBRqHwVnMgJjgx76BNCV292+b1lDN5Ek7WjB3PSz0PUCpeJ1o6ITzRVFzfa5KmoU0QY6pHYjdVlZ8E1ftl2Ehp/P5Y29mvmLo8KRzboBS9PFxHnO8hcT+uT2z48CMKFcMuB88bJZBVLjrA2+W78wpGItofnvsMXCV6Yxh/B6BdrLwyDgFwFFX4hT6H7k2Xf391cJIatjaHl/SsC4hzRhdi274Y/Z5EDBFReOuNxYhlNwH48/UAMwaR58/HlRMrKqjt7q4gvUE0G4brVYk5lq1lEbRFP/e4A7xzJXABqMpW8V08pBIgLt8kfgX3kpOuDepe3JFVtH0rA==&header1=Q29udGVudC1UeXBlOiB2aWRlby9tcDQ&header2=Q29udGVudC1EaXNwb3NpdGlvbjogaW5saW5lOyBmaWxlbmFtZT0iNyhjdXQpLm1wNCI7ZmlsZW5hbWUqPVVURi04Jyc3KGN1dCkubXA0Ow&ipaddress=1457144620&linkcachekey=c8857f3b0&linkoid=766260000&mode=101&sharelink_id=9175921960000&timestamp=1687506031723&uagent=8ce2ac0889d881e6b69dfc50d026374b84fe6254&signature=3ed7fab6fee78d9d0cb7f491a2c0d317ccadc0ec&cachekey=60:0f8ece58ae8ab3f1a014cbed2f01a0b0=============================">
              
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
