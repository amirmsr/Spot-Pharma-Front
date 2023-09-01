import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";





function EditSponsor() {

    const { sponsor_id } = useParams<{ sponsor_id: any }>();
    const token = localStorage.getItem("token");

    const [data, setData] = useState({
        nom: "",
        description: "",
        lien:""
    });
      


    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };
    

    //edit sponsor
    const { mutate: editSponsor } = useMutation(async () => {
    try {
        const headers = { token: `${token}` };
        const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sponsor/${sponsor_id}`, {  //https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/session_inscrit
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
        window.location.href = "/sponsors";
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
        editSponsor()

    }







  return (
    <div>
        <form style={{paddingBottom:'500px',paddingTop:'100px'}} onSubmit={handleSubmit}>

            <div className="add">
              <br /><br /><br />
                <h1>Modification partenaire</h1>
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
                    <div className="col"  style={{marginBottom:'20px'}}>
                      <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Lien</p>
                      <input type="text" name="lien"  placeholder='Lien' onChange={handleChange} />
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

export default EditSponsor;
