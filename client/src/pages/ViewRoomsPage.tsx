import { FC, useEffect } from "react";
import ViewRooms from "../components/ViewRooms/ViewRooms";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useParams } from "react-router-dom";
import { clearRooms, getAccommodationRoomsAction } from "../store/roomSlice";
import {
  clearRoomTypes,
  getRoomTypesForAccommodationAction,
} from "../store/roomTypeSlice";

const ViewRoomsPage: FC = () => {
  const dispatch = useAppDispatch();
  const apiState = useAppSelector((state) => state.rooms.apiState);
  const { id } = useParams();

  useEffect(() => {
    dispatch(clearRooms());
    dispatch(clearRoomTypes());
    dispatch(getAccommodationRoomsAction(id ? id : ""));
    dispatch(getRoomTypesForAccommodationAction(id ? id : ""));
  }, [dispatch, id]);

  return <ViewRooms id={id ? id : ""} />;
};

export default ViewRoomsPage;
