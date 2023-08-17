import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";


export default function ResetPassword() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };
  console.log(data);
  const {mutate : loginMutation } = useMutation(
    async () => {
      const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/resetPassword", {
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
        alert("Un mail vous a été envoyé afin de réinitialiser votre mot de passe")  
        navigate(`connexion`)
      },
      onError: () => {
          alert('Problème dans votre mail');
          
      }
      
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation();
  };


  return (
    <div >
      <form className="addSessionForm" onSubmit={handleSubmit} >
        <div className="add" >
          <br /><br /><br />
          <h1 >Réinitialiser mot de passe </h1>
          <br />
          <br />
          <div className="container">
            <div className="row">
              <div className="col">
                <p style={{ color: "#7DBA33", fontSize: "1.5rem" }}>Email</p>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                />
              </div>              
            </div>
          </div>

          <br />
          <br />

          <br />
          <br />
          <button type="submit" className="btnMain2" >
            Se connecter
          </button>
          <br /> <br />
          <p>ou</p>                    
        </div>
      </form>
      <a href="/inscription">
            <button className="btnMain2" style={{marginBottom:'300px'}}>          
              S'inscrire 
            </button>
      </a>
    </div>
  );
}
