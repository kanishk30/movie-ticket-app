// total seats layout.. grey out of booked seats, show avaikbale a rest of them.
// on cliek on avaioable seat > book the seat.

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShow } from "../backend/show";
import { Button, Card, Divider, message, Space, Typography } from "antd";
import moment from "moment";

const { Title, Text } = Typography;
let COLUMNS = 10;
const Bookshow = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const res = await getShow({ showId: id });
        if (res.success) {
          setShow(res.data);
        }
      } catch (error) {
        console.error(error);
        message.error("error showing show details");
      }
    };

    if (id) {
      fetchShow();
    }
  }, [id]);

  const getSeats = () => {
    let columns = 10;
    const totalSeats = show?.totalSeats;
    let rows = Math.ceil(totalSeats / columns);
  };

  const handleSeatClick = (seatNumber) => {
    console.log(seatNumber);
    if (isSeatBooked(seatNumber)) return;

    // de-select
    if (isSeatSelected(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // select for first time:

      setSelectedSeats([...selectedSeats, seatNumber]);
    }

    setTotalPrice(selectedSeats.length * show.ticketPrice);
  };

  const isSeatBooked = (seatNumber) => {
    //
    return show?.bookedSeats.includes(seatNumber) || false;
  };

  const isSeatSelected = (seatNumber) => {
    //
    return selectedSeats.includes(seatNumber) || false;
  };

  const getSeatStyle = (seatNumber) => {
    if (isSeatBooked(seatNumber)) {
      return {
        backgroundColor: "#d9d9d9",
        cursor: "not-allowed",
        color: "#8c8c8c",
      };
    }
    if (isSeatSelected(seatNumber)) {
      return {
        backgroundColor: "#1890ff",
        cursor: "pointer",
        color: "#ffffff",
      };
    }

    return {
      backgroundColor: "#f0f0f0",
      cursor: "pointer",
    };
  };

  const handleBooking = async () => {};

  if (!show) {
    return null;
  }

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <Card>
        <div style={{ marginBottom: 24 }}>
          <Title level={2}>{show?.movie?.title}</Title>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <Text>
                <strong>Theatre: </strong>
              </Text>
              <Text>{show?.theatre?.name}</Text>
            </div>
            <div>
              <Text>
                <strong>Date: </strong>
              </Text>
              <Text>{moment(show?.date).format("DD-MM-YYYY")}</Text>
            </div>
            <div>
              <Text>
                <strong>Time: </strong>
              </Text>
              <Text>{show?.time}</Text>
            </div>
            <div>
              <Text>
                <strong>Price: </strong>
              </Text>
              <Text>{show?.ticketPrice}</Text>
            </div>
          </div>
        </div>
      </Card>
      <Divider />

      {/* screen UI > */}

      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <Title strong level={3}>
          SCREEN
        </Title>
      </div>
      {/* seats UI */}

      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
            gap: 8,
            marginBottom: 20,
          }}
        >
          {Array.from({ length: 100 }, (_, index) => {
            const seatNumber = index + 1;
            return (
              <Button
                onClick={() => handleSeatClick(seatNumber)}
                disabled={isSeatBooked(seatNumber)}
                key={seatNumber + "seatNo"}
                style={{
                  ...getSeatStyle(seatNumber),
                  height: 40,
                  minWidth: 40,
                  padding: 2,
                  border: "solid 1px #cacaca",
                }}
              >
                {seatNumber}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Legends */}
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <Space size={"large"}>
          <Space>
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#f0f0f0",
                border: "solid 1px #d9d9d9",
              }}
            />
            <Text>Available</Text>
          </Space>
          <Space>
            <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: "#d9d9d9",
              }}
            />
            <Text>Booked</Text>
          </Space>
        </Space>
      </div>
      <Divider />
      {/* booking summary */}

      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: "100%",
          }}
        >
          <div>
            <Text strong>Selected Seats:</Text>
            <Text>
              {selectedSeats.length > 0
                ? selectedSeats.sort((a, b) => a - b).join(",")
                : "None"}
            </Text>
          </div>
          <div>
            <Text strong>Total Seats:</Text>
            <Text>{selectedSeats.length}</Text>
          </div>
          <div>
            <Text strong>Total Price:</Text>
            <Text>{totalPrice}</Text>
          </div>
        </div>
      </div>

      {/* book button */}
      <Button
        type="primary"
        size="large"
        onClick={handleBooking}
        loading={loading}
        disabled={selectedSeats.length === 0 || loading}
      >
        Book now
      </Button>
    </div>
  );
};

export default Bookshow;
