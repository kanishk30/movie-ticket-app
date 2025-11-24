import React, { useEffect } from "react";
import { getCurrentUser } from "../backend/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      const userData = await getCurrentUser();
      console.log(userData);
      dispatch(setUserData(userData));
    } catch (error) {
      console.log("user data error", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!userData) {
    console.log("waiting for userdata....");
  }

  return (
    <>
      <div>Welcome, Home!</div>
      <h3>{userData?.name}</h3>
      <h3>{userData?.email}</h3>
    </>
  );
};

export default Home;
