import { useState } from "react";
import {useParams ,useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useMutation } from "react-query";




function AddIntervenants() {

    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [data, setData] = useState({
        nom: "",
        description: "",
    });
        
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };
    
      
    //upload image
    const uploadImage = useMutation((formData: FormData) => {
        return fetch(`https://spot-pharma-api-bd00f8c1ff03.herokuapp.com/sessions/invite`, {
            method: 'POST',
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
            navigate("/intervenants");
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

        formData.append("nom", data.nom);
        formData.append("description", data.description);

        if (selectedFile) {
            formData.append("invite", selectedFile);
        }
        console.log(formData)
        uploadImage.mutate(formData);
        e.preventDefault()
    }

    const isDisabled = !selectedFile || uploadImage.status === 'loading';



    return (

        <div>
            <Form onSubmit={handleSubmit} className="mb-3" style={{paddingBottom:'300px',paddingTop:'100px'}}>
                <Form.Label>Ajouter un intervenant</Form.Label>

                <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Nom</p>
                <input type="text" name="nom"  placeholder='Nom' onChange={handleChange} />
                <br />
                <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Description</p>
                <input type="text" name="description"  placeholder='Description' onChange={handleChange} />


                <Form.Control type="file" id="image" name="image" onChange={handleChangeFile} />
                <br></br> 
                <button type="submit" disabled={isDisabled} style={{opacity: isDisabled ? 0.4 : 1}}> 
                    {uploadImage.status === 'loading' ? 'Ajout...' : 'Ajouter'}
                </button>
            </Form>
        </div>

    );
}

export default AddIntervenants;
