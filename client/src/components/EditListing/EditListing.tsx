import React, { FC, useRef, useState } from "react";
import { Box, Button, Divider, Fade, Grid } from "@mui/material";
import { HookTypes } from "../../shared/types/enumerations";
import PricingTable from "../DetailedListing/PricingTable";
import UserInformationField from "../UserInformation/UserInformationField";
import StyledButton from "../UI/Styled/StyledButton";
import ImageDisplay from "./ImageDisplay";
import AddImagePicker from "./AddImagePicker";

const DUMMY_DESCRIPTION = `Lorem ipsum dolor`;

// const DUMMY_DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sagittis rutrum aliquam. Pellentesque sed pulvinar eros, ac luctus sapien. Fusce ut leo commodo urna luctus varius eget nec justo. In euismod molestie imperdiet. Proin rhoncus fringilla ex sit amet facilisis. Duis eget placerat turpis, vitae mollis sem. Aenean pulvinar venenatis turpis. Proin venenatis vel massa pellentesque blandit. Duis egestas lectus quis nulla tempor laoreet.

// Nullam non dapibus lorem. Aenean hendrerit, dolor in ornare consectetur, ligula ligula commodo lacus, non tincidunt sapien quam at lacus. Pellentesque vitae sem vulputate neque commodo aliquam. Nunc interdum eu diam sit amet condimentum. In sit amet volutpat mi, sed condimentum nibh. Cras fringilla tempor dui, vel fringilla tellus hendrerit id. Integer auctor ut sapien ac hendrerit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam erat volutpat. Nam nec laoreet nulla, nec aliquet leo.

// Proin rhoncus non ante vel scelerisque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris quis lorem mi. Vestibulum tempus sapien arcu, vel molestie tellus gravida dapibus. Morbi consequat tincidunt quam quis posuere. Ut tristique pulvinar mauris, eu tempor quam pretium ut. Vivamus ac lorem laoreet, tincidunt elit ut, sodales mauris. Fusce eget nunc et risus molestie finibus. Proin a dolor a magna eleifend convallis a nec velit. Donec quis pretium nisl, sit amet bibendum ligula. Aenean orci nisi, mattis fringilla ex ut, consequat suscipit ex. Integer finibus est in nisi convallis venenatis. Nulla volutpat bibendum arcu in finibus. Maecenas dictum auctor turpis, non pretium metus faucibus eu. In scelerisque consequat aliquet.

// Curabitur auctor turpis ac tortor varius, vitae egestas magna egestas. Suspendisse id nulla luctus, porttitor turpis in, imperdiet nunc. Proin in tortor lorem. Sed purus ante, dapibus ac nulla vitae, tincidunt pellentesque massa. Ut et felis gravida, lobortis purus eget, rutrum neque. Aenean non quam in erat euismod hendrerit. Cras lobortis vestibulum est id malesuada. Proin vitae metus rutrum, aliquam sem a, bibendum nunc. Curabitur id aliquet elit, et finibus dui. Etiam vel sem tempus, porttitor orci eleifend, commodo elit. Mauris augue velit, malesuada quis blandit non, congue nec turpis.

// Nulla dignissim lorem vel lorem molestie faucibus. Vivamus eu lobortis erat, non dapibus neque. Donec tellus ligula, tristique at eleifend in, euismod eget ante. Praesent eget elementum sapien. Nullam leo lacus, venenatis id elit et, sagittis accumsan felis. Duis ut odio luctus lorem maximus aliquam. Phasellus vel finibus massa. Fusce consectetur velit quis ex scelerisque malesuada.

// Nulla dignissim lorem vel lorem molestie faucibus. Vivamus eu lobortis erat, non dapibus neque. Donec tellus ligula, tristique at eleifend in, euismod eget ante. Praesent eget elementum sapien. Nullam leo lacus, venenatis id elit et, sagittis accumsan felis. Duis ut odio luctus lorem maximus aliquam. Phasellus vel finibus massa. Fusce consectetur velit quis ex scelerisque malesuada.`;

const EditListingPage: FC = () => {
  const imageInput = useRef<HTMLInputElement>(null);
  const [displayImage, setDisplayImage] = useState<string | undefined>("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

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
    console.log(uploadedImage);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title");
    const description = data.get("description");

    if (!title || !description) {
      return;
    }

    console.log(title, description);
  };

  const handlePriceEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extracts all prices from table
    const data = new FormData(event.currentTarget);
    const pricings: any[] = []; // proper type
    for (const kvp of data.entries()) {
      pricings.push({ id: parseInt(kvp[0]), price: kvp[1] });
    }

    console.log(pricings);
  };

  return (
    <Fade in>
      <Grid
        container
        direction="column"
        sx={{ pt: 8, pl: "10%", pr: "10%", pb: "5%" }}
      >
        {/* Title, Description, Pricing, Images (add/delete) */}
        <Box
          component="form"
          onSubmit={handleEditSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 2 }}
        >
          <Grid item>
            <UserInformationField
              id="title"
              label="Property listing title"
              disabled={true}
              type={HookTypes.TEXT}
            />
          </Grid>
          <Grid item>
            <UserInformationField
              id="description"
              label="Property listing title"
              defaultValue={DUMMY_DESCRIPTION}
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
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              flexGrow: 1,
              flexShrink: 1,
              gap: 1,
            }}
          >
            <Box
              component="form"
              onSubmit={handlePriceEditSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "fit-content",
              }}
            >
              <PricingTable edit={true} />
              <Button type="submit" sx={{ ml: "auto", pt: 1 }}>
                Submit price changes
              </Button>
            </Box>

            <Box
              component="form"
              onSubmit={handlePriceEditSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "fit-content",
              }}
            >
              <PricingTable edit={true} />
              <Button type="submit" sx={{ ml: "auto", pt: 1 }}>
                Submit price changes
              </Button>
            </Box>

            <Box
              component="form"
              onSubmit={handlePriceEditSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "fit-content",
              }}
            >
              <PricingTable edit={true} />
              <Button type="submit" sx={{ ml: "auto", pt: 1 }}>
                Submit price changes
              </Button>
            </Box>
          </Box>
        </Grid>
        <Divider />
        <Grid item sx={{ display: "flex" }}>
          <ImageDisplay edit />
          <AddImagePicker
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
