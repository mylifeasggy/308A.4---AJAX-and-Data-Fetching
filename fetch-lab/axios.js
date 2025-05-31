
export * as Carousel from "./Carousel.js";
export {
  createCarouselItem,
  clear,
  appendCarousel,
  start,
} from "./Carousel.js";

import axios from "axios";

 //The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_ox3ZfhPQyHWoQOA4mWm8r7VWuKx5lv5dVCADKwfSO2OZnufK1CYAfjpriXZPUJpn"



/* 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */

axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;





/*
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

instance.interceptors.request.use((config) => {
    console.log('Start request to:', config.url)
  config.metadata ={ startTime: new Date() };
  return config
})

instance.interceptors.response.use((response) => {
  const endTime = new Date();  
  const duration = endTime-response.config.metadata.startTime;     
  console.log(`End time: ${duration}ms`)  
  return response
})