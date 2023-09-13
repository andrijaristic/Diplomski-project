import { useState } from "react";
import { HookTypes } from "../shared/types/enumerations";

interface IProps {
  type: HookTypes;
  defaultState?: boolean;
  minChars?: number;
  regex?: RegExp;
}

const useFormTextInputValidation = ({
  type = HookTypes.TEXT,
  minChars = 1,
  defaultState = false,
  regex,
}: IProps) => {
  const [valid, setValid] = useState<boolean | undefined>(defaultState);
  const [touched, setTouched] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === HookTypes.REGEX) {
      setValid(
        event.target.value !== null && regex?.test(event.target.value.trim())
      );
    } else {
      setValid(
        event.target.value !== null &&
          event.target.value.trim().length >= minChars
      );
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return {
    valid,
    touched,
    onChange: handleChange,
    onBlur: handleBlur,
  };
};

export default useFormTextInputValidation;
