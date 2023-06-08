import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Inscription(){


  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    validation:"valide",
    role:"admin"
    
  });
  


  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      const response = await axios.post('http://162.19.64.70:8800/inscription', data);
      console.log(response.data)
      navigate('/')
    }catch(error){
      console.log(error)
    }
  }






  return (
    
      <div>
        <form className='addSessionForm' onSubmit={handleSubmit}>

            <div className="add">
                <h1>Inscription</h1>
                <br /><br />
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Nom</p>
                      <input type="text" name="name"  placeholder='Nom' onChange={handleChange} />
                    </div>
                    <div className="col">
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Email</p>
                    <input type="text" name="email"  placeholder='Email' onChange={handleChange} />
                    </div>
                    <div className="col">
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Password</p>
                    <input type="password" name="password"  placeholder="mot de passe" onChange={handleChange} />
                    </div>
                  </div>
                </div>
               
                <br />                
                <br />

                
                <br /><br />
                <button type="submit" className='btnAddSession'> S inscrire </button>
       
            </div>
      </form>
     
  
    </div>
  )
}

