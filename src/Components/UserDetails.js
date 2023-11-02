import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Timer from "./Timer";

const UserDetails = () => {
  const [userDetails, setUserDetails] = useState({});
  const [posts, setposts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [time, setTime] = useState(localStorage.getItem("date"));
  const dateObject = new Date(time);
  const timestamp = dateObject.getTime();
  const newDate = new Date(dateObject.getTime() + 2 * 60 * 1000);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setUserDetails(json);
      });
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then((res) => res.json())
      .then((json) => {
        setposts(json);
      });
  }, []);

  return (
    <>
      <Container className="py-5">
        <h3 className="text-center mb-3">Profile Details</h3>
        <section className="dFlexJb mb-5">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            Back
          </button>
          <div className="dFlex">
            <p className="mr15">Country Dropdown</p>
            <Timer />
          </div>
        </section>
        <section className="user-info mb-5">
          <div className="dFlexJb mb7">
            <p>Name : {userDetails.name}</p>
            <p>
              Address : {userDetails?.address?.zipcode}{" "}
              {userDetails?.address?.street} {userDetails?.address?.city}
            </p>
          </div>
          <div className="dFlexJb mb7">
            <p>
              Username : {userDetails.username} | Catch phrase :{" "}
              {userDetails?.company?.catchPhrase}
            </p>
            <p>
              Email : {userDetails.email} | Phone {userDetails.phone}
            </p>
          </div>
        </section>
        <Row>
          {posts?.map((elem) => {
            return (
              <Col lg={4} xs={12} key={elem.id}>
                <div className="card-content">
                  <p className="mb7">
                    <b>Title :</b> {elem.title}
                  </p>
                  <p>
                    <b>Information</b> : {elem.body}
                  </p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default UserDetails;
