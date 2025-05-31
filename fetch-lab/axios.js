
import * as Carousel from "./Carousel.js";
export {
  createCarouselItem,
  clear,
  appendCarousel,
  start,
} from "./Carousel.js";




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


axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;


/* 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */


 async function initialLoad() {

   let data = await axios.get('/breeds?limit=10&page=0')
   console.log(data)
   let breedsdata = data.data;


  for (let breed of breedsdata) {
     const option = document.createElement('option');
     option.value = breed.id
     option.textContent = breed.name


     breedSelect.appendChild(option)
     console.log(option)
    
  }  
 }

initialLoad()




breedSelect.addEventListener('change', async (e) => {
  Carousel.clear();
  infoDump.innerHTML = "";

  const selected = e.target.value
  //Check the API documentation if you're only getting a single object.

  
// I KNOW I HAVE TO PUT THE CONT API KEY ON THE LINK BUT FOR SOME REASON WASN'T WORKING THAT ONE.

  const dataE = await axios.get(`/images/search?limit=10&breed_ids=${selected}`)
  const breedE = dataE.data;

  for (let item of breedE) {
    let src = item.url;
    let img = item.id;
    let alt = item.breeds[0].name

    let caroItem = Carousel.createCarouselItem(src, alt, img);
    Carousel.appendCarousel(caroItem);
  }

 const infoB = breedE[0].breeds[0]
   infoB.name

   const h1 = document.createElement('h1')
   h1.textContent = infoB.name

   const p = document.createElement('p')
   h1.style.textAlign = ('center')
   p.textContent = infoB.description
   p.style.textAlign = ('center')

   infoDump.appendChild(h1)
   infoDump.appendChild(p)

  Carousel.start();

}); 

/*
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */


axios.interceptors.request.use((config) => {
    console.log('Start request to:', config.url)
  config.metadata ={ startTime: new Date() };
  return config
})

axios.interceptors.response.use((response) => {
  const endTime = new Date();  
  const duration = endTime-response.config.metadata.startTime;     
  console.log(`End time: ${duration}ms`)  
  return response
})

async function getFirstBreed() {
  try {
    // This request will be logged by the interceptors above
    const res = await axios.get("/breeds?limit=10&page=0");
    console.log("Got breed:", res.data[0].name);
  } catch (err) {
    console.error(err);
  }
}

getFirstBreed();