

$(document).ready(function () {

  $(".dropdown-trigger").dropdown();

  $('.submit-button').click(function () {
    const searchVenue = $('.search-venue').val();


    axios({
      method: "GET",
      url: `https://app.ticketmaster.com/discovery/v2/venues.json?keyword=${searchVenue}&apikey=Toa0rAG7W0RbHa89xDXyMzcObQHh8kRX`
    })
      .then(searchResult => {
        console.log(searchResult.data)
        if (searchResult.data._embedded === undefined) {
          $('.row').empty();

          $('.row').append(`
      <div class="no results">
      <h3> No Results :( </h3>
      
      </div>
      `)
        }
        const venueSearched = searchResult.data._embedded.venues
        // const venueSearchOne = searchResult.data
        // const embeddedData = _embedded.venues

        // const test = venueSearched.images;
        // const checkImage = venueSearched.images[0].url;
        // console.log(venueSearched)
        // console.log(checkImage)
        // console.log(test)
        


        $('.row').empty();

        if (searchResult.data.hasOwnProperty('_embedded')) {
          venueSearched.forEach(venueResult => {
            // for (let index = 0; index < venueSearched.length; index++) {
            // const checkImage = venueSearched.images[index].url;

            // }

            
            // venueSearched.map(venueResult => {
            if (venueResult.images && venueResult.state) {
              const checkImage = venueResult.images[0].url;
              $('.row').append(`




              <div class="col s12 m4">
                <div class="card hoverable">
                  <div class="card-image imgcard">
                   <img class="imgcard" src="${checkImage}">
                  </div>
                   <div class="card-content">
                   <span class="card-title blue-text text-darken-2"><a href="/locationinfo/${venueResult.id}">${venueResult.name}</a></span>
               <p>city, state name: ${venueResult.city.name},${venueResult.state.name}</p>
                </div>
                </div>
            </div>

            


          `)
            } else if (!venueResult.state && !venueResult.images) {

              $('.row').append(`



      

              <div class="col s12 m4">
              <div class="card hoverable">
                <div class="card-image">
                 <img class="imgcard" src="https://media.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif">
                </div>
                 <div class="card-content">
                 <span class="card-title blue-text text-darken-2"><a href="/locationinfo/${venueResult.id}">${venueResult.name}</a></span>
             <p>city, state name: ${venueResult.city.name},${venueResult.country.name}</p>
              </div>
              </div>
          </div>

              
           

          `)
            } else if(!venueResult.images) {

              $('.row').append(`


              <div class="col s12 m4">
              <div class="card hoverable">
                <div class="card-image">
                 <img class="imgcard"src="https://media.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif">
                </div>
                 <div class="card-content">
                 <span class="card-title blue-text text-darken-2"><a href="/locationinfo/${venueResult.id}">${venueResult.name}</a></span>
             <p>city, state name: ${venueResult.city.name},${venueResult.country.name}</p>
              </div>
              </div>
          </div>

            
          

      `)
      }
     })
    }
        // if(!(searchResult.data.hasOwnProperty('_embedded'))) {

        //       $('.search-list').append(`
        //   <div class="searchresults">
        //   <h3> No Results :( </h3>

        //   </div>
        //   `)
        //     }
    })
    .catch(err => {
    console.log(err);
    })
  })


  














}); // end document ready

