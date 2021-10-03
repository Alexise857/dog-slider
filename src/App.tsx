import React, {useEffect, useState} from 'react';
import './App.css';
import {getDogs, Dogs} from "./services/pets.services";
import { Fade } from "react-slideshow-image";

function App() {

  const [dogSlider, setSetDogSlider] = useState<Dogs[]>([]);

  const getDogsImages = async () => {
    const dogs: Dogs[] = await getDogs();
    setSetDogSlider(dogs)
  };

  useEffect(() => {
    getDogsImages()
  }, []);


  return (
    <div className="App">
      <Fade >
          {dogSlider.map( (dog, index) => {
              return <div className="each-slide">
                      <div className="dog-image" style={{'backgroundImage': `url(${dog.url})`}}/>
                      <span>{dog.title}</span>
                    </div>
          })}
      </Fade>
    </div>
  );
}

export default App;
