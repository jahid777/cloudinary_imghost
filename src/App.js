import React from "react";
import axios from "axios";
import { useState } from "react";
import MultiImg from "./MultiImg";
import LatestMultipleImg from "./LatestMultipleImg";

const App = () => {
  const [imgUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  console.log(imgUrl);

  // Upload Cover Room Image
  const handleImageUpload = async (e) => {
    setLoading(true);
    const imageFile = e.target.files[0];
    const data = new FormData();
    data.append("file", imageFile);
    //your folder name
    data.append("upload_preset", "testingImg");

    try {
      const result = await axios.post(
        //aykhne [Your Cloudinary Cloud Name] baki link thik thak thakbe
        "https://api.cloudinary.com/v1_1/shokhbari/upload",
        data
      );
      console.log(result?.data?.url);
      setImageUrl(result?.data?.url);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Upload your picture</h1>
      {loading && <h1>Loding</h1>}
      <input
        type="file"
        id="img"
        name="fav_language"
        onChange={handleImageUpload}
        style={{ marginBottom: "40px" }}
      />
      <br />

      <img style={{ height: "100px" }} src={imgUrl} alt="" />

      <h1>Multiple input</h1>
      <MultiImg />

      <h1>this is good for multi img hosting</h1>
      <LatestMultipleImg />
    </div>
  );
};

export default App;
