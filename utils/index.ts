import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY as string,
      "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
    },
  };

  const response = await fetch(url, options);

  return response.json();
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // base rental price / day $
  const mileageFactor = 0.1; // additional rate / mile
  const ageFactor = 0.05; // additional rate / year of vehicle age

  //calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // calculate total rental rate / day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const apiKey = process.env.NEXT_PUBLIC_IMAGE_API_KEY;
  const { make, model, year } = car;

  const url = new URL("https://cdn.imagin.studio/getImage");
  url.searchParams.append("customer", apiKey as string);
  url.searchParams.append("make", make);
  url.searchParams.append("modelFamily", model.split(" ")[0]);
  url.searchParams.append("zoomType", "fullscreen");
  url.searchParams.append("modelYear", `${year}`);
  url.searchParams.append("angle", `${angle}`);

  return url.toString();
};
