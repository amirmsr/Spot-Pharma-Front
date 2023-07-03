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


function Session() {

    const { sessionId } = useParams<{ sessionId: string }>();
    
    //fetch les inscrits
    const { data: users } = useQuery("Users", async () => {
    try {
    const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/users`, {});
    if (!response.ok) {
        throw new Error("Failed to fetch sessions");
    }
    const data = await response.json();
    return data;
    } catch (err) {
    throw new Error("An error occurred while fetching sessions");
    }
    });


    // fetch les sessions
    const { data: inscrits } = useQuery("Inscrits", async () => {
    try {
    const response = await fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/session_inscrit/${sessionId}`, {});
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

    const filterUsers = users.filter((user: { id: any; })=>{
        const exists = inscrits.some((inscrit: { id_user: any; }) => inscrit.id_user === user.id)
        return exists
    })

    filterUsers.map((filterUser: any)=>{
        console.log(filterUser)
    })
   





  return (
    <div className="container">
     
    
    </div>
  );
}

export default Session;
