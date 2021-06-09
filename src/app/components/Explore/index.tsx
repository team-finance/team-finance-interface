import "../../../assets/scss/explore.scss";
import ExploreCard from "./card";
import { Table, Form, Button, ProgressBar } from "react-bootstrap";
import Logo from "../../../assets/images/metamask.png";

const Explore = () => {
  return (
    <div className="explore-container">
      <div className="explore-sub-container">
        <h1 className="explore-header">TrustSwap | smart locks</h1>
        <h5 className="explore-sub-header">
          Liquidity Locking & Team Vesting for Token Founders and Community
        </h5>
        <div className="m-0 explore-card-container">
          {/* <Col lg={4} md={12} sm={12} className="p-0">
            <ExploreCard />
          </Col>
          <Col lg={4} md={12} sm={12} className="p-0">
            <ExploreCard />
          </Col>
          <Col lg={4} md={12} sm={12} className="p-0">
            <ExploreCard />
          </Col> */}
          <ExploreCard />
          <ExploreCard />
          <ExploreCard />
        </div>
      </div>
      <div className="explorecard-tablemain">
        <div className={`input-search-container w-100`}>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder="Search for a token by name/address/contract"
            />
            <i className="fa fa-search" aria-hidden="true" />
          </div>
        </div>
        {/* </Col> */}
        <Table borderless hover size="md" className="explore-table">
          <thead>
            <tr style={{ color: "#666666", fontWeight: 100 }}>
              <th>NAME</th>
              <th>BLOCKCHAIN</th>
              <th>LIQUIDITY LOCKED</th>
              <th>TOKENS LOCKED</th>
              <th>VALUE LOCKED</th>
              <th>NEXT UNLOCK</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr>
              <td className="name-cell">
                <img src={Logo} alt="logo" className="name-cell-logo" />
                <div>
                  <p className="name-cell-mainvalue">UNI</p>
                  <p className="name-cell-subvalue">uniswap</p>
                </div>
              </td>
              <td>
                <div className="blockchain-cell-container">
                  <img src={Logo} alt="logo" className="blockchain-cell-icon" />
                  <p className="blockchain-value">ETH</p>
                </div>
              </td>
              <td>
                <div className="liquidity-cell-container">
                  <img src={Logo} alt="logo" className="liquidity-cell-logo" />
                  <p className="liquidity-cell-value">ETH</p>
                </div>
              </td>
              <td>
                <div className="tokens-container">
                  <img src={Logo} alt="logo" className="tokens-logo" />
                  <p className="token-value">ETH</p>
                </div>
              </td>
              <td>
                <div className="value-container">
                  <p className="value-container-value">ETH</p>
                </div>
              </td>
              <td>
                <div className="nextunlock-container">
                  <p style={{ fontSize: "0.8rem", margin: 0, padding: 0 }}>
                    2 Months
                  </p>
                  <ProgressBar
                    variant="success"
                    now={100}
                    style={{ height: "5px", width: "75%" }}
                  />
                </div>
              </td>
              <td>
                <Button variant="light">View</Button>
              </td>
            </tr>
            {/* <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Thornton</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Larry the Bird</td>
              <td>@twitter</td>
              <td>@twitter</td>
            </tr> */}
          </tbody>
        </Table>
        {/* </Row> */}
      </div>
    </div>
  );
};

export default Explore;
