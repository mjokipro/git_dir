import React, { useEffect, useState } from "react";
import "./TitleList.css";
import { useSelector, useDispatch } from 'react-redux';
import { fetchTitlesFromAPI } from '../actions/titles';
import { Link } from 'react-router-dom';
import { sendVoteToAPI } from "../actions/posts";

/** Show list of blog titles, ordered by popularity. */

function TitleList() {
  const titles = useSelector(st => st.titles);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function() {
    async function fetchTitle() {
      await dispatch(fetchTitlesFromAPI());
      setIsLoading(false);
    }

    if (isLoading) {
      fetchTitle();
    }

  }, [dispatch, isLoading]);


  function vote(direction, id) {
    dispatch(sendVoteToAPI(id, direction));
  }

  if (isLoading) return <b>Loading</b>;

  if (!isLoading && titles.length === 0) {
    return <b>Please add a post!</b>;
  }

  return (
    <div className="row">
      {titles.map(title => (
        <div key={title.id} className="col">
          <div className="card">
            <div className="card-body">
              <div className="card-title">
                <Link to={"/" + title.id}>{title.title}</Link>
              </div>
              <div className="card-text">
                <i>{title.description}</i>
              </div>
            </div>
            <div className="card-footer">
              <small>{title.votes} votes</small>
              <i className="fas fa-thumbs-up text-success ml-2"
                  onClick={evt => vote("up", title.id)} />
              <i className="fas fa-thumbs-down text-danger ml-2"
                  onClick={evt => vote("down", title.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TitleList;