import { faCirclePlay, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../CheckAuth";
import { baseUrl } from "../../config";

function Replay(){

    interface Replay {
        id: number;
        nom:any;
        description:any;
        replay:any
    }
    
    const navigate = useNavigate()
    const [isAdmin, setIsadmin] = useState(false);
    const token = localStorage.getItem("token");
    

    //fetch profil
    const { data: user, isLoading } = useQuery("userProfile", () => fetchUserData(token));

    useEffect(() => {
      if (!isLoading && user?.role === 1) {
        setIsadmin(true);
      }
    }, [isLoading, user]);



    //fetch les replay
    const { data: elements, isError } = useQuery("Replay", async () => {
        try {
          const response = await fetch(`${baseUrl}/replay`); 
          if (!response.ok) {
            throw new Error("Failed to fetch replay");
          }
          const data = await response.json();
          return data;
        } catch (err) {
          throw new Error("An error occurred while fetching replay");
        }
    });
    
    if (isError) {
    alert("erreur")
    }
    console.log(elements)
  

    const handleClick=()=>{
    navigate(`addReplay`)
    }
    
    const handleDeleteReplay = async (id_replay: number)=>{
        const response = await fetch(`${baseUrl}/replay/${id_replay}`, {
            method: 'DELETE',
            headers: {token: `${token}`}
        });
        
        if (!response.ok) {
            throw new Error('An error occurred while deleting the replay.');
        }
        else{
            alert("Supprimer avec succés")
        }
    }
    

    return (
        <div className="allInterv">
          <div style={{ paddingTop: '90px' }}>
            <h2 style={{ margin: '0', color: 'white' }}>Tous les</h2>
            <h3 style={{ fontSize: '2rem', margin: '0' , color:'#004651'}}>Replay</h3>
          </div>
          <br />
          {isAdmin ? (
            <div>
              <br />
              <button className="btnMain2" onClick={() => handleClick()}>
                Ajouter un nouveau replay
              </button>
            </div>
          ) : null}
          <br />
          <br />
          <div className="container">
            <div className="row">
              {elements && elements.length > 0 ? (
                elements.map((element: Replay) => (
                  <div key={element.id} className="col-md-4 ">
                    <div className="intervenantbloc">
                      <p>{element.nom}</p>
                      <p>{element.description}</p>
                      <a href={"https://bcombrun.com/Spot-Pharma-Image/Replay/" + element.replay}>
                        <button className="btnMain2">
                          Voir le replay <span><FontAwesomeIcon icon={faCirclePlay} style={{ color: '#23A082' }} /></span>
                        </button>
                      </a>
                      <br /><br />
                      {isAdmin ? (
                        <div>
                          <br />
                          <button className="btnMain2" onClick={() => handleDeleteReplay(element.id)}>
                            Supprimer <span><FontAwesomeIcon icon={faXmark} style={{ color: 'red', fontSize: '1.2rem', cursor: 'pointer' }} /></span>
                          </button>
                          <br /><br />
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <h3>Aucune vidéo encore disponible</h3>
              )}
            </div>
          </div>
          <br /><br /><br />
        </div>
      );
      

}

export default Replay;