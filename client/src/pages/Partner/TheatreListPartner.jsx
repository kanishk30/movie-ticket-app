import React, { useState } from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import TheatreForm from "./TheatreForm";

const TheatreListPartner = () => {
  const [theatres, setTheatres] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formType, setFormType] = useState("add");
  const [selectedTheatre, setSelectedTheatre] = useState(null);

  const tableHeadings = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value, record, index) => {
        if (record.isActive) return "Approved";
        return "Pending / Blocked";
      },
    },
    {
      title: "Action",
      render: (value, record, index) => {
        return (
          <div className="d-flex gap-10">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedTheatre(record);
              }}
            >
              <EditOutlined />
            </Button>
            <Button>
              <DeleteOutlined />
            </Button>
            <Button>
              <PlusOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
          setSelectedTheatre(null);
          setFormType("add");
        }}
      >
        Add theatre
      </Button>
      <Table dataSource={theatres} columns={tableHeadings} />
      {isModalOpen ? (
        <TheatreForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
        />
      ) : null}
    </div>
  );
};

export default TheatreListPartner;
