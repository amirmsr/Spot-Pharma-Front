import { useState } from "react";
import { useMutation } from "react-query";






function AddSession() {

    const token = localStorage.getItem("token");

    const [data, setData] = useState({
        titre: "",
        session_date: "",
        type: "",
        description:"",
    });
      


    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };
    

    //add session
    const { mutate: addSession } = useMutation(async () => {
    try {
        const headers = { token: `${token}` };
        const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sessions/`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });

        if (response.ok) {
        const json = await response.json();
        console.log(json);
        alert("Ajout de session réussit")
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
        addSession()

    }







  return (
    <div>
        <form style={{paddingBottom:'300px',paddingTop:'100px'}} onSubmit={handleSubmit}>

            <div className="add">
              <br /><br /><br />
                <h1>Ajouter une session</h1>
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
                    <br /><br />                    
                  </div>
                </div>                                
               
                <br /><br />

                
                <br /><br />
                <button type="submit" className='btnMain2'> Ajouter </button>
       
            </div>
      </form>
     
    </div>
  );
}

export default AddSession;
