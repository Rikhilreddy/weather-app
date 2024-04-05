import React, { useState, useEffect, useContext } from "react";

import cities from "cities.json";
import countries from "../utilities/countries.json";

import { remove } from 'remove-accents'

import LocationStringContext from './../context/LocationString'

const City = ({input, setInput}) => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const handleChange = async () => {
      const results = await cities.filter((city) => {
        if (input.length >= 3) {
          const cleaned = remove(city.name)
          return cleaned.toLowerCase().includes(input);
        }

        return null;
      });

      setData(results);
    };

    handleChange();
  }, [input]);

  return (
    <>
      <div style={{zIndex: 1}} className="absolute">
        <ul className="menu bg-base-100 w-fit relative top-2 rounded-box shadow-2xl">
          {data.map((city, index) => {
            if (index < 10) {
              return <ListItem key={index} city={city} setInput={setInput}/>;
            }
          })}
        </ul>
      </div>
    </>
  );
};

const ListItem = ({ city, setInput }) => {

  const { setCoords, setLabel } = useContext(LocationStringContext);


  const handleClick = () => {
    
    setInput('')
    setLabel(`${city.name}, ${countries[city.country]}`);
    setCoords({ latitude: city.lat, longitude: city.lng });

  }


  return (
    <li>
      <button type="button" onClick={handleClick}>
        <div className="flex gap-4">
          <div className="text-left w-40 break-words">{city.name}</div>
          <div className="flex-none justify-end ml-auto">
            {countries[city.country]}
          </div>
        </div>
      </button>
    </li>
  );
};

export default City;
