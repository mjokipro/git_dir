import React from 'react';

/** CommentList: shows list of comments passed down as props.
 *
 * Comments can be deleted by clicking next to them; this is handled by
 * the parent.
 *
 */

function Comment({deleteComment, text, id}) {

  function handleDelete(evt) {
    deleteComment(id);
  }

  return (
    <div>
      <p>
        {deleteComment && (
          <i
            className="fa fa-times text-danger mr-2"
            onClick={handleDelete}
          />
        )}

        {text}
      </p>
    </div>
  );
}

export default Comment;
