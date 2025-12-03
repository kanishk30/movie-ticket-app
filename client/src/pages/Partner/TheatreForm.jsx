import React from "react";
import { Modal, Form, Row, Col, Input, Select, Button, message } from "antd";
import { addTheatre, updateTheatre } from "../../backend/theatre";
import { useSelector, useDispatch } from "react-redux";

const TheatreForm = ({
  formType,
  isModalOpen,
  setIsModalOpen,
  selectedTheatre,
  setSelectedTheatre,
}) => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    try {
      // if (!userData) {
      //   message.error("No user found. Please login.");
      //   return;
      // }
      let resp = null;
      if (formType === "add") {
        // HARDCODED TEMPORARILY.
        const payload = { ...values, owner: "691fd281880f6df83c4862cb" };
        resp = await addTheatre(payload);
      } else {
        // edit flow later.
      }
      console.log(resp, "response from add");
      if (resp && resp.success) {
        message.success("Theatre added.");
      } else {
        message.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      message.error(error?.message || "Something went wrong");
    }
  };

  return (
    <Modal open={isModalOpen} width={800} onCancel={handleCancel}>
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        onFinish={onFinish}
        initialValues={selectedTheatre}
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
