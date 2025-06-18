import { User } from "@/app/(panel)/user/page";
import { getId } from "@/hooks/token/Id";
import { secret } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

export function getUsers() {
  const admin_Id = getId();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${secret}/admin/users/${admin_Id}`)
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [admin_Id]);

  return { users, loading, error };
}
