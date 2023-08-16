import { ScrollingCarousel } from '@trendyol-js/react-carousel';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Interv from "./SliderInterv";
import Sponsors from './SliderSponsors';


function Accueil(){

    //slider
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1200,
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
            

            <br /><br />            

            <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0"}}>Partenaires</h3>
            <br /><br />

            {/*  slider sponsors */}
            <div style={{textAlign:'center', marginBottom:'30px',backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)' /* backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)',borderRadius:'15px' */}}>
            <div className="container" >
                <Slider {...settings} >
                {Sponsors.map((item) => (
                    <div key={item.id} >
                    <img src={item.src} alt={item.alt} style={{margin:'0 auto',width:'100%', height:'100%'}} />
                    <br />
                    </div>
                ))}
                </Slider>
            </div>
            </div>

            <br></br>  <br /><br />
            <a href="https://spot-pharma-front.vercel.app/intervenants">
            <button className='btnMain2'>Voir tous les intervenants</button>
            </a>
            
           
            <br /><br /> <br /><br /><br /><br />  

            <h2  style={{ margin:"0", color:"#7DBA33"}}>Tous les</h2>
            <h3 style={{fontSize:"2rem", margin:"0"}}>Invités</h3>
            <br /><br />

           {/*  slider intervenant */}
            <div  style={{textAlign:'center', marginBottom:'30px',backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)' /* backgroundColor:"rgb(255, 255, 255)", boxShadow:' 0px 1px 40px 14px rgba(0, 0, 0, 0.07)',borderRadius:'15px' */}}>
            <div className="container" style={{marginTop:'10px'}} >
                <Slider {...settings} >
                {Interv.map((item) => (
                    <div key={item.id} >
                    <img src={item.src} alt={item.alt} style={{margin:'0 auto',width:'70px', height:'70px', borderRadius:'50%'}} />
                    <br />
                    <h3 style={{fontSize:'1.5rem'}}>{item.title}</h3>
                    <p style={{fontSize:'1rem'}}>{item.description}</p>
                    </div>
                ))}
                </Slider>
            </div>
            </div>

            <br></br>  <br /><br />
            <a href="https://spot-pharma-front.vercel.app/intervenants">
            <button className='btnMain2'>Voir tous les intervenants</button>
            </a>


        <br></br><br></br>  <br></br><br></br>  <br></br><br></br>  <br></br>
        </div>
    )
}

export default Accueil 