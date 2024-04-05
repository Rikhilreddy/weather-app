import React from "react";
import { BsFillDice2Fill } from "react-icons/bs";

function Footer() {
  return (
    <footer className="footer p-10 bg-base-100 text-base-content mt-auto z-10">
      <div>
        <BsFillDice2Fill className="text-6xl"/>
        <p>
          Ketan Padal
          <br />
          &copy; 2022-23
        </p>
      </div>
      <div>
        <span className="footer-title">FrontEnd</span>
        <a className="link link-hover" href="https://reactjs.org/">
          React.js
        </a>
        <a className="link link-hover" href="https://www.chartjs.org/">
          Chart.js
        </a>
        <a className="link link-hover" href="https://tailwindcss.com/">
          Tailwind CSS
        </a>
        <a className="link link-hover" href="https://daisyui.com/">
          Daisy UI
        </a>
      </div>
      <div>
        <span className="footer-title">API</span>
        <a className="link link-hover" href="https://openweathermap.org/">
          OpenWeatherMap (Weather)
        </a>
        <a className="link link-hover" href="https://positionstack.com/">
          positionstack (Geocoding)
        </a>
      </div>
    </footer>
  );
}

export default Footer;
