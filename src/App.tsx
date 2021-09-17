import { useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./util";
import { Posts } from "./interface/Posts";
import Header from "./components/Header/Header";
import PostInfo from "./components/PostInfo/PostInfo";
import RangeSlider from "./components/RangeSlider/RangeSlider";

export default function App() {
  const URL = "https://dummyapi.io/data/v1/post?limit=50";
  const APP_ID = "614388656e2fec97b56911c0";
  const [data, setData] = useState<Posts[]>([]);
  const [query, setQuery] = useState("");
  const filters = ["owner", "text", "tags"];
  const [likes, setLikes] = useState(0);
  const [searchParams, setSearchParams] = useState(["owner"]);

  useEffect(() => {
    fetchData(URL, APP_ID).then(data => {
      setData(data.data);
    });
  }, []);

  function handleSearch(text?: string) {
    // Guard clause
    if (!text && !likes) return data;
    // 1st filter by likes
    const filterByLikes = data.filter(post => {
      return post.likes >= likes;
    });
    // 2nd Guard Clause because TypeScript is strict
    if (!text) return filterByLikes;

    // We use this function to see a substring or string exists in target string.
    function hasWord(target: string, query: string) {
      return target.toLowerCase().indexOf(query.toLowerCase()) > -1;
    }

    // Filtering happens here by checking the variable type then filter accordingly
    return filterByLikes.filter((post: Posts) =>
      // Depending on what is checked we will search by that parameter
      searchParams.some(param => {
        // Search by Text, check if typeof is string
        if (typeof post[param] === "string")
          return hasWord(post[param], text.trim());
        // Search by tags, check if we have an array
        if (Array.isArray(post[param])) {
          return post[param].some(tag => hasWord(tag, text.trim()));
        }
        // Default search by owner, can make this more dynamic
        if (param === "owner") {
          return hasWord(
            `${post.owner.firstName} ${post.owner.lastName}`,
            text.trim()
          );
        }
        return false;
      })
    );
  }

  function clearAll() {
    setSearchParams([]);
    setQuery("");
    setLikes(0);
  }

  return (
    <div>
      <Header>
        <div className="filters">
          <input
            className="searchbar"
            type="search"
            value={query}
            placeholder={`Search by ${searchParams.join(", ")}.`}
            onChange={e => setQuery(e.target.value)}
          />
          <div className="dropmenu">
            <RangeSlider slider={likes} setSlider={setLikes} />

            {filters.map(filter => (
              <label key={filter}>
                <input
                  type="checkbox"
                  checked={searchParams.includes(filter)}
                  onChange={() => {
                    const check = searchParams.includes(filter);
                    setSearchParams(prev =>
                      check
                        ? prev.filter(param => param !== filter)
                        : [...prev, filter]
                    );
                  }}
                />
                {filter}
              </label>
            ))}
          </div>
        </div>

        <button className="clear" onClick={clearAll}>
          Clear
        </button>
      </Header>

      <PostInfo data={handleSearch(query)} />
    </div>
  );
}
