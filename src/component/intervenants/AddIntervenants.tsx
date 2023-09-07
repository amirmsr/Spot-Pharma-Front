import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useMutation, useQuery } from "react-query";
import { fetchUserData } from "../CheckAuth";
import { baseUrl } from "../../config";




function AddIntervenants() {

    const [data, setData] = useState({
        nom: "",
        description: "",
    });

    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isAdmin, setIsadmin] = useState(false);
    const token = localStorage.getItem("token");



    //fetch profil
    const { data: user, isLoading } = useQuery("userProfile", () => fetchUserData(token));

    useEffect(() => {
      if (!isLoading && user?.role === 1) {
        setIsadmin(true);
      }
    }, [isLoading, user]);



        
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    };
    
    console.log(data)
    //upload image
    const uploadImage = useMutation((formData: FormData) => {
        return fetch(`${baseUrl}/sessions/intervenants`, {
            method: 'POST',
            headers: {token: `${token}`},
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
            formData.append("intervenants", selectedFile);
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

                <br /><br />

                <Form.Control type="file" id="image" name="image" onChange={handleChangeFile} style={{width:'50%', margin:'0 auto'}}/>
                <br></br> 
                <button type="submit" className="btnMain2" disabled={isDisabled} style={{opacity: isDisabled ? 0.4 : 1}}> 
                    {uploadImage.status === 'loading' ? 'Ajout...' : 'Ajouter'}
                </button>
            </Form>
        </div>

    );
}

export default AddIntervenants;
