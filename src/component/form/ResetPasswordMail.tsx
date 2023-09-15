import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../config";


export default function ResetPasswordMail() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    password: "",
  });
  const { token } = useParams<{ token: any }>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };
  console.log(data);
  const {mutate : resetPasswordMutation } = useMutation(
    async () => {
      const response = await fetch(`${baseUrl}/resetPassword/${token}`, {
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
        alert("Modification de mot passe réussite")  
        navigate(`/connexion`)
      },
      onError: () => {
          alert('Problème lors de la modification de votre mot de passe');
          
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
          <h1 style={{color:'white'}}>Écrivez votre nouveau mot de passe</h1>
          <br />
          <br />
          <div className="container">
            <div className="row">
              <div className="col">
                <p style={{ color: "#7DBA33", fontSize: "1.5rem" }}>Mot de passe</p>
                <input
                  type="text"
                  name="password"
                  placeholder="mot de passe"
                  onChange={handleChange}
                />
              </div>
              
            </div>
          </div>
          <br />
          <button type="submit" className="btnMain2" >
            Envoyer
          </button>
          <br /> <br />              
        </div>
      </form>
    </div>
  );
}
