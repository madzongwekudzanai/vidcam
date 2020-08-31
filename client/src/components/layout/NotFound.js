import React, { Fragment } from "react";
import error from "./coverimages/error.png";
import { Button, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TitleHeader from "./TitleHeader";

const NotFound = () => {
  const history = useHistory();
  return (
    <Fragment>
      <TitleHeader title="page not found" pageTitle="404 Page" />
      <Container>
        <div className="text-center">
          <div
            style={{
              margin: "auto",
              width: "50%",
              padding: "10px",
            }}
          >
            <img src={error} alt="Not Found" />
          </div>

          <h2>PAGE NOT FOUND</h2>
          <p>
            The page you are Looking for was Moved, Removed, Renamed or Might
            Never Existed
          </p>
          <div className="pb-30">
            <div className="row justify-content-between">
              <div>
                <Button
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  GO HOME
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    history.push("/contact");
                  }}
                  variant="info"
                >
                  CONTACT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default NotFound;
