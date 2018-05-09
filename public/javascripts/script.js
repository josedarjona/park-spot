

$(document).ready(function () {



  $('.submit-button').click(function () {
    const searchVenue = $('.search-venue').val();


    axios({
      method: "GET",
      url: `https://app.ticketmaster.com/discovery/v2/venues.json?keyword=${searchVenue}&apikey=Toa0rAG7W0RbHa89xDXyMzcObQHh8kRX`
    })
      .then(searchResult => {
        console.log(searchResult.data)
        if (searchResult.data._embedded === undefined) {
          $('.table-responsive').empty();

          $('.table-responsive').append(`
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
        


        $('.table-responsive').empty();

        if (searchResult.data.hasOwnProperty('_embedded')) {
          venueSearched.forEach(venueResult => {
            // for (let index = 0; index < venueSearched.length; index++) {
            // const checkImage = venueSearched.images[index].url;

            // }

            
            // venueSearched.map(venueResult => {
            if (venueResult.images && venueResult.state) {
              const checkImage = venueResult.images[0].url;
              $('.table-responsive').append(`

              <table class="table">
              <div class="card-columns">
              <div class="card">
              <img class="card-img-top" src="${checkImage}" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title"><a href="/locationinfo/${venueResult.id}">${venueResult.name}</a></h5>
                <p class="card-text">city, state name: ${venueResult.city.name},${venueResult.state.name} </p>
                </div>
              </div>
              </div>
            </table>
            


          `)
            } else if (!venueResult.state && !venueResult.images) {

              $('.table-responsive').append(`


              <table class="table">
              <div class="card-columns">
              <div class="card">
              <img class="card-img-top" src="https://media.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif" alt="Card image cap">
                <div class="card-body">
                <h5 class="card-title"><a href="/locationinfo/${venueResult.id}">${venueResult.name}</a></h5>
                <p class="card-text">city, state name: ${venueResult.city.name},${venueResult.country.name} </p>
                </div>
              </div>
              </div>
              </table>
              
           

          `)
            } else if(!venueResult.images) {

              $('.table-responsive').append(`



              <table class="table">
              <div class="card-columns">
            <div class="card">
            <img class="card-img-top" src="https://media.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif" alt="Card image cap">
              <div class="card-body">
              <h5 class="card-title"><a href="/locationinfo/${venueResult.id}">${venueResult.name}</a></h5>
              <p class="card-text">city, state name: ${venueResult.city.name},${venueResult.country.name} </p>
              </div>
            </div>
            </div>
            </table>
            
          

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

