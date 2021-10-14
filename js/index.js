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
})

   
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