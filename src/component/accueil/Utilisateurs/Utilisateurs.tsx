import { faCirclePlay, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "react-query";


interface Users {
    id: number;  
    name : string;
    email: string;
    password: string;
    validation:boolean;
    role:boolean
}



export default function Utilisateurs(){
  
   //get user data
   const token = localStorage.getItem("token");

   const {data: user}= useQuery("userProfile", async ()=>{
     const token = localStorage.getItem("token");
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


  
    //fetch tous les inscrits
    const { data: allinscrits, } = useQuery("AllInscrit", async () => {
      try {
        const headers = { token: `${token}` };
        const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/users`,{
          headers
        });  
        if (!response.ok) {
          throw new Error("Failed to fetch all inscrits");
        }
        const data = await response.json();
        return data;
      } catch (err) {
        throw new Error("An error occurred while fetching inscrits");
      }
    });


    
  return (

    <div>
    <div style={{paddingTop:'100px'}}>
        <h1>Listes des utilisateur</h1>
        <h1>{allinscrits.length}</h1>
        <div className="container" style={{paddingTop:'100px', paddingBottom:'200px'}}>
            <div className="row">
                {allinscrits.map((allinscrit:Users)=>(
                    <div key={allinscrit.id} className="col-md-4">
                        <div className="session" style={{paddingTop:'50px',marginBottom: '40px',}}>
                            <div>
                                <FontAwesomeIcon icon={faUser} style={{color:'#28A082', fontSize:'2rem'}}/>
                                <h3>{allinscrit.name}</h3>
                                <p>{allinscrit.email}</p>
                            </div>                        
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    
</div>


        



  );
    


}