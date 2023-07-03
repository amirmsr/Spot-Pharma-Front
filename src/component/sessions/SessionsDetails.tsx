import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";



interface Sessions {
  id: number;
  titre: "";
  session_date: "";
  type: "";
  invites: "";
  invites_descriptions: "";
  invites_images: "";
  invites2: "";
  invites_descriptions2: "";
  invites_images2: "";
  sponsors: "";
  sponsors_descriptions: "";
  sponsors_images: "";
  video_titre: "";
  video: "";
}
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

    //fetch les inscrits
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


    // fetch les inscrit au sessions
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


    // filtrer users 

    if (users) {
        const filteredUsers = users.filter((user: { id: number; }) => {
          const exists = inscrits?.some((inscrit: { id_user: number; }) => inscrit.id_user === user.id);
          return exists;
        });
      
        filteredUsers.map((user: any) => {
          console.log(user);
        });
    }
   





  return (
    <div className="container">
     
    
    </div>
  );
}

export default Session;
