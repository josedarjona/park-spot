


$(document).ready(function () {



  $('.submit-button').click(function () {
    const searchVenue = $('.search-venue').val();


    axios({
      method: "GET",
      url: `https://app.ticketmaster.com/discovery/v2/venues.json?keyword=${searchVenue}&apikey=Toa0rAG7W0RbHa89xDXyMzcObQHh8kRX`
    })
      .then(searchResult => {
        console.log(searchResult.data)
        if(searchResult.data._embedded === undefined) {
          $('.search-list').empty();
    
          $('.search-list').append(`
      <div class="searchresults">
      <h3> No Results :( </h3>
      
      </div>
      `)
        }
        const venueSearched = searchResult.data._embedded.venues
        // const venueSearchOne = searchResult.data
        // const embeddedData = _embedded.venues

        // const test = venueSearched.images;
        // const checkImage = venueSearched.images[0].url;
        console.log(venueSearched)
        // console.log(checkImage)
        // console.log(test)
        $('.search-list').empty();


        
        if (searchResult.data.hasOwnProperty('_embedded')) {
          venueSearched.forEach(venueResult => {
            // for (let index = 0; index < venueSearched.length; index++) {
            // const checkImage = venueSearched.images[index].url;

            // }

            // venueSearched.map(venueResult => {
            if (venueResult.images) {
              const checkImage = venueResult.images[0].url;
              $('.search-list').append(`
          <div class="searchresults">
          <h3> name: <a href="">${venueResult.name}</a></h3>
          <h4> city, state name: ${venueResult.city.name},${venueResult.state.name} </h4>
          <img src="${checkImage}" alt="${venueResult.name}">
          
          <br><br><br><br>
          <span>-------------------------</span>
          <br><br><br><br>
          </div>
          `)
            } if (!venueResult.images)  {
              $('.search-list').append(`
          <div class="searchresults">
          <h3> name: <a href="">${venueResult.name}</a></h3>
          <h4> city, state name: ${venueResult.city.name},${venueResult.state.name} </h4>
          <img src="https://media.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif" alt="${venueResult.name}">
          
          <br><br><br><br>
          <span>-------------------------</span>
          <br><br><br><br>
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

