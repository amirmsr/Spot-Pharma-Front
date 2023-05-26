import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddSessions = () => {
  const [data, setData] = useState({
    titre: "",
    session_date: "",
    type: "",
    invites: "",
    invites_descriptions:"",
    invites_images: "",
    invites2: "",
    invites_descriptions2:"",
    invites_images2: "",
    sponsors: "",
    sponsors_descriptions: "",
    sponsors_images: "",
    video_titre:"",
    video:"",
  });
  


  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };


  //envoie image invite 1

  const [invites_images, setInvites_images] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setInvites_images(selectedFile);

    const filePath = e.target.value;
    const fileName = filePath.split('\\').pop();
    const imagePath = fileName || "";
    setImagePath(imagePath);

    setData((prev) => ({ ...prev, invites_images: imagePath }));

  };

    //envoie image invite 2

    const [invites_images2, setInvites_images2] = useState<File | null>(null);
    const [imagePath2, setImagePath2] = useState("");
  
    const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files && e.target.files[0];
      setInvites_images2(selectedFile);
  
      const filePath = e.target.value;
      const fileName = filePath.split('\\').pop();
      const imagePath2 = fileName || "";
      setImagePath2(imagePath2);
  
      setData((prev) => ({ ...prev, invites_images2: imagePath2 }));
  
    };



  //envoie sponsor image

  const [sponsors_images, setSponsors_images] = useState<File | null>(null);
  const [imagePathsp, setImagePathsp] = useState("");

  const handleFileChangeSp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setSponsors_images(selectedFile);

    const filePath = e.target.value;
    const fileName = filePath.split('\\').pop();
    const imagePathsp = fileName || "";
    setImagePathsp(imagePathsp);

    setData((prev) => ({ ...prev, sponsors_images: imagePathsp }));

  };

  //envoie video 

  const [video, setVideo] = useState<File | null>(null);
  const [imagePathsVideo, setImagePathVideo] = useState("");

  const handleFileChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setVideo(selectedFile);

    const filePath = e.target.value;
    const fileName = filePath.split('\\').pop();
    const imagePathsVideo = fileName || "";
    setImagePathVideo(imagePathsVideo);

    setData((prev) => ({ ...prev, video: imagePathsVideo }));

  };





    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("invites_images", invites_images as File);
        formData.append("invites_images2", invites_images2 as File);
        formData.append("sponsors_images", sponsors_images as File);
        formData.append("video", video as File);


        try {
        await axios.post("http://localhost:8800/images", formData, {    
            headers: {
            "Content-Type": "multipart/form-data",
            },
        });
        alert("File uploaded successfully");
        } catch (error) {
        alert("An error occurred while uploading the file");
        }
    };


   // click
    const handleClick = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("invites_images", invites_images as File);
      formData.append("invites_images2", invites_images2 as File);
      formData.append("sponsors_images", sponsors_images as File);
      formData.append("video", video as File);

        const uploadResponse = await axios.post("http://localhost:8800/uploads", formData, {    
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Upload successful: ", uploadResponse.data);
        const addResponse = await axios.post("http://localhost:8800/sessions", data);
        console.log("Add successful: ", addResponse.data);
        navigate("/");
      
  };




  return (
    
      <div>
        <form className='addSessionForm' onSubmit={handleSubmit}>

            <div className="add">
                <h1>Ajouter une nouvelle session</h1>
                <br /><br />
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Titre de l`évènement</p>
                      <input type="text" name="titre"  placeholder='Titre' onChange={handleChange} />
                    </div>
                    <div className="col">
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Date de l`évènement</p>
                    <input type="text" name="session_date"  placeholder='date' onChange={handleChange} />
                    </div>
                    <div className="col">
                    <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Type d`évènement</p>
                    <input type="text" name="type"  placeholder="type d'évènement" onChange={handleChange} />
                    </div>
                  </div>
                </div>
               
                <br />                
                <br />

                <div>
                    <h3>Invité 1</h3>
                    <br />
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Invité Nom</p> 
                          <input type="text" name="invites"  placeholder="invités nom" onChange={handleChange} />   
                        </div>
                        <div className="col">
                          <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Invité description</p> 
                          <input type="text" name="invites_descriptions"  placeholder="invités descriptions" onChange={handleChange} /> 
                        </div>
                        <div className="col">
                          <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Invité Image</p> 
                          <input type="file" name="invites_images"  onChange={handleFileChange}/>
                          <input style={{display:'none'}} type="text" placeholder="invités images" name="invites_images" value={imagePath} onChange={handleChange}/>
                        </div>
                      </div>
                    </div>
                    <br /><br />
                    <h3>Invité 2</h3>
                    <br />
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Invité Nom</p> 
                          <input type="text" name="invites2"  placeholder="invités nom" onChange={handleChange} />    
                        </div>
                        <div className="col">
                          <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Invité Description</p> 
                          <input type="text" name="invites_descriptions2"  placeholder="invités descriptions" onChange={handleChange} /> 
                        </div>
                        <div className="col">
                          <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Invité Image</p> 
                          <input type="file" name="invites_images2"  onChange={handleFileChange2}/>
                          <input style={{display:'none'}} type="text" placeholder="invités images" name="invites_images2" value={imagePath2} onChange={handleChange}/>
                        </div>
                      </div>
                    </div>
                    
                    <br /><br />
                    <h3>Sponsor</h3>
                    <br />
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Sponsor Nom</p> 
                          <input type="text" name="sponsors"  placeholder="sponsor nom" onChange={handleChange} />       
                        </div>
                        <div className="col">
                          <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Sponsor Description</p> 
                          <input type="text" name="sponsors_descriptions"  placeholder="sponsor descriptions" onChange={handleChange} />                         </div>
                        <div className="col">
                          <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Sponsor Image</p> 
                          <input type="file" name="sponsors_images"  onChange={handleFileChangeSp}/>
                          <input style={{display:'none'}}  type="text" placeholder="sponsors images" name="sponsors_images" value={imagePathsp} onChange={handleChange}/>
                        </div>
                      </div>
                    </div>

                    <br /><br />
                    <h3>Video Replay</h3>
                    <br />
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Video Titre</p> 
                          <input type="text" name="video_titre"  placeholder="video titre" onChange={handleChange} />   
                        </div>
                        <div className="col">
                        <input  style={{opacity:'0'}}  type="text" placeholder="video titre" name="video" value={imagePathsVideo} onChange={handleChange}/>
                        </div>
                        <div className="col">
                        <p style={{color:'#7DBA33', fontSize:'1.5rem'}}>Ajouter Video</p> 
                        <input type="file" name="video"  onChange={handleFileChangeVideo}/>
                        </div> 
                                          
                        <div className="col">
                        <input  style={{display:'none'}}  type="text" placeholder="video titre" name="video" value={imagePathsVideo} onChange={handleChange}/>
                        </div>
                        
                        
                      </div>
                    </div>
                  
                   
                </div>
                                
              


                <br /><br />
                <button type="submit" className='btnAddSession' onClick={handleClick}> Enregistrer la session </button>
       
            </div>
      </form>
     
  
    </div>
  )
};

export default AddSessions;