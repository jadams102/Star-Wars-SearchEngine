import $ from 'jquery';

$(document).ready(function(){
  $('#form').submit(function(event){
    event.preventDefault();
    $('ul#name').empty();
    let type = $('#typeSelect').val();
    let searchTerm = $('#searchTerm').val();
    console.log(searchTerm)
    $.ajax({
      url: "https://swapi.co/api/" + type + "/?search=" + searchTerm,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('#typeDisplay').text(type)
        if (type === "starships") {
          $('#typeDisplay').text("Starship")
          for (let i = 0; i < response.results.length; i++) {
            $('ul#name').append("<li> Name: " + response.results[i].name + "<br> Model: " + response.results[i].model + "<br> Manufacturer: " + response.results[i].manufacturer + "<br> Cost (In Credits): " + response.results[i].cost_in_credits + "</li> <hr>");
          }
        } else if (type === "people") {
          $('#typeDisplay').text("People")
          for (let j = 0; j < response.results.length; j++) {
            $.ajax({
              url: response.results[j].homeworld,
              type: 'GET',
              data: {
                format: 'json'
              },
              success: function(homeworld) {
                console.log(homeworld)
                $('ul#name').append("<li> Name: " + response.results[j].name + "<br> Height: " + response.results[j].height + "cm <br> Homeworld: " + homeworld.name + "</li><hr>");
              },
              error: function(){
                $('#error').text("Oh geez");
              }
            })
          }
        } else if (type === "planets") {
          $('#typeDisplay').text("Planet")
          for (let k = 0; k < response.results.length; k++) {
            $.ajax({
              url: response.results[k].residents[0],
              type: 'GET',
              data: {
                format: 'json'
              },
              success: function(residents) {
                $('ul#name').append("<li> Name: " + response.results[k].name + "<br> Climate: " + response.results[k].climate + "<br> Gravity: " + response.results[k].gravity + "<br> Population: " + response.results[k].population + "<br> Terrain: " + response.results[k].terrain + "<br> Famous Known Resident: " + residents.name + "</li> <hr>");
              },
              error: function(){
                $('#error').text("Oh geez");
              }
            })
        }
      } else if (type === "vehicles") {
        $('#typeDisplay').text("Vehicle")
        for (let l = 0; l < response.results.length; l++) {
            $('ul#name').append("<li> Name: " + response.results[l].name + "<br> Model: " + response.results[l].model + "<br> Manufacturer: " + response.results[l].manufacturer + "<br> Cost (In Credits): " + response.results[l].cost_in_credits + "<br> Vehicle Class: " + response.results[l].vehicle_class + "</li> <hr>");
            console.log(response)
      }
    }
      },
      error: function() {
        $('#error').text("Whoops");
      }
    })
  })
})
