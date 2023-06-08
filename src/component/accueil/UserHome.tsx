import { useQuery } from "react-query";


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



export default function UserHome(){
  
   //get user data

   const {data: user}= useQuery("userProfile", async ()=>{
     const token = localStorage.getItem("token");
     if (!token){
       throw new Error("token missing");
     }
     const response = await fetch ("http://162.19.64.70:8800/home",{
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
          `http://162.19.64.70:8800/inscrit_session/${userId}`,
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
        
  

    //get all sessions
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: allSession } = useQuery("AllSessions", async () => {
      const response = await fetch("http://162.19.64.70:8800/sessions");
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





    
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    // Rediriger l'utilisateur vers la page de connexion
    window.location.href = "/connexion";
  };


    
    return (

      <div className='homeMainDiv'>
      
    <div className=''>
        <div>
        <h1>Bienvenue {user?.name}</h1>
        <br />
        <h3>Voici les sessions où vous êtes inscrit</h3>
        <br />
        <div className="container ">
        
        <div className="row">
          
          {filteredSessions?.slice(0.3).map((element:Sessions)=>(
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
            
            <button className="btnMain2">
              Voir le Replay
            </button>

        </div>
           

           

           



          
          </div>
          
          ))}
          
        </div>
      </div>
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
    </div>
     
    </div>


        



    );
    


}