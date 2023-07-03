import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";



interface Users {
  id: number;  
  name : string;
  email: string;
  password: string;
  validation:boolean;
  role:boolean
}

const token = localStorage.getItem("token");
function Session() {

    const { sessionId } = useParams<{ sessionId: any }>();
    console.log(sessionId)

    //fetch les user
    const { data: users } = useQuery("Users", async () => {
    try {
    const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/users`, {
        headers: {
            token: `${token}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch sessions");
    }
    const data = await response.json();
    return data;
    } catch (err) {
    throw new Error("An error occurred while fetching sessions");
    }
    });
    console.log(users)


    // fetch les user inscrit au sessions
    const { data: inscrits } = useQuery("Inscrits", async () => {
    try {
    const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/session_inscrit/${sessionId}`, {
        headers: {
            token: `${token}`,
        }
    });
    if (!response.ok) {
        throw new Error("Failed to fetch sessions");
    }
    const data = await response.json();
    return data;
    } catch (err) {
    throw new Error("An error occurred while fetching sessions");
    }
    });
    console.log(inscrits)


    // filtrer users 
    var filteredUsers:Users[] = []
    
    if(users){
        filteredUsers = users?.filter((user: { id: any; }) => {
            const exists = inscrits?.some((inscrit: { id_user: any; }) => inscrit?.id_user === user?.id);
            return exists;
        });
        filteredUsers.map((filteredUser: Users) => {
            console.log(filteredUser);
        });      
    }
   





  return (
    <div className="container">
        <div className="row">
            {filteredUsers.map((filteredUser:Users)=>(
                <div key={filteredUser.id} className="col-md-4">
                    <div className="session">
                        <div>
                            <FontAwesomeIcon icon={faUser} style={{color:'#28A082'}}/>
                            <h3>{filteredUser.name}</h3>
                            <p>{filteredUser.email}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    
    </div>
  );
}

export default Session;
