import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";





function EditSession() {

    const { sessionId } = useParams<{ sessionId: any }>();
    const token = localStorage.getItem("token");

    const [data, setData] = useState({
        titre: "",
        session_date: "",
        type: "",
        description:"",
        invites: "",
        invites2: "",
    });
      


    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };
    

    //edit session
    const { mutate: editSession } = useMutation(async () => {
    try {
        const headers = { token: `${token}` };
        const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sessions/${sessionId}`, {  //https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/session_inscrit
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
        editSession()
    }







  return (
    <div>
        <form style={{paddingBottom:'500px',paddingTop:'100px'}} onSubmit={handleSubmit}>

            <div className="add">
              <br /><br /><br />
                <h1>Inscription</h1>
                <br /><br />
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Titre</p>
                      <input type="text" name="titre"  placeholder='Titre' onChange={handleChange} />
                    </div>
                    <div className="col">
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Session Date</p>
                    <input type="text" name="session_date"  placeholder='Session Date' onChange={handleChange} />
                    </div>
                    <div className="col">
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Type de session</p>
                    <input type="text" name="type"  placeholder="Type de session" onChange={handleChange} />
                    </div>
                    <div className="col">
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Déscription de la session</p>
                    <input type="text" name="description"  placeholder="Déscription de la session" onChange={handleChange} />
                    </div>
                    <div className="col">
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Nom du première invité</p>
                    <input type="text" name="invites"  placeholder="Nom du première invité" onChange={handleChange} />
                    </div>
                    <div className="col">
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Nom du second invité</p>
                    <input type="text" name="invites2"  placeholder="Nom du second invité" onChange={handleChange} />
                    </div>
                  </div>
                </div>
               
                <br />                
                <br />

                
                <br /><br />
                <button type="submit" className='btnMain2'> S inscrire </button>
       
            </div>
      </form>
     
    </div>
  );
}

export default EditSession;
