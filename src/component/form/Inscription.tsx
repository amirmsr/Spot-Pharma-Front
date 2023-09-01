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
    { value: 'autre', label: 'Autre' },
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
      alert("Votre inscription est bien prise en compte")
      console.log(response.data)
      navigate('/connexion')
    }catch(error){
      console.log(error)
    }
  }






  return (
    
      <div style={{backgroundColor:'#1A4550'}}>
        <form style={{paddingBottom:'100px',paddingTop:'100px'}} onSubmit={handleSubmit}>

            <div className="add" style={{backgroundColor:'white', margin:'0px 150px 0px 150px', padding:'0px 100px 60px 100px', borderRadius:'15px'}}>
              <br /><br /><br />
                <h1 style={{color:'#1A4550'}}>Inscription</h1>
                <br /><br />
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <p style={{color:'#1A4550', fontSize:'1.5rem'}}>Nom</p>
                      <input className='form-control' type="text" name="name"  placeholder='Nom' onChange={handleChange} required/>
                    </div>
                    <div className="col">
                      <p style={{color:'#1A4550', fontSize:'1.5rem'}}>Prenom</p>
                      <input className='form-control' type="text" name="prenom"  placeholder='Prenom' onChange={handleChange} required />
                    </div>                    
                    <div className="col">
                    <p style={{color:'#1A4550', fontSize:'1.5rem'}}>Email</p>
                    <input type="text" name="email" className='form-control'  placeholder='Email' onChange={handleChange} required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" />
                    </div>
                    <br /><br /><br /><br /> 
                    <p style={{ color: '#1A4550', fontSize: '1.5rem' }}>Fonction</p>
                    <center>
                    <select style={{width:'30%'}} name="fonction" onChange={handleSelectChange} value={data.fonction} required>
                      <option value="">Sélectionnez une fonction</option>
                      {fonctionOptions.map((option, index) => (
                        <option key={index} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    </center>
                    <center>
                      <div style={{marginTop:'30px'}}>
                        <p style={{color:'#1A4550', fontSize:'1.5rem'}}>Mot de passe</p>
                        <input style={{width:'30%'}} className='form-control' type="password" name="password"  placeholder="mot de passe" onChange={handleChange} required />
                      </div>
                     
                    </center>                    
                  
                  </div>
                </div> 
                <br /><br />
                <button type="submit" className='btnMain2'> S inscrire </button>
                
       
            </div>
      </form>
     
    </div>
  )
}

