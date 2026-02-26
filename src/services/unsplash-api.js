// axios ve unsplash apisini kullanarak resimleri cekmek icin fonksiyonlarimizi yaziyoruz.

import axios from "axios";

const API_KEY = "JePUBSEEwddh1pXyfTsg9hJtWJD4XhVsWsUUpzQdKo";
const BASE_URL = "https://api.unsplash.com";

export const fetchImages = async (query, page = 1, perPage = 12) => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
      query: query,
      page: page,
      per_page: perPage,
      orientation: "landscape",
    },
    headers: {
      Authorization: `Client-ID ${API_KEY}`,
    },
  });

  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};
