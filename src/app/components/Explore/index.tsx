import "../../../assets/scss/explore.scss";
import ExploreCard from "./card";
import { Table, Form, Button } from "react-bootstrap";
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
        {/* <Row className="m-0 explorecard-table"> */}
        {/* <Col className="m-0 p-0"> */}
        {/* <Form className="explore-search">
          <Form.Control
            type="text"
            placeholder="Search for a token by name/address/contract"
          />
        </Form> */}
        <div className={`input-search-container w-100`}>
          <div className="input-with-icon">
            <input
              type="text"
              placeholder={`Search for a token by name/address/contract`}
              // placeholder="Search for a token by name/address/contract"
            />
            <i className="fa fa-search" aria-hidden="true" />
          </div>
        </div>
        {/* </Col> */}
        <Table borderless hover size="md" className="explore-table">
          <thead>
            <tr>
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
              <td
                style={{
                  backgroundColor: "orange",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img
                  src={Logo}
                  alt="logo"
                  style={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "50%",
                  }}
                />
                <div>
                  <p
                    style={{
                      backgroundColor: "red",
                      fontSize: "1rem",
                      margin: 0,
                    }}
                  >
                    Kin
                  </p>
                  <p style={{ fontSize: "0.8rem", margin: 0, padding: 0 }}>
                    kin
                  </p>
                </div>
              </td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Otto</td>
              <td>@mdo</td>
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
