import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";


export default function Connexion() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };
  console.log(data);
  const {mutate : loginMutation } = useMutation(
    async () => {
      const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      
      return json
      
    },
    {
      onSuccess: (data) => {
        const token = data.token;
        console.log(token);        
        localStorage.setItem("token", token);
        window.location.href = "/home";
      },
      onError: () => {
          alert('mauvais mot de passe ou mauvais mail où compte non valide');
          
      }
      
    }
  );

  const handleChangePassword = async () => { 
      navigate(`/resetPassword`)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation();
  };


  return (
    <div className="loginBg" /* style={{ backgroundColor: '#1A4550' }} */>
    <form style={{ paddingBottom: '100px', paddingTop: '100px' }} onSubmit={handleSubmit}>

      <div className="add" style={{ backgroundColor: 'white', margin: '0px 150px 0px 150px', padding: '0px 100px 0px 100px', borderRadius: '15px' }}>
        <br /><br /><br />
        <h1 style={{ color: '#1A4550' }}>Connexion</h1>
        <br /><br />
        <div className="container">
          <div className="row">
            <div className="col">
              <p style={{ color: '#1A4550', fontSize: '1.5rem' }}>Email</p>
              <input className='form-control' type="text" name="email" placeholder='Email' onChange={handleChange} />
            </div>
            <div className="col">
              <p style={{ color: '#1A4550', fontSize: '1.5rem' }}>Mot de passe</p>
              <input className='form-control' type="password" name="password" placeholder="Mot de passe" onChange={handleChange} />
            </div>
          </div>
        </div>
        <br /><br />
        <button type="submit" className='btnMain2'>Se connecter</button>
        <br /><br />
        <p>où</p>
        <div className="container">
          <div className="row">                       
            <div className="col">
              <a href="/inscription">
                <button className="btnMain2"> S'inscrire </button>
              </a>
            </div>
            <div className="col">
            <button onClick={handleChangePassword} className="btnMain2" style={{ marginBottom: '100px' }}> Mot de passe oublié </button>
            </div>
          </div>
        </div>
        </div>
    </form>
    
  </div>
  );
}
