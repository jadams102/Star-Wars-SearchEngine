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

        let results = response;
        console.log(results);
        console.log(results.results[0].name)
        for (let i = 0; i < results.results.length; i++) {
          $('#typeDisplay').text(type)
          $('ul#name').append("<li>" + results.results[i].name + "</li>");
        }
      },
      error: function() {
        $('#error').text("Whoops");
      }
    })
  })
})
