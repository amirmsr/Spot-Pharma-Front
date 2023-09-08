import { faPen, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../../CheckAuth";
import { Intervenant } from "../../types";
import { baseUrl } from "../../config";

function Intervenants(){


    
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

    

    //fetch les intervenants
    const { data: elements, isError } = useQuery("Invites", async () => {
        try {
          const response = await fetch(`${baseUrl}/intervenants`); 
          if (!response.ok) {
            throw new Error("Failed to fetch intervenant");
          }
          const data = await response.json();
          const sortElements = data.sort((a: { nom: string; }, b: { nom: string; }) => a.nom.localeCompare(b.nom));
          return sortElements;
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
    
    const handleDeleteInterv= async (id_interv: number)=>{
        const response = await fetch(`${baseUrl}/intervenants/${id_interv}`, {
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

    //edit intervenant
    const handleEdit=(intervenant_id: number)=>{
        navigate(`edit/${intervenant_id}`)
    }
    

    return(


        <div className="allInterv">   
            <div style={{paddingTop:'90px'}}>
            <h2  style={{ margin:"0", color:"white"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0", color:"#23A082"}}>Intervenants</h3>
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
                            <div>
                                {isAdmin ?(
                                    <div>             
                                    <Dropdown>
                                    <Dropdown.Toggle variant="success" style={{backgroundColor:'#7DBA33'}} id="dropdown-basic">
                                        Modifier   <span><FontAwesomeIcon  icon={faPenToSquare} style={{ fontSize:'1.5rem', cursor:'pointer'}}/>  </span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>                                        
                                        <Dropdown.Item onClick={() => handleEdit(element.id)}> Modifier texte intervenant <span><FontAwesomeIcon icon={faPen} style={{color:'#23A082'}} /></span></Dropdown.Item>                                       
                                    </Dropdown.Menu>
                                    </Dropdown>
                                    </div>
                                ):null}              
                            </div>
                            <br />
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
                                    <button className="btnMain2" onClick={() => handleDeleteInterv(element.id)}> Supprimer <span><FontAwesomeIcon  icon={faXmark} style={{color:'red', fontSize:'1.2rem', cursor:'pointer'}}/></span></button>
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