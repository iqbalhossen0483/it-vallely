import AddIcon from "@mui/icons-material/Add";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { Button } from "@mui/material";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useStore from "../../../contex/hooks/useStore";
import Input from "../utilitize/Input";

type T = SliderImg | BannerImg;
type Props = {
  data: T[];
  children: ReactNode;
  submitFn: (slider: T) => Promise<void>;
  deleteFn: (db_id: string, img_id: string) => Promise<void>;
  title: string;
};

const Banner_Slider = (props: Props) => {
  const [showDeleteBtn, setShowDeleteBtn] = useState(-1);
  const sliderForm = useRef<HTMLFormElement>(null);
  const [showForm, setShowForm] = useState(false);
  const { handleSubmit, register, reset } = useForm<T>();
  const { data, children, submitFn, deleteFn, title } = props;
  const store = useStore();

  async function onSubmit(data: T) {
    await submitFn(data);
    reset();
    setShowForm(false);
  }

  function deleteImage(db_id: string, img_id: string) {
    deleteFn(db_id, img_id);
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
          {title === "banner" && data.length > 3 ? (
            <div>
              <p className='text-gray-800'>4 Banner images are already added</p>
            </div>
          ) : (
            <>
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
                variant='outlined'
                type='submit'
              >
                Add
              </Button>
            </>
          )}
        </form>
      </div>

      {data.map((slide, index) => (
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
