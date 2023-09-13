import { FC, useEffect } from "react";
import CommentList from "../components/CommentList/CommentList";
import LoadingModal from "../components/UI/Modal/LoadingModal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ApiCallState } from "../shared/types/enumerations";
import { getUserCommentsAction } from "../store/commentSlice";
import jwtDecode from "jwt-decode";
import { IJwt } from "../shared/interfaces/userInterfaces";

const CommentsPage: FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);
  const apiState = useAppSelector((state) => state.comments.apiState);

  const { id } = jwtDecode<IJwt>(token ? token : "");

  useEffect(() => {
    dispatch(getUserCommentsAction(id));
  }, [dispatch, id]);

  return (
    <>
      <CommentList />
      <LoadingModal show={apiState === ApiCallState.PENDING} />
    </>
  );
};

export default CommentsPage;
