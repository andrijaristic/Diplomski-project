import { FC, useEffect } from "react";
import ViewRooms from "../components/ViewRooms/ViewRooms";
import { useAppDispatch } from "../store/hooks";
import { useParams } from "react-router-dom";
import { clearRooms, getAccommodationRoomsAction } from "../store/roomSlice";

const ViewRoomsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(clearRooms());
    dispatch(getAccommodationRoomsAction(id ? id : ""));
  }, [dispatch, id]);

  return <ViewRooms />;
};

export default ViewRoomsPage;
