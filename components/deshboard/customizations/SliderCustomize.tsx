import Banner_Slider from "../../shared/mergedBanner_Slider/Banner_Slider";
import { fetchAPI } from "../../../services/shared/sharedFunction";
import useStore from "../../../contex/hooks/useStore";
import React, { useState } from "react";
import { useEffect } from "react";

function SliderCustomize() {
  const [sliderImages, setSliderImages] = useState<SliderImg[]>([]);
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

  return (
    <Banner_Slider
      data={sliderImages}
      submitFn={onSubmit}
      deleteFn={deleteSliderImage}
    >
      Slider Images
    </Banner_Slider>
  );
}

export default SliderCustomize;