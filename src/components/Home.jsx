import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { deleteItem } from "./ItemReducer";
import Logo from "/Logo-Nutech-ok.png";

function Home() {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      dispatch(deleteItem({ id: id }));
    }
  };

  return (
    <div>
      <div className="container">
        <div className="text-center">
          <img src={Logo} alt="" />
        </div>
        <br />
        <Link to="/create" className="btn btn-success my-3">
          Add Item
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Picture</th>
              {/* <th><img src="" alt="" /></th> */}
              <th>Item Name</th>
              <th>Buy Price</th>
              <th>Sell Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {/* <td>pic</td> */}
                <td>
                  {item.picture && (
                    <img
                      src={item.picture}
                      alt={item.name}
                      style={{ maxWidth: "100px" }}
                    />
                  )}
                </td>
                <td>{item.name}</td>
                <td>{item.buy}</td>
                <td>{item.sell}</td>
                <td>{item.stock}</td>
                <td>
                  <Link
                    to={`/edit/${item.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-sm btn-danger ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
