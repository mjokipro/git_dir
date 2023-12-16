import React, { useState } from 'react';

/** Comment form
 *
 * Could be used for adding/editing: just shows form and tracks input.
 *
 */

function CommentForm({submitCommentForm}) {
  const [text, setText] = useState();

  function handleSubmit(evt) {
    evt.preventDefault();
    submitCommentForm(text);
    setText("");
  }

  function handleChange(evt) {
    setText(evt.target.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <input onChange={handleChange}
                id="commentform-text"
                name="text"
                size="50"
                placeholder="New Comment"
                className="form-control"
                value={text} />
        </div>
        <button className="btn btn-primary">Add</button>

      </form>

    </div>
  );
}

export default CommentForm;
