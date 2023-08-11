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
    const { data: elements, isError } = useQuery("Sponsors", async () => {
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
                    <div key={element.id} className="col-md-4 ">
                        <div className="intervenantbloc">   
                            <div style={{ height: '70px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                src={"https://bcombrun.com/Spot-Pharma-Image/LogoSponsors/" + element.image}
                                alt=""
                            />
                            </div> 
                            <div style={{height:'100px'}}>
                            <p>{element.nom}</p>
                            <p style={{fontSize:'0.9rem'}}>{element.description}</p>
                            </div>    
                            {isAdmin ?(
                                <div>
                                    <br />
                                    <button className="btnMain2"> Supprimer <span><FontAwesomeIcon onClick={() => handleDeleteSponsors(element.id)} icon={faXmark} style={{color:'red', fontSize:'1.2rem', cursor:'pointer'}}/></span></button>
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

