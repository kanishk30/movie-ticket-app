import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { getAllMovies } from "../../backend/movie";
import moment from "moment";
import Movieform from "./Movieform";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState("add");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const getMovies = async () => {
    try {
      const response = await getAllMovies();
      console.log(response.data, "Movielist");
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const tableHeadings = [
    {
      title: "Poster",
      dataIndex: "poster",
      render: (value, record, index) => {
        return <img src={record.posterPath} height={100} width={100} />;
      },
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
    {
      title: "Genre",
      dataIndex: "genre",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      render: (value, record) => {
        return moment(record.releaseDate).format("DD-MM-YYYY");
      },
    },

    {
      title: "Duration",
      dataIndex: "duration",
      render: (value, record, i) => {
        return `${value}min`;
      },
    },
    {
      title: "Ratings",
      dataIndex: "rating",
    },
    {
      title: "Action",
      render: (value, record, index) => {
        console.log("edit data", record);
        return (
          <div className="d-flex gap-10">
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedMovie(record);
              }}
            >
              <EditOutlined />
            </Button>
            <Button>
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="justify-content-end d-flex">
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setSelectedMovie(null);
            setFormType("add");
          }}
        >
          Add movie
        </Button>
      </div>
      <Table dataSource={movies} columns={tableHeadings} />
      {isModalOpen ? (
        <Movieform
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      ) : null}
    </>
  );
};

export default MovieList;
