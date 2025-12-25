import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch articles from Laravel API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/articles")
      .then((response) => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading articles...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Articles from Laravel API</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <ul>
          {articles.map((article) => (
            <li key={article.id} style={{ marginBottom: "20px" }}>
              <h2>{article.title}</h2>
              <p><strong>Author:</strong> {article.author || "Unknown"}</p>
              <p><strong>Published:</strong> {article.published_at || "N/A"}</p>
              <p>{article.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
