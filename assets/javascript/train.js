 //Database configurations
    let config = {
        databaseURL: "https://train-scheduler-aa32c.firebaseio.com"	
    };

    firebase.initializeApp(config);
    let database = firebase.database();
    let connectionsRef = database.ref("userapp/trains");
    
	//Capture Button Click
    document.getElementById("add-train-btn").addEventListener("click", function(e) {
	e.preventDefault(); // prevent page from refreshing when form tries to submit itself
      
	// Capture user inputs and store them into variables
	let name = document.getElementById("train-name-input").value.trim();
        let destination = document.getElementById("destination-input").value.trim();
	let firstTime = document.getElementById("first-time-input").value.trim();
        let frequency = document.getElementById("frequency-input").value.trim();
	
	//Localforage getters and setters for train name
    	localforage.setItem("name", name).then(function(result) {
      	localforage.getItem("name").then(function(trainName) {
	});
        return result;
	});

        //Localforage getters and setters for destination
        localforage.setItem("destination", destination).then(function(result) {
        localforage.getItem("destination").then(function(trainDestination) {
	});
        return result;
	});

        //Localforage getters and setters for first train time
        localforage.setItem("firstTime", firstTime).then(function(result) {
        localforage.getItem("firstTime").then(function(firstValue) {
	});
         return result;
	});

         //Localforage getters and setters for frequency
         localforage.setItem("frequency", frequency).then(function(result) {
         localforage.getItem("frequency").then(function(trainFrequency) {
	});
         return result;
	});

	
	//Prevent submitting button with no text
	if (name.length === 0 || destination.length === 0 || firstTime.length === 0 || (frequency === 0 || frequency === NaN)) {
        	return false;
    	}
        
        connectionsRef.push({
            name: name,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,      
        });
        return false;
    });
    
    connectionsRef.on("child_added", function(childsnapshot) {
        let trainName = childsnapshot.val().name;
        let trainDestination = childsnapshot.val().destination;
        let firstTrainTime = childsnapshot.val().firstTime;
        let trainFrequency = childsnapshot.val().frequency;
        
	//Calculate Times
        let firstTime = moment(firstTrainTime, "hh:mm").subtract(1, "years");
        
	//difference between first time and current time 
        let diffTime = moment().diff(moment(firstTime), "minutes");
        
	//minutes since last train left diffTime%frequency
        let timeApart = diffTime % trainFrequency;
   
        let minutesAway = trainFrequency - timeApart;
   
        let nextArrival = moment().add(minutesAway, "minutes");
        nextArrival=moment(nextArrival).format("hh:mm");
	
	//Append data to current train schedule
	let newRow = document.getElementById('train-table').insertRow();
	newRow.innerHTML = "<td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency +
            "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>";

	clearForm();

    });
   function clearForm () {
    	let trainName = document.getElementById("train-name-input").value = "";
    	let destination = document.getElementById("destination-input").value = "";
    	let firstTrainTime = document.getElementById("first-time-input").value = "";
    	let frequency = document.getElementById("frequency-input").value = "";
	}

	window.onload = initClock;
 
   function initClock() {
  	let now = new Date();
  	let hr  = now.getHours();
  	let min = now.getMinutes();
  	let sec = now.getSeconds();
  	if (min < 10) min = "0" + min;  // insert a leading zero
  	if (sec < 10) sec = "0" + sec;
  	document.getElementById('clockDisplay').innerHTML
        = "Time is " + hr + ":" + min + ":" + sec;
  	setTimeout('initClock()', 500);
  }
