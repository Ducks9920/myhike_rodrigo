function getNameFromAuth() {
  firebase.auth().onAuthStateChanged(user => {
      // Check if a user is signed in:
      if (user) {
          // Do something for the currently logged-in user here: 
          console.log(user.uid); //print the uid in the browser console
          console.log(user.displayName);  //print the user name in the browser console
          userName = user.displayName;

          // method #1:  insert with JS
          document.getElementById("name-goes-here").innerText = userName;    

          //method #2:  insert using jquery
          //$("#name-goes-here").text(userName); //using jquery

          //method #3:  insert using querySelector
          //document.querySelector("#name-goes-here").innerText = userName

      } else {
          // No user is signed in.
      }
  });
}
getNameFromAuth(); //run the function

// Function to read the quote of the day from Firestore "quotes" collection
// Input param is the String representing the day of the week, aka, the document name
function readQuote(day) {
  db.collection("quotes").doc(day)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
    .onSnapshot(dayDoc => {                                                               //arrow notation
         console.log("current document data: " + dayDoc.data());                          //.data() returns data object
         document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;      //using javascript to display the data on the right place
         
         //Here are other ways to access key-value data fields
         //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
         //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
         //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
    })
}
readQuote("tuesday");        //calling the function

//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
  let cardTemplate = document.getElementById("hikeCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

  db.collection(collection).get()   //the collection called "hikes"
      .then(allHikes=> {
          //var i = 1;  //Optional: if you want to have a unique ID for each hike
          allHikes.forEach(doc => { //iterate thru each doc
              var title = doc.data().name;       // get value of the "name" key
              var details = doc.data().details;  // get value of the "details" key
              var hikeCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
              var hikeLength = doc.data().length; //gets the length field
              let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.
              var docID = doc.id;

              //update title and text and image
              newcard.querySelector('.card-title').innerHTML = title;
              newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
              newcard.querySelector('.card-text').innerHTML = details;
              newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg
              newcard.querySelector('a').href = "eachHike.html?docID="+docID;

              //Optional: give unique ids to all elements for future use
              // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
              // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
              // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

              //attach to gallery, Example: "hikes-go-here"
              document.getElementById(collection + "-go-here").appendChild(newcard);

              //i++;   //Optional: iterate variable to serve as unique ID
          })
      })
}

displayCardsDynamically("hikes");  //input param is the name of the collection