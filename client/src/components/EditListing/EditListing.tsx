import React, { FC, useRef, useState } from "react";
import { Box, Divider, Fade, Grid, Typography } from "@mui/material";
import { HookTypes } from "../../shared/types/enumerations";
import PricingTable from "../DetailedListing/PricingTable";
import UserInformationField from "../UserInformation/UserInformationField";
import StyledButton from "../UI/Styled/StyledButton";
import ImageDisplay from "./ImageDisplay";
import AddImagePicker from "./AddImagePicker";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { NavLink, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { IJwt } from "../../shared/interfaces/userInterfaces";
import {
  IAccommodationBasicInformation,
  IAddAccommodationImage,
  IDeleteAccomodationImage,
} from "../../shared/interfaces/accommodationInterfaces";
import {
  addAccommodationImageAction,
  deleteAccommodationImageAction,
  updateBasicAccommodationInformationAction,
} from "../../store/accommodationSlice";
import { IAccommodationImage } from "../../shared/interfaces/accommodationImageInterfaces";
import { IUpdateRoomType } from "../../shared/interfaces/roomTypeInterfaces";
import { IUpdateSeasonalPricing } from "../../shared/interfaces/seasonalPricingInterfaces";
import { updateRoomTypeAction } from "../../store/roomTypeSlice";

const EditListingPage: FC = () => {
  const dispatch = useAppDispatch();
  const { id: accommodationId } = useParams();
  const token = useAppSelector((state) => state.user.token);
  const accommodation = useAppSelector(
    (state) => state.accommodations.detailedAccommodation
  );
  const roomTypes = useAppSelector((state) => state.roomTypes.roomTypes);

  const { id: userId } = jwtDecode<IJwt>(token ?? "");

  const imageInput = useRef<HTMLInputElement>(null);
  const [displayImage, setDisplayImage] = useState<string | undefined>("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const images: IAccommodationImage[] = [];
  if (accommodation?.thumbnailImage) {
    images.push(accommodation?.thumbnailImage);
    accommodation?.images.map((image) => images.push(image));
  }

  const imageUploadHandler = () => {
    if (!imageInput.current) {
      return;
    }

    (imageInput.current.children[0] as HTMLInputElement).click();
  };

  const imageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    if (file) {
      setUploadedImage(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setDisplayImage(reader.result?.toString());
      };
    }
  };

  const handleImageAdd = () => {
    if (uploadedImage === null) {
      return;
    }

    const data = new FormData();
    data.append("userId", userId.toString());
    data.append("image", uploadedImage);

    const addAccommodationImage: IAddAccommodationImage = {
      accommodationId: accommodationId ?? "",
      data: data,
    };

    dispatch(addAccommodationImageAction(addAccommodationImage));
  };

  const handleImageDelete = (imageId: string) => {
    const deleteImage: IDeleteAccomodationImage = {
      accommodationId: accommodationId ?? "",
      imageId: imageId ?? "",
      userId: userId ?? "",
    };

    dispatch(deleteAccommodationImageAction(deleteImage));
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const description = data.get("description");

    if (!name || !description) {
      return;
    }

    const basicInformation: IAccommodationBasicInformation = {
      accommodationId: accommodationId ?? "",
      userId: userId,
      name: name.toString().trim(),
      description: description.toString().trim(),
    };

    dispatch(updateBasicAccommodationInformationAction(basicInformation));
  };

  const handlePriceEditSubmit =
    (roomTypeId: string) => (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      // Extracts all prices from table
      const data = new FormData(event.currentTarget);
      const pricings: IUpdateSeasonalPricing[] = []; // proper type
      for (const kvp of data.entries()) {
        pricings.push({ id: kvp[0], price: kvp[1] as string });
      }

      const updateRoomType: IUpdateRoomType = {
        roomTypeId: roomTypeId,
        seasonalPrices: pricings,
      };

      dispatch(updateRoomTypeAction(updateRoomType));
    };

  const pricingTables: JSX.Element[] | undefined = roomTypes?.map(
    (roomType) => (
      <Box
        component="form"
        key={roomType.id}
        onSubmit={handlePriceEditSubmit(roomType.id)}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "fit-content",
        }}
      >
        <PricingTable edit={true} roomType={roomType} />
        <StyledButton submit sx={{ ml: "auto", mt: 1 }}>
          Submit price changes
        </StyledButton>
      </Box>
    )
  );

  return (
    <Fade in>
      <Grid
        container
        direction="column"
        sx={{ pt: 8, pl: "10%", pr: "10%", pb: "20%" }}
      >
        {/* Title, Description, Pricing, Images (add/delete) */}
        <Box
          component="form"
          onSubmit={handleEditSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 2 }}
        >
          <Grid item>
            <UserInformationField
              id="name"
              label="Accommodation listing name"
              defaultValue={accommodation?.name}
              disabled={true}
              type={HookTypes.TEXT}
            />
          </Grid>
          <Grid item>
            <UserInformationField
              id="description"
              label="Accommodation listing description"
              defaultValue={accommodation?.description}
              disabled={true}
              type={HookTypes.TEXT}
              minRows={12}
            />
          </Grid>
          <StyledButton submit sx={{ width: "fit-content", ml: "auto" }}>
            Submit general information changes
          </StyledButton>
        </Box>

        <Divider />
        <Grid item sx={{ pt: 2 }}>
          <Typography variant="h4">Room pricings</Typography>
          <Box
            sx={{
              pt: 2,
              pb: 2,
              display: "flex",
              flexWrap: "wrap",
              flexGrow: 1,
              flexShrink: 1,
              gap: 1,
            }}
          >
            {pricingTables?.length > 0 ? (
              pricingTables
            ) : (
              <Typography variant="h4">
                Oops! It seems like there are no rooms registered for this
                accommodation. <br />
                <NavLink to={`/listings/${accommodation?.id}/add-rooms`}>
                  How about you add some?
                </NavLink>
              </Typography>
            )}
          </Box>
        </Grid>
        <Divider />
        <Grid item sx={{ display: "flex" }}>
          <ImageDisplay edit images={images} onDelete={handleImageDelete} />
          <AddImagePicker
            header
            image={displayImage}
            imageInput={imageInput}
            uploadHandler={imageChangeHandler}
            onAdd={handleImageAdd}
            avatarClickHandler={imageUploadHandler}
          />
        </Grid>
      </Grid>
    </Fade>
  );
};

export default EditListingPage;
