import $ from 'jquery';
import './styles.css';


$(document).ready(function(){
  $('#form').submit(function(event){
    event.preventDefault();
    $('#typeDisplay').text("Searching....")
    $('ul#name').empty();
    $('#error').text("");
    let type = $('#typeSelect').val();
    let searchTerm = $('#searchTerm').val();
    $.ajax({
      url: "https://swapi.co/api/" + type + "/?search=" + searchTerm,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        if (type === "starships") {
          if (response.count === 0){
            $('#typeDisplay').text("No Results")
          } else {
            $('#typeDisplay').text("Starship");
            for (let i = 0; i < response.results.length; i++) {
              $.ajax({
                url: 'https://api.giphy.com/v1/gifs/search?api_key=ahj6m5vgcAHoX6r8YtmjE6MeVC316HCc&q=' + response.results[i].name + '&limit=1',
                type: 'GET',
                data: {
                  format: 'json'
                },
                success: function(gif) {
                  console.log(gif);
                  $('ul#name').append('<li><img src=" '+ gif.data[0].images.fixed_height.url +' ">' + "<br>Name: " + response.results[i].name + "<br> Model: " + response.results[i].model + "<br> Manufacturer: " + response.results[i].manufacturer + "<br> Cost (In Credits): " + response.results[i].cost_in_credits + "</li> <hr>");
                },
                error: function() {
                  $('#error').text("error");
                }
              })
            }
          }

        } else if (type === "people") {
          console.log(response)
          if (response.count === 0) {
            $('#typeDisplay').text("No Results")
          } else {
            $('#typeDisplay').text("People");
            for (let j = 0; j < response.results.length; j++) {
              $.ajax({
                url: response.results[j].homeworld,
                type: 'GET',
                data: {
                  format: 'json'
                },
                success: function(homeworld) {
                  $.ajax({
                    url: response.results[j].species,
                    type: 'GET',
                    data: {
                      format: 'json'
                    },
                    success: function(species) {
                      $('ul#name').append("<li> Name: " + response.results[j].name + "<br> Hair Color: " + response.results[j].hair_color + "<br> Mass: " + response.results[j].mass + "<br> Gender: " + response.results[j].gender + "<br> Height: " + response.results[j].height + "cm <br> Homeworld: " + homeworld.name + "<br> Species: " + species.name + "</li><hr>");
                    },
                    error: function(){
                      $('#error').text("Oh geez");
                    }
                  })
                },
                error: function(){
                  $('#error').text("Oh geez");
                }
              })
            }
          }

        } else if (type === "planets") {
          if (response.count === 0){
            $('#typeDisplay').text("No Results")
          } else {
            $('#typeDisplay').text("Planet");
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
          }
        } else if (type === "vehicles") {
          if (response.count === 0){
            $('#typeDisplay').text("No Results")
          } else {
            $('#typeDisplay').text("Vehicle");
            for (let l = 0; l < response.results.length; l++) {
                $('ul#name').append("<li> Name: " + response.results[l].name + "<br> Model: " + response.results[l].model + "<br> Manufacturer: " + response.results[l].manufacturer + "<br> Cost (In Credits): " + response.results[l].cost_in_credits + "<br> Vehicle Class: " + response.results[l].vehicle_class + "</li> <hr>");
              }
            }
          } else if (type === "species") {
            if (response.count === 0){
              $('#typeDisplay').text("No Results")
            } else {
              $('#typeDisplay').text("Species");
              for (let m = 0; m < response.results.length; m++) {
                $.ajax({
                  url: response.results[m].homeworld,
                  type: 'GET',
                  data: {
                    format: 'json'
                  },
                  success: function(homeworld) {
                    $.ajax({
                      url: response.results[m].people[0],
                      type: 'GET',
                      data: {
                        format: 'json'
                      },
                      success: function(person) {
                        $('ul#name').append("<li> Name: " + response.results[m].name + "<br> Classification: " + response.results[m].classification + "<br> Homeworld: " + homeworld.name + "<br> Language: " + response.results[m].language + "<br> Famous Member of Species: " + person.name +  "</li><hr>");
                      },
                      error: function(){
                        $('#error').text("OH SHIT");
                      }
                    })
                  },
                  error: function(){
                    $('#error').text("Oh geez");
                  }
                })
              }
            }

            }
          },
      error: function() {
        $('#error').text("Whoops");
      }
    })
  })
})
