import React from "react";
import axios from "axios";
import { useState } from "react";

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
    //this folder have to create in the settings and have to Add upload preset with Unsigned system
    data.append("upload_preset", [your folder]);

    try {
      const result = await axios.post(
        // [Your Cloudinary Cloud Name] also have to install cloudinary
        "https://api.cloudinary.com/v1_1/[Your Cloudinary Cloud Name]/upload",
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
      <h1>Upload your picute here</h1>
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
    </div>
  );
};

export default App;
