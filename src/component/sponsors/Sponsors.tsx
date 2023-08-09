import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

export default function Sponsors(){

    interface Sponsors {
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

    //fetch les sponsors
    const { data: elements, isLoading, isError } = useQuery("Sponsors", async () => {
        try {
          const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sponsors"); 
          if (!response.ok) {
            throw new Error("Failed to fetch intervenant");
          }
          const data = await response.json();
          return data;
        } catch (err) {
          throw new Error("An error occurred while fetching intervenant");
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
    navigate(`addSponsors`)
    }

    const handleDeleteSponsors= async (id_sponsors: number)=>{
        const headers = { token: `${token}` };
        const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sponsors/${id_sponsors}`, {
          method: 'DELETE',
          headers: {...headers,'Content-Type': 'application/json',}
        });
      
        if (!response.ok) {
          throw new Error('An error occurred while deleting the sponsor.');
        }
        else{
          alert("okok")
        }
    }
        
    

    return(


        <div className="allInterv">   
            <div style={{paddingTop:'90px'}}>
            <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0"}}>Sponsors</h3>
            </div>             
            <br />
            {isAdmin ? (
                <div>
                    <br />
                    <button className="btnMain2" onClick={() => handleClick()}>Ajouter un nouveaux sponsors</button>  
                </div>                
            ):null}
            <br /><br /> 
            <div className="container">
                <div className="row">
                    {elements?.slice(0.3).map((element:Sponsors)=>(
                    <div key={element.id} className="col-md-4" style={{marginTop:'50px'}}>
                        <div className="intervenants">
                            {isAdmin ?(                                                                                    
                                <div>
                                    <FontAwesomeIcon onClick={() => handleDeleteSponsors(element.id)} icon={faXmark} style={{color:'#23A082', fontSize:'1.2rem', cursor:'pointer'}}/>
                                </div>                   
                            ):null}            
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
                                   
        </div> 

    )

}