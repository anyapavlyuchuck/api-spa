import { Suspense } from "react";
import { Await, useLoaderData, Link } from "react-router-dom";
import img from "./img/img.jpg";
import "./style.css";

export const loader = ({ params: { id } }) => {
  const userPromise = new Promise((r) => {
    setTimeout(async () => {
      const getUser = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
      ).then((r) => r.json());

      const getAlbum = await fetch(
        `https://jsonplaceholder.typicode.com/albums?userId=${id}`
      ).then((r) => r.json());

      const users = [getUser, getAlbum];
      r(users);
    }, 10);
  });

  return { userPromise };
};

export default function User() {
  const { userPromise } = useLoaderData();

  return (
    <Suspense fallback={<div className="page-user">Loading...</div>}>
      <Await resolve={userPromise}>
        {(users) => {
          return (
            <div className="page-user">
              <div>
                <div className="name-user">{users[0].name}</div>
                <div>Username: {users[0].username}</div>
                <div>Email: {users[0].email}</div>
                <div>Phone: {users[0].phone}</div>
                <div>Site: {users[0].website}</div>
              </div>
              <div>
                <div className="album-user">Albums</div>
                {users[1].map((album) => (
                  <Link
                    key={album.id}
                    className="albums-user"
                    to={`/album/${album.id}`}
                  >
                    <div>
                      <img src={img} className="img-photo"></img>
                      {album.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
