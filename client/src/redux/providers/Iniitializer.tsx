import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchCurrentUser } from "../user/user.slice";
import type { AppDispatch } from "../store";

const Initializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return <>{children}</>;
};

export default Initializer;
