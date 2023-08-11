import React, { useState } from "react";
import { addItem } from "./ItemReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Create() {
  const [name, setName] = useState("");
  const [buy, setBuy] = useState("");
  const [sell, setSell] = useState("");
  const [stock, setStock] = useState("");
  const [picture, setPicture] = useState(null);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageErrorName, setMessageErrorName] = useState("");
  const [messageErrorPicture, setMessageErrorPicture] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const isNameUnique = items.every((item) => item.name !== name);
    if (!isNameUnique) {
      setMessageErrorName("Item name must be unique.");
      return;
    }

    if (picture && picture.size > 100 * 1024) {
      setMessageErrorName("Please select an image file smaller than 100 KB.");
      return;
    }

    const newItemId = items.length === 0 ? 0 : items[items.length - 1].id + 1;

    const newItem = {
      id: newItemId,
      name: name,
      buy: buy,
      sell: sell,
      stock: stock,
      picture: picture ? URL.createObjectURL(picture) : null,
    };

    dispatch(addItem(newItem));

    setPicture(null);
    setMessageErrorName("");
    navigate("/");
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Add New Item</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              required
              type="text"
              name="name"
              className="form-control"
              onChange={(e) => {
                setName(e.target.value);
                setMessageErrorName("");
              }}
            />
            {messageErrorName && <p className="text-danger">{messageErrorName}</p>}
          </div>
          <div>
            <label htmlFor="buy">Buy Price:</label>
            <input
              required
              type="number"
              name="buy"
              className="form-control"
              onChange={(e) => setBuy(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sell">Sell Price:</label>
            <input
              required
              type="number"
              name="sell"
              className="form-control"
              onChange={(e) => setSell(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="stock">Stock:</label>
            <input
              required
              type="number"
              name="stock"
              className="form-control"
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="picture">Upload Picture: </label>
            <br />
            <input
              required
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => {
                const selectedFile = e.target.files[0];

                if (selectedFile && selectedFile.size <= 100 * 1024) {
                  setPicture(selectedFile);
                  setMessageErrorPicture("");
                } else {
                  setPicture(null);
                  setMessageErrorPicture(
                    "Please select an image file smaller than 100 KB."
                  );
                }
              }}
            />
            {messageErrorPicture && <p className="text-danger">{messageErrorPicture}</p>}
          </div>
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
