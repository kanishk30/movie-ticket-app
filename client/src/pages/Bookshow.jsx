import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShow } from "../backend/show";

const Bookshow = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const res = await getShow({ showId: id });
        setShow(res.data);
      } catch (error) {
        console.error(error);
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

  return <div>Bookshow</div>;
};

export default Bookshow;
