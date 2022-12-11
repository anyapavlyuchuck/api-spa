import { Suspense } from "react";
import { Await, useLoaderData, Link, json } from "react-router-dom";
import "./style.css";

export const loader = ({ params: { id } }) => {
  const albumPromise = new Promise((r) => {
    setTimeout(async () => {
      const getAlbum = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${id}`
      ).then((r) => r.json());

      const getPhoto = await fetch(
        `https://jsonplaceholder.typicode.com/photos?albumId=${id}`
      ).then((r) => r.json());

      const getUser = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${id}`
      )
        .then((r) => r.json())
        .then((r) =>
          fetch(`https://jsonplaceholder.typicode.com/users/${r.userId}`).then(
            (r) => r.json()
          )
        );

      const albums = [getAlbum, getPhoto, getUser];

      r(albums);
      return getUser;
    }, 10);
  });

  return { albumPromise };
};

export default function Album() {
  const { albumPromise } = useLoaderData();

  return (
    <Suspense fallback={<div className="page-user">Loading...</div>}>
      <Await resolve={albumPromise}>
        {(albums) => {
          return (
            <div className="page-album ">
              <div className="album-name">{albums[0].title}</div>
              <div>
                Created by:
                <Link className="creator-name" to={`/users/${albums[2].id}`}>
                  {albums[2].name}
                </Link>
              </div>

              <div>
                {albums[1].map((photo) => (
                  <img className="photos" key={photo.id} src={photo.url} />
                ))}
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
