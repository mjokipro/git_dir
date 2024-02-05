import React from "react";
import "./NewPost.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { sendPostToAPI } from "../actions/posts";
import PostForm from "../components/PostForm";

/** Show post form, and handle editing of it. */

function NewPost() {

  const dispatch = useDispatch();
  const history = useHistory();

  /** Adds post and saves to backend. */

  function add({ title, description, body }) {
    dispatch(sendPostToAPI(title, description, body));
    history.push("/");
  }

  /** Cancel (redirect) */

  function cancel() {
    history.push("/");
  }

  return (
    <main>
      <h1>New Post</h1>
      <PostForm save={add} cancel={cancel} />
    </main>
  );
}

export default NewPost;
