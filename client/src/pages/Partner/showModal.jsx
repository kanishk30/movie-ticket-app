import React, { useEffect } from "react";
import { Button, message, Modal, Table } from "antd";
import { Form, Row, Col, Input, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useState } from "react";
import { getAllMovies } from "../../backend/movie";

import { getShows, addShow } from "../../backend/show";

const showModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTheatre,
  setSelectedtheatre,
}) => {
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [view, setView] = useState("table"); // form == add/edit show ; table == list of shows.

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // get the data for all movies
  const getData = async () => {
    try {
      const allMovies = await getAllMovies();
      if (allMovies.success) {
        setMovies(allMovies.data);
      } else {
        message.error(allMovies.error);
      }

      const allShowsResponse = await getShows({
        theatreId: selectedTheatre._id,
      });
      setShows(allShowsResponse.data);
      if (allShowsResponse.success) {
        console.log(allShowsResponse);
      } else {
        console.log("error in shows");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    // calling get data and then setShows(..)
    getData();
  }, []);

  console.log("selectedTheatre", selectedTheatre);
  const onFinish = async (values) => {
    try {
      const response = await addShow({
        ...values,
        theatre: selectedTheatre._id,
      });
      if (response.success) {
        message.success(response.message);
        setView("table");
      } else {
        message.error("Cannot add show. Please try again");
      }
    } catch (error) {
      console.log("Add show error", error);
      message.error("Cannot add show. Please try again");
    }
  };

  const tableHeadings = [
    {
      title: "Show Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Show Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Show Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Ticket Price",
      dataIndex: "ticketPrice",
      key: "ticketPrice",
    },

    {
      title: "Total Seats",
      dataIndex: "totalSeats",
      key: "totalSeats",
    },
    {
      title: "Movie",
      dataIndex: "movie",
      render: (value, record) => {
        return record.movie.title;
      },
    },
    {
      title: "Theatre",
      dataIndex: "theatre",
      render: (value, record) => {
        return record.theatre.name;
      },
    },
  ];

  return (
    <Modal open={isModalOpen} width={1200} onCancel={handleCancel}>
      <h3>
        {view === "table"
          ? "List of shows"
          : view === "form"
          ? "Add show"
          : "Edit show"}
      </h3>
      {view === "table" ? (
        <>
          <Button onClick={() => setView("form")}>Add show</Button>
          <Table dataSource={shows} columns={tableHeadings} />
        </>
      ) : null}
      {view === "form" ? (
        <>
          <Form
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={onFinish}
            // initialValues={selectedTheatre}
          >
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
                  label="Show Name"
                  htmlFor="name"
                  name="name"
                  className="d-block"
                  rules={[
                    { required: true, message: "Show name is required!" },
                  ]}
                >
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter the Show name"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Show Date"
                  htmlFor="date"
                  name="date"
                  className="d-block"
                  rules={[
                    { required: true, message: "Show date is required!" },
                  ]}
                >
                  <Input
                    id="date"
                    type="date"
                    placeholder="Enter the Show date"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Show Time"
                  htmlFor="time"
                  name="time"
                  className="d-block"
                  type="time"
                  rules={[
                    { required: true, message: "Show time is required!" },
                  ]}
                >
                  <Input
                    id="time"
                    type="time"
                    placeholder="Enter the Show email"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Movie Name"
                  htmlFor="movie"
                  name="movie"
                  className="d-block"
                  rules={[
                    { required: true, message: "Show movie is required!" },
                  ]}
                >
                  <Select
                    placeholder="Select movie name"
                    id="movie"
                    style={{ width: "100%", height: "45px" }}
                    options={movies.map((movie) => ({
                      key: movie._id,
                      label: movie.title,
                      value: movie._id,
                    }))}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Ticket Price"
                  htmlFor="ticketPrice"
                  name="ticketPrice"
                  className="d-block"
                  rules={[
                    {
                      required: true,
                      message: "Show Ticket Price is required!",
                    },
                  ]}
                >
                  <Input
                    id="ticketPrice"
                    type="number"
                    placeholder="Enter the ticket price"
                  ></Input>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Total Seats"
                  htmlFor="totalSeats"
                  name="totalSeats"
                  className="d-block"
                  rules={[
                    { required: true, message: "Total Seats is required!" },
                  ]}
                >
                  <Input
                    id="totalSeats"
                    type="number"
                    placeholder="Enter the Show totalSeats"
                  ></Input>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button
                block
                style={{ fontSize: "1rem", fontWeight: "600" }}
                onClick={() => setView("table")}
              >
                <ArrowLeftOutlined /> Go Back
              </Button>
              <Button className="mt-3" block type="primary" htmlType="submit">
                {view === "form" ? "Add show" : "Edit show"}
              </Button>
            </Form.Item>
          </Form>
        </>
      ) : null}
    </Modal>
  );
};

export default showModal;
