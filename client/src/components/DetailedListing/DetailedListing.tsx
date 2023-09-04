import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Fade, Grid, Rating, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DetailedListingAmenity from "./DetailedListingAmenity";
import DetailedListingSearchAction from "./DetailedListingSearchAction";
import Comment from "../Comment/Comment";
import NewCommentForm from "../Comment/NewCommentForm";
import ImageDisplay from "../EditListing/ImageDisplay";
import StyledButton from "../UI/Styled/StyledButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IAccommodationImage } from "../../shared/interfaces/accommodationImageInterfaces";
import { defaultNoAmenitiesForListingMessage } from "../../constants/Constants";
import DetailedListingRoomBooking from "./DetailedListingRoomBooking";
import { IRoomSearch } from "../../shared/interfaces/roomInterfaces";
import { getFilteredRoomsAction } from "../../store/roomSlice";

const noAmenitiesMessage: JSX.Element = (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <ErrorIcon color="error" />
    <Typography variant="h6" color="error" sx={{ pl: 1 }}>
      {defaultNoAmenitiesForListingMessage}
    </Typography>
  </Box>
);

const DetailedListing: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const accommodation = useAppSelector(
    (state) => state.accommodations.detailedAccommodation
  );
  const accommodationComments = useAppSelector(
    (state) => state.comments.accommodationComments
  );
  const bookingRooms = useAppSelector((state) => state.rooms.bookingRooms);

  const utilities: JSX.Element[] | undefined = accommodation?.utilities?.map(
    (utility) => <DetailedListingAmenity key={utility.id} name={utility.name} />
  );

  const handleBookingSectionNavigation = () => {
    // navigate(`${originalPathname}/#bookings`);
    scrollToSection("bookings")();
  };

  const scrollToSection = (id: string) => () => {
    const element: HTMLElement | null = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const comm = {
    id: "1",
    propertyId: "1",
    propertyName: "Property name",
    userFullName: "Andrija Ristic",
    grade: 4.2,
    header: "This is a title",
    content: "This is a description",
    creationDate: new Date(),
  };

  const content = accommodationComments?.map((comment) => (
    <Comment flag comment={comment} />
  ));

  const images: IAccommodationImage[] = [];
  if (accommodation?.thumbnailImage) {
    images.push(accommodation?.thumbnailImage);
    accommodation?.images.map((image) => images.push(image));
  }

  const handleRoomSearch = (booking: IRoomSearch) => {
    dispatch(getFilteredRoomsAction(booking));
  };

  const bookingRoomsContent: JSX.Element[] = bookingRooms?.map((room) => {
    return <DetailedListingRoomBooking key={room.id} room={room} />;
  });

  return (
    <Fade in>
      <Grid container sx={{ pt: 8, pl: "5%", pr: "5%", pb: "5%" }}>
        <Grid item xs={9}>
          <Grid container direction="column" sx={{ width: "94%", pt: 2 }}>
            {/* Images, Description, Availability & Prices, Comments */}
            <Grid item sx={{ p: 1 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <StyledButton onClick={scrollToSection("description")}>
                  Description
                </StyledButton>
                <StyledButton onClick={scrollToSection("bookings")}>
                  Prices & Booking
                </StyledButton>
                <StyledButton onClick={scrollToSection("reviews")}>
                  Reviews
                </StyledButton>
              </Box>
            </Grid>
            <Grid item sx={{ p: 1 }}>
              <Box
                sx={{
                  height: "80%",
                  width: 1200,
                  maxWidth: { xs: 1600 },
                }}
              >
                <ImageDisplay edit={false} images={images} />
              </Box>
            </Grid>
            <Grid item sx={{ p: 1, pt: 2 }}>
              <Typography id="description" variant="h5" sx={{ pb: 1 }}>
                Our description
              </Typography>
              <Box
                sx={{
                  height: "fit-content",
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ whiteSpace: "pre-wrap", textAlign: "justify" }}
                  >
                    {accommodation?.description}
                  </Typography>
                </Box>
                <Box sx={{ pt: 4 }}>
                  <Typography variant="h6">Available amenities</Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 2, pt: 2 }}
                  >
                    {utilities?.length > 0 ? utilities : noAmenitiesMessage}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item sx={{ pt: 4 }}>
              <Box>
                <Typography id="bookings" variant="h5">
                  Bookings
                </Typography>
                <DetailedListingSearchAction onSearch={handleRoomSearch} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {bookingRoomsContent.length > 0 && bookingRoomsContent}
                </Box>
              </Box>
            </Grid>
            <Grid item sx={{ pt: 4 }}>
              <Box>
                <Typography id="reviews" variant="h5">
                  Comments
                </Typography>
                {isLoggedIn && <NewCommentForm />}
                <Box
                  sx={{
                    pt: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {content.length > 0 && content}
                  <Comment comment={comm} />
                  <Comment comment={comm} />
                  <Comment comment={comm} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "80%",
            }}
          >
            <Typography variant="h5" sx={{ pt: 2, pb: 2 }}>
              {accommodation?.name}
            </Typography>
            <Divider />
            <Box
              sx={{
                pt: 2,
                pb: 2,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Rating
                value={accommodation?.averageGrade}
                precision={0.5}
                readOnly
                sx={{ ml: "auto" }}
              />
              <Typography variant="body1" sx={{ pl: 1, pr: 1 }}>
                {accommodation?.averageGrade}
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                pt: 2,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography>Starting from</Typography>
              <Box
                sx={{
                  ml: "auto",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AttachMoneyIcon sx={{ fontSize: 28 }} />
                <Typography variant="h5" sx={{ pr: 1 }}>
                  {accommodation?.startingPrice}
                </Typography>
              </Box>
            </Box>
            <StyledButton
              onClick={handleBookingSectionNavigation}
              sx={{ mt: 2 }}
            >
              Book now
            </StyledButton>
          </Box>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default DetailedListing;
