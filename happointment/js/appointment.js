$(function(){
	
	
	$("#newApptButn").click(function(){
		$("#formAddAppointment").show();
		$("#newApptButn").hide();
	})
	
	$("#cancelApptButn").click(function(){
		$("#newApptButn").show();
		$("#formAddAppointment").hide();

	})
	
	
	$("#addApptButn").click(validateForm)
	
	
$("#searchApptBut").click(getAppointments)
	
	
function getAppointments(){	
 $.ajax({
        type: 'POST',
        url: '/cgi-bin/cgi_happointment/searchAppointment.pl',
        dataType: 'json',
        data: {'searchQV':$("#searchAppointment").val()},
        success: function(data){

		var doc= getTableHeader();
					if(data.length==0){
						doc+='<h3>No Result Found</h3>';
					}
					
					for(var key in data){
						
						doc+=" <div class=\"row tablereacord\"> <div class=\"col-sm-4\"> "+data[key].appointmentDate+"</div>"+
								"<div class=\"col-sm-4\">  "+data[key].appointmentTime+" </div>"+
								" <div class=\"col-sm-4\"> "+data[key].appointmentDescription+"</div></div>"
						
						
						
										}
					 $('#searchResultDiv').html(doc);
				},
        error: function(){
            alert("Handle Errors here");
        },
        complete: function() {
        }
    });

}
	
	
	
	

function getTableHeader (){
	
var tableheader =" <div class=\"row tableheader\"> <div class=\"col-sm-4\"> <label >Date</label></div>"+
		"<div class=\"col-sm-4\">  <label>Time: </label> </div>"+
		" <div class=\"col-sm-4\"> <label>Description: </label></div></div>"
return tableheader
	}
	
	
function validateForm() {
    var inputDate = $("#dateAppointment").val();
    console.log(inputDate)  
    var dateInp = inputDate.substring(8, 10);
    var monthInp = inputDate.substring(5, 7);
    var yearInp = inputDate.substring(0, 4);
    var apptDate = new Date(yearInp, monthInp-1, dateInp);
    apptDate.setHours(0,0,0,0);
    console.log("userinput"+apptDate)
    
    var today = new Date();
    var currntHour=today.getHours();
    var currentMinuets=today.getMinutes();
    
   
    today.setHours(0,0,0,0);  
     console.log("system"+today)
    
    
      var inputTime = $("#timeAppointment").val();
     console.log("input time"+inputTime) 

   var hourInp = inputTime.substring(0, 2);
  var minutesInp = inputTime.substring(3, 5);

  
    if(apptDate < today)
    {
    	alert("Entered date is less than today's date ");
    	 return false;
    	}

if(hourInp < currntHour && apptDate == today )
{
	alert("Entered time is less than today's date ");
    	 return false;
    	}
    	
    	if(minutesInp < currentMinuets && hourInp == currntHour && apptDate == today )
{
	alert("Entered minets is less than today's date ");
    	 return false;
    	}
    	

}

})


