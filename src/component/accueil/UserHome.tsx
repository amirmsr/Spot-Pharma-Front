import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "react-query";


interface Sessions {
  id: number;
  titre: "";
  session_date: "";
  type: "";
  description:'';
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



export default function UserHome(){
  
   //get user data

   const {data: user}= useQuery("userProfile", async ()=>{
     const token = localStorage.getItem("token");
     if (!token){
       throw new Error("token missing");
     }
     const response = await fetch ("https://localhost:5174/home",{
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

    //get user sessions
    const { data: userSessions } = useQuery(
      "UserSessions",
      async () => {
        const token = localStorage.getItem("token");
        const userId = user.id;
    
        const response = await fetch(
          `https://localhost:5174/inscrit_session/${userId}`,
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
      const response = await fetch("https://localhost:5174/sessions");
      if (!response.ok) {
        throw new Error("failed to fetch sessions");
      }
      const data = await response.json();
      return data;
    }, {
      enabled: !!userSessions, // Active la requête si userSessions est défini
    });
    const filteredSessions = allSession?.filter((session: { id: any; }) => userSessions.some((userSession: { id_session: any; }) => userSession.id_session === session.id));


    console.log(filteredSessions)








  //desinscription

  const { mutate: desinscriptionMutation } = useMutation(async (desinscription: { id_user: string; id_session: string; }) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { token: `${token}` };
      const response = await fetch("https://localhost:5174/session_inscrit", {
        method: 'DELETE',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(desinscription),
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log(json);
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


    
  return (

    <div className='homeMainDiv'>
      
      <div>
          <div>
          <h1>Bienvenue {user?.name}</h1>
          <br />
          <h3>Voici les sessions où vous êtes inscrit</h3>
          <br /> <br />
          <div className="container ">
          
          <div className="row">
            
            {filteredSessions?.slice(0.3).map((element:Sessions)=>(
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
              <div style={{height:'60px'}}>
                <h3>{element.titre}</h3>   
              </div>  

              <br /> 

              <p style={{fontSize:'1.3rem',color:'#23A082' }}>{element.type} :</p>    
              <p style={{fontSize:'1.3rem'}}>{element.description}</p>
              <p style={{color:'#23A082',fontSize:'1.3rem'}}>{element.session_date}</p>   

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
              <button className="btnMain2">
                Accédez au live <span><FontAwesomeIcon icon={faCirclePlay} style={{color:'#23A082'}} /></span>
              </button>
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