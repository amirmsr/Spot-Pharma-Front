import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";





function EditIntervenant() {

    const { intervenant_id } = useParams<{ intervenant_id: any }>();
    const token = localStorage.getItem("token");

    const [data, setData] = useState({
        nom: "",
        description: ""
    });
      


    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };
    

    //edit intervenant
    const { mutate: editIntervenant } = useMutation(async () => {
    try {
        const headers = { token: `${token}` };
        const response = await fetch(`${baseUrl}/intervenant/${intervenant_id}`, {  //${baseUrl}/session_inscrit
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

        if (response.ok) {
        const json = await response.json();
        console.log(json);
        alert("Modification pris prise en compte")
        window.location.href = "/intervenants";
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

    console.log(data)


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        editIntervenant()

    }







  return (
    <div>
        <form style={{paddingBottom:'500px',paddingTop:'100px'}} onSubmit={handleSubmit}>

            <div className="add">
              <br /><br /><br />
                <h1>Modification intervenant</h1>
                <br /><br />
                <div className="container">
                  <div className="row">
                    <div className="col"  style={{marginBottom:'20px'}}>
                      <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Nom</p>
                      <input type="text" name="nom"  placeholder='Nom' onChange={handleChange} />
                    </div>
                    <div className="col"  style={{marginBottom:'20px'}}>
                      <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Description</p>
                      <input type="text" name="description"  placeholder='Description' onChange={handleChange} />
                    </div>                  
                    <br /><br />                    
                  </div>
                </div>                                 
                <br />                
                <br />

                
                <br /><br />
                <button type="submit" className='btnMain2'> Modifier </button>
       
            </div>
      </form>
     
    </div>
  );
}

export default EditIntervenant;
