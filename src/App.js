import React, { useState, useEffect } from 'react';
import './App.css';
const App = () => {
  let red, blue, green, result;
  const [colors, setcolors] = useState([])
  const [Loading, setLoading] = useState(false)
  const [data, setdata] = useState([])
  // useEffect for color codes
  useEffect(() => {
    setLoading(true)
    for (let i = 0; i < 32756; i++) {
      red = Math.floor(Math.random() * 256);

      blue = Math.floor(Math.random() * 256);

      green = Math.floor(Math.random() * 256);
      result = red + ',' + blue + ',' + green

      colors.push(result)

    }
    setLoading(false)
  }, [])

    // useEffect to set colors 
  useEffect(() => {
    setdata(colors)
  }, [colors])


  return (
    <div className="App">
      <h3 style={{ color: `rgb( 53,201,154)` }} >   color image is here    </h3>
      <div style={{ width: '80%', height: '40%', overflowX: 'hidden', overflowY: 'hidden' }}>

        {/* image code for making image */}
        {Loading ? <h3>Please wait, Loading Colors</h3> :
          colors.map((number) => {
            let m = Math.floor(Math.random() * 3);
            let p = Math.floor(Math.random() * 50);
            let w = Math.floor(Math.random() * 100);
            let h = Math.floor(Math.random() * 50);
            return <div style={{ padding: `${p}px`, margin: `${m}px`, width: `${w}0%`, height: `${h}%`, padding: 1, backgroundColor: `rgb(${number})` }} > </div>
          })
        }
      </div>
    </div>
  );
}

export default App;
