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

var secret = "AIzaSyDE4LwfvZ2rcMP62x1eDZHAuahO2Y1g0nA"


database.ref().on("child_added", function (data) {
    var googleId = data.val().googleId

    var url = `https://www.googleapis.com/books/v1/volumes/${googleId}`;
    console.log(url)
    $.get(url)
        .then(function (books) {
            console.log(books)
            
            // $("#article-section").append(`<p class="bookTitle">${books.volumeInfo.title}</p>`)
            // $("#article-section").append(`<p>${books.volumeInfo.description}</p>`)
            // $("#article-section").append(`<img src=${books.volumeInfo.imageLinks.thumbnail}>
            // <button class="save" googleID=${books.id}>delete</button>`)
            $("#article-section").append(`<hr>`)

            $("#article-section").append(`<div class="bookImage">

            <img src=${books.volumeInfo.imageLinks.thumbnail}><br>
    
           <p class="bookTitle"> ${books.volumeInfo.title}</p>
    
            <button class="save" googleID=${books.id}>save</button></div>`)
            
            $("#article-section").append(`<div class="bookdscrp">${books.volumeInfo.description}</div>`)
            console.log(books.volumeInfo.description)

        })


})


$(".remove").on("click", function () {
    // alert ("hello")
    var googleId = $(this).attr("googleID")
    console.log(googleId)

    // update the database
    database.ref().child(googleId).remove()
    
  })