url = "https://jsonplaceholder.typicode.com/users"
$.getJSON( url, function(items) {

   for(var data = 0; data < 5; data++) {
    var id =  items[data].id + '</br>' +
              items[data].name + '</br>' +
              items[data].username + '</br>' +
              items[data].email + '</br>' +
              items[data].address;
    $(".section__article__section").append(id)
  }
});