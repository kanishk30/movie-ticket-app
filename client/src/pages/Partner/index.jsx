import React from "react";
import { Tabs } from "antd";
import TheatreListPartner from "./TheatreListPartner";

const Partner = () => {
  const items = [
    {
      key: "1",
      label: "Theatre List",
      children: <TheatreListPartner />,
    },
  ];
  return <Tabs items={items} />;
};

export default Partner;
