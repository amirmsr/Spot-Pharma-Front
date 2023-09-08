import { faCirclePlay, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQuery } from "react-query";
import { fetchUserData } from "../../../CheckAuth";
import { useEffect, useState } from "react";


interface Users {
    id: number;  
    name : string;
    email: string;
    password: string;
    validation:boolean;
    role:boolean
}



export default function Utilisateurs(){
  
    const [isAdmin, setIsadmin] = useState(false);
    const token = localStorage.getItem("token");
  
    //fetch profil
    const { data: user, isLoading } = useQuery("userProfile", () => fetchUserData(token));

    useEffect(() => {
      if (!isLoading && user?.role === 1) {
        setIsadmin(true);
      }
    }, [isLoading, user]);


  
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
        <h1 style={{color:'white'}}>Listes des utilisateurs</h1>
        <h1>{allinscrits?.length}</h1>
        <div className="container" style={{paddingTop:'100px', paddingBottom:'200px'}}>
            <div className="row">
                {allinscrits?.map((allinscrit:Users)=>(
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