

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB_PKyQpoCntJyVd5KhCXt55TtGIdU7ZcE",
    authDomain: "jhkjhjhk-49325.firebaseapp.com",
    databaseURL: "https://jhkjhjhk-49325.firebaseio.com",
    projectId: "jhkjhjhk-49325",
    storageBucket: "",
    messagingSenderId: "641956334940"
  };

  firebase.initializeApp(config);

  
    database = firebase.database()
    
    $("#submit").on("click", function(){
        
        


        var name = $("#train-name").val();
        var destination = $("#destination").val();
        var freq = $("#frequency").val();
        var first = $("#first").val();
        
        console.log(name)
        console.log(destination)
        console.log(freq)
        console.log(first)

        var train = {
            name:name,
            destination:destination,
            freq:freq,
            first:first
        }
        database.ref().push(train)
    })

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
      
        // Store everything into a variable.
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var freq = childSnapshot.val().freq;
        var first = childSnapshot.val().first;
      
        // Employee Info
        console.log(name);
        console.log(destination);
        console.log(freq);
        console.log(first);

        var firstConverted = moment(first, "HH:mm");
        var diffTime = moment().diff(moment(firstConverted), "minutes");
        var tRemainder = diffTime % freq;
        var tMinutesTillTrain =  freq - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
      
        // Create the new row
        var newRow = $("<tr>").append(
          $("<td>").text(name),
          $("<td>").text(destination),
          $("<td>").text(freq),
          $("<td>").text(nextTrain),
          $("<td>").text(tRemainder)
        );
      
        // Append the new row to the table
        $("#table").append(newRow);
      });
          
    