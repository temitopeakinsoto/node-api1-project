import React from "react";

export default function Landing() {
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">NODE-API APP</h1>
              <p className="lead">
                {" "}
                Create a simple application to perform CRUD database operations
              </p>
              <hr />
              <a href="#" className="btn btn-lg btn-info mr-2">
                Sign Up
              </a>
              <a href="#" className="btn btn-lg btn-light">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
