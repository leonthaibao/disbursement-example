import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export const Message = ({ type, reason }) => {
  let msg, img;
  switch (type) {
    case "pending":
      msg = <span>Your order has been received! Payment completion pending.</span>;
      img = "success";
      break;
    case "failed":
      msg = <span>The payment was refused. Please try a different payment method or card.</span>;
      img = "failed";
      break;
    case "error":
      msg = (
        <span>
          Error! Reason: <b>{reason || "Internal error"}</b>, refer to&nbsp;
          <a href="https://beta-docs.zalopay.vn/docs/guides/intro">Response handling.</a>
        </span>
      );
      img = "failed";
      break;
    default:
      msg = <span>Payment for <b>{reason}</b> has been successfully processed.</span>;
      img = "success";
  }

  return (
    <>
      <img src={`/images/${img}.svg`} className="status-image" alt={img} />
      {["failed", "error"].includes(type) ? null : <img src="/images/thank-you.svg" className="status-image" alt="thank-you" />}
      <p className="status-message">{msg}</p>
    </>
  );
};

export const StatusContainer = () => {
  let { type } = useParams();
  let query = new URLSearchParams(useLocation().search);
  let reason = query ? query.get("reason") : "";

  return (
    <div className="status-container">
      <div className="status">
        <Message type={type} reason={reason} />
        <Link to="/" className="button">
          New Payroll
        </Link>
      </div>
    </div>
  );
}
