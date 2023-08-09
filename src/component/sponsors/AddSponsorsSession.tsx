import { useEffect, useState } from "react";
import {useParams ,useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useMutation, useQuery } from "react-query";




function AddSponsorsSession() {

    interface Sponsors {
        id: number;
        nom:any;
        description:any;
        image:any
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


    //fetch les sponsors
    const { data: elements, isLoading, isError } = useQuery("Sponsor", async () => {
        try {
          const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sponsors", {}); 
          if (!response.ok) {
            throw new Error("Failed to fetch invites");
          }
          const data = await response.json();
          return data;
        } catch (err) {
          throw new Error("An error occurred while fetching invite");
        }
    });


    const [sponsors, setSponsors] = useState<{ id_sponsors: number[] }>({
        id_sponsors: []
    });      
      

    //add sponsor a la session
    const { mutate: addSession } = useMutation(async () => {
        try {
            const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/session_sponsors/${sessionId}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               token: `${token}`,
            },
            body: JSON.stringify(sponsors),
            });
    
            if (response.ok) {
            const json = await response.json();
            console.log(json);
            alert("Ajout du sponsor réussit")
            window.location.href = "/sessions";
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
    if (isLoading) {
        return <div>Chargement...</div>;
    }
    if (isError) {
    alert("erreur")
    }
    if (!elements || elements.length === 0) {
    return <div>Aucun sponsor disponible</div>;
    }

    const handleAddSponsors = (elementId: number) => {
        setSponsors((prevData) => ({
            ...prevData,
            id_sponsors: [...prevData.id_sponsors, elementId]
        }));
    }



    
    const handleSubmit = async ()=>{
        addSession()
    }  


    return (

        <div className="allInterv">   
            <div style={{paddingTop:'90px'}}>
            <h2  style={{ margin:"0", color:"#7DBA33"}}>Selectionnez un</h2>
            <h3 style={{fontSize:"2rem", margin:"0"}}>Sponsor</h3>
            </div>             
            <br />
            <br /><br /> 
            <div className="container">
                <div className="row">
                    {elements?.slice(0.3).map((element:Sponsors)=>(
                    <div key={element.id} className="col-md-4" style={{marginTop:'50px', cursor:'pointer'}} onClick={() => handleAddSponsors(element.id)}>
                        <div className="intervenants">
                            <div className="invite_img">
                                <img  alt="" src={"https://bcombrun.com/Spot-Pharma-Image/LogoSponsors/" + element.image}/>
                            </div>
                        </div>                     
                        <p>{element.nom}</p>
                        <p>{element.description}</p>
                    </div>
                    ))}        
                </div>
            </div>
            <br /><br /><br />
            <button type="submit" className='btnMain2' onClick={handleSubmit}> Ajouter </button>         
            <br /><br /><br />  
        </div> 

    );
}

export default AddSponsorsSession;
