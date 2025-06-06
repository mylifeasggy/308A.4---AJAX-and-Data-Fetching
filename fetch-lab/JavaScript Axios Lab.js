
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

/*
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

//
axios.interceptors.request.use((config) => {
     document.body.style.cursor = "progress";

    if(progressBar){

        progressBar.style.width = '0%'
    }
    console.log('Start request to:', config.url);
    config.metadata = { startTime: new Date() };
    return config
})

axios.interceptors.response.use((response) => {
    document.body.style.cursor = "default";

    const endTime = new Date();
    const duration = endTime - response.config.metadata.startTime;
    console.log(`End time: ${duration}ms`)
    return response
})



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
    //console.log(data)
    let breedsdata = data.data;
    for (let breed of breedsdata) {
        const option = document.createElement('option');
        option.value = breed.id
        option.textContent = breed.name

        breedSelect.appendChild(option)
        //console.log(option)

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

    const infoB = breedE[0]
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

window.addEventListener("DOMContentLoaded", initialLoad);



/*Create a progress bar to indicate the request is in progress.
The progressBar element has already been created for you.
You need only to modify its width style property to align with the request progress.
In your request interceptor, set the width of the progressBar element to 0%.
This is to reset the progress with each request.
Research the axios onDownloadProgress config option.
Create a function "updateProgress" that receives a ProgressEvent object.
Pass this function to the axios onDownloadProgress config option in your event handler.
console.log your ProgressEvent object within updateProgress, and familiarize yourself with its structure.
Update the progress of the request using the properties you are given.
Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire once or twice per request to this API. This is still a concept worth familiarizing yourself with for future projec */


//   onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event

function updateProgress(progressEvent) {

    console.log('Progress Event:', progressEvent);

    if (total) {
         let percentage = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(`% done-> ", ${percentage}`);
    }

    if (progressBar) {
        progressBar.style.width = percentage
    }else {
        console.log('Percentage unknown');
    }
}

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

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

