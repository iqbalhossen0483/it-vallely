import Banner_Slider from "../../shared/mergedBanner_Slider/Banner_Slider";
import { fetchAPI } from "../../../services/shared/sharedFunction";
import useStore from "../../../contex/hooks/useStore";
import React, { useState } from "react";
import { useEffect } from "react";

function BannerCustomization() {
  const [bannerImages, setBannerImages] = useState<BannerImg[]>([]);
  const [update, setUpdate] = useState(false);
  const store = useStore();

  useEffect(() => {
    (async () => {
      const res = await fetchAPI<BannerImg[]>("/api/banner");
      if (res.data) {
        setBannerImages(res.data);
      } else if (res.error) {
        store?.State.setAlert(res.error);
      } else {
        store?.State.setError(res.netProblem);
      }
    })();
  }, [update, store?.State]);

  //post
  async function onSubmit(banner: BannerImg) {
    store?.State.setLoading(true);

    const formData = new FormData();
    formData.append("file", banner.file[0]);
    formData.append("link", banner.link);

    const res = await fetch("/api/banner", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (res.ok) {
      store?.State.setAlert("Banner image added successfully");
      setUpdate(!update);
    } else {
      store?.State.setAlert(data.message);
    }
    store?.State.setLoading(false);
  }

  async function deleteSliderImage(db_id: string, img_id: string) {
    store?.State.setLoading(true);
    const res = await fetch("/api/banner", {
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
      data={bannerImages}
      submitFn={onSubmit}
      deleteFn={deleteSliderImage}
    >
      Banner Images
    </Banner_Slider>
  );
}

export default BannerCustomization;