import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

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
        if (user?.role === 1) {
        setIsadmin(true);
        }
    }, [user]);

    //fetch les replay
    const { data: elements, isError } = useQuery("Replay", async () => {
        try {
          const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/replay"); 
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
        const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/replay/${id_replay}`, {
            method: 'DELETE',
            headers: {token: `${token}`,}
        });
        
        if (!response.ok) {
            throw new Error('An error occurred while deleting the replay.');
        }
        else{
            alert("Supprimer avec succés")
        }
    }
    

    return(


        <div className="allInterv">   
            <div style={{paddingTop:'90px'}}>
            <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0"}}>Replay</h3>
            </div>             
            <br />
            {isAdmin ? (
                <div>
                    <br />
                    <button className="btnMain2" onClick={() => handleClick()}>Ajouter un nouveaux replay</button>  
                </div>                
            ):null}
            <br /><br /> 
            <div className="container">
                <div className="row">
                    {elements?.slice(0.3).map((element:Replay)=>(
                    <div key={element.id} className="col-md-4 ">
                        <div className="intervenantbloc">   
                            <p>{element.nom}</p>                                                    
                            <p>{element.description}</p> 
                            <a href={"https://bcombrun.com/Spot-Pharma-Image/Replay/" + element.replay}>
                                <button className="btnMain2"> Voir le replay</button>   
                            </a>                                                        
                            {isAdmin ?(
                                <div>
                                    <br />
                                    <button className="btnMain2" onClick={() => handleDeleteReplay(element.id)}> Supprimer <span><FontAwesomeIcon  icon={faXmark} style={{color:'red', fontSize:'1.2rem', cursor:'pointer'}}/></span></button>
                                    <br /><br />
                                </div>                                         
                            ):null}   
                        </div>
                        
                    </div>
                    ))}        
                </div>
            </div>
            <br /><br /><br />
                                   
        </div> 

    )

}

export default Replay;