import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function Intervenants(){

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
    const { data: elements, isError } = useQuery("Invites", async () => {
        try {
          const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/intervenants"); 
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
    navigate(`addIntervenants`)
    }
    
    const handleDeleteInterv= async (/* id_interv: number */)=>{
       /*  const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/intervenants/${id_interv}`, {
            method: 'DELETE',
            headers: {token: `${token}`,}
        });
        
        if (!response.ok) {
            throw new Error('An error occurred while deleting the intervenant.');
        }
        else{
            alert("okok")
        } */
        alert('oj')
    }
    

    return(


        <div className="allInterv">   
            <div style={{paddingTop:'90px'}}>
            <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0"}}>Intervenants</h3>
            </div>             
            <br />
            {isAdmin ? (
                <div>
                    <br />
                    <button className="btnMain2" onClick={() => handleClick()}>Ajouter un nouvel intervenant</button>  
                </div>                
            ):null}
            <br /><br /> 
            <div className="container">
                <div className="row">
                    {elements?.slice(0.3).map((element:Intervenant)=>(
                    <div key={element.id} className="col-md-4 ">
                        <div className="intervenantbloc">
                            <div className="intervenants "> 
                                <div className="invite_img">
                                    <img  alt="" src={"https://bcombrun.com/Spot-Pharma-Image/Intervenant/" + element.image}/>
                                </div>                            
                            </div>      
                            <div style={{height:'100px'}}>
                            <p>{element.nom}</p>
                            <p style={{fontSize:'0.9rem'}}>{element.description}</p>
                            </div>    
                            {isAdmin ?(
                                <div>
                                    <br />
                                    <button className="btnMain2"> Supprimer <span><FontAwesomeIcon onClick={() => handleDeleteInterv/* (element.id) */} icon={faXmark} style={{color:'red', fontSize:'1.2rem', cursor:'pointer'}}/></span></button>
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

export default Intervenants;