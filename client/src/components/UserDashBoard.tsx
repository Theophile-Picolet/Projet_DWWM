import { useLoaderData } from "react-router-dom";
import "../styles/userdashboard.css";

export default function UserDashBoard() {
  const { users } = useLoaderData() as { users: UserType[] };

  return (
    <>
      <section className="dashboard-container">
        {users.map((user) => (
          <div key={user.id} className="user-dashboard">
            <p>
              id : <b>{user.id}</b>
            </p>
            <p>
              nom : <b>{user.last_name}</b>
            </p>
            <p>
              prenom : <b>{user.first_name}</b>
            </p>
            <p>
              mail : <b>{user.email}</b>
            </p>
            <p>
              rôle : <b>{user.role}</b>
            </p>
            <p>
              {" "}
              abonnement : <b>{user.subscription}</b>
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
