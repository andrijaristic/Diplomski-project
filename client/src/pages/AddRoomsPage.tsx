import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddRooms from "../components/AddRooms/AddRooms";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  clearRoomTypes,
  getRoomTypesForAccommodationAction,
} from "../store/roomTypeSlice";
import { ApiCallState } from "../shared/types/enumerations";

const AddRoomsPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const apiState = useAppSelector((state) => state.roomTypes.apiState);

  useEffect(() => {
    dispatch(clearRoomTypes());
    dispatch(getRoomTypesForAccommodationAction(id ? id : ""));
  }, [id, dispatch]);

  if (apiState === ApiCallState.PENDING) {
    return <LoadingModal show={true} />;
  } else {
    return <AddRooms />;
  }
};

export default AddRoomsPage;
