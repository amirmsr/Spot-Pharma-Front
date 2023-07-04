

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
                    <a href="https://spot-pharma-front.vercel.app/sessions">
                    <button className='btnMain'>S'inscire aux sessions</button> 
                    </a>
                    
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
                            <p>Sanofi</p>
                            <p>Société mondiale de santé innovante, animée par une vocation : poursuivre les miracles de la science pour améliorer la vie des gens.</p>
                            </div>  
                        </div>

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="sponsor_img">
                            <img src="../uploads/LogoSponsors/Pfizer_logo.png" alt="" />
                            </div>
                            <br />
                            <p>Pfizer</p>
                            <p>Présent dans plus de 150 pays, le groupe est, en 2013, le leader mondial dans son secteur.</p>
                        </div>
                        </div>

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="sponsor_img">
                            <img src="../uploads/LogoSponsors/AbbVie-Logo-removebg-preview.png" alt="" />
                            </div>
                            <br />
                            <p>Abbvie</p>
                            <p>Entreprise américaine spécialisée dans la recherche pharmaceutique. AbbVie recherche et développe des médicaments thérapeutiques.</p>
                            </div>
                        </div>



                    </div>

                </div>
                <br></br>  <br></br>
                <a href="/sessions">
                    <button className='btnMain2'>Voir toutes les sessions</button>
                </a>
                
   
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
                            <img src="../uploads/intervenant/Laure.jpeg" alt="" />
                            </div>
                            <br />
                            <p>Laure Guéroult Accolas</p>
                            <p>Fondatrice, Directrice générale chez Patients en Réseau</p>
                        </div>
                        </div>

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="invite">
                            <img src="../uploads/intervenant/intervenant2.jpg"  alt="" />
                            </div>
                            <br />
                            <p>Dr Béatrice Clairaz</p>
                            <p>Pharmacienne titulaire, spécialisée en soins de support en oncologie. Co-présidente SFSPO</p>
                            </div>
                        </div>



                    </div>

                </div>

                      
                       
           
            <br></br>  <br /><br />
            <a href="https://spot-pharma-front.vercel.app/intervenants">
            <button className='btnMain2'>Voir tous les invités</button>
            </a>
            


            <br></br><br></br>  <br></br><br></br>  <br></br><br></br>  <br></br>
        </div>
    )
}

export default Accueil