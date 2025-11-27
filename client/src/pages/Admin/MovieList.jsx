import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { getAllMovies } from "../../backend/movie";
import moment from "moment";
import Movieform from "./Movieform";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  ];

  return (
    <>
      <div className="justify-content-end d-flex">
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add movie
        </Button>
      </div>
      <Table dataSource={movies} columns={tableHeadings} />
      {isModalOpen ? (
        <Movieform isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      ) : null}
    </>
  );
};

export default MovieList;
