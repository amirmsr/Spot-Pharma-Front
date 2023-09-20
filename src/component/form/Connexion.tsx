import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";


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

  const {mutate : loginMutation } = useMutation(
    async () => {
      const response = await fetch(`${baseUrl}/connexion`, {
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
  const handleInscription = async () => { 
      navigate(`/inscription`)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation();
  };


  return (
  <div className="loginBg">
    <div className="container w-100 p-5 text-center">
      <form onSubmit={handleSubmit}>
        <div className="card p-5">
          <h3>Connexion</h3>

          <div className="row justify-content-center px-md-5 py-3">
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className='form-control' type="text" id="email" name="email" placeholder='Email' onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="row justify-content-center px-md-5 py-3">
            <div className="col-md-8">
              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <input className='form-control' type="password" id="password" name="password" placeholder="Mot de passe" onChange={handleChange} />
              </div>
              <a href="#" onClick={handleChangePassword} className="forgottenPassword">Mot de passe oublié ?</a>
            </div>
          </div>

          <div className="mt-3 mb-1">
            <button type="submit" className='btn btn-outline-success btn-block'>Se connecter</button>
          </div>
          <p>ou</p>
          <div>
            <button onClick={handleInscription} className="btn btn-outline-success btn-block">S'inscrire</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  );
}
