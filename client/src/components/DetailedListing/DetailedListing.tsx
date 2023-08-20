import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Divider, Fade, Grid, Rating, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { defaultNoAmenitiesForListingMessage } from "../../constants/Constants";
import DetailedListingAmenity from "./DetailedListingAmenity";
import DetailedListingSearchAction from "./DetailedListingSearchAction";
import StyledButton from "../UI/Styled/StyledButton";
import Comment from "../Comment/Comment";
import NewCommentForm from "../Comment/NewCommentForm";

const DUMMY_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis rutrum aliquam. Pellentesque sed pulvinar eros, ac luctus sapien. Fusce ut leo commodo urna luctus varius eget nec justo. In euismod molestie imperdiet. Proin rhoncus fringilla ex sit amet facilisis. Duis eget placerat turpis, vitae mollis sem. Aenean pulvinar venenatis turpis. Proin venenatis vel massa pellentesque blandit. Duis egestas lectus quis nulla tempor laoreet.

Nullam non dapibus lorem. Aenean hendrerit, dolor in ornare consectetur, ligula ligula commodo lacus, non tincidunt sapien quam at lacus. Pellentesque vitae sem vulputate neque commodo aliquam. Nunc interdum eu diam sit amet condimentum. In sit amet volutpat mi, sed condimentum nibh. Cras fringilla tempor dui, vel fringilla tellus hendrerit id. Integer auctor ut sapien ac hendrerit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Nam nec laoreet nulla, nec aliquet leo.

Proin rhoncus non ante vel scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris quis lorem mi. Vestibulum tempus sapien arcu, vel molestie tellus gravida dapibus. Morbi consequat tincidunt quam quis posuere. Ut tristique pulvinar mauris, eu tempor quam pretium ut. Vivamus ac lorem laoreet, tincidunt elit ut, sodales mauris. Fusce eget nunc et risus molestie finibus. Proin a dolor a magna eleifend convallis a nec velit. Donec quis pretium nisl, sit amet bibendum ligula. Aenean orci nisi, mattis fringilla ex ut, consequat suscipit ex. Integer finibus est in nisi convallis venenatis. Nulla volutpat bibendum arcu in finibus. Maecenas dictum auctor turpis, non pretium metus faucibus eu. In scelerisque consequat aliquet.

Curabitur auctor turpis ac tortor varius, vitae egestas magna egestas. Suspendisse id nulla luctus, porttitor turpis in, imperdiet nunc. Proin in tortor lorem. Sed purus ante, dapibus ac nulla vitae, tincidunt pellentesque massa. Ut et felis gravida, lobortis purus eget, rutrum neque. Aenean non quam in erat euismod hendrerit. Cras lobortis vestibulum est id malesuada. Proin vitae metus rutrum, aliquam sem a, bibendum nunc. Curabitur id aliquet elit, et finibus dui. Etiam vel sem tempus, porttitor orci eleifend, commodo elit. Mauris augue velit, malesuada quis blandit non, congue nec turpis.

Nulla dignissim lorem vel lorem molestie faucibus. Vivamus eu lobortis erat, non dapibus neque. Donec tellus ligula, tristique at eleifend in, euismod eget ante. Praesent eget elementum sapien. Nullam leo lacus, venenatis id elit et, sagittis accumsan felis. Duis ut odio luctus lorem maximus aliquam. Phasellus vel finibus massa. Fusce consectetur velit quis ex scelerisque malesuada. 

Nulla dignissim lorem vel lorem molestie faucibus. Vivamus eu lobortis erat, non dapibus neque. Donec tellus ligula, tristique at eleifend in, euismod eget ante. Praesent eget elementum sapien. Nullam leo lacus, venenatis id elit et, sagittis accumsan felis. Duis ut odio luctus lorem maximus aliquam. Phasellus vel finibus massa. Fusce consectetur velit quis ex scelerisque malesuada.`;

const DUMMY_AMENITIES: JSX.Element[] = [];
for (let i = 0; i < 10; i++) {
  DUMMY_AMENITIES.push(<DetailedListingAmenity key={Math.random() * 100} />);
}

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
  const [rating, setRating] = useState<number>(4.2);

  const handleBookingSectionNavigation = () => {
    // navigate(`${originalPathname}/#bookings`);
    scrollToSection("bookings")();
  };

  const scrollToSection = (id: string) => () => {
    const element: HTMLElement | null = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

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
              <Box>
                <Box
                  component="img"
                  src="/header-background.jpg"
                  alt="thumbnail-image"
                  sx={{
                    width: "100%",
                    aspectRatio: "1.66 / 1",
                  }}
                />
                <Box>Every other image in carousel</Box>
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
                    {DUMMY_DESCRIPTION}
                  </Typography>
                </Box>
                <Box sx={{ pt: 4 }}>
                  <Typography variant="h6">Available amenities</Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 2, pt: 2 }}
                  >
                    {DUMMY_AMENITIES ?? noAmenitiesMessage}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item sx={{ pt: 4 }}>
              <Box>
                <Typography id="bookings" variant="h5">
                  Bookings
                </Typography>
                <DetailedListingSearchAction />
              </Box>
            </Grid>
            <Grid item sx={{ pt: 4 }}>
              <Box>
                <Typography id="reviews" variant="h5">
                  Comments
                </Typography>
                <NewCommentForm />
                <Box
                  sx={{
                    pt: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Comment />
                  <Comment />
                  <Comment />
                  <Comment />
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
              Property name
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
                value={rating}
                precision={0.5}
                readOnly
                sx={{ ml: "auto" }}
              />
              <Typography variant="body1" sx={{ pl: 1, pr: 1 }}>
                {rating}
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
                  {rating}
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
