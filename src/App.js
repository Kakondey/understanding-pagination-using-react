import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => {
        setDatas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = datas.slice(indexOfFirstPost, indexOfLastPost);

  // pagination logic
  const paginationNumberArray = [];
  // numbers to display
  for (let i = 1; i <= datas.length / postsPerPage; ++i) {
    paginationNumberArray.push(i);
  }

  const handlePaginate = (index) => {
    setCurrentPage(index);
  };

  const handleNext = () => {
    setCurrentPage(
      currentPage === datas.length / postsPerPage ? 1 : currentPage + 1
    );
  };

  const handlePrev = () => {
    setCurrentPage(
      currentPage === 1 ? datas.length / postsPerPage - 1 : currentPage - 1
    );
  };
  console.log(currentPage);
  return (
    <div className="App">
      <table>
        <tr>
          <th>Post ID</th>
          <th>Tasks</th>
          <th>Completed</th>
        </tr>

        {currentPosts.map((post, index) => {
          return (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.completed ? "YES" : "NO"}</td>
            </tr>
          );
        })}
      </table>
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
      {paginationNumberArray.map((index) => {
        return (
          <p onClick={() => handlePaginate(index)} key={index}>
            {index}
          </p>
        );
      })}
    </div>
  );
}

export default App;
