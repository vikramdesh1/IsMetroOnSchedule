  $(document).ready(function() {
    $("#header").fadeIn(1000, function(){
      $.ajax({
      url: "https://api.wmata.com/Incidents.svc/json/Incidents",
      beforeSend: function(xhrObj) {
        xhrObj.setRequestHeader("api_key", "affa4c8afe0f49aaaa0e588b26cfc4aa");
      },
      type: "GET"
      })
    .done(function(data) {
      console.log(data.Incidents);
      if (data.Incidents.length > 0) {
        
        for(i=0; i<data.Incidents.length; i++) {
        var incident = data.Incidents[i];
        var detail = "<br/> <div class=\"row\"> <div class=\"col-xs-3\"> </div> <div class=\"detail\"" + " class=\"col-xs-6 text-left\">"
        + "<br/><strong>Incident Type : </strong>" + incident.IncidentType
        + "<br/><strong>Lines Affected : </strong>" + incident.LinesAffected
        + "<br/><strong>Description : </strong>" + incident.Description
        + "</div> <div class=\"col-xs-3\"> </div> </div>";
        $('#details').append(detail);
        }
        var message = "No, there are currently " + data.Incidents.length + " issue(s) on Metro.";
        updateStatusText(message);
        
        
      } else {
        updateStatusText("Yes, all trains appear to be running on time.");
      }
      })
    .fail(function() {
      console.log("Something went wrong...");
      updateStatusText("A problem occured while checking for incidents. Please try again later.");
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
