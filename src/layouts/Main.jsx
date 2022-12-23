import React from "react";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/Navbar/NavBar";
import { useHref } from "react-router-dom";
import AutoToTop from "../components/AutoToTop/AutoToTop";
import BackToTopButton from "../components/BackToTopButton/BackToTopButton";

export default function Main(props) {
  const href = useHref();

  return href === "/" || href === "/ingresar" || href === "/registro"  || href === "/success"  || href === "/fail" ? null : (
    <>
      <AutoToTop />
      <NavBar />
      <div className="Main">{props.children}</div>
      <BackToTopButton />
      <Footer />
    </>
  );
}
