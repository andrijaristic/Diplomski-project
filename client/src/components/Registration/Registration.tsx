import { FC, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import Logo from "../UI/Logo/Logo";
import StyledButton from "../UI/Styled/StyledButton";

const Registration: FC = () => {
  const [role, setRole] = useState<string>("0");

  const [activeStep, setActiveStep] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleNextStep = () => {
    activeStep < 1 && setActiveStep((prevStep) => ++prevStep);
  };

  const handleBackStep = () => {
    activeStep > 0 && setActiveStep((prevStep) => --prevStep);
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Box
      sx={{
        height: "100%",
      }}
    >
      <Grid container direction="column">
        <Grid
          item
          xs={2}
          sx={{
            pt: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo />
          <Typography variant="h5" sx={{ mb: 6 }}>
            USER REGISTRATION
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Stepper activeStep={activeStep} alternativeLabel>
              <Step>
                <StepLabel />
              </Step>
              <Step>
                <StepLabel />
              </Step>
            </Stepper>
          </Box>
          {/* Step 1 */}
          <Box
            sx={{
              pt: 4,
              display: activeStep === 0 ? "flex" : "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <TextField
              required
              variant="outlined"
              label="Username"
              name="username"
              id="username"
              autoComplete="username"
              placeholder="Enter username"
              sx={{
                width: "80%",
              }}
            />
            <TextField
              required
              variant="outlined"
              label="Email address"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="Enter email"
              sx={{
                width: "80%",
              }}
            />
            <TextField
              required
              type="password"
              variant="outlined"
              label="Password"
              name="password"
              id="password"
              autoComplete="password"
              placeholder="Enter password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "80%",
              }}
            />
            <TextField
              required
              type="password"
              variant="outlined"
              label="Confirm password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="password"
              placeholder="Confirm password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "80%",
              }}
            />
            <Box sx={{ display: "flex", width: "80%" }}>
              <StyledButton
                sx={{ ml: "auto", width: "42%" }}
                onClick={handleNextStep}
              >
                Next
              </StyledButton>
            </Box>
          </Box>
          {/* Step 2 */}
          <Box
            sx={{
              pt: 4,
              display: activeStep === 1 ? "flex" : "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
              <TextField
                required
                variant="outlined"
                label="First name"
                name="firstName"
                id="firstName"
                autoComplete="name"
                placeholder="Enter first name"
              />
              <TextField
                required
                variant="outlined"
                label="Last name"
                name="lastName"
                id="lastName"
                autoComplete="name"
                placeholder="Enter last name"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "80%",
                gap: 4,
              }}
            >
              <TextField
                required
                type="text"
                variant="outlined"
                label="Country"
                name="country"
                id="country"
                autoComplete="country"
                placeholder="Enter country name"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <InputLabel sx={{ pr: 2 }}>Role:</InputLabel>
                <Select
                  label="Role"
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  sx={{ width: "max-content", mr: "auto" }}
                >
                  <MenuItem value={0}>Rentee</MenuItem>
                  <MenuItem value={1}>Property owner</MenuItem>
                </Select>
              </Box>
            </Box>
            <TextField
              required
              type="tel"
              variant="outlined"
              label="Phone number"
              name="phoneNumber"
              id="phoneNumber"
              autoComplete="telephone"
              placeholder="Enter phone number"
              sx={{
                width: "80%",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "80%",
              }}
            >
              <StyledButton sx={{ width: "42%" }} onClick={handleBackStep}>
                Back
              </StyledButton>
              <StyledButton sx={{ width: "42%" }} onClick={handleNextStep}>
                Submit
              </StyledButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Registration;

/*                 

                   */
