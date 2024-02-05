import React from 'react';
import Comment from "./Comment"
/** CommentList: shows list of comments passed down as props.
 *
 * Comments can be deleted by clicking next to them; this is handled by
 * the parent.
 *
 */

function CommentList({comments = [], deleteComment}) {
  return (
    comments.map(c => (
      <Comment
        key={c.id}
        id={c.id}
        text={c.text}
        deleteComment={deleteComment}
      />
    )));
}

export default CommentList;
