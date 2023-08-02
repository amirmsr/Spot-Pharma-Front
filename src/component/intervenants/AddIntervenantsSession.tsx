import { useState } from "react";
import {useParams ,useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useMutation } from "react-query";




function AddIntervenantsSession() {

    
    const { sessionId } = useParams<{ sessionId: any }>();

  
    return (

        <div>
        <p>{sessionId}</p>
        </div>

    );
}

export default AddIntervenantsSession;
