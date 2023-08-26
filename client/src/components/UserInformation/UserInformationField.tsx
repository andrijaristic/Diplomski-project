import { FC } from "react";
import { Box, InputLabel, TextField } from "@mui/material";
import useFormTextInputValidation from "../../hooks/useFormTextInputValidation";
import { HookTypes } from "../../shared/types/enumerations";

interface IProps {
  id: string;
  label: string;
  defaultValue?: string;
  disabled?: boolean;
  minRows?: number;
  type: HookTypes;
  minChars?: number;
  regex?: RegExp;
}

const UserInformationField: FC<IProps> = (props) => {
  const { valid, touched, onChange, onBlur } = useFormTextInputValidation({
    type: props.type,
    defaultState: true,
    minChars: props?.minChars,
    regex: props?.regex,
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <InputLabel sx={{ fontSize: "1.2rem" }}>{props.label}</InputLabel>
      <TextField
        required
        multiline={props.minRows !== undefined}
        disabled={!props.disabled}
        placeholder={`Enter ${props.label.toLowerCase()}`}
        id={props.id}
        defaultValue={props?.defaultValue}
        minRows={props?.minRows}
        name={props.id}
        error={!valid && touched}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Box>
  );
};

UserInformationField.defaultProps = {
  disabled: false,
};

export default UserInformationField;
