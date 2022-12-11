import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import "./User.css";

export const loader = ({ params: { id } }) => {
  const userPromise = fetch(
    `https://jsonplaceholder.typicode.com/album/${id}`
  ).then((r) => r.json());
  return { userPromise };
};

export default function Photo() {
  const { userPromise } = useLoaderData();

  return (
    <Suspense fallback={<div className="page">Loading...</div>}>
      <Await resolve={userPromise}>
        {(photo) => {
          return (
            <div className="page">
              <div>{photo.title}</div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}
