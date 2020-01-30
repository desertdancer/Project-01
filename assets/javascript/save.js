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

    var url = ` https://www.googleapis.com/books/v1/volumes/${googleId}`;
    console.log(url)
    $.get(url)
        .then(function (books) {
            console.log(books)
            $("#article-section").append(`<p>${books.volumeInfo.title}</p>`)
          $("#article-section").append(`<p>${books.volumeInfo.description}</p>`)
          $("#article-section").append(`<img src=${books.volumeInfo.imageLinks.thumbnail}>`)
        })


})