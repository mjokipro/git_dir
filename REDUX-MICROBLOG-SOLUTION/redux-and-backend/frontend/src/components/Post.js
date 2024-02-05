import React, { useEffect, useState } from "react";
import "./Post.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  getPostFromAPI,
  updatePostInAPI,
  sendVoteToAPI,
  sendCommentToAPI,
  removeCommentFromAPI,
  removePostFromAPI
} from "../actions/posts";
import PostForm from "../components/PostForm";
import CommentList from "../components/CommentList";
import PostDisplay from "../components/PostDisplay";
import CommentForm from "../components/CommentForm";

/** Post:
 *
 * - get post data from API, if not present
 * - allows post to be edited (toggleEdit is local state for this)
 * - handles edit form submission
 * - handles add-comment form submission
 * - handles comment-deletion
 * - handles post-deletion
 */

function Post(props) {

  const [isEditing, setIsEditing] = useState(false);
  const postId = Number(useParams().postId);
  const history = useHistory();
  const post = useSelector(st => st.posts[postId]);
  const dispatch = useDispatch();

  /** If we don't have the post, request it from API. */

  useEffect(function loadPostWhenPostOrIdChanges() {
    async function getPost() {
      dispatch(getPostFromAPI(postId));
    }
    if (!post) {
      getPost();
    }
  }, [dispatch, postId, post]);

  /** Toggle editing on/off */

  function toggleEdit() {
    setIsEditing(edit => !edit);
  }

  /** Handle post editing: adds to backend. */

  function edit({ title, description, body }) {
    dispatch(updatePostInAPI(
      postId,
      title,
      description,
      body
    ));

    toggleEdit();
  }

  /** Handle post deletion: deletes from backend. */

  function deletePost() {
    dispatch(removePostFromAPI(postId));
    history.push("/");
  }

  /** Handle voting in backend. */

  function vote(direction) {
    dispatch(sendVoteToAPI(postId, direction));
  }

  /** Handle adding a comment: adds to backend. */

  function addComment(text) {
    dispatch(sendCommentToAPI(postId, text));
  }

  /** Handle deleting a comment in backend. */

  function deleteComment(commentId) {
    dispatch(removeCommentFromAPI(postId, commentId));
  }

  /** Render:
   *
   * - if not post yet, a loading message
   * - if editing, the edit form & comments
   * - if not, the display & comments
   */

  if (!post) return <p>Loading</p>;

  return (
    <div className="Post">

      {isEditing
        ? <PostForm post={post} save={edit} cancel={toggleEdit} />
        : <PostDisplay post={post}
                        toggleEdit={toggleEdit}
                        deletePost={deletePost}
                        doVote={vote} />}

      <section className="Post-comments mb-4">
        <h4>Comments</h4>
        <CommentList comments={post.comments}
                      deleteComment={deleteComment} />
        <CommentForm submitCommentForm={addComment} />
      </section>

    </div>
  );
}

export default Post;