import axios from "axios";
import React, { useRef, useState } from "react";

const MultiImg = () => {
  const [message, setMessage] = useState("");
  const [imageUrl1, setImageUrl1] = useState("");
  const [imageUrl2, setImageUrl2] = useState("");
  const [imageUrl3, setImageUrl3] = useState("");
  const [imageUrl4, setImageUrl4] = useState("");
  const [imageUrl5, setImageUrl5] = useState("");

  // Handle Image Upload (image upload by api in imgBB)
  const imageUploadHandler = (event, setImg) => {
    const imageData = new FormData();
    imageData.append("upload_preset", "testingImg");
    imageData.append("file", event.target.files[0]);
    // imageData.append("image", event.target.files[1]);
    // imageData.append("file2", event.target.files[2]);
    // imageData.append("file3", event.target.files[3]);
    // imageData.append("file4", event.target.files[4]);

    axios
      .post("https://api.cloudinary.com/v1_1/shokhbari/upload", imageData)
      .then(function (response) {
        setImg(response?.data?.url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // handle add product and save at the database
  const handleAddProduct = async (e) => {
    e.preventDefault();

    //this poroduct sotoreing all input value like object and properties
    const product = {
      img1: imageUrl1,
      img2: imageUrl2,
      img3: imageUrl3,
      img4: imageUrl4,
      img5: imageUrl5,
    };

    // add product info at mongodb
    try {
      setMessage("");
      const url = "http://localhost:8000/addProduct";
      const option = {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      const response = await fetch(url, option);
      const data = await response.json();
      if (data) {
        setMessage("Your product added into database successfully.");

        window.location.reload();
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div className="addProductBody my-2">
      <form onSubmit={handleAddProduct}>
        <div className="row my-4">
          {/* product Image */}
          <div className="col-md-4">
            <div>
              <label htmlFor="img" className="form-label">
                Choose 1st photo
              </label>
            </div>
            <div>
              <input
                onChange={(e) => imageUploadHandler(e, setImageUrl1)}
                type="file"
                id="img"
                name="image1"
                placeholder="Your image.."
                accept=".jpg, .webp, .png, .jpeg"
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <label htmlFor="img" className="form-label">
                Choose 2nd photo
              </label>
            </div>
            <div>
              <input
                onChange={(e) => imageUploadHandler(e, setImageUrl2)}
                type="file"
                id="img"
                name="image2"
                placeholder="Your image.."
                accept=".jpg, .webp, .png, .jpeg"
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <label htmlFor="img" className="form-label">
                Choose 3rd photo
              </label>
            </div>
            <div>
              <input
                onChange={(e) => imageUploadHandler(e, setImageUrl3)}
                type="file"
                id="img"
                name="image3"
                placeholder="Your image.."
                accept=".jpg, .webp, .png, .jpeg"
              />
            </div>
          </div>

          <div className="col-md-4 mt-2">
            <div>
              <label htmlFor="img4" className="form-label">
                Choose 4th photo
              </label>
            </div>
            <div>
              <input
                onChange={(e) => imageUploadHandler(e, setImageUrl4)}
                type="file"
                id="img4"
                name="image4"
                placeholder="Your image.."
                accept=".jpg, .webp, .png, .jpeg"
              />
            </div>
          </div>

          <div className="col-md-4 mt-2">
            <div>
              <label htmlFor="img5" className="form-label">
                Choose 5th photo
              </label>
            </div>
            <div>
              <input
                onChange={(e) => imageUploadHandler(e, setImageUrl5)}
                type="file"
                id="img5"
                name="image5"
                placeholder="Your image.."
                accept=".jpg, .webp, .png, .jpeg"
                required
              />
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MultiImg;
