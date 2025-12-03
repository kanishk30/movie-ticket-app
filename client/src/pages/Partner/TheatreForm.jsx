import React from "react";
import { Modal, Form, Row, Col, Input, Select, Button, message } from "antd";

const TheatreForm = ({ isModalOpen, setIsModalOpen }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal open={isModalOpen} width={800} onCancel={handleCancel}>
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={onFinish}
        initialValues={selectedMovie}
      >
        <Row
          gutter={{
            xs: 6,
            sm: 10,
            md: 12,
            lg: 16,
          }}
        >
          <Col span={24}>
            <Form.Item
              label="Theatre Name"
              htmlFor="name"
              name="name"
              className="d-block"
              rules={[{ required: true, message: "Theatre name is required!" }]}
            >
              <Input
                id="name"
                type="text"
                placeholder="Enter the Theatre name"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Theatre Address"
              htmlFor="address"
              name="address"
              className="d-block"
              rules={[
                { required: true, message: "Theatre address is required!" },
              ]}
            >
              <Input
                id="address"
                type="text"
                placeholder="Enter the Theatre address"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Theatre Email"
              htmlFor="email"
              name="email"
              className="d-block"
              type="email"
              rules={[
                { required: true, message: "Theatre email is required!" },
              ]}
            >
              <Input
                id="email"
                type="text"
                placeholder="Enter the Theatre email"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone Number"
              htmlFor="phone"
              name="phone"
              className="d-block"
              rules={[
                { required: true, message: "Theatre phone is required!" },
              ]}
            >
              <Input
                id="phone"
                type="text"
                placeholder="Enter the Theatre phone"
              ></Input>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ fontSize: "1rem", fontWeight: "600" }}
          >
            Submit the Data
          </Button>
          <Button className="mt-3" block>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TheatreForm;
