import React, { useContext, useState } from "react";
import City from "./City";
import { LocationStringContext } from "./../Home";

function InputCard({ timeZone, locTime }) {
  const { setLocation } = useContext(LocationStringContext);

  // const [input, setInput] = useState("");
  const [input, setInput] = useState('');

  const locDate = new Date().toLocaleString("en-US", {
    timeZone: timeZone,
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(input);
    setInput("")
  };

  return (
    <div className="grid w-full lg:w-1/2 bg-base-300  rounded-box place-items-center ">
      <div className="card w-full h-full bg-base-100 shadow-xl overflow-visible">
        <div className="card-body">
          <h2 className="card-title text-2xl" id="date">
            {locDate}
          </h2>
          <h3 className="card-title" id="time">
            {locTime}
          </h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="city"
              placeholder="Location"
              value={input}
              onChange={(e)=> {setInput(e.target.value)}}
              autoComplete="off"
              className="input input-bordered input-primary w-full"
              autoFocus
            />
            <City style={{zIndex: 100}} input={input} setInput={setInput}/>
            <div className="card-actions justify-end">
              <button className="btn btn-primary mt-3" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InputCard;
