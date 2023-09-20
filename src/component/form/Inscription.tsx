import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../config';

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

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      const response = await axios.post(`${baseUrl}/inscription`, data);
      alert("Votre inscription est bien prise en compte")
      navigate('/connexion')
    }catch(error){
      alert("Ce mail existe déjà")
    }
  }

  return (
  <div className="loginBg">
    <div className="container w-md-75 p-5 text-center">
      <form onSubmit={handleSubmit}>
        <div className="card mt-5 mb-5 p-5">
          <h1 style={{ color: '#1A4550', textAlign: 'center' }}>Inscription</h1>

          <div className="row justify-content-center px-md-5">
            <div className="col-md-4 text-center py-3">
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input className='form-control' type="text" id="name" name="name" placeholder='Nom' onChange={handleChange} required />
              </div>
            </div>
            <div className="col-md-4 text-center py-3">
              <div className="form-group">
                <label htmlFor="prenom">Prénom</label>
                <input className='form-control' type="text" id="prenom" name="prenom" placeholder='Prénom' onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="row justify-content-center px-md-5 py-3">
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className='form-control' id="email" name="email" placeholder='Email' onChange={handleChange} required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" />
              </div>
            </div>
          </div>

          <div className="row justify-content-center px-md-5 py-3">
            <div className="col-md-8">
              <label>Fonction</label>
              <select className="form-select" name="fonction" onChange={handleSelectChange} value={data.fonction} required>
                <option value="">Sélectionnez une fonction</option>
                {fonctionOptions.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row justify-content-center px-md-5 py-3">
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input className='form-control' type="password" id="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button type="submit" className='btnMain2 btn-block'>S'inscrire</button>
          </div>
        </div>

      </form>
    </div>
  </div>
  
  )
}

