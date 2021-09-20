import { useEffect, useState, Suspense, lazy } from "react";
import "./App.css";
import { fetchData } from "./util";
import { Posts } from "./interface/Posts";
import Navbar from "./components/Navbar/Navbar";
import RangeSlider from "./components/RangeSlider/RangeSlider";
import Dropmenu from "./components/Dropmenu/Dropmenu";
const PostInfo = lazy(() => import("./components/PostInfo/PostInfo"));

export default function App() {
  const URL = "https://dummyapi.io/data/v1/post?limit=50";
  const APP_ID = "614388656e2fec97b56911c0";
  const [data, setData] = useState<Posts[]>([]);
  const [query, setQuery] = useState("");
  const filters = ["owner", "text", "tags"];
  const [searchParams, setSearchParams] = useState(["owner", "text", "tags"]);
  const [likes, setLikes] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagsParam, setTagsParam] = useState<string[]>([]);
  const [owners, setOwners] = useState([]);
  const [ownersParam, setOwnersParam] = useState<string[]>([]);

  useEffect(() => {
    fetchData(URL, APP_ID).then(data => {
      setData(data.data);
      let tags = data.data.map(data => data.tags.map(tag => tag));
      tags = [...new Set(tags.flat(Infinity))];
      setTags(tags);
      let owners = data.data.map(
        data => `${data.owner.firstName} ${data.owner.lastName}`
      );
      owners = [...new Set(owners)];
      setOwners(owners);
    });
  }, []);

  function handleSearch(text?: string) {
    // We use this function to see a substring or string exists in target string.
    function hasWord(target: string, query: string) {
      return target.toLowerCase().indexOf(query.toLowerCase()) > -1;
    }

    // Guard clause to check if any search parameter exists.
    if (!text && !likes && !tagsParam.length && !ownersParam.length)
      return data;

    const filterByTags = data.filter(post =>
      post.tags.some(tag => (tagsParam.length ? tagsParam.includes(tag) : data))
    );

    const filterByOwner = filterByTags.filter(post => {
      const owner = `${post.owner.firstName} ${post.owner.lastName}`;
      return ownersParam.length ? ownersParam.includes(owner) : filterByTags;
    });

    const filterByLikes = filterByOwner.filter(post => {
      return post.likes >= likes;
    });

    // Guard clause for the search
    if (!text || !searchParams?.length) return filterByLikes;

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
    setTagsParam([]);
    setOwnersParam([]);
    setQuery("");
    setLikes(0);
  }

  return (
    <div>
      <Navbar>
        <div className="filters">
          <button className="clear" onClick={clearAll}>
            clear
          </button>
          <input
            autoFocus
            className="searchbar"
            type="search"
            value={query}
            placeholder={`Search by ${searchParams.join(", ")}.`}
            onChange={e => setQuery(e.target.value)}
          />

          <div className="searchmenu">
            {filters.map(filter => (
              <div key={filter}>
                <label>
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
              </div>
            ))}
          </div>
        </div>

        <div>
          <Dropmenu
            label="owners"
            params={ownersParam}
            contents={owners}
            setParams={setOwnersParam}
          />
          <Dropmenu
            label="tags"
            params={tagsParam}
            contents={tags}
            setParams={setTagsParam}
          />
        </div>

        <RangeSlider slider={likes} setSlider={setLikes} />
      </Navbar>

      <Suspense fallback={<h2 style={{ textAlign: "center" }}>Loading...</h2>}>
        <PostInfo data={handleSearch(query)} />
      </Suspense>
    </div>
  );
}
