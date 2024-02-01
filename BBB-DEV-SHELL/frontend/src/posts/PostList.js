import React, { useState, useEffect } from "react";
// import PostDetail from "./PostDetail"
import SearchForm from "./SearchForm";
import JoblyApi from "../api/api";
import PostCard from "./PostCard";
import NewMessageForm from "./NewMessageForm1"


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


    async function addPost(title, content){
      let posts = await JoblyApi.addPost(title, content)
      setPosts(posts)
    }
    
    async function removePost(id){
      let posts = await JoblyApi.addPost(id)
      setPosts(posts)
    }
    
    async function updatePost(id){
      let posts = await JoblyApi.addPost(id)
      setPosts(posts)
    }
    
console.debug("posts=", posts)
if (!posts) return <p>Loading...</p>

  return (
    <div >
        <SearchForm searchFor={search} />
        <NewMessageForm addPost={addPost} />
    {/* <h1>Post List</h1> */}
        {posts.length
            ? (<div >
                {posts.map(p => (
                    <div>
                    <PostCard
                        key={p.id}
                        id={p.id}
                        // name={p.id}
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