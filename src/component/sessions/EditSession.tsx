import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";





function EditSession() {

    const { sessionId } = useParams<{ sessionId: any }>();
    const token = localStorage.getItem("token");

    const [data, setData] = useState({
        session_date: "",
        type: "",
        description:"",
        video:"",
        jours:""
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
        window.location.href = "/sessions";
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
                <h1>Modification session</h1>
                <br /><br />
                <div className="container">
                  <div className="row">
                    <div className="col"  style={{marginBottom:'20px'}}>
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Session heure</p>
                    <input type="text" name="session_date"  placeholder='Session Heure' onChange={handleChange} />
                    </div>
                    <div className="col"  style={{marginBottom:'20px'}}>
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Type de session</p>
                    <input type="text" name="type"  placeholder="Type de session" onChange={handleChange} />
                    </div>
                    <div className="col"  style={{marginBottom:'20px'}}>
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Déscription de la session</p>
                    <input type="text" name="description"  placeholder="Déscription de la session" onChange={handleChange} />
                    </div>
                    <div className="col"  style={{marginBottom:'20px'}}>
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Lien du live</p>
                    <input type="text" name="video"  placeholder="Lien du live" onChange={handleChange} />
                    </div>
                    <div className="col"  style={{marginBottom:'20px'}}>
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Jours</p>
                    <input type="text" name="jours"  placeholder="Jours" onChange={handleChange} />
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

export default EditSession;
