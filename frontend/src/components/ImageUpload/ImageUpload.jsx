import { Grid, Button, Paper } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/system';
import { useState } from 'react';
import Clear from '@mui/icons-material/Clear';

const Input = styled('input')({
  display: 'none',
});

const Image = styled('img')({
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '5px',
});

const ImageContainer = styled(Paper)({
  padding: '7.5px',
  justifyItems: 'end',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
});

const ClearBtn = styled(Button)({
  minWidth: '20px',
  marginBottom: '5px',
  height: '20px',
});

const ImageUpload = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={2} md={3} sm={4} xs={6} sx={{ height: '207.5px' }}>
        <label htmlFor='icon-button-file'>
          <Input
            accept='image/png, image/jpeg, image/jpg />'
            id='icon-button-file'
            type='file'
            multiple
            onChange={props.pickedHandler}
          />
          <Button
            color='primary'
            aria-label='upload picture'
            component='span'
            variant='outlined'
            sx={{ height: '100%', width: '100%' }}
          >
            <PhotoCamera />
          </Button>
        </label>
      </Grid>

      {props.previewUrl.length > 0 &&
        props.previewUrl.map((item, i) => (
          <Grid item lg={2} md={3} sm={4} xs={6} key={i}>
            <ImageContainer>
              <ClearBtn
                size='small'
                onClick={() => {
                  props.removeImages(item);
                }}
              >
                <Clear fontSize='small' />
              </ClearBtn>
              <Image src={item} alt='1' />
            </ImageContainer>
          </Grid>
        ))}
    </Grid>
  );
};
export default ImageUpload;
