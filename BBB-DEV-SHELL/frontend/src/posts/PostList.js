import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import JoblyApi from "../api/api";
import PostCard from "./PostCard";
import NewMessageForm from "./NewMessageForm1"

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  
  useEffect(function look() {
      search()
    }, []);
    
    async function search(title){
        let posts = await JoblyApi.getAllPosts(title)
        setPosts(posts)
    }
    console.debug("Post List useEffect", posts)

async function addP(data){
  let post = await JoblyApi.addPost(data)
  console.log(post)
  setPost(post)
}
    
console.debug("posts=", post)
if (!posts) return <p>Loading...</p>

  return (
    <div className="container">
        <h3>Enter term or partial term to begin!</h3>        
        <SearchForm searchFor={search} />
        <NewMessageForm addP={addP} />
        {posts.length
            ? (<div >
                {posts.map(p => (
                    <div>
                    <PostCard
                        key={p.id}
                        id={p.id}
                        name={p.id}
                        value={p.title}
                        title={p.title}
                        content={p.content}
                        userId={p.user_id}
                    />
                    </div>
                ))}
            </div>)
            : (<p>No results...</p>)
        }
    </div>
  );
};

export default PostList;