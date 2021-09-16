import { useEffect, useState } from "react";
import { fetchData } from "./util";
import { Posts } from "./interface/Posts";
import "./App.css";

function App() {
  const URL = "https://dummyapi.io/data/v1/post?limit=50";
  const APP_ID = "614388656e2fec97b56911c0";
  const [posts, setPosts] = useState<Posts[]>([]);
  const [filter, setFilter] = useState<Posts[]>([]);

  useEffect(() => {
    fetchData(URL, APP_ID).then(data => {
      setPosts(data.data);
      setFilter(data.data);
    });

    console.log(posts, filter);
  }, []);

  return (
    <div>
      <p>Initilizing new project</p>
    </div>
  );
}

export default App;
