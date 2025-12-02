import React from "react";
import { Modal, Form, Row, Col, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { addMovie, updateMovie } from "../../backend/movie";

function MovieForm({
  isModalOpen,
  setIsModalOpen,
  formType,
  selectedMovie,
  setSelectedMovie,
}) {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log({ formType, selectedMovie, setSelectedMovie });

  const onFinish = async (values) => {
    if (formType === "add") {
      try {
        const response = await addMovie(values);
        if (response.success) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        message.error(error);
      }
    } else {
      try {
        const response = await updateMovie({
          ...values,
          movieId: selectedMovie._id,
        });
        if (response.success) {
          message.success(response.message);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        message.error(error);
      }
    }
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
              label="Movie Name"
              htmlFor="title"
              name="title"
              className="d-block"
              rules={[{ required: true, message: "Movie name is required!" }]}
            >
              <Input
                id="title"
                type="text"
                placeholder="Enter the movie name"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Description"
              htmlFor="description"
              name="description"
              className="d-block"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <TextArea
                id="description"
                rows="4"
                placeholder="Enter the  description"
              ></TextArea>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={8}>
                <Form.Item
                  label="Movie  Duration (in min)"
                  htmlFor="duration"
                  name="duration"
                  className="d-block"
                  rules={[
                    { required: true, message: "Movie duration  is required!" },
                  ]}
                >
                  <Input
                    id="duration"
                    type="number"
                    placeholder="Enter the movie duration"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Select Movie Lanuage"
                  htmlFor="language"
                  name="language"
                  className="d-block"
                  rules={[
                    { required: true, message: "Movie language  is required!" },
                  ]}
                >
                  <Select
                    id="language"
                    defaultValue="Select Language"
                    style={{ width: "100%", height: "45px" }}
                    options={[
                      { value: "English", label: "English" },
                      { value: "Hindi", label: "Hindi" },
                      { value: "Punjabi", label: "Punjabi" },
                      { value: "Telugu", label: "Telugu" },
                      { value: "Bengali", label: "Bengali" },
                      { value: "German", label: "German" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Release Date"
                  htmlFor="releaseDate"
                  name="releaseDate"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: "Movie Release Date is required!",
                    },
                  ]}
                >
                  <Input
                    id="releaseDate"
                    type="date"
                    placeholder="Choose the release date"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={8}>
                <Form.Item
                  label="Select Movie Genre"
                  htmlFor="genre"
                  name="genre"
                  className="d-block"
                  rules={[
                    { required: true, message: "Movie genre  is required!" },
                  ]}
                >
                  <Select
                    defaultValue="Select Movie"
                    style={{ width: "100%" }}
                    options={[
                      { value: "Action", label: "Action" },
                      { value: "Comedy", label: "Comedy" },
                      { value: "Horror", label: "Horror" },
                      { value: "Love", label: "Love" },
                      { value: "Patriot", label: "Patriot" },
                      { value: "Bhakti", label: "Bhakti" },
                      { value: "Thriller", label: "Thriller" },
                      { value: "Mystery", label: "Mystery" },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={16}>
                <Form.Item
                  label="Poster URL"
                  htmlFor="posterPath"
                  name="posterPath"
                  className="d-block"
                  rules={[
                    { required: true, message: "Movie Poster  is required!" },
                  ]}
                >
                  <Input
                    id="posterPath"
                    type="text"
                    placeholder="Enter the posterPath URL"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
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
}

export default MovieForm;
