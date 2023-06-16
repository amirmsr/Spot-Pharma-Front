import React, { useState } from "react";
import { useMutation } from "react-query";


export default function Connexion() {
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
      const response = await fetch("https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      return json;
    },
    {
      onSuccess: (data) => {
        const token = data.token;
        console.log(token);
        localStorage.setItem("token", token);
        window.location.href = "/home";
      },
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
          <h1 >Connexion</h1>
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
              <div className="col">
                <p style={{ color: "#7DBA33", fontSize: "1.5rem" }}>Password</p>
                <input
                  type="password"
                  name="password"
                  placeholder="mot de passe"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <br />
          <br />

          <br />
          <br />
          <button type="submit" className="btnMain2" style={{marginBottom:'300px'}}>
            {" "}
            Se connecter{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
