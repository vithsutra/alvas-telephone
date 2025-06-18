"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getId } from "../token/Id";

const PUBLIC_ROUTES = ["/login"];

export default function Protected({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getId();

    if (PUBLIC_ROUTES.includes(pathname)) {
      setLoading(false);
      return;
    }

    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [pathname]);

  if (loading) return <div></div>;

  return <>{children}</>;
}
