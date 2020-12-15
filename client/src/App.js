import axios from "axios";
import { useState } from "react";
import { Card } from "react-bootstrap";
import "./App.css";

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  //api token
  const [apikey, setApikey] = useState(
    "AIzaSyBC0txMLdecUflrK3FnpMgwKcazyyjGzMg"
  );
  //on typing in search box
  const handleChange = (event) => {
    const book = event.target.value;
    setBook(book);
  };
  //on clicking submit
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          ":keyes&key=" +
          apikey +
          "&maxResults=40"
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  };
  return (
    <div className="App">
      <div class="container my-4">
        <div class="row">
          <div class="col-lg-12 text-center text-monospace">
            <h1>DWin's Library</h1>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div class="input-group mb-3">
            <input
              type="text"
              onChange={handleChange}
              class="form-control bg-warning"
              placeholder="Enter a Book Name"
              aria-label="Enter a Book Name"
              aria-describedby="button-addon2"
            ></input>
            <div class="input-group-append">
              <button
                class="btn btn-outline-success"
                type="submit"
                id="button-addon2"
              >
                Search
              </button>
            </div>
          </div>
        </form>
        <div className="row">
          {result.map((book) => (
            <div className="col-lg-3">
              <Card style={{ marginTop: "10px" }} class="bg-warning">
                <a href={book.volumeInfo.previewLink} target="_blank">
                  <Card.Img
                    variant="top"
                    src={
                      book.volumeInfo.imageLinks !== undefined
                        ? book.volumeInfo.imageLinks.thumbnail
                        : ""
                    }
                    alt={book.volumeInfo.title}
                    class="rounded img-fluid"
                  />
                </a>
                <Card.Body className="tiles">
                  <p className="card-title">
                    <b>Title: </b>
                    {book.volumeInfo.title}
                  </p>

                  <p className="card-title">
                    <b>Author: </b>
                    {book.volumeInfo.authors}
                  </p>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
