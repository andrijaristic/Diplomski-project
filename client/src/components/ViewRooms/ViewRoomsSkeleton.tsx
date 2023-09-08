import { FC } from "react";
import { Stack, Skeleton, Box, Divider } from "@mui/material";

const ViewRoomsSkeleton: FC = () => {
  return (
    <>
      <Stack spacing={1}>
        <Stack direction="row" spacing={16}>
          <Skeleton variant="rectangular" width={200} />
          <Skeleton variant="rectangular" width={120} />
        </Stack>
        <Skeleton variant="rectangular" width={300} />
        <Box sx={{ pt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="rectangular" width={400} />
        </Box>
      </Stack>
      <Divider />
      <Stack spacing={1}>
        <Stack direction="row" spacing={16}>
          <Skeleton variant="rectangular" width={200} />
          <Skeleton variant="rectangular" width={120} />
        </Stack>
        <Skeleton variant="rectangular" width={300} />
        <Box sx={{ pt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="rectangular" width={400} />
        </Box>
      </Stack>
      <Divider />
      <Stack spacing={1}>
        <Stack direction="row" spacing={16}>
          <Skeleton variant="rectangular" width={200} />
          <Skeleton variant="rectangular" width={120} />
        </Stack>
        <Skeleton variant="rectangular" width={300} />
        <Box sx={{ pt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="rectangular" width={400} />
        </Box>
      </Stack>
    </>
  );
};

export default ViewRoomsSkeleton;
