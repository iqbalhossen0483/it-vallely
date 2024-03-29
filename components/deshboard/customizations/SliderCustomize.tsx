import Banner_Slider from "../../shared/mergedBanner_Slider/Banner_Slider";
import { fetchAPI } from "../../../clientServices/shared/sharedFunction";
import useStore from "../../../contex/hooks/useStore";
import React, { useState } from "react";
import { useEffect } from "react";

function SliderCustomize() {
  const [sliderImages, setSliderImages] = useState<SliderImg[]>([]);
  const [update, setUpdate] = useState(false);
  const store = useStore();

  useEffect(() => {
    const oldData = sessionStorage.getItem("slider");
    if (oldData) {
      setSliderImages(JSON.parse(oldData));
    }
    (async () => {
      const res = await fetchAPI<SliderImg[]>("/api/slider");
      if (res.data) {
        setSliderImages(res.data);
        sessionStorage.setItem("slider", JSON.stringify(res.data));
      } else if (res.error) {
        store?.State.setAlert({ msg: "There was an error", type: "error" });
      } else {
        store?.State.setError(res.netProblem);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  //post
  async function onSubmit(slider: SliderImg) {
    store?.State.setLoading(true);

    const formData = new FormData();
    formData.append("file", slider.file[0]);
    formData.append("link", slider.link);

    const token = await store?.firebase.user?.getIdToken();
    const res = await fetch("/api/slider", {
      method: "POST",
      headers: {
        user_uid: `${store?.firebase.user?.uid}`,
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
      },
      body: formData,
    });
    const data = await res.json();

    if (res.ok) {
      store?.State.setAlert({
        msg: "Slider image added successfully",
        type: "success",
      });
      setUpdate(!update);
    } else {
      store?.State.setAlert(data.message);
    }
    store?.State.setLoading(false);
  }

  async function deleteSliderImage(db_id: string, img_id: string) {
    store?.State.setLoading(true);
    const token = await store?.firebase.user?.getIdToken();
    const res = await fetch("/api/slider", {
      method: "DELETE",
      headers: {
        db_id,
        img_id,
        user_uid: `${store?.firebase.user?.uid}`,
        token: `${process.env.NEXT_PUBLIC_APP_TOKEN} ${token}`,
      },
    });
    if (res.ok) {
      store?.State.setAlert({ msg: "Deleted successfully", type: "success" });
    } else {
      store?.State.setAlert({ msg: "There was an error", type: "error" });
    }
    setUpdate((prev) => !prev);
    store?.State.setLoading(false);
  }

  return (
    <Banner_Slider
      title='slider'
      data={sliderImages}
      submitFn={onSubmit}
      deleteFn={deleteSliderImage}
    >
      Slider Images
    </Banner_Slider>
  );
}

export default SliderCustomize;
