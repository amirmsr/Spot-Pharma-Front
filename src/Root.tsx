import { Outlet } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import Footer from "./component/footer/Footer";
import Navbar from "./component/navbar/Navbar";



export default function Root() {
  return (
    <div>
      <Navbar />
        <main style={{backgroundColor:"#e5e7ea", textAlign:"center"}}>
          <Outlet />
        </main>
        <Footer></Footer>
    </div>
  );
}

