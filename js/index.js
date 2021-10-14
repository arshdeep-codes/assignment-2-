$(document).ready(function() {
    /* Load Data button click listener */
    $('#btnLoadData').click(function() {
        $.ajax({ // ajax call to retrieve data from json file
            type: 'GET',
            url: 'js/schoolcovidsummary.json',
            success: function(response) {
                for (i = 0; i < response.length; i++) {
                    data = new saveData(response[i]); //creating objects using saveData class
                    /* Saving object to local storage with reported_date as key */
                    localStorage.setItem(data.reported_date, JSON.stringify(data));
                }
                /* alerting user that data is saved */
                alert('Data saved successfully');
            }
        })
    });

    $('#btnDisplayData').click(function() {
        /* Display data button click listener */
        var keys = []; // Creating keys array 

        /* Retrieving all keys from local storage and storing them in keys array */
        for (i = 0, len = localStorage.length; i < len; ++i) {
            keys.push(localStorage.key(i));
        }
        keys.sort(); // Sorting the keys array

        /* Creating an unordered list to dispay the dates i.e. keys */
        $('#dateList').append("<ul id='dateList'></ul>");
        for (cnt = 0; cnt < keys.length; cnt++) {
            $('#dateList').append('<li>' + keys[cnt] + '</li>');
        }

        /* Date list item click listener */
        $('#dateList li').click(function() {
            // calling show details function to show the details
            showDetails($(this).text());
            $(window).scrollTop(0); // Scrolling to top
        });
    });



    //Getting current date
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();

    /* Setting the footer text */
    var footerText = `<p> Arshdeep Singh • Davis Campus • ${day}-${month}-${year}`;
    $('#footer').append(footerText);

});


function showDetails(reported_date) {
    /* Retrieving object and displaying all the details */
    var details = JSON.parse(localStorage.getItem(reported_date));
    data = `<p><b>Date Reported: </b> ${details.reported_date} </p>
                <p><b>ID: </b> ${details.id} </p>
                <p><b>Current Schools Cases: </b> ${details.current_schools_w_cases} </p>
                <p><b>Current Schools Closed: </b> ${details.current_schools_closed} </p>
                <p><b>Current Total numbers in Schools: </b> ${details.current_total_number_schools} </p>
                <p><b>Cumulative School related cases: </b> ${details.cumulative_school_related_cases} </p>
                <p><b>Cumulative School related student cases: </b> ${details.cumulative_school_related_student_cases} </p>
                <p><b>Cumulative School related staff cases: </b> ${details.cumulative_school_related_staff_cases} </p>
                <p><b>Cumulative School related unspecified cases: </b> ${details.cumulative_school_related_unspecified_cases} </p>`;
    $('#details').empty().append(data);
}


/* saveData class to create data objects */
class saveData {
    constructor(json) {
        this.id = 'bharajar';
        this.reported_date = json.reported_date;
        this.current_schools_w_cases = json.current_schools_w_cases;
        this.current_schools_closed = json.current_schools_closed;
        this.current_total_number_schools = json.current_total_number_schools;
        this.cumulative_school_related_cases = json.cumulative_school_related_cases;
        this.cumulative_school_related_staff_cases = json.cumulative_school_related_staff_cases;
        this.cumulative_school_related_unspecified_cases = json.cumulative_school_related_unspecified_cases;
    }
}