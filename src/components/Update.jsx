// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { updateItem } from "./ItemReducer";

// function Update() {
//   const { id } = useParams();
//   const items = useSelector((state) => state.items);
//   const existingItem = items.filter((f) => f.id == id);
//   const { name, buy, sell, stock, picture } = existingItem[0];
//   const [uname, setName] = useState(name);
//   const [ubuy, setBuy] = useState(buy);
//   const [usell, setSell] = useState(sell);
//   const [ustock, setStock] = useState(stock);
//   const [upicture, setPicture] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [messageErrorName, setMessageErrorName] = useState("");
//   const [messageErrorPicture, setMessageErrorPicture] = useState("");

//   const handleUpdate = (event) => {
//     event.preventDefault();
//     const isNameUnique = items.every((item) => item.name !== name);
//     if (!isNameUnique) {
//       setMessageErrorName("Item name must be unique.");
//       return;
//     }

//     if (picture && picture.size > 100 * 1024) {
//       setMessageErrorName("Please select an image file smaller than 100 KB.");
//       return;
//     }
//     dispatch(
//       updateItem({
//         id: id,
//         name: uname,
//         buy: ubuy,
//         sell: usell,
//         stock: ustock,
//         picture: URL.createObjectURL(upicture),
//       })
//     );
//     setPicture(null);
//     navigate("/");
//   };

//   return (
//     <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
//       <div className="w-50 border bg-secondary text-white p-5">
//         <h3>Update Item</h3>
//         <form onSubmit={handleUpdate}>
//           <div>
//             <label htmlFor="name">Name: </label>
//             <input
//               required
//               type="text"
//               name="name"
//               className="form-control"
//               placeholder="enter name"
//               value={uname}
//               onChange={(e) => setName(e.target.value)}
//             />
//             {messageErrorName && (
//               <p className="text-danger">{messageErrorName}</p>
//             )}
//           </div>
//           <div>
//             <label htmlFor="buy">Buy Price:</label>
//             <input
//               required
//               type="number"
//               name="buy"
//               className="form-control"
//               value={ubuy}
//               onChange={(e) => setBuy(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="sell">Sell Price:</label>
//             <input
//               required
//               type="number"
//               name="sell"
//               className="form-control"
//               value={usell}
//               onChange={(e) => setSell(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="stock">Stock:</label>
//             <input
//               required
//               type="number"
//               name="stock"
//               className="form-control"
//               value={ustock}
//               onChange={(e) => setStock(e.target.value)}
//             />
//           </div>
//           <div>
//             <label htmlFor="picture">Update Picture: </label>
//             <br />
//             <input
//               required
//               type="file"
//               accept="image/*"
//               onChange={(e) => setPicture(e.target.files[0])}
//             />
//             {messageErrorPicture && <p className="text-danger">{messageErrorPicture}</p>}
//           </div>
//           <br />
//           <button className="btn btn-info">Update</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Update;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateItem } from "./ItemReducer";

function Update() {
  const { id } = useParams();
  const items = useSelector((state) => state.items);
  const existingItem = items.find((item) => item.id === Number(id)); // Use find instead of filter
  const { name, buy, sell, stock, picture } = existingItem;
  const [uname, setName] = useState(name);
  const [ubuy, setBuy] = useState(buy);
  const [usell, setSell] = useState(sell);
  const [ustock, setStock] = useState(stock);
  const [upicture, setPicture] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageErrorName, setMessageErrorName] = useState("");
  const [messageErrorPicture, setMessageErrorPicture] = useState("");

  const handleUpdate = (event) => {
    event.preventDefault();
    // const isNameUnique = items.every((item) => item.name !== uname); // Check against the updated name
    // if (!isNameUnique) {
    //   setMessageErrorName("Item name must be unique.");
    //   return;
    // }

    // if (upicture && upicture.size > 100 * 1024) {
    //   setMessageErrorPicture(
    //     "Please select an image file smaller than 100 KB."
    //   );
    //   return;
    // }

    dispatch(
      updateItem({
        id: id,
        name: uname,
        buy: ubuy,
        sell: usell,
        stock: ustock,
        picture: upicture ? URL.createObjectURL(upicture) : picture,
      })
    );

    setPicture(null);
    setMessageErrorName("");
    setMessageErrorPicture("");
    navigate("/");
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>Update Item</h3>
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="name">Name: </label>
            <input
              required
              type="text"
              name="name"
              className="form-control"
              placeholder="enter name"
              value={uname}
              onChange={(e) => {
                setName(e.target.value);
                setMessageErrorName("");
              }}
            />
            {messageErrorName && (
              <p className="text-danger">{messageErrorName}</p>
            )}
          </div>
          <div>
            <label htmlFor="buy">Buy Price:</label>
            <input
              required
              type="number"
              name="buy"
              className="form-control"
              value={ubuy}
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
              value={usell}
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
              value={ustock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="picture">Update Picture: </label>
            <br />
            <input
              type="file"
              accept="image/*"
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
            {messageErrorPicture && (
              <p className="text-danger">{messageErrorPicture}</p>
            )}
          </div>
          <br />
          <button className="btn btn-info">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
