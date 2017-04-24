  $(document).ready(function() {
    $("#header").fadeIn(1000, function(){
      $.ajax({
      url: "https://api.wmata.com/incidents.svc/json/incidents",
      beforeSend: function(xhrObj) {
        xhrObj.setRequestHeader("api_key", "e1eee2b5677f408da40af8480a5fd5a8"); //WMATA demo key
      },
      type: "GET"
      })
    .done(function(data) {
      console.log(data.Incidents);
      if (data.Incidents.length > 0) {
        
        for(i=0; i<data.Incidents.length; i++) {
        var incident = data.Incidents[i];
        var detail = "<div class=\"row\"> <div class=\"col-xs-3\"> </div> <div class=\"col-xs-6 text-left detail\">"
        + "<strong>Incident Type : </strong>" + incident.IncidentType
        + "<br/><strong>Lines Affected : </strong>" + incident.LinesAffected
        + "<br/><strong>Description : </strong>" + incident.Description
        + "</div> <div class=\"col-xs-3\"> </div> </div>";
        $('#details').append(detail);
        }
        var message = "No, there are currently " + data.Incidents.length + " issue(s) on Metro.";
        updateStatusText(message);
        
        
      } else {
        updateStatusText("Yes, all trains appear to be running on time.");
        var image = "<img src=\"checkmark.png\" width=\"200px\" height=\"200px\">";
        $('#details').append(image);
      }
      })
    .fail(function() {
      console.log("Something went wrong...");
      updateStatusText("A problem occured while checking for incidents. Please try again later.");
      var image = "<img src=\"error.png\" width=\"200px\" height=\"200px\">";
        $('#details').append(image);
      });
    });
});

function updateStatusText(text) {
    $('#message').fadeOut(function(){
    $('#message p').text(text);
    $('#message').fadeIn(function() {
      showDetails();
    });
  });
      
};

function showDetails() {
  $('#details').slideDown();
}
