// 
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD-x8nQSyrY2MLjh6Y2_xapYKQf99AyVJg",
  authDomain: "my-project-bcproject-1.firebaseapp.com",
  databaseURL: "https://my-project-bcproject-1.firebaseio.com",
  projectId: "my-project-bcproject-1",
  storageBucket: "my-project-bcproject-1.appspot.com",
  messagingSenderId: "879921915287",
  appId: "1:879921915287:web:6d37e0d698fd0bb55f10d2",
  measurementId: "G-5B1RVF81WN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// var googlekey="AIzaSyD-x8nQSyrY2MLjh6Y2_xapYKQf99AyVJg"
var googlekey = "AIzaSyDE4LwfvZ2rcMP62x1eDZHAuahO2Y1g0nA"

/*
 * pulls information from the form and build the query URL
 * @returns {string} URL for GoogleBooks API based on form inputs
 */
// Eliminate CORS issues
jQuery.ajaxPrefilter(function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
  }
});
function buildQueryURL() {
  // queryURL is the url we'll use to query the API
  var queryURL = "https://www.goodreads.com/search/index.xml?";

  // Begin building an object to contain our API call's query parameters
  // Set the API key
  var queryParams = { "key": "1ted1vfG1CFzf89SUcgzw"};

  // Grab text the user typed into the search input, add to the queryParams object
  queryParams.q = $("#search-term")
    .val()
    .trim();

  // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nURL: " + queryURL + "\n---------------");
  console.log(queryURL + $.param(queryParams));
  return queryURL + $.param(queryParams);
}

/**
 * takes API data (JSON/object) and turns it into elements on page
 * @param {object} GRData - object containing GoodReads API data
 */
/*
function updatePage(GRData) {
  console.log("hurray");

  console.log(GRData);
  // Get number of results to display from the form 
  // IF API doesn't hv "limit" parameter, we hv to do ourself
  var numArticles = $("#article-count").val();

  // Log the GRData to console, where it will show up as an object
  x = GRData;

  console.log($(x).find("title")[0])
  console.log("------------------------------------");

  console.log("ARTICLE COUNT: " + numArticles);
  // Loop through and build elements for defined number of articles
  for (var i = 0; i < numArticles; i++) {
    // Get specific article info for current index
    var article = $(GRData).find("title")[i];

    // Increase the articleCount (track article # - starting at 1)
    var articleCount = i + 1;

    // Create the  list group to contain the articles(books) and add the article content for each
    var $articleList = $("<ul>");
    console.log($articleList);
    $articleList.addClass("list-group");

    // Add the newly created element to the DOM
    $("#article-section").append($articleList);

    // If the article has a headline, log and append to $articleList
    var headline = article;
    var $articleListItem = $("<li class='list-group-item articleHeadline'>");

    if (headline && headline.innerHTML) {
      console.log(headline.innerHTML);
      $articleListItem.append(
        "<span class='label label-primary'>" +
        articleCount +
        "</span>" +
        "<strong> " +
        headline.innerHTML +
        "</strong>"
      );
    }

    // If the article has a byline, log and append to $articleList
    var byline = article.byline;

    if (byline && byline.original) {
      console.log(byline.original);
      $articleListItem.append("<h5>" + byline.original + "</h5>");
    }

    // Log section, and append to document if exists
    var section = article.section_name;
    console.log(article.section_name);
    if (section) {
      $articleListItem.append("<h5>Section: " + section + "</h5>");
    }

    // Log published date, and append to document if exists
    var pubDate = article.pub_date;
    console.log(article.pub_date);
    if (pubDate) {
      $articleListItem.append("<h5>" + article.pub_date + "</h5>");
    }

    // Append and log url
    $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
    console.log(article.web_url);

    // Append the article
    $articleList.append($articleListItem);
  }
}
*/

// Function to empty out the articles
function clear() {
  $("#article-section").empty();
}

// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // Empty the region associated with the articles
  clear();
  var book = $("#search-term")
  .val()
  .trim();
  if (book=="best sellers" || book=="Best Sellers"){
    NYTBooks()  
  }
  else{
    googleBooks(book)
  }


  // Build the query URL for the ajax request to the API
  // var queryURL = buildQueryURL();
  // console.log(queryURL)

  // Make the AJAX request to the API - GETs the JSON data at the queryURL.
  // The data then gets passed as an argument to the updatePage function

  // $.ajax({
  // url: queryURL,
  // dataType: "xml",
  // method: "GET"
  // }).then(updatePage);

});
function googleBooks(book) {

  var secret = googlekey;
  var url = ` https://www.googleapis.com/books/v1/volumes?q=${book}&key=${secret}`;
  console.log(url)
  $.get(url)
    .then(function (response) {

      console.log("responseData", response.items)
      var books = response.items
      for (var i = 0; i < books.length; i++) {

        $("#article-section").append(`<div class="bookImage">

        <img src=${books[i].volumeInfo.imageLinks.thumbnail}><br>

        ${books[i].volumeInfo.title}<br>

        <button class="save" googleID=${books[i].id}>save</button></div>`)
        
        $("#article-section").append(`<div class="bookdscrp">${books[i].volumeInfo.description}</div>`)
        console.log(books[i].volumeInfo.description)
             
      }


      $(".save").on("click", function () {
        var googleId = $(this).attr("googleID")
        console.log(googleId)

        //update the database
        database.ref().push({
          googleId: googleId
        })
      
      })
    })
  }

// BEGINNING OF NYTBOOKS CODE ISABEL HELPED ME WITH
// NOTE - NEED NAV TO GO BETWEEN SEARCH SCREEN AND SAVE SCREEN
// NEED WAY BETTER LAYOUT
//Need separate SEARCH button?
//Search results need to come into the card BELOW the Search Results headline
//Best Seller list needs to wait to be searched...right now it automatically comes after the Books/description
//Different results field also?
//Wamt Best Sellers list to be separate request an either/or  books or reviews

function NYTBooks() {
  
  var url = "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=DhrqyjaAn0mxLFOdpPxByhBW2Sxa6XDQ"
  $.get(url).then(function (responseData) {
    console.log(responseData)

    var books = responseData.results.books
    console.log(books)
    for (var i = 0; i < books.length; i++) {


      $("#article-section").append(`<p>${books[i].title} - ${books[i].author}</p> <br>`)
    }

  })
}

