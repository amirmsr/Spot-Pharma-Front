import { useState } from "react";
import {useParams ,useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useMutation } from "react-query";




function EditIntervenant3() {

    const navigate = useNavigate();
    const { sessionId } = useParams<{ sessionId: any }>();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    
    //upload video 
    const uploadVideo = useMutation((formData: FormData) => {
        return fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sessions/intervenant3/${sessionId}`, {
            method: 'PUT',
            body: formData
        }).then((response) => {
            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                if (contentType && contentType.indexOf("application/json") !== -1) {
                    return response.json().then(data => {
                        throw new Error(data.error);
                    });
                } else {
                    return response.text().then(text => {
                        throw new Error(text);
                    });
                }
            }
            return response.json();
        });
    }, {
        onSuccess: () => {
            alert("Envoi réussit :) ");
            navigate("/");
        },
        onError: (error: Error) => {
            alert(`Upload failed: ${error.message}`);
        }
    });

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    };
    
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        const formData = new FormData();
        if (selectedFile) {
            formData.append("intervenant3", selectedFile);
        }
        uploadVideo.mutate(formData);
        e.preventDefault()
    }

    const isDisabled = !selectedFile || uploadVideo.status === 'loading';



    return (
        <div>
            <Form onSubmit={handleSubmit} className="mb-3" style={{paddingBottom:'300px',paddingTop:'100px'}}>
                <Form.Label>Changer image intervenant 3</Form.Label>
                <Form.Control type="file" id="video" name="video" onChange={handleChangeFile} />
                <br></br> 
                <button type="submit" disabled={isDisabled} style={{opacity: isDisabled ? 0.4 : 1}}> 
                    {uploadVideo.status === 'loading' ? 'Ajout...' : 'Ajouter'}
                </button>
            </Form>
        </div>
    );
}

export default EditIntervenant3;
