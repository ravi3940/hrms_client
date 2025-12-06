import axios from "axios";

export const generateOfferLetter = async (formData) => {
  return await axios.post("http://localhost:5000/api/offer-letter", formData, {
    responseType: "blob",
  });
};
