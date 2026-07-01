import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { fetchUsers } from "../../store/user-slice";

export default function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-3">User List</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border rounded-lg p-2 hover:bg-gray-50">
            {user.name} — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
