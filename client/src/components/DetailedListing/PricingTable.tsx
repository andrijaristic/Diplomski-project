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
} from "@mui/material";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import { IRoomTypeDisplay } from "../../shared/interfaces/roomTypeInterfaces";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

const DUMMY_PRICINGS = [
  {
    id: Math.random() * 100,
    startDate: new Date().toLocaleString().split(",")[0],
    endDate: new Date().toLocaleString().split(",")[0],
    price: 100,
  },
  {
    id: Math.random() * 100,
    startDate: new Date().toLocaleString().split(",")[0],
    endDate: new Date().toLocaleString().split(",")[0],
    price: 100,
  },
  {
    id: Math.random() * 100,
    startDate: new Date().toLocaleString().split(",")[0],
    endDate: new Date().toLocaleString().split(",")[0],
    price: 100,
  },
  {
    id: Math.random() * 100,
    startDate: new Date().toLocaleString().split(",")[0],
    endDate: new Date().toLocaleString().split(",")[0],
    price: 100,
  },
  {
    id: Math.random() * 100,
    startDate: new Date().toLocaleString().split(",")[0],
    endDate: new Date().toLocaleString().split(",")[0],
    price: 100,
  },
  {
    id: Math.random() * 100,
    startDate: new Date().toLocaleString().split(",")[0],
    endDate: new Date().toLocaleString().split(",")[0],
    price: 100,
  },
  {
    id: Math.random() * 100,
    startDate: new Date().toLocaleString().split(",")[0],
    endDate: new Date().toLocaleString().split(",")[0],
    price: 100,
  },
  {
    id: Math.random() * 100,
    startDate: new Date().toLocaleString().split(",")[0],
    endDate: new Date().toLocaleString().split(",")[0],
    price: 100,
  },
  {
    id: Math.random() * 100,
    startDate: new Date().toLocaleString().split(",")[0],
    endDate: new Date().toLocaleString().split(",")[0],
    price: 100,
  },
  {
    id: Math.random() * 100,
    startDate: new Date().toLocaleString().split(",")[0],
    endDate: new Date().toLocaleString().split(",")[0],
    price: 100,
  },
  {
    id: Math.random() * 100,
    startDate: new Date().toLocaleString().split(",")[0],
    endDate: new Date().toLocaleString().split(",")[0],
    price: 100,
  },
  {
    id: Math.random() * 100,
    startDate: new Date().toLocaleString().split(",")[0],
    endDate: new Date().toLocaleString().split(",")[0],
    price: 100,
  },
];

interface IProps {
  edit: boolean;
  roomType: IRoomTypeDisplay;
}

const PricingTable: FC<IProps> = ({ edit, roomType }) => {
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
                {new Date(pricing?.startDate).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell>
                {new Date(pricing?.endDate).toLocaleDateString()}
              </StyledTableCell>
              <StyledTableCell>
                {edit ? (
                  <TextField
                    id={pricing.id.toString()}
                    name={(Math.random() * 100).toString()}
                    type="number"
                    variant="standard"
                    margin="dense"
                    defaultValue={pricing.price}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EuroSymbolIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                ) : (
                  pricing.price
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PricingTable;
