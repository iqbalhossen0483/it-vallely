import InsertLinkIcon from "@mui/icons-material/InsertLink";
import React, { ReactNode, useRef, useState } from "react";
import useStore from "../../../contex/hooks/useStore";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import Input from "../utilitize/Input";
import { Button } from "@mui/material";
import Image from "next/image";

type T = SliderImg | BannerImg;
type Props = {
  sliderImages: T[];
  children: ReactNode;
};

const Banner_Slider = ({ sliderImages, children }: Props) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(-1);
  const sliderForm = useRef<HTMLFormElement>(null);
  const [showForm, setShowForm] = useState(false);
  const { handleSubmit, register } = useForm<T>();
  const store = useStore();

  function onSubmit(data: T) {}

  function deleteImage(db_id: string, img_id: string) {}

  return (
    <div className='slider-customize-container'>
      <div className='header'>
        <p>{children}</p>
        <Button onMouseEnter={() => setShowForm(true)} variant='outlined'>
          <AddIcon />
        </Button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          ref={sliderForm}
          hidden={!showForm}
          className='slider-customize-form'
        >
          <Input
            fullWidth
            {...register("file", { required: true })}
            type='file'
          />
          <div className='relative'>
            <Input
              fullWidth
              {...register("link", { required: true })}
              label='URL'
            />
            <InsertLinkIcon />
          </div>
          <Button
            disabled={store?.State.loading}
            variant='contained'
            type='submit'
          >
            Add
          </Button>
        </form>
      </div>

      {sliderImages.map((slide, index) => (
        <div
          key={slide._id}
          onClick={() => setShowDeleteBtn(-1)}
          onContextMenu={(e) => {
            e.preventDefault();
            setShowDeleteBtn(index);
          }}
          className='item'
        >
          <Image height={200} width={300} src={slide.imgUrl} alt='' />
          <div className='overflow-auto'>
            <p className='text-[0.9vw]'>{slide.link}</p>
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            hidden={showDeleteBtn !== index}
            className='delete'
          >
            <Button
              variant='outlined'
              onClick={() => deleteImage(slide._id, slide.imgId)}
            >
              delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner_Slider;
