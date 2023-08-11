import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { deleteItem } from "./ItemReducer";
import Logo from "/Logo-Nutech-ok.png";

function Home() {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      dispatch(deleteItem({ id: id }));
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Item Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Picture</th>
              <th>Item Name</th>
              <th>Buy Price</th>
              <th>Sell Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
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
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              onClick={() => paginate(currentPage - 1)}
              className="page-link"
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {Array.from({
            length: Math.ceil(filteredItems.length / itemsPerPage),
          }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                ? "disabled"
                : ""
            }`}
          >
            <button
              onClick={() => paginate(currentPage + 1)}
              className="page-link"
              disabled={
                currentPage === Math.ceil(filteredItems.length / itemsPerPage)
              }
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
