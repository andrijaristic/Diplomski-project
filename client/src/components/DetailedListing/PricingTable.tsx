import { FC } from "react";
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableRow,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TextField,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import {
  IRoomTypeAddDisplay,
  IRoomTypeDisplay,
} from "../../shared/interfaces/roomTypeInterfaces";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface IProps {
  edit: boolean;
  addRoomForm?: boolean;
  pricings?: IRoomTypeAddDisplay[];
  roomType?: IRoomTypeDisplay;
}

const PricingTable: FC<IProps> = ({
  edit,
  pricings,
  addRoomForm,
  roomType,
}) => {
  if (addRoomForm) {
    return (
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          flexBasis: "32.33%",
          borderRadius: 2,

          "@media (max-width: 1468px)": {
            flexBasis: "32%",
          },
          "@media (max-width: 1260px)": {
            flexBasis: "48%",
          },
          "@media (max-width: 846px)": {
            flexBasis: "98%",
          },
        }}
      >
        <Table id="table" size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={3}>2 adults, 1 child</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>From</StyledTableCell>
              <StyledTableCell>To</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pricings?.map((pricing) => (
              <StyledTableRow key={pricing.id}>
                <StyledTableCell>
                  {new Date(pricing?.startDate).toLocaleDateString("en-GB")}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(pricing?.endDate).toLocaleDateString("en-GB")}
                </StyledTableCell>
                <StyledTableCell>
                  <TextField
                    id={pricing.id}
                    name={pricing.id}
                    type="number"
                    variant="standard"
                    margin="dense"
                    defaultValue={0}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EuroSymbolIcon fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return (
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          flexBasis: "32.33%",
          borderRadius: 2,

          "@media (max-width: 1468px)": {
            flexBasis: "32%",
          },
          "@media (max-width: 1260px)": {
            flexBasis: "48%",
          },
          "@media (max-width: 846px)": {
            flexBasis: "98%",
          },
        }}
      >
        <Table id="table" size="small" aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={3}>2 adults, 1 child</StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>From</StyledTableCell>
              <StyledTableCell>To</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomType?.seasonalPricing.map((pricing) => (
              <StyledTableRow key={pricing.id}>
                <StyledTableCell>
                  {new Date(pricing?.startDate).toLocaleDateString("en-GB")}
                </StyledTableCell>
                <StyledTableCell>
                  {new Date(pricing?.endDate).toLocaleDateString("en-GB")}
                </StyledTableCell>
                <StyledTableCell>
                  {edit ? (
                    <TextField
                      id={pricing.id.toString()}
                      name={pricing.id.toString()}
                      type="number"
                      variant="standard"
                      margin="dense"
                      defaultValue={pricing.price}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EuroSymbolIcon fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <EuroSymbolIcon fontSize="small" />
                      <Typography variant="body1">{pricing.price}</Typography>
                    </Box>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};

export default PricingTable;
