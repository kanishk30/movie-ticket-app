import React from "react";
import { Modal, Table } from "antd";
import { useState } from "react";

const showModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {};

  const tableHeadings = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // .. write all from schema..
  ];

  return (
    <Modal open={isModalOpen} width={1200} onCancel={handleCancel}>
      <Table columns={tableHeadings} />
    </Modal>
  );
};

export default showModal;
