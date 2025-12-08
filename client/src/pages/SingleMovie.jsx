import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMovie } from "../backend/movie";
import { Card, Col, Row, Image, Typography } from "antd";

const { Title } = Typography;

const SingleMovie = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  console.log("movieId", id);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await getSingleMovie(id);
        setMovie(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  if (!movie) return null;

  return (
    <div>
      <Card>
        <Row gutter={16}>
          <Col>
            <Image src={movie.posterPath} alt={movie.title} />
          </Col>
          <Col>
            <Title>{movie.title}</Title>
            {/* to add other fields.. */}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SingleMovie;
