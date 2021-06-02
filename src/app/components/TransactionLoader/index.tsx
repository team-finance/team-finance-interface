import React from "react";
import { FC } from "react";
import { Modal } from "react-bootstrap";
import Loader from "react-loader-spinner";
import Alert from "assets/images/error.svg";
import "./index.scss";

interface Props {}

const TransactionPopup: FC<Props> = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <>
        <Modal
          className={"modal-theme"}
          animation={false}
          size="xl"
          show={true}
          //   onHide={}
        >
          <Modal.Header className="modal-header-custom" closeButton>
            <Modal.Title className="model-title-custom"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body-info" style={{ padding: "1rem 2rem" }}>
              <div className="pb-5 pt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="90"
                  height="90"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2a6def"
                  style={{
                    strokeWidth: "0.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                  }}
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="16 12 12 8 8 12"></polyline>
                  <line x1="12" y1="16" x2="12" y2="8"></line>
                </svg>
              </div>

              <div className="transaction-details">
                <div className=" transaction-status ">
                  Transaction Submitted
                </div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.google.com"
                  className="sc-jKJlTe cEMwVc"
                >
                  <div className="etherscan-link">View on Etherscan</div>
                </a>
              </div>
              <button
                className="btn btn-lg btn-custom-primary mt-4"
                // onClick={}
                type="button"
              >
                Close
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </>
      {/* <>
        <Modal
          className={`modal-theme`}
          animation={false}
          size="sm"
          show={true}
          //   onHide={handleClose}
        >
          <div>
            <Modal.Header className="modal-header-custom" closeButton>
              <Modal.Title className="model-title-custom"></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="modal-body-info">
                <div
                  style={{
                    margin: " 25px 0",
                  }}
                >
                  <Loader
                    type="Circles"
                    color={`${"rgb(15, 89, 209)"}`}
                    height={100}
                    width={100}
                  />
                </div>
                <h4 className="mt-4">Waiting For Confirmation</h4>
                <p>Confirm this transaction in your wallet</p>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </> */}
      {/* <>
        <Modal
          className={`modal-theme`}
          animation={false}
          size="sm"
          show={true}
          //   onHide={handleClose}
        >
          <Modal.Header className="modal-header-custom" closeButton>
            <Modal.Title className="model-title-custom">Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-body-info" style={{ padding: "1rem 2rem" }}>
              <img className="icon" src={Alert} alt="alert icon" width="85" />
              <h5 className="mt-4">Transaction Rejected</h5>
              <button
                className="btn btn-lg btn-custom-primary mt-4"
                // onClick={handleClose}
                type="button"
              >
                Close
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer className="wallet-footer p-2"></Modal.Footer>
        </Modal>
      </> */}
    </>
  );
};

export default TransactionPopup;
