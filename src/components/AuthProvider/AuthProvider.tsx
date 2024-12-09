"use client";
// import { getUserData } from "@/services/auth";
import React, { FC, ReactNode } from "react";

interface AuthProvider {
  children: ReactNode;
}

const AuthProvider: FC<AuthProvider> = ({ children }) => {
  // const [cookies] = useCookies(["auth_token"]);
  // const dispatch = useAppDispatch();

  // const handleGetUserData = async () => {
  //   const authToken = cookies.auth_token;
  //   if (authToken) {
  //     const data = await getUserData(authToken);
  //     dispatch(setUser(data));
  //   }
  // };

  // useEffect(() => {
  //   handleGetUserData();
  // }, [cookies]);

  return <>{children}</>;
};

export default AuthProvider;
