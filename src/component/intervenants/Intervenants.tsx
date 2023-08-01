import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export default function Intervenants(){

    interface Intervenant {
        id: number;
        nom:any;
        description:any;
        image:any
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

    //fetch les intervenants
    const { data: elements, isLoading, isError } = useQuery("Invites", async () => {
        try {
          const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/invites", {}); 
          if (!response.ok) {
            throw new Error("Failed to fetch invites");
          }
          const data = await response.json();
          return data;
        } catch (err) {
          throw new Error("An error occurred while fetching invite");
        }
    });

    if (isLoading) {
        return <div>Chargement...</div>;
    }
    
    if (isError) {
    alert("erreur")
    }
    console.log(elements)
    if (!elements || elements.length === 0) {
    return <div>Aucun intervenant disponible</div>;
    }

    const handleClick=()=>{
    navigate(`./addIntervenants`)
    }
    
        
    

    return(


        <div className="allInterv">   
            <div style={{paddingTop:'90px'}}>
            <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0"}}>Intervenants</h3>
            </div>             
            <br /><br />
            {isAdmin ? (
                <button className="btnMain2" onClick={() => handleClick()}>Ajouter un nouvel intervenant</button>  
            ):null}
            <br /><br /> 
            <div className="container">
                <div className="row">
                    {elements?.slice(0.3).map((element:Intervenant)=>(
                    <div key={element.id} className="col-md-4" style={{marginTop:'50px'}}>
                        <div className="intervenants">
                            <div className="invite_img">
                                <img  alt="" src={"https://bcombrun.com/Spot-Pharma-Image/Intervenant/" + element.image}/>
                            </div>
                          
                        </div>                     
                        <p>{element.nom}</p>
                        <p>{element.description}</p>
                    </div>
                    ))}        
                </div>
            </div>
            <br /><br /><br />
                                   
        </div> 

    )

}