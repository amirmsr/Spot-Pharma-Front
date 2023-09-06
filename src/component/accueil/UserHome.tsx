import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { fetchUserData } from "../CheckAuth";


interface Sessions {
  id: number;
  titre: "";
  session_date: "";
  type: "";
  description:"";  
  video: "";
  jours:""
}



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
        
  

    //get user sessions
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: allSession } = useQuery("AllSessions", async () => {
      const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sessions");
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
      const headers = { token: `${token}` };
      const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/session_inscrit", {
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

  
    //fetch tous les inscrits
    const { data: allinscrits, } = useQuery("AllInscrit", async () => {
      try {
        const headers = { token: `${token}` };
        const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/users`,{
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
              <div style={{height:'60px'}}>
                <h3>{element.titre}</h3>   
              </div>  

              <br /> 

              <p style={{fontSize:'1.3rem',color:'#23A082' }}>{element.type} :</p>    
              <p style={{fontSize:'1.3rem'}}>{element.description}</p>
              <p style={{color:'#23A082',fontSize:'1.3rem'}}>{element.session_date}</p>               
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