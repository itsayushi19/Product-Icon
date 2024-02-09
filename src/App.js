import { useState } from "react";
import { OpenAI } from "openai";
import { InputBox } from "./InputBox";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_API_KEY,
  dangerouslyAllowBrowser: true, 
});

function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const generateImage = async () => {
    const imageParameters = {
      prompt: userPrompt,
    };
    const response = await openai.images.generate(imageParameters);
    const urlData = response.data.data[0].url;
    setImageUrl(urlData);
  };

  return (
    <main className="App">
      {imageUrl && <img src={imageUrl} className="image" alt="ai thing" />}
      <InputBox label={"Product Idea"} setAttribute={setUserPrompt} />
      <button className="main-button" onClick={() => generateImage()}>
        Generate
      </button>
    </main>
  );
}

export default App;
