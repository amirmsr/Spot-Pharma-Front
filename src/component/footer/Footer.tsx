

export default function Footer(){
    return(
        <div className="footer">
         <img src="./logo.png" width="10%" alt="" />
         <br /><br />
         <p>Un congrès organisé par la SFSPO</p>
         <p>Conditions d'utilisation</p>
         <br /><br />
         <div className="container">
            <div className="row">
                <div className="col">
                    <a href="https://www.facebook.com/Spot.Pharma" target="_blank">
                        <img src="./facebook.png" width='10%' alt="" />
                    </a>
                </div>
                <div className="col">
                    <a href="https://www.youtube.com/@spotpharmatv2792" target="_blank">
                        <img src="./social.png" width='10%' alt="" />
                    </a>
                </div>
            </div>
         </div>
        </div>
    )
}