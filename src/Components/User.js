import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState([]);

  const mapToPost = (data) => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        let postList = (userId) =>
          json?.filter((post) => {
            return post.userId === userId;
          });

        let list = data.map((user) => ({
          ...user,
          post: postList(user?.id),
        }));
        console.log(list);
        setUser(list);
      });
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        mapToPost(json);
      });
  }, []);

  return (
    <>
      <Container className="pt-5">
        <h1 className="text-center mb-2">Directory</h1>
        <section>
          {user.length > 0 &&
            user?.map((elem) => {
              return (
                <Link
                  to={`/user-details/${elem.id}`}
                  key={elem.id}
                  className="user-name"
                >
                  <p>Name : {elem.username}</p>
                  <p>Posts : {elem?.post.length}</p>
                </Link>
              );
            })}
          {/* {users.map((user, idx) => (
          <div key={"user-" + idx}>
            #{idx + 1}
            <p>userId : {user.userId}</p>
            <p>name : {user.name}</p>
            <p>posts : {user?.post.length}</p>
            <hr />
          </div>
        ))} */}
        </section>
      </Container>
    </>
  );
};

export default User;
