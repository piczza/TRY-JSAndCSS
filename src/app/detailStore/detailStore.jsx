import { create } from "zustand";
import axios from "axios";

const useDetailStore = create((set) => ({
  detailProduct: [],
  setSelectedProduct: async (id) => {
    const url = `https://fakestoreapi.com/products/${id}`;
    const response = await axios.get(url);
    const detail = response.data;

    set(() => ({
      detailProduct: detail,
    }));
  },
}));

export default useDetailStore;
