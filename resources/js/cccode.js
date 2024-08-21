//let dropdown = $('#cc-dropdown');
var dropdown = $('#cc-dropdown');
var url_link =	document.referrer;
dropdown.empty();

//dropdown.append('<option selected="true" disabled>Choose State/Province</option>');
dropdown.prop('selectedIndex', 1);

//const urlcc = 'resources/js/ccode.json';
var urlcc = 'resources/js/ccode.json';

// Populate dropdown with list of provinces
var style = 'background:url(resources/images/bootstrap-formhelpers-countries.flags.png) no-repeat;background-position: -1564px 0;';
$.getJSON(urlcc, function (data) {
	 var country;
	  if(url_link.startsWith('https://www.y-axis.com') || url_link.startsWith('https://dashboard.findabilityplatform.com:5773/YaxisApplication/site.html') || url_link.startsWith('http://localhost:8080/YaxisApplication/site.html') || url_link.startsWith('https://muw.findabilityplatform.com/YaxisApplication-test/site.html')){
		  country = "India";
		  dropdown.append($('<option></option>').attr({'value':'91'}).text('IND(+'+'91'+')'));

	  }else if(url_link.startsWith('https://www.y-axis.com.au') || url_link.startsWith('https://dashboard.findabilityplatform.com:5773/YaxisApplication/yaxis_australia.html') || url_link.startsWith('http://localhost:8080/YaxisApplication/yaxis_australia.html') ){
		  country = "Australia";
		  dropdown.append($('<option></option>').attr({'value':'61'}).text('AUS(+'+'61'+')'));

	  }if(url_link.startsWith('https://www.y-axis.ae') || url_link.startsWith('https://dashboard.findabilityplatform.com:5773/YaxisApplication/yaxis_uae.html') || url_link.startsWith('http://localhost:8080/YaxisApplication/yaxis_uae.html')){
		  country = "United Arab Emirates";
		  dropdown.append($('<option></option>').attr({'value':'971'}).text('UAE(+'+'971'+')'));

	  }
	 
	
  $.each(data, function (key, entry) {
	 if(entry.Country != country ){
	 dropdown.append($('<option></option>').attr({'value':entry.Code}).text(entry.Short+' (+'+entry.Code+')'));
	 }
    //dropdown.append($('<option></option>').attr({'value':entry.Code,'class':'cc-flag-'+entry.Short,'style':style}).text(entry.Country));
  })
});