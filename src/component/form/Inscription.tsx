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
      alert(error)
      console.log(error)
    }
  }






  return (
    
    <div className="loginBg">
    <div className="container">
      <form style={{ paddingBottom: '100px', padding: '100px' }} onSubmit={handleSubmit}>
        <div className="add" style={{ backgroundColor: 'white', padding: '0px 20px', borderRadius: '15px' }}>
          <br /><br /><br />
          <h1 style={{ color: '#1A4550', textAlign: 'center' }}>Inscription</h1>
          <br /><br />
          <div className="form-group">
            <label htmlFor="name" style={{ color: '#1A4550', fontSize: '1.5rem' }}>Nom</label>
            <center><input style={{width:'30%'}} className='form-control' type="text" id="name" name="name" placeholder='Nom' onChange={handleChange} required /></center>
          </div>
          <br /><br />
          <div className="form-group">
            <label htmlFor="prenom" style={{ color: '#1A4550', fontSize: '1.5rem' }}>Prénom</label>
            <center><input style={{width:'30%'}} className='form-control' type="text" id="prenom" name="prenom" placeholder='Prénom' onChange={handleChange} required /></center>
          </div>
          <br /><br />
          <div className="form-group">
            <label htmlFor="email" style={{ color: '#1A4550', fontSize: '1.5rem' }}>Email</label>
            <center><input type="text" style={{width:'30%'}} id="email" name="email" className='form-control' placeholder='Email' onChange={handleChange} required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" /></center>
          </div>
          <br /><br />
          <p style={{ color: '#1A4550', fontSize: '1.5rem', textAlign: 'center' }}>Fonction</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <select style={{ width: '30%' }} name="fonction" onChange={handleSelectChange} value={data.fonction} required>
              <option value="">Sélectionnez une fonction</option>
              {fonctionOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ marginTop: '30px', width: '60%' }}>
              <label htmlFor="password" style={{ color: '#1A4550', fontSize: '1.5rem' }}>Mot de passe</label>
             <center><input style={{width:'30%'}} className='form-control' type="password" id="password" name="password" placeholder="Mot de passe" onChange={handleChange} required /></center>
            </div>
          </div>
          <br /><br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className='btnMain2 btn-block'>S'inscrire</button>
          </div>
          <br /><br />
        </div>
      </form>
    </div>
  </div>
  
  )
}

