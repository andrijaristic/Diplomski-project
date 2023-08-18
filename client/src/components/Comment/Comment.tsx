import { FC } from "react";
import { Box, Divider, Grid, Rating, Typography } from "@mui/material";
import { CommentLocation } from "../../shared/types/enumerations";

interface IProps {
  name?: string;
  rating?: number;
  date?: Date;
  title?: string;
  body?: string;
  flag?: boolean;
}

const DUMMY_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis rutrum aliquam. Pellentesque sed pulvinar eros, ac luctus sapien. Fusce ut leo commodo urna luctus varius eget nec justo. In euismod molestie imperdiet. Proin rhoncus fringilla ex sit amet facilisis. Duis eget placerat turpis, vitae mollis sem. Aenean pulvinar venenatis turpis. Proin venenatis vel massa pellentesque blandit. Duis egestas lectus quis nulla tempor laoreet.`;

const DUMMY_TITLE = `Beautiful rooms`;

const Comment: FC<IProps> = (props) => {
  return (
    <Grid container direction="column" sx={{ display: "flex", width: "100%" }}>
      <Grid item sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          {!props.flag && <Typography variant="h6">Andrija Ristic</Typography>}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="subtitle1">4</Typography>
            <Rating value={4} size="small" readOnly />
          </Box>
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">{new Date().toISOString()}</Typography>
      </Grid>
      <Grid item sx={{ pt: 4 }}>
        <Typography variant="h6">{DUMMY_TITLE}</Typography>
        <Box sx={{ pt: 1, pb: 1, heigth: "fit-content" }}>
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-wrap", textAlign: "justify" }}
          >
            {DUMMY_DESCRIPTION}
          </Typography>
        </Box>
      </Grid>
      <Divider />
    </Grid>
  );
};

Comment.defaultProps = {
  flag: false,
};

export default Comment;
