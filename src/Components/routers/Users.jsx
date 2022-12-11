import { useCallback, Suspense } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import "./style.css";

export const loader = async () => {
  const users = await fetch(`https://jsonplaceholder.typicode.com/users`).then(
    (r) => r.json()
  );
  return { users };
};

export default function Users() {
  const navigate = useNavigate();
  const goToUser = useCallback(
    (id) => () => navigate(`/users/${id}`),
    [navigate]
  );

  const { users } = useLoaderData();

  return (
    <Suspense fallback={<div className="page-user">Loading...</div>}>
      <div className="page-users">
        {users.map((user) => (
          <div key={user.id} onClick={goToUser(user.id)}>
            {user.name}
          </div>
        ))}
      </div>
    </Suspense>
  );
}
