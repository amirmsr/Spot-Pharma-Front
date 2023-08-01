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

    const { data: elements, isLoading, isError } = useQuery("Sessions", async () => {
        try {
          const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/invites", {});   //https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sessions
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
        navigate(`https://spot-pharma-front.vercel.app/addIntervenants`)
      }
    
        
    

    return(


        <div className="allInterv">   
            <div style={{paddingTop:'90px'}}>
            <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0"}}>Intervenants</h3>
            </div> 
            <br /><br />
            <button className="btnMain2" onClick={() => handleClick()}>Ajouter un nouvel intervenant</button>
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