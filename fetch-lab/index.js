//R-ALAB 308A.4.1 - Working with External Data

//XML: was designed to store and transport data.
//API REQUEST TO GET THE DATA
//FETCH TO DO A REQUEST
/*FETCH() API: RETURNS A PROMISE WE CAN HANDLE IT WITH AWAIT/ASYN OR THEN. CATCH*/

import * as Carousel from "./Carousel.js";
export {
  createCarouselItem,
  clear,
  appendCarousel,
  start,
} from "./Carousel.js";

//import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_ox3ZfhPQyHWoQOA4mWm8r7VWuKx5lv5dVCADKwfSO2OZnufK1CYAfjpriXZPUJpn"


/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

 async function initialLoad() {

   let data = await fetch ('https://api.thecatapi.com/v1/breeds?limit=10&page=0')
   let breedsdata = await data.json();



  for (let breed of breedsdata) {
     const option = document.createElement('option');
     option.value = breed.id
     option.textContent = breed.name


     breedSelect.appendChild(option)
    // console.log(option)
    
  }  
 }

initialLoad()


/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */

breedSelect.addEventListener('change', async (e) => {
  Carousel.clear();
  infoDump.innerHTML = "";

  const selected = e.target.value
  //Check the API documentation if you're only getting a single object.

  
// I KNOW I HAVE TO PUT THE CONT API KEY ON THE LINK BUT FOR SOME REASON WASN'T WORKING THAT ONE.
  let url= (`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${selected}&api_key=live_ox3ZfhPQyHWoQOA4mWm8r7VWuKx5lv5dVCADKwfSO2OZnufK1CYAfjpriXZPUJpn`)

  console.log(url)
  const dataE = await fetch(url)
  const breedE = await dataE.json();

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

   console.log(h1)
   const p = document.createElement('p')
   h1.style.textAlign = ('center')
   p.textContent = infoB.description
   p.style.textAlign = ('center')
   console.log(p)
    
   infoDump.appendChild(h1)
   infoDump.appendChild(p)

  Carousel.start();

}); 

/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */

axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;


export async function favourite(imgId) {


  const favourites = await axios.get(`/favourites`);
  const allFavourites = favourites.data;

  let favClicked = null;
  for (let i = 0; i < allFavourites.length; i++) {
    const favs = allFavourites[i];

    if (favs.image_id === imgId) {
      favClicked = favs;
      break
    }
  }

  if (favClicked) {
    console.log(`Image ${imgId} already in your favorites`)
    await axios.delete(`/favourites/${favClicked.id}`)
    console.log(`Image ${imgId} delete from favs`)

  } else {
    const post = await axios.post(`/favourites`, {
      image_id: imgId


    });
    return {
      status: 'favourited',
      imageId: imgId,
    };
  }


}


/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */