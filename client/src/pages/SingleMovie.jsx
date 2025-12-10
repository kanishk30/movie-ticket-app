import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleMovie } from "../backend/movie";
import { getAllTheatresAndShows } from "../backend/show";
import {
  Card,
  Col,
  Row,
  Image,
  Typography,
  Tag,
  Rate,
  Button,
  Input,
} from "antd";
import moment from "moment";

const { Title } = Typography;

const SingleMovie = () => {
  const [movie, setMovie] = useState(null);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const [theatres, setTheatres] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    const fetchAllTheatresAndShows = async () => {
      try {
        const response = await getAllTheatresAndShows({
          movie: id,
          date: date,
        });
        setTheatres(response.shows);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllTheatresAndShows();
  }, [date]);

  const handleDateChange = (ev) => {
    const dateSelected = ev.target.value;
    setDate(dateSelected);
    navigate(`/singleMovie/${id}?date=${dateSelected}`);
  };

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
            {/* date picker > */}
            <div className="d-flex">
              <label>Choose Date:</label>
              <Input onChange={handleDateChange} type="date" value={date} />
            </div>
          </Col>
        </Row>
      </Card>

      {theatres && theatres.length > 0 ? (
        <>
          <h2>Theatres</h2>
          {theatres.map((theatre) => {
            return (
              <div key={theatre._id}>Ticket Price: {theatre.ticketPrice}</div>
            );
          })}
        </>
      ) : null}
    </div>
  );
};

export default SingleMovie;
