import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config";
import { Users } from "../../types";





function Session() {
    
    const token = localStorage.getItem("token");
    const { sessionId } = useParams<{ sessionId: any }>();
    console.log(sessionId)

    //fetch les user
    const { data: users } = useQuery("Users", async () => {
    try {
    const response = await fetch(`${baseUrl}/users`, {
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
    const response = await fetch(`${baseUrl}/session_inscrit/${sessionId}`, {
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
    <div>
        <div style={{paddingTop:'100px'}}>
            <h1>Listes des inscrits</h1>
            <h1>{filteredUsers.length}</h1>
            <div className="container" style={{paddingTop:'100px', paddingBottom:'200px'}}>
                <div className="row">
                    {filteredUsers.map((filteredUser:Users)=>(
                        <div key={filteredUser.id} className="col-md-4">
                            <div className="session" style={{paddingTop:'50px',marginBottom: '40px',}}>
                                <div>
                                    <FontAwesomeIcon icon={faUser} style={{color:'#28A082', fontSize:'2rem'}}/>
                                    <h3>{filteredUser.name}</h3>
                                    <p>{filteredUser.email}</p>
                                </div>                        
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    </div>
    
  );
}

export default Session;
