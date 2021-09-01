import { useState, useRef } from 'react';
import styled from '@emotion/styled';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import UploadButtonIcon from 'components/icons/System/UploadButton';
import ArrowLeftIcon from 'components/icons/System/ArrowLeft';
import ArrowRightIcon from 'components/icons/System/ArrowRight';
import { Button } from '@chakra-ui/button';

const DATA = [
  // SPRING
  '#fefbd8',
  '#edcb98',
  '#8f5726',
  '#502112',
  '#fbdbc5',
  '#fabfb9',
  '#f58122',
  '#f14132',
  '#f8f072',
  '#bdd860',
  '#8ed9f9',
  '#812b8d',
  // AUTUMN
  '#fbf6d2',
  '#dbba81',
  '#77421b',
  '#441c11',
  '#faaa95',
  '#c51f34',
  '#af4921',
  '#e4a921',
  '#73722f',
  '#47491f',
  '#115f74',
  '#5e2769',
  // SUMMER
  '#f2f2f0',
  '#bebfc2',
  '#565c6a',
  '#153151',
  '#facadf',
  '#ebaec8',
  '#d94250',
  '#f5f29d',
  '#c1deae',
  '#afceec',
  '#b2add6',
  '#74489d',
  // WINTER
  '#f4f7f6',
  '#f9f1f8',
  '#edf3fb',
  '#6f7073',
  '#0c1c33',
  '#070707',
  '#b41e91',
  '#a71d43',
  '#f4ee25',
  '#214520',
  '#404099',
  '#533094',
];

function NextArrow(props: any) {
  const { style, onClick } = props;
  return (
    <ArrowBtn style={{ ...style, display: 'block', right: 10 }} onClick={onClick}>
      <ArrowRightIcon />
    </ArrowBtn>
  );
}

function PrevArrow(props: any) {
  const { style, onClick } = props;
  return (
    <ArrowBtn style={{ ...style, display: 'block', left: 10 }} onClick={onClick}>
      <ArrowLeftIcon />
    </ArrowBtn>
  );
}

export default function Home() {
  const [img, setImg] = useState<string>('');
  const uploadImage = useRef<any>(null);
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleUploadImage = (e: any) => {
    e.preventDefault();

    const file = e.target.files[0];
    const blobURL = URL.createObjectURL(file);
    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      alert('선택하신 파일의 형식을 확인해주세요.');
    } else {
      setImg(blobURL);
      URL.revokeObjectURL(file);
    }
  };

  const removePhotoPreview = () => {
    uploadImage.current.value = '';
    setImg('');
  };

  return (
    <Wrap>
      <ImageBox>
        <input type="file" ref={uploadImage} accept="image/png, image/jpeg" hidden onChange={handleUploadImage} />
        {img ? (
          <PreviewBox>
            <Preview src={img} />
            <Button marginTop="3" bg="#000" color="#fff" _hover={{ backgroundColor: '#222' }} onClick={removePhotoPreview}>
              이미지 재설정
            </Button>
          </PreviewBox>
        ) : (
          <NoImage onClick={() => uploadImage.current.click()}>
            <UploadButtonIcon />
            <p>사진을 추가해주세요.</p>
            <p style={{ fontSize: 14, color: 'grey' }}>바탕이 투명한 이미지로 해주세요.</p>
          </NoImage>
        )}
      </ImageBox>
      <Slider {...settings}>
        {DATA.map((color) => {
          return <Backgorund key={color} color={color} />;
        })}
      </Slider>
    </Wrap>
  );
}

const Wrap = styled.div`
  .slick-next {
    right: 25px !important;
  }
  .slick-prev {
    left: 25px !important;
    z-index: 1;
  }
  height: 100vh;
  overflow: hidden;
`;
const Backgorund = styled.div<{ color: string }>`
  height: 100vh;
  background-color: ${(props) => props.color};
`;

const ImageBox = styled.div`
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NoImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > svg {
    width: 80px;
    height: 80px;
  }
  > p {
    margin-top: 10px;
  }
`;

const PreviewBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Preview = styled.img<{ src: string }>`
  width: 30%auto;
  max-height: 80vh;
`;

const ArrowBtn = styled.div`
  cursor: pointer;
  position: absolute;
  top: 50%;
  z-index: 5;
  width: 40px;
  height: 40px;
  > svg {
    width: 40px;
    height: 40px;
  }
`;
