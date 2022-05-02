import { atom, useRecoilState } from "recoil";

const store = atom({
  key: "store", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const defaultCurrency = atom({
  key: "defaultCurrency", // unique ID (with respect to other atoms/selectors)
  default: "$", // default value (aka initial value)
});

const currency = atom({
  key: "currency", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const categories = atom({
  key: "categories", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const cart = atom({
  key: "cart", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

const utility = atom({
  key: "utility", // unique ID (with respect to other atoms/selectors)
  default: { subtotal: 0, cartToggle: false, category: "all" }, // default value (aka initial value)
});

export const useRecoilStore = () => {
  return useRecoilState(store);
};

export const useRecoilDefaultCurrency = () => {
  return useRecoilState(defaultCurrency);
};

export const useRecoilCurrency = () => {
  return useRecoilState(currency);
};

export const useRecoilCategories = () => {
  return useRecoilState(categories);
};

export const useRecoilCart = () => {
  return useRecoilState(cart);
};

export const useRecoilUtility = () => {
  return useRecoilState(utility);
};
