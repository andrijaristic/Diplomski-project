import { FC } from "react";
import { Box, Avatar, Input, Button, Paper } from "@mui/material";

interface IProps {
  image: string | undefined;
  header: boolean;
  avatarClickHandler: () => void;
  imageInput: React.RefObject<HTMLInputElement>;
  uploadHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
}

const AddImagePicker: FC<IProps> = (props) => {
  return (
    <Box sx={{ pt: 2, ml: "auto" }}>
      {props.header && (
        <Paper
          square
          elevation={0}
          sx={{
            pl: 2,
            display: "flex",
            alignItems: "center",
            height: 50,
            bgcolor: "background.default",
          }}
        >
          <Button sx={{ ml: "auto" }} onClick={props.onAdd}>
            Add image to property showcase
          </Button>
        </Paper>
      )}
      <Button onClick={props.avatarClickHandler}>
        <Avatar
          alt="property-image"
          variant="square"
          src={props.image}
          sx={{ width: "500px", height: "400px" }}
        />
      </Button>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: "none" }}>
          <Input
            type="file"
            ref={props.imageInput}
            onChange={props.uploadHandler}
            inputProps={{ accept: ".png, .jpg, .jpeg" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddImagePicker;
