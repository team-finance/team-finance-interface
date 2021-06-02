import { FC } from "react";
import { ProgressBar, Toast } from "react-bootstrap";
import "./index.scss";
import TickIcon from "assets/images/tick.svg";
import ErrorIcon from "assets/images/error.svg";
interface Props {
  handleClose: () => void;
  message: string;
  status: string;
  now: any;
}

const AlertToast: FC<Props> = ({ handleClose, message, now, status }) => {
  // const getActiveHash = () => {
  //   switch (activeTab) {
  //     case "lend":
  //       return depositTransactionHash;
  //     case "reward":
  //       return donateTransactionHash;
  //     case "redeem":
  //       return redeemTransactionHash;
  //     case "airdrop":
  //       return airdropTransactionHash;
  //   }
  // };

  return (
    <>
      <Toast
        className="toast-custom"
        style={{}}
        onClose={handleClose}
        delay={3000}
      >
        <Toast.Header className="toast-custom-header float-right"></Toast.Header>
        <Toast.Body className="toast-custom-body">
          {status === "failed" ? (
            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem",
              }}
            >
              <img
                width="25px"
                height="25px"
                src={ErrorIcon}
                alt=""
                className="error"
              />
              <div
                className=""
                style={{
                  marginLeft: 25,
                }}
              >
                <strong className="mr-auto ">{message}</strong>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={"#"}
                  // href={getTransactionHashUrl(activeNetWork, getActiveHash())}
                >
                  <div className="etherscan-link">View on Explorer</div>
                </a>
              </div>
              {/* {headerTitle ? 'Deposit Failed':''} */}
            </div>
          ) : (
            <div
              className=""
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.75rem",
              }}
            >
              <img src={TickIcon} alt="" className="error" />
              <div
                className=""
                style={{
                  marginLeft: 25,
                }}
              >
                <strong className="mr-auto ">{message}</strong>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="#"
                  // href={getTransactionHashUrl(activeNetWork, getActiveHash())}
                >
                  <div className="etherscan-link">View on Explorer</div>
                </a>
              </div>
            </div>
          )}
          <ProgressBar now={now} srOnly />
        </Toast.Body>
      </Toast>
    </>
  );
};

export default AlertToast;
