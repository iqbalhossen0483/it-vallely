import { fetchAPI } from "../../../services/shared/sharedFunction";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import useStore from "../../../contex/hooks/useStore";
import Input from "../../shared/utilitize/Input";
import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useEffect } from "react";
import Image from "next/image";

function SliderCustomize() {
  const [sliderImages, setSliderImages] = useState<SliderImg[]>([]);
  const { register, handleSubmit, reset } = useForm<SliderImg>();
  const [showDeleteBtn, setShowDeleteBtn] = useState(-1);
  const sliderForm = useRef<HTMLFormElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState(false);
  const store = useStore();

  useEffect(() => {
    (async () => {
      const res = await fetchAPI<SliderImg[]>("/api/slider");
      if (res.data) {
        setSliderImages(res.data);
      } else if (res.error) {
        store?.State.setAlert(res.error);
      } else {
        store?.State.setError(res.netProblem);
      }
    })();
  }, [update, store?.State]);

  //post
  async function onSubmit(slider: SliderImg) {
    store?.State.setLoading(true);

    const formData = new FormData();
    formData.append("file", slider.file[0]);
    formData.append("link", slider.link);

    const res = await fetch("/api/slider", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (res.ok) {
      store?.State.setAlert("Slider image added successfully");
      setUpdate(!update);
      reset();
      setShowForm(false);
    } else {
      store?.State.setAlert(data.message);
    }
    store?.State.setLoading(false);
  }

  async function deleteSliderImage(db_id: string, img_id: string) {
    store?.State.setLoading(true);
    const res = await fetch("/api/slider", {
      method: "DELETE",
      headers: {
        db_id,
        img_id,
      },
    });
    if (res.ok) {
      store?.State.setAlert("Deleted successfully");
    } else {
      store?.State.setAlert("There was an error");
    }
    setUpdate((prev) => !prev);
    store?.State.setLoading(false);
  }

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const isForm = sliderForm.current?.contains(e.target as Node);
      if (!isForm) {
        setShowForm(false);
      }
    });
  }, []);

  return (
    <div className='slider-customize-container'>
      <div className='header'>
        <p>Slider Images</p>
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
              onClick={() => deleteSliderImage(slide._id, slide.imgId)}
            >
              delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SliderCustomize;
