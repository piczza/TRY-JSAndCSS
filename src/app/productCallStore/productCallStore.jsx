import { create } from "zustand";
import axios from "axios";

const useProductCallStore = create((set) => ({
  productInfo: [],
  setProductInfo: async (categoryName) => {
    try {
      let url = "https://fakestoreapi.com/products";
      if (categoryName) {
        url += `/category/${categoryName}`;
      }
      const response = await axios.get(url);
      let products = response.data;
      set(() => ({ productInfo: products }));
    } catch (error) {
      set((state) => ({ productInfo: [] }));

      console.error(error);
    }
  },
}));

export default useProductCallStore;
