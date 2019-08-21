# train-schedule

### Overview
In this assignment, I'll create a train schedule application that incorporates localForage to host arrival and departure data. App will retrieve and manipulate this information with Moment.js. The website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.

When adding trains, administrators should be able to submit the following:
- Train Name
- Destination
- First Train Time -- in military time
- Frequency -- in minutes

// First Train of the Day is 3:00 AM
    Assume Train comes every 7 minutes.-->frequency
    Assume the current time is 3:16 AM....--->currentTime
    diffTime=currentTime-firstTrainTime-->16min
    minutes since last train 
    What time would the next train be...? 
    --->train1:3:07;train2:3:14;train3:3:21 
    It would be 3:21 -- 5 minutes away-->minutesAway=nextArrival-currentTime;
    
The app will calculate when the next train will arrive; this should be relative to the current time.

Users from many different machines must be able to view same train times.

### Languages/Technologies Used
- HTML, CSS, BootStrap, Javascript
- localforage
- firebase 
- JavaScript Animation - A Digital Clock for the clock animation. 
- Created by Clifton Nwokeuku 
- moment.js for calculating time and frequency for each train individually (https://momentjs.com/)