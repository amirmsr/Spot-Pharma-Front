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

    console.log(sessionId)


  return (
    <div className="container">
     
    
    </div>
  );
}

export default Session;
