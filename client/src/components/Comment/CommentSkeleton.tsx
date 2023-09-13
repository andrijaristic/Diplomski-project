import { FC } from "react";
import { Box, Divider, Skeleton, Stack } from "@mui/material";

const CommentSkeleton: FC = () => {
  return (
    <>
      <Stack spacing={1}>
        <Stack direction="row" spacing={4}>
          <Skeleton variant="rectangular" width={120} />
          <Skeleton variant="rectangular" width={120} />
        </Stack>
        <Skeleton variant="rectangular" width={120} />
        <Box sx={{ pt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="rectangular" width={260} />
          <Skeleton variant="rectangular" width="60%" height={70} />
        </Box>
      </Stack>
      <Divider />
      <Stack spacing={1} sx={{ pt: 4 }}>
        <Stack direction="row" spacing={4}>
          <Skeleton variant="rectangular" width={120} />
          <Skeleton variant="rectangular" width={120} />
        </Stack>
        <Skeleton variant="rectangular" width={120} />
        <Box sx={{ pt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="rectangular" width={260} />
          <Skeleton variant="rectangular" width="60%" height={70} />
        </Box>
      </Stack>
      <Divider />
      <Stack spacing={1} sx={{ pt: 4 }}>
        <Stack direction="row" spacing={4}>
          <Skeleton variant="rectangular" width={120} />
          <Skeleton variant="rectangular" width={120} />
        </Stack>
        <Skeleton variant="rectangular" width={120} />
        <Box sx={{ pt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Skeleton variant="rectangular" width={260} />
          <Skeleton variant="rectangular" width="60%" height={70} />
        </Box>
      </Stack>
    </>
  );
};

export default CommentSkeleton;
