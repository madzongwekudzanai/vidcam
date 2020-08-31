import React, { Fragment } from "react";
import TitleHeader from "../layout/TitleHeader";
import ContactForm from "./ContactForm";
import ContactSupport from "./ContactSupport";

const Contact = () => {
  return (
    <Fragment>
      <TitleHeader title="Contact Us" pageTitle="Contact" />
      <div className="content-wrapper pt-50 pb-60">
        <div className="container">
          <div className="row">
            <div className="col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
              <div className="section-title">
                <h2>Contact us for help</h2>
                <p>
                  Expression acceptance imprudence particular had unsatiable.
                </p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
      <ContactSupport />
    </Fragment>
  );
};

export default Contact;
