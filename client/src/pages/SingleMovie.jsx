import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleMovie } from "../backend/movie";
import { Card, Col, Row, Image, Typography, Tag, Rate, Button } from "antd";
import moment from "moment";

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
          <Col xs={24} sm={16}>
            <Image
              src={movie.posterPath}
              alt={movie.title}
              style={{ width: "100%", height: "500px", borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} sm={16}>
            <Title level={4}>{movie.title}</Title>

            <Tag style={{ marginBottom: 4 }}>{movie.genre}</Tag>
            {movie.rating ? (
              <>
                <Rate allowHalf count={10} disabled value={movie.rating} />
                <span style={{ marginLeft: 8 }}>{movie.rating}</span>
              </>
            ) : null}
            <p style={{ marginBottom: 12 }}>{movie.description}</p>

            <strong>Release Date: </strong>
            <span>{moment(movie.releaseDate).format("DD-MM-YYYY")}</span>
            <div>
              <strong>Movie Language: </strong>
              <span>{movie.language}</span>
            </div>
            <div>
              <strong>Duration: </strong>
              <span>{movie.duration}mins</span>
            </div>

            <div style={{ marginTop: 16 }}>
              <Button type="primary">Book Tickets</Button>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SingleMovie;
