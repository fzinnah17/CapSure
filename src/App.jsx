import { useState } from 'react';
import APIForm from './components/APIForm';
import Gallery from './components/Gallery';
import './index.css';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });

  const [currentImage, setCurrentImage] = useState("");
  const [prevImages, setPrevImages] = useState([]);
  const [quota, setQuota] = useState(null);
  const [loading, setLoading] = useState(false);


  const inputsInfo = [
    "Input a link to any website (no https)",
    "jpeg, png, or webp",
    "true or false to remove ads",
    "true or false to remove cookie banners",
    "Screenshot width (px)",
    "Screenshot height (px)"
  ];

  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  };

  const getQuota = async () => {
    const res = await fetch(`https://api.apiflash.com/v1/urltoimage/quota?access_key=${ACCESS_KEY}`);
    const data = await res.json();
    setQuota(data);
  };

  const callAPI = async (query) => {
    setLoading(true);
    const response = await fetch(query);
    const json = await response.json();
    setLoading(false);


    if (!json.url) {
      alert("Could not generate screenshot.");
    } else {
      setCurrentImage(json.url);
      setPrevImages((images) => [...images, json.url]);
      reset();
      getQuota();
    }
  };

  const makeQuery = () => {
    const wait_until = "network_idle";
    const response_type = "json";
    const fail_on_status = "400%2C404%2C500-511";
    const fullURL = "https://" + inputs.url;

    const query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    
    callAPI(query).catch(console.error);
  };

  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };

    if (!inputs.url) {
      alert("Please provide a URL.");
      return;
    }

    if (isNaN(inputs.width) || isNaN(inputs.height)) {
      alert("Width and height must be numbers.");
      return;
    }
    

    for (const [key, value] of Object.entries(inputs)) {
      if (!value) {
        inputs[key] = defaultValues[key];
      }
    }

    makeQuery();
  };

  return (
    <div className="whole-page">
      {quota && (
        <div className="quota">
          <p>📸 Quota Left: {quota.remaining} / {quota.limit}</p>
        </div>
      )}
      <h1>Build Your Own Screenshot! 📸</h1>
      {loading && <p>⏳ Taking your screenshot, please wait...</p>}

      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
        inputsInfo={inputsInfo}
      />

      {currentImage && (
        <img className="screenshot" src={currentImage} alt="Screenshot returned" />
      )}

      <div className="container">
        <h3> Current Query Status: </h3>
        <p>
          https://api.apiflash.com/v1/urltoimage?access_key=ACCESS_KEY    
          <br />
          &url={inputs.url} <br />
          &format={inputs.format} <br />
          &width={inputs.width} <br />
          &height={inputs.height} <br />
          &no_cookie_banners={inputs.no_cookie_banners} <br />
          &no_ads={inputs.no_ads} <br />
        </p>
      </div>

      <Gallery images={prevImages} />
    </div>
  );
}

export default App;
