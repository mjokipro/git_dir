import React from "react";
import useFetch from "./hooks/useFetch";

const DogDetail = () => {
  const data = useFetch("https://dog.ceo/api/breeds/image/random");
  if (data.isLoading) {
    return <div>Loading...</div>;
  }
  if (data.error) {
    return <div>Sorry, something went wrong :(</div>
  }
  const { status, message } = data.response;
  return (
    <div className="App">
      <div>
        <h3>{status}</h3>
        <div>
          <img src={message} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default DogDetail;
