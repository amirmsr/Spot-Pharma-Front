

function Accueil(){





    return(
        <div>
            <div className='main_div'>
                <div className='main_div_cont'>
                    <img  src="./logo.png" alt="" style={{width:"30%", height:"30%"}} /> 
                    <br></br><br></br>
                    <h1>SPOT PHARMA 7 <br></br>Conférences 2023</h1>                               
                    <p>20 Septembre au 1er Octobre</p>
                    <br></br><br></br>
                    <button className='btnMain'>Visionnez les replays</button> 
                </div>
               
            </div>


                    <br /><br /><br />


            <div className="partenaire">
                <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
                <h3 style={{fontSize:"2rem", margin:"0"}}>Partenaires</h3>
                <br></br><br /><br />
                
                <div className='container sponsors' >
                    <div className="row">

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="sponsor_img">
                                <img src="../uploads/LogoSponsors/211125-sanofi-logo-rgb.png" alt="" />
                            </div>

                            <br />
                            <p>texte</p>
                            <p>txte</p>
                            </div>  
                        </div>

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="sponsor_img">
                            <img src="../uploads/LogoSponsors/Pfizer_logo.png" alt="" />
                            </div>
                            <br />
                            <p>texte</p>
                            <p>txte</p>
                        </div>
                        </div>

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="sponsor_img">
                            <img src="../uploads/LogoSponsors/AbbVie-Logo-removebg-preview.png" alt="" />
                            </div>
                            <br />
                            <p>texte</p>
                            <p>txte</p>
                            </div>
                        </div>



                    </div>

                </div>
                <br></br>  <br></br>

                <button className='btnMain2'>Voir tous les Partenaires</button>
   
            </div>




            <br /><br /><br />

            <div className='container interv' >
                    <div className="row">

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="invite" >
                                <img src="../uploads/intervenant/intervenant1.jpg" alt="" />
                            </div>

                            <br />
                            <p>texte</p>
                            <p>txte</p>
                            </div>  
                        </div>

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="invite">
                            <img src="../uploads/intervenant/intervenant1.jpg" alt="" />
                            </div>
                            <br />
                            <p>texte</p>
                            <p>txte</p>
                        </div>
                        </div>

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="invite">
                            <img src="../uploads/intervenant/intervenant1.jpg"  alt="" />
                            </div>
                            <br />
                            <p>texte</p>
                            <p>txte</p>
                            </div>
                        </div>



                    </div>

                </div>

                      
                       
           
            <br></br>  <br /><br />

            <button className='btnMain2'>Voir tous les Partenaires</button>


            <br></br><br></br>  <br></br><br></br>  <br></br><br></br>  <br></br>
        </div>
    )
}

export default Accueil