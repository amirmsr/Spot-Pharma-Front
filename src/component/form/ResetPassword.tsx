import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";


export default function ResetPassword() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };
  const {mutate : resetPasswordMutation } = useMutation(
    async () => {
      const response = await fetch(`${baseUrl}/resetPassword`, {
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
        navigate(`/connexion`)
      },
      onError: () => {
          alert('Problème dans votre mail');
          
      }
      
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetPasswordMutation();
  };


  return (
    <div >
      <form className="addSessionForm" onSubmit={handleSubmit} >
        <div className="add" >
          <br /><br /><br />
          <h1  style={{color:'white'}} >Réinitialiser mot de passe </h1>
          <br />
          <br />
          <div className="container">
            <div className="row">
              <div className="col">
                <p style={{ color: "#7DBA33", fontSize: "1.5rem" }}>Email</p>
                <center>
                <input
                style={{width:'30%'}}
                  className='form-control'
                  type="text"
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                />
                </center>
                
              </div>
              
            </div>
          </div>
          <br />
          <button type="submit" className="btnMain2" >
            Envoyer
          </button>
          <br /> <br />  <br /><br /><br />            
        </div>
      </form>
    </div>
  );
}
