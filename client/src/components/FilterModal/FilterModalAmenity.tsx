import { FC, useState } from "react";
import { Box, Checkbox, Typography } from "@mui/material";

interface IProps {
  initialState: boolean;
  id: number;
  name: string;
  onChange: () => void;
}

const FilterModalAmenity: FC<IProps> = ({
  initialState,
  id,
  name,
  onChange,
}) => {
  const [checked, setChecked] = useState<boolean>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange();
  };

  return (
    <Box
      sx={{
        pt: 2,
        display: "flex",
        flexDirection: "row",
        flexBasis: "31.33%",

        justifyContent: "left",
        alignItems: "center",
      }}
    >
      <Checkbox
        id={id.toString()}
        name={id.toString()}
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Typography variant="subtitle2" sx={{ ml: -1 }}>
        {name}
      </Typography>
    </Box>
  );
};

export default FilterModalAmenity;
