import React from "react";
import { Modal, Form, Input, Select, Col, Button, Row } from "antd";

const Movieform = ({ isModalOpen, setIsModalOpen }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Basic Modal"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={handleCancel}
      width={800}
    >
      <Form layout="vertical" style={{ width: "100%" }} initialValues={""}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col span={24}>
            <Form.Item
              label="Movie Name"
              name="title"
              rules={[{ required: true, message: "Movie name is required!" }]}
            >
              <Input placeholder="Enter the movie name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <Input placeholder="Enter the movie description" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={8}>
                <Form.Item
                  label="Movie Duration (in min)"
                  name="duration"
                  rules={[
                    { required: true, message: "Movie duration is required!" },
                  ]}
                >
                  <Input placeholder="Enter the movie Duration" type="number" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Movie language"
                  name="language"
                  rules={[
                    { required: true, message: "Movie language is required!" },
                  ]}
                >
                  <Select
                    placeholder="Select language"
                    options={[
                      { label: "English", value: "English" },
                      { label: "Hindi", value: "Hindi" },
                      { label: "Kannada", value: "Kannada" },
                      { label: "Punjabi", value: "Punjabi" },
                      { label: "Marathi", value: "Marathi" },
                      { label: "Tamil", value: "Tamil" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Release date"
                  name="releaseDate"
                  rules={[
                    { required: true, message: "Release date is required!" },
                  ]}
                >
                  <Input placeholder="Enter release date" type="date" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={8}>
                <Form.Item
                  label="Movie Genre"
                  name="genre"
                  rules={[
                    { required: true, message: "Movie Genre is required!" },
                  ]}
                >
                  <Select
                    placeholder="Select language"
                    options={[
                      { label: "Action", value: "Action" },
                      { label: "Comedy", value: "Comedy" },
                      { label: "Romance", value: "Romance" },
                      { label: "Thriller", value: "Thriller" },
                      { label: "Horror", value: "Horror" },
                      { label: "Mystery", value: "Mystery" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label="Poster Path"
                  name="poster"
                  rules={[
                    { required: true, message: "Poster Pathis required!" },
                  ]}
                >
                  <Input placeholder="Enter URL for image poster" />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Movieform;
