import React from "react";
import MovieList from "./MovieList";
import TheatreList from "./TheatreList";
import { Tabs } from "antd";

const Admin = () => {
  const items = [
    {
      key: "1",
      label: "MovieList",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "TheatreList",
      children: <TheatreList />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Admin;
