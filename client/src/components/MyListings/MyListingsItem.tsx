import { FC } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IAccommodationMinimal } from "../../shared/interfaces/accommodationInterfaces";

const DUMMY_TITLE = "Dummy property name";
const DUMMY_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis rutrum aliquam. Pellentesque sed pulvinar eros, ac luctus sapien. Fusce ut leo commodo urna luctus varius eget nec justo. In euismod molestie imperdiet. Proin rhoncus fringilla ex sit amet facilisis. Duis eget placerat turpis, vitae mollis sem. Aenean pulvinar venenatis turpis. Proin venenatis vel massa pellentesque blandit. Duis egestas lectus quis nulla tempor laoreet.

Nullam non dapibus lorem. Aenean hendrerit, dolor in ornare consectetur, ligula ligula commodo lacus, non tincidunt sapien quam at lacus. Pellentesque vitae sem vulputate neque commodo aliquam. Nunc interdum eu diam sit amet condimentum. In sit amet volutpat mi, sed condimentum nibh. Cras fringilla tempor dui, vel fringilla tellus hendrerit id. Integer auctor ut sapien ac hendrerit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Nam nec laoreet nulla, nec aliquet leo.

Proin rhoncus non ante vel scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris quis lorem mi. Vestibulum tempus sapien arcu, vel molestie tellus gravida dapibus. Morbi consequat tincidunt quam quis posuere. Ut tristique pulvinar mauris, eu tempor quam pretium ut. Vivamus ac lorem laoreet, tincidunt elit ut, sodales mauris. Fusce eget nunc et risus molestie finibus. Proin a dolor a magna eleifend convallis a nec velit. Donec quis pretium nisl, sit amet bibendum ligula. Aenean orci nisi, mattis fringilla ex ut, consequat suscipit ex. Integer finibus est in nisi convallis venenatis. Nulla volutpat bibendum arcu in finibus. Maecenas dictum auctor turpis, non pretium metus faucibus eu. In scelerisque consequat aliquet.

Curabitur auctor turpis ac tortor varius, vitae egestas magna egestas. Suspendisse id nulla luctus, porttitor turpis in, imperdiet nunc. Proin in tortor lorem. Sed purus ante, dapibus ac nulla vitae, tincidunt pellentesque massa. Ut et felis gravida, lobortis purus eget, rutrum neque. Aenean non quam in erat euismod hendrerit. Cras lobortis vestibulum est id malesuada. Proin vitae metus rutrum, aliquam sem a, bibendum nunc. Curabitur id aliquet elit, et finibus dui. Etiam vel sem tempus, porttitor orci eleifend, commodo elit. Mauris augue velit, malesuada quis blandit non, congue nec turpis.

Nulla dignissim lorem vel lorem molestie faucibus. Vivamus eu lobortis erat, non dapibus neque. Donec tellus ligula, tristique at eleifend in, euismod eget ante. Praesent eget elementum sapien. Nullam leo lacus, venenatis id elit et, sagittis accumsan felis. Duis ut odio luctus lorem maximus aliquam. Phasellus vel finibus massa. Fusce consectetur velit quis ex scelerisque malesuada. 

Nulla dignissim lorem vel lorem molestie faucibus. Vivamus eu lobortis erat, non dapibus neque. Donec tellus ligula, tristique at eleifend in, euismod eget ante. Praesent eget elementum sapien. Nullam leo lacus, venenatis id elit et, sagittis accumsan felis. Duis ut odio luctus lorem maximus aliquam. Phasellus vel finibus massa. Fusce consectetur velit quis ex scelerisque malesuada.`;

const StyledTypography = styled(Typography)(({ theme }) => ({
  ...theme.typography,
  overflow: "hidden",
  wordBreak: "break-word",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  WebkitBoxOrient: "vertical",
}));

interface IProps {
  accommodation: IAccommodationMinimal;
}

const MyListingsItem: FC<IProps> = ({ accommodation }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/listings/${accommodation.id}`);
  };

  const handleEdit = () => {
    navigate(`/listings/${accommodation.id}/edit`);
  };

  const handleDelete = () => {
    // API Call to delete
  };

  const image =
    accommodation?.thumbnailImage !== null
      ? accommodation?.thumbnailImage?.imageURL
      : "/header-background.jpg";

  return (
    <Card sx={{ borderRadius: 2 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="property-thumbnail"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {accommodation?.name ?? DUMMY_TITLE}
        </Typography>
        <StyledTypography variant="body2" color="text.secondary">
          {accommodation?.description ?? DUMMY_DESCRIPTION}
        </StyledTypography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleView}>
          View property
        </Button>
        <Button size="small" onClick={handleEdit}>
          Edit property
        </Button>
        <Button size="small" onClick={handleDelete}>
          Delete property
        </Button>
      </CardActions>
    </Card>
  );
};

export default MyListingsItem;
