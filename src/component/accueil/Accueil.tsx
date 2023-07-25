import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Interv from "./SliderInterv";


function Accueil(){

    //slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 800,
    };
    





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
                            <p style={{ fontSize:'1.4rem'}}>Sanofi</p>
                            <p>Société mondiale de santé innovante, animée par une vocation : poursuivre les miracles de la science pour améliorer la vie des gens.</p>
                            </div>  
                        </div>

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="sponsor_img">
                            <img src="../uploads/LogoSponsors/Pfizer_logo.png" alt="" />
                            </div>
                            <br />
                            <p style={{ fontSize:'1.4rem'}}>Pfizer</p>
                            <p>Présent dans plus de 150 pays, le groupe est, en 2013, le leader mondial dans son secteur.</p>
                        </div>
                        </div>

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="sponsor_img">
                            <img src="../uploads/LogoSponsors/AbbVie-Logo-removebg-preview.png" alt="" />
                            </div>
                            <br />
                            <p style={{ fontSize:'1.4rem'}}>Abbvie</p>
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
            <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0"}}>Invités</h3>
            <br></br><br /><br />
            <div className='container interv' >
                    <div className="row">

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="invite" >
                                <img src="../uploads/intervenant/intervenant1.jpg" alt="" />
                            </div>

                            <br />
                            <p style={{ fontSize:'1.4rem'}}>Martine Costedoat</p>
                            <p>Pharmacien Directeur Général PHSQ Coordinatrice Nationale projet PHSQ certification qualité des officines de pharmacie</p>
                            </div>  
                        </div>

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="invite">
                            <img src="../uploads/intervenant/Laure.jpeg" alt="" />
                            </div>
                            <br />
                            <p style={{ fontSize:'1.4rem'}}>Laure Guéroult Accolas</p>
                            <p>Fondatrice, Directrice générale chez Patients en Réseau</p>
                        </div>
                        </div>

                        <div className="col-md-4">
                            <div className="sponsor">
                            <div className="invite">
                            <img src="../uploads/intervenant/intervenant2.jpg"  alt="" />
                            </div>
                            <br />
                            <p style={{ fontSize:'1.4rem'}}>Dr Béatrice Clairaz</p>
                            <p>Pharmacienne titulaire, spécialisée en soins de support en oncologie. Co-présidente SFSPO</p>
                            </div>
                        </div>



                    </div>

                </div>

                      
                       
           
            <br></br>  <br /><br />
            <a href="https://spot-pharma-front.vercel.app/intervenants">
            <button className='btnMain2'>Voir tous les intervenants</button>
            </a>

            <br /><br />            

                
            <br /><br />
            
           
            <br /><br />
            <div style={{textAlign:'center', marginBottom:'30px'}}>
            <div className="container">
                <Slider {...settings}>
                {Interv.map((item) => (
                    <div key={item.id}>
                    <img src={item.src} alt={item.alt} className="img" />
                    <h2 className="title">{item.title}</h2>
                    <p className="description">{item.description}</p>
                    </div>
                ))}
                </Slider>
            </div>
            </div>


        <br></br><br></br>  <br></br><br></br>  <br></br><br></br>  <br></br>
        </div>
    )
}

export default Accueil 