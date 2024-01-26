import React, { useState, useEffect } from "react";
import PostDetail from "./PostDetail"
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import PostCard from "./PostCard";


const PostList = () => {
  const [posts, setPosts] = useState(null);
  
  useEffect(() => {
      console.debug("Post List useEffect")
      search()
}, []);

async function search(title){
    let posts = await JoblyApi.getAllPosts(title)
    setPosts(posts)
}

if (!posts) return <p>Loading...</p>

  return (
    <div>
        <SearchForm searchFor={search} />
    {/* <h1>Post List</h1> */}
        {posts.length
            ? (<div>
                {posts.map(p => (
                    <PostCard
                        key={p.id}
                        id={p.id}
                        title={p.title}
                        // name={p.id}
                        content={p.content}
                        userId={p.userId}
                    />
                ))}
            </div>)
            : (<p>No results...</p>)
        }
    </div>
  );
};

export default PostList;