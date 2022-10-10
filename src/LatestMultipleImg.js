import React, { useState } from "react";
import axios from "axios";

const LatestMultipleImg = () => {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState([]);

  const handleChange = (e) => {
    const imgFiles = e.target.files;
    let imgArr = [];
    for (let i = 0; i < imgFiles.length; i++) {
      let imageData = new FormData();
      imageData.append("file", imgFiles[i]);
      imageData.append("upload_preset", "testingImg");
      imageData.append("cloud_name", "shokhbari");
      axios
        .post("https://api.cloudinary.com/v1_1/shokhbari/upload", imageData)
        .then((res) => {
          setFirst(res.data.url); // set1st
          imgArr.push(res.data.url);
          setSecond(imgArr); // set2nd
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  console.log(second);

  const handleSubmit = (e) => {
    e.preventdefault();
    console.log(second);
  };

  return (
    <div style={{ marginBottom: "100px" }}>
      <form onSubmit={handleSubmit}>
        <input type="file" name="" id="" onChange={handleChange} />

        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
};

export default LatestMultipleImg;
