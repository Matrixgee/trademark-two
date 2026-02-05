// hooks/useAuthGuard.ts
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import { isTokenExpired } from "@/utils/utils";
import { clearUser } from "@/Global/UserSlice";
import { RootState } from "@/Global/store";

export const useAuthGuard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state?.user?.Token);

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      dispatch(clearUser());
      router.replace("auth/login");
    }
  }, [token, dispatch, router]);
};
