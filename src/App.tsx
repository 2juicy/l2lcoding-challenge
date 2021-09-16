import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import { fetchData } from "./util";
import { Posts } from "./interface/Posts";
import Searchbar from "./components/Searchbar/Searchbar";

export default function App() {
  const URL = "https://dummyapi.io/data/v1/post?limit=50";
  const APP_ID = "614388656e2fec97b56911c0";
  const [posts, setPosts] = useState<Posts[]>([]);
  const [filter, setFilter] = useState<Posts[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData(URL, APP_ID).then(data => {
      setPosts(data.data);
      setFilter(data.data);
    });
  }, []);

  console.log(posts, filter);

  return (
    <div>
      <Searchbar
        placeholder="Search by Owner, Text or Tags"
        value={search}
        handleSearch={function (e: ChangeEvent<HTMLInputElement>): void {
          throw new Error("Function not implemented.");
        }}
        handleInput={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <p>Initilizing new project</p>
    </div>
  );
}
