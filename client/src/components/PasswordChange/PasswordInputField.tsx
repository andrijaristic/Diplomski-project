import { FC, useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import useFormTextInputValidation from "../../hooks/useFormTextInputValidation";
import { HookTypes } from "../../shared/types/enumerations";
import { minPasswordLength } from "../../constants/Constants";

interface IProps {
  id: string;
  label: string;
  helperText?: string;
}

const PasswordInputField: FC<IProps> = ({ id, label, helperText = "" }) => {
  const [show, setShow] = useState<boolean>(false);
  const { valid, touched, onChange, onBlur } = useFormTextInputValidation({
    type: HookTypes.TEXT,
    minChars: minPasswordLength,
  });

  const handleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <InputLabel sx={{ fontSize: "1.2rem" }}>{label}</InputLabel>
      <TextField
        required
        variant="outlined"
        name={id}
        id={id}
        type={show ? "text" : "password"}
        error={helperText !== "" ?? (!valid && touched)}
        placeholder="Input password"
        onChange={onChange}
        onBlur={onBlur}
        helperText={helperText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShow}
                edge="end"
              >
                {show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default PasswordInputField;
