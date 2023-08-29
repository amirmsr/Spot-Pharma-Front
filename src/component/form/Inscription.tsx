import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Inscription(){


  const [data, setData] = useState({
    name: "",
    prenom:"",
    fonction:"",
    email: "",
    password: "",
    validation:1,
    role:0
    
  });

  const fonctionOptions = [
    { value: 'pharmacien', label: 'Pharmacien' },
    { value: 'preparateur', label: 'Préparateur' },
    { value: 'preparatrice', label: 'Préparatrice' },
    { value: 'etudiant', label: 'Étudiant' },
    { value: 'apprenti', label: 'Apprenti' },
    // Ajoutez d'autres options selon vos besoins
  ];
  


  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  console.log(data)

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      const response = await axios.post('https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/inscription', data);
      console.log(response.data)
      navigate('/')
    }catch(error){
      console.log(error)
    }
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
                      <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Nom</p>
                      <input type="text" name="name"  placeholder='Nom' onChange={handleChange} />
                    </div>
                    <div className="col">
                      <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Prenom</p>
                      <input type="text" name="prenom"  placeholder='Prenom' onChange={handleChange} />
                    </div>
                    <div className="col">
                    <p style={{ color: '#7DBA33', fontSize: '1.5rem' }}>Fonction</p>
                    <select name="fonction" onChange={handleSelectChange} value={data.fonction}>
                      <option value="">Sélectionnez une fonction</option>
                      {fonctionOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    </div>
                    <div className="col">
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Email</p>
                    <input type="text" name="email"  placeholder='Email' onChange={handleChange} />
                    </div>
                    <br /><br />
                    <center>
                      <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Mot de passe</p>
                      <input style={{width:'30%'}} type="password" name="password"  placeholder="mot de passe" onChange={handleChange} />
                    </center>                    
                  
                  </div>
                </div>
               
                <br />                
                <br />

                
                <br /><br />
                <button type="submit" className='btnMain2'> S inscrire </button>
       
            </div>
      </form>
     
    </div>
  )
}

