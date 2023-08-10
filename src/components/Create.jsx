// import React, { useState } from "react";
// import { addItem } from "./ItemReducer";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

// function Create() {
//   const [name, setName] = useState("");
//   const [buy, setBuy] = useState("");
//   const [sell, setSell] = useState("");
//   const [stock, setStock] = useState("");
//   const [picture, setPicture] = useState("");
//   const items = useSelector((state) => state.items);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [uniqueNameError, setUniqueNameError] = useState(""); // New state for error message

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     // Check if name is unique
//     const isNameUnique = items.every((item) => item.name !== name);
//     if (!isNameUnique) {
//       setUniqueNameError("Item name must be unique.");
//       return;
//     }

//     const newItemId = items.length === 0 ? 0 : items[items.length - 1].id + 1;
//     dispatch(
//       addItem({
//         id: newItemId,
//         name: name,
//         buy: buy,
//         sell: sell,
//         stock: stock,
//         picture: picture,
//       })
//     );
//     navigate("/");
//   };

//   return (
//     <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
//       <div className="w-50 border bg-secondary text-white p-5">
//         <h3>Add New Item</h3>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name: </label>
//             <input
//               type="text"
//               name="name"
//               className="form-control"
//               onChange={(e) => {
//                 setName(e.target.value);
//                 setUniqueNameError(""); // Clear the error when input changes
//               }}
//             />
//             {uniqueNameError && (
//               <p className="text-danger">{uniqueNameError}</p>
//             )}
//           </div>
//           <div>
//             <label htmlFor="buy">Buy Price:</label>
//             <input
//               type="number"
//               name="buy"
//               className="form-control"
//               onChange={(e) => setBuy(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="sell">Sell Price:</label>
//             <input
//               type="number"
//               name="sell"
//               className="form-control"
//               onChange={(e) => setSell(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="stock">Stock:</label>
//             <input
//               type="number"
//               name="stock"
//               className="form-control"
//               onChange={(e) => setStock(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="picture">Upload Picture: </label>
//             <br />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => setPicture(e.target.value)}
//             />
//           </div>
//           <br />
//           <button className="btn btn-info">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Create;

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
  const [selectedPicture, setSelectedPicture] = useState(null); // New state for selected image
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [uniqueNameError, setUniqueNameError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const isNameUnique = items.every((item) => item.name !== name);
    if (!isNameUnique) {
      setUniqueNameError("Item name must be unique.");
      return;
    }

    const newItemId = items.length === 0 ? 0 : items[items.length - 1].id + 1;

    const newItem = {
      id: newItemId,
      name: name,
      buy: buy,
      sell: sell,
      stock: stock,
      picture: URL.createObjectURL(selectedPicture),
    };

    dispatch(addItem(newItem));

    setSelectedPicture(null);
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
              type="text"
              name="name"
              className="form-control"
              onChange={(e) => {
                setName(e.target.value);
                setUniqueNameError("");
              }}
            />
            {uniqueNameError && (
              <p className="text-danger">{uniqueNameError}</p>
            )}
          </div>
          <div>
            <label htmlFor="buy">Buy Price:</label>
            <input
              type="number"
              name="buy"
              className="form-control"
              onChange={(e) => setBuy(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="sell">Sell Price:</label>
            <input
              type="number"
              name="sell"
              className="form-control"
              onChange={(e) => setSell(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="stock">Stock:</label>
            <input
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
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedPicture(e.target.files[0])} // Set selected image
            />
          </div>
          <br />
          <button className="btn btn-info">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
