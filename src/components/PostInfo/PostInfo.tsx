import "./PostInfo.css";
import Thumbnail from "../Thumbnail/Thumbnail";
import { Posts } from "../../interface/Posts";

export default function PostInfo({ posts }) {
  if (!posts.length)
    return <h2 style={{ textAlign: "center" }}>No results...</h2>;

  return (
    <div className="grid-container">
      {posts.map((post: Posts, index: number) => (
        <div className="flex-container" key={post.id}>
          <div className="owner">
            <Thumbnail thumbnail={post.owner.picture} />
            <h2>
              {post.owner.firstName} {post.owner.lastName}
            </h2>
          </div>

          <img className="post-image" src={post.image} alt="post" />

          <div className="post-info">
            <div className="image-subtext">
              <span>
                <i className="bx bxs-like"></i> {post.likes}
              </span>
              <span>
                Publish Date: {new Date(post.publishDate).toLocaleDateString()}
              </span>
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
        </div>
      ))}
    </div>
  );
}
