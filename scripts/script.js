//---------------------------------
// Your own functions here
//---------------------------------
function writeHikes() {
  //define a variable for the collection you want to create in Firestore to populate data
  var hikesRef = db.collection("hikes");

  hikesRef.add({
      code: "BBY01",
      name: "Burnaby Lake Park Trail", //replace with your own city?
      city: "Burnaby",
      province: "BC",
      level: "easy",
      details: "A lovely place for lunch walk",
      length: 10,          //number value
      hike_time: 60,       //number value
      lat: 49.2467097082573,
      lng: -122.9187029619698,
      last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
  });
  hikesRef.add({
      code: "AM01",
      name: "Buntzen Lake Trail", //replace with your own city?
      city: "Anmore",
      province: "BC",
      level: "moderate",
      details: "Close to town, and relaxing",
      length: 10.5,      //number value
      hike_time: 80,     //number value
      lat: 49.3399431028579,
      lng: -122.85908496766939,
      last_updated: firebase.firestore.Timestamp.fromDate(new Date("March 10, 2022"))
  });
  hikesRef.add({
      code: "NV01",
      name: "Mount Seymour Trail", //replace with your own city?
      city: "North Vancouver",
      province: "BC",
      level: "hard",
      details:  "Amazing ski slope views",
      length: 8.2,        //number value
      hike_time: 120,     //number value
      lat: 49.38847101455571,
      lng: -122.94092543551031,
      last_updated: firebase.firestore.Timestamp.fromDate(new Date("January 1, 2023"))
  });
}


//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log("logging out user");
    }).catch((error) => {
      // An error happened.
    });
}