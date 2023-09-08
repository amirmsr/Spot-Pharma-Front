import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserData } from "../../CheckAuth";

export default function Sponsors(){

    interface Sponsors {
        id: number;
        nom:any;
        description:any;
        image:any;
        lien:any;
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


    //fetch les sponsors
    const { data: elements, isError } = useQuery("Sponsors", async () => {
        try {
          const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sponsors"); 
          if (!response.ok) {
            throw new Error("Failed to fetch sponsors");
          }
          const data = await response.json();
          const sortedElements = data.sort((a: { nom: string; }, b: { nom: string; }) => a.nom.localeCompare(b.nom));
          
          return sortedElements;

        } catch (err) {
          throw new Error("An error occurred while fetching sponsors");
        }
    });

    if (isError) {
    alert("erreur")
    }
    console.log(elements)


    const handleClick=()=>{
    navigate(`addSponsors`)
    }

    const handleDeleteSponsors= async (id_sponsors: number)=>{
        const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sponsors/${id_sponsors}`, {
          method: 'DELETE',
          headers: {token: `${token}`,}
        });
      
        if (!response.ok) {
          throw new Error('An error occurred while deleting the intervenant.');
        }
        else{
          alert("Supprimer avec succés")
        }
    }
        
    

    return(


        <div className="allInterv">   
            <div style={{paddingTop:'90px'}}>
            <h2  style={{ margin:"0", color:"white"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0", color:"#7DBA33"}}>Partenaires</h3>
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
                    <div key={element.id} className="col-md-4 ">
                            <div className="intervenantbloc">
                                <Link to={element.lien} target="_blank">
                                    <div style={{ height: '70px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <img
                                            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                            src={"https://bcombrun.com/Spot-Pharma-Image/LogoSponsors/" + element.image}
                                            alt=""
                                        />
                                    </div>
                                </Link>                              
                                <div style={{height:'100px'}}>
                                <p>{element.nom}</p>
                                <p style={{fontSize:'0.9rem'}}>{element.description}</p>
                                </div>    
                                {isAdmin ?(
                                    <div>
                                        <br />
                                        <button className="btnMain2" onClick={() => handleDeleteSponsors(element.id)}> Supprimer <span><FontAwesomeIcon  icon={faXmark} style={{color:'red', fontSize:'1.2rem', cursor:'pointer'}}/></span></button>
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

