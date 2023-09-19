import { useEffect, useState } from "react";
import {useParams ,useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useMutation, useQuery } from "react-query";
import { baseUrl } from "../../config";




function AddReplaySession() {

    interface Replay {
        id: number;
        nom:any;
        description:any;
        replay:any
    }
    
    const { sessionId } = useParams<{ sessionId: any }>();
    const navigate = useNavigate()
    const [isAdmin, setIsadmin] = useState(false);
    const token = localStorage.getItem("token");



    //get user data
    const {data: user}= useQuery("userProfile", async ()=>{
        if (!token){
        throw new Error("token missing");
        }
        const response = await fetch (`${baseUrl}/home`,{
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
    const { data: elements, isLoading, isError } = useQuery("Replay", async () => {
        try {
          const response = await fetch(`${baseUrl}/replay`, {}); 
          if (!response.ok) {
            throw new Error("Failed to fetch replay");
          }
          const data = await response.json();
          return data;
        } catch (err) {
          throw new Error("An error occurred while fetching replay");
        }
    });



      

    //add replay a la session
    const { mutate: addSession } = useMutation(async () => {
        try {
            const response = await fetch(`${baseUrl}/session_replay/${sessionId}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               token: `${token}`,
            },
            body: JSON.stringify(replays),
            });
    
            if (response.ok) {
            const json = await response.json();
            alert("Ajout du replay réussit")
            window.location.href = "/replay";
            return json;
            } else {
            // Gérer l'erreur de duplication ici
            alert("Problème")
            }
        } catch (error) {
            // Gérer d'autres erreurs ici
            console.error(error);
            throw error;
        }
    });


    const [replays, setReplays] = useState<{ id_replay: number[] }>({
        id_replay: []
    });      

    const handleAddReplay = (elementId: number) => {
        setReplays((prevData) => ({
            ...prevData,
            id_replay: [...prevData.id_replay, elementId]
        }));
    }

    const replaySelected = elements?.filter((element: { id: any; }) => replays.id_replay.includes(element.id));



    
    const handleSubmit = async ()=>{
        addSession()
    }  

    if (isLoading) {
        return <div>Chargement...</div>;
    }
    if (isError) {
    alert("erreur")
    }
    if (!elements || elements.length === 0) {
    return <div>Aucun replay disponible</div>;
    }


    return (

        <div className="allInterv">   
            <div style={{paddingTop:'90px'}}>
                <h2  style={{ margin:"0", color:"#7DBA33"}}>Selectionnez un</h2>
                <h3 style={{fontSize:"2rem", margin:"0"}}>Replay</h3>
                <br /><br />
                <center>                
                    {replaySelected?.map((replay:Replay)=>(
                        <div>
                            <p>{replay.replay}</p>
                        </div>
                    ))}
                </center>
                <br />
                <button type="submit" className='btnMain2' onClick={handleSubmit}> Ajouter </button>         
            </div>             
            <br />
            <br /><br /> 
            <div className="container">
                <div className="row">
                    {elements?.slice(0.3).map((element:Replay)=>(
                    <div key={element.id} className="col-md-4 " onClick={() => handleAddReplay(element.id)} style={{cursor:"pointer"}}>
                        <div className="intervenantbloc">   
                            <div style={{ height: '70px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>                            
                            </div> 
                            <div style={{height:'100px'}}>
                            <p>{element.nom}</p>
                            <p style={{fontSize:'0.9rem'}}>{element.description}</p>
                            </div>    
                        </div>
                        
                    </div>
                    ))}        
                </div>
            </div>
          
            <br /><br /><br />  
        </div> 

    );
}

export default AddReplaySession;
