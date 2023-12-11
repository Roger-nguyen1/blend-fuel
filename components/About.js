import React from "react";
import "tailwindcss/tailwind.css";
import Lottie from "react-lottie";
import propTypes from "prop-types";
import animationData from "../public/station.json";
import Footer from "../components/Footer";

function About() {
  return (
    <div data-theme="night">
      <main className="font-nunito flex flex-col items-center justify-center">
        <h1 className="text-3xl text-center mt-6">À propos de Blend Fuel</h1>
        <div className="w-4/5">
          <Lottie
            options={{ loop: true, autoplay: true, animationData }}
            style={{ width: 300, height: 300 }}
          />

          <p>
            Vous êtes un adepte du bioéthanol, mais vous ne voulez pas payer
            trop cher ? Notre site web est votre solution ! Grâce à notre
            fonctionnalité de recherche par géolocalisation, vous pouvez trouver
            la station la plus proche de chez vous avec le calcul automatique du
            prix du mélange de carburant E85. Et grâce à notre fonctionnalité de
            recherche de station par carburant, vous pouvez être sûr de faire le
            plein au meilleur prix.
          </p>

          <p className="mt-10">
            Ce site web est le compagnon idéal de tous les conducteurs qui
            souhaitent trouver la station essence avec les meilleurs prix. Vous
            n'avez plus à vous soucier de faire le plein au mauvais endroit ou
            au mauvais prix!
          </p>
        </div>
        {/* <Icon className="mt-20" icon="ic:baseline-construction" width="70" /> */}
      </main>
      <Footer />
    </div>
  );
}
About.propTypes = {
  src: propTypes.string.isRequired,
  loop: propTypes.bool,
  autoplay: propTypes.bool,
};
export default About;
