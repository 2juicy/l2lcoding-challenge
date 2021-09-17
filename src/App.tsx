import { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./util";
import { Posts } from "./interface/Posts";
import Header from "./components/Header/Header";
import PostInfo from "./components/PostInfo/PostInfo";

// Possibly bad practice to do this but storing this variable globally.
let posts: Posts[] = [];

export default function App() {
  const URL = "https://dummyapi.io/data/v1/post?limit=50";
  const APP_ID = "614388656e2fec97b56911c0";
  const [filter, setFilter] = useState<Posts[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData(URL, APP_ID).then(data => {
      posts = data.data;
      setFilter(data.data);
    });
  }, []);

  function handleSearch(text?: string) {
    // Guard clause
    if (!text) return posts;
    // We use this function to see a substring or string exists in target string.
    function hasWord(target: string, query: string) {
      return target.toLowerCase().indexOf(query.toLowerCase()) > -1;
    }

    // Filtering owners by first and last name.
    return posts.filter((post: Posts) =>
      hasWord(`${post.owner.firstName} ${post.owner.lastName}`, text.trim())
    );
  }

  console.log(filter);

  return (
    <div>
      <Header>
        <input
          className="searchbar"
          type="search"
          value={query}
          placeholder="Search by Owner, Text and Tags"
          onChange={e => setQuery(e.target.value)}
        />
      </Header>
      <PostInfo posts={handleSearch(query)} />
    </div>
  );
}
