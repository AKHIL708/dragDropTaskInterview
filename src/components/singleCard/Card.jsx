import React from "react";

const Card = ({ props }) => {
  console.log(props);
  return (
    <>
      <section id="card-container">
        <div className="card">
          <div className="row">
            {" "}
            <p>Name</p> : <h1></h1>
          </div>
          <div className="row">
            {" "}
            <p>email</p> : <h1></h1>
          </div>
          <div className="row">
            {" "}
            <p>phone</p> : <h1></h1>
          </div>
          <div className="row">
            {" "}
            <p>age</p> : <h1></h1>
          </div>
        </div>
      </section>
    </>
  );
};

export default Card;
