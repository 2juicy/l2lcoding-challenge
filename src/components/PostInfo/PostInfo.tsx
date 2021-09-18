import "./PostInfo.css";
import Thumbnail from "../Thumbnail/Thumbnail";
import { Posts } from "../../interface/Posts";
import { useEffect, useState } from "react";
import React from "react";

function PostInfo({ data }) {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [display, setDisplay] = useState("none");
  const [loading, setLoading] = useState(false);

  // Lazy loading starts here
  useEffect(() => {
    window.addEventListener("scroll", handleLazy);
    return () => window.removeEventListener("scroll", handleLazy);
  }, []);

  useEffect(() => {
    setPosts(data.slice(0, 10));
  }, [data]);

  useEffect(() => {
    if (!loading) return;
    setPosts(prev => {
      return [...prev, ...data.slice(prev.length, 10 + prev.length)];
    });
    setLoading(false);
  }, [loading, data]);

  function handleLazy() {
    !window.scrollY ? setDisplay("none") : setDisplay("block");
    if (
      window.innerHeight + window.pageYOffset + 100 <
      document.documentElement.offsetHeight
    )
      return;
    setLoading(true);
  }

  // If no posts exist we display no results.
  if (!posts.length)
    return <h2 style={{ textAlign: "center" }}>No results...</h2>;

  return (
    <>
      {posts.map((post: Posts, index: number) => (
        <div className="flex-container" key={post.id}>
          <div className="post-container">
            <div className="owner">
              <Thumbnail thumbnail={post.owner.picture} />
              <h2>
                {post.owner.firstName} {post.owner.lastName}
              </h2>
            </div>
            <div className="post-info">
              <div className="image-subtext">
                <span>
                  <i className="bx bxs-like"></i> {post.likes}
                </span>
                <span>
                  Publish Date:{" "}
                  {new Date(post.publishDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            {post.tags.length > 0 && (
              <div className="tagbar">
                {post.tags.map((tags, index) => (
                  <p key={index}>{tags}</p>
                ))}
              </div>
            )}

            <p>{post.text}</p>
          </div>
          <img className="post-image" src={post.image} alt="post" />
        </div>
      ))}

      <div style={{ display }} className="scroll-top">
        <button onClick={() => window.scrollTo(0, 0)} className="top">
          <i className="bx bxs-chevrons-up"></i>
        </button>
      </div>
    </>
  );
}

export default React.memo(PostInfo);
