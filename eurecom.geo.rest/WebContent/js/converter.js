/**
 * 
 */
var mode;
var utm;
function doConvert(m) {
	var xmlhttp;

	from = m;
	to = m + 1;
	if (from == 2) to = 1;
	
	var url = "./api/converter/";
	// Get url for system conversion
	// Define source system
	url += document.getElementById("system" + from).value;
	tmp = document.getElementById("project" + from);
	if (tmp.value != "None") {
		url += document.getElementById("project" + from).value;
	}
	// Define target system
	url += document.getElementById("system" + to).value;
	tmp = document.getElementById("project" + to);
	if (tmp.value != "None") {
		url += document.getElementById("project" + to).value;
		if (tmp.value == "UTM") {
			utm = 1;
		} else {
			utm = 0;
		}
	}
	else {
		utm = 0;
	}
	// Get input values
	url += "?";
	url += document.getElementById("s" + from + "coord1").getAttribute("value") + "=";
	url += document.getElementById("txts" + from + "coord1").value;
	url += "&";
	url += document.getElementById("s" + from + "coord2").getAttribute("value") + "=";
	url += document.getElementById("txts" + from + "coord2").value;
	
	//Get UTM extra parameters
	if (document.getElementById("project" + from).value == "UTM") {
		// Zone
		url += "&zone=";
		url += document.getElementById("txts" + from + "UTMzone").value;
		// Hemisphere
		url += "&hem=";
		tmp = document.getElementsByName("s" + from + "UTMhem");
		for (var i = 0, length = tmp.length; i < length; i++) {
		    if (tmp[i].checked) {
		        url += tmp[i].value;
		        break;
		    }
		}
	}
	
	//document.getElementById("url").innerHTML = url;
	
	url += "&mapview=1";
	
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4){
			if (xmlhttp.status == 200) {
		
				//cfunc(xmlhttp.responseText, xmlhttp.responseXML);
				str = xmlhttp.responseText;
				res = str.split(" ");
				document.getElementById("txts" + to + "coord1").value = res[0];
				document.getElementById("txts" + to + "coord2").value = res[1];
				if (utm == 1) {
					document.getElementById("txts" + to + "UTMzone").value = res[2];
					if (res[3] == "North" || res[3] == "N") {
						document.getElementById("s" + to + "UTMhemN").checked = true;
					} else {
						document.getElementById("s" + to + "UTMhemS").checked = true;
					}
					showOnMap(res[5], res[4]);
				}
				else {
					showOnMap(res[3], res[2]);
				}
				document.getElementById("error-log").innerHTML = "Attention: Done conversion.";
			} else {
				document.getElementById("error-log").innerHTML = "Error occured! Conversion system is not supported or wrong parameters.";
			}
		} else {
			//document.getElementById("error-log").innerHTML = "Error occured! Conversion system not support or wrong parameters.";
		}
	};
	
	/*if (method == "POST") {
	    xmlhttp.open("POST", url, true);
	    //Send the proper header information along with the request
	    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	    xmlhttp.setRequestHeader("Content-length", params.length);
	    xmlhttp.setRequestHeader("Connection", "close");
	    xmlhttp.send(params);
	}
	else {
	    xmlhttp.open("GET", url, true);
	    xmlhttp.send(null);
	}*/

	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function doConvert2(lat, lon, s) {
	var url = "./api/converter/WGS84";
	// Get url for system conversion
	// Define target system
	url += document.getElementById("system" + s).value;
	tmp = document.getElementById("project" + s);
	if (tmp.value != "None") {
		url += document.getElementById("project" + s).value;
		if (tmp.value == "UTM") {
			utm = 1;
		} else {
			utm = 0;
		}
	}
	else {
		utm = 0;
	}
	// Get input values
	url += "?";
	url += "lon=" + lon;
	url += "&lat=" + lat;
	
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4){
			if (xmlhttp.status == 200) {
		
				//cfunc(xmlhttp.responseText, xmlhttp.responseXML);
				str = xmlhttp.responseText;
				res = str.split(" ");
				document.getElementById("txts" + s + "coord1").value = res[0];
				document.getElementById("txts" + s + "coord2").value = res[1];
				if (utm == 1) {
					document.getElementById("txts" + s + "UTMzone").value = res[2];
					if (res[3] == "North" || res[3] == "N") {
						document.getElementById("s" + s + "UTMhemN").checked = true;
					} else {
						document.getElementById("s" + s + "UTMhemS").checked = true;
					}
				}
				document.getElementById("error-log").innerHTML = "System " + s + " is updated.";
			} else {
				document.getElementById("error-log").innerHTML = "Error occured! Cannot get the coordinates.";
			}
		} else {
			//document.getElementById("error-log").innerHTML = "Error occured! Conversion system not support or wrong parameters.";
		}
	};
	
	/*if (method == "POST") {
	    xmlhttp.open("POST", url, true);
	    //Send the proper header information along with the request
	    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	    xmlhttp.setRequestHeader("Content-length", params.length);
	    xmlhttp.setRequestHeader("Connection", "close");
	    xmlhttp.send(params);
	}
	else {
	    xmlhttp.open("GET", url, true);
	    xmlhttp.send(null);
	}*/

	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}

function showOnMap(lat, long) {
	/*if (marker) {
		pos = marker.getPosition();
		if (Math.round(pos.lat() * 100) / 100 != Math.round(lat * 100) / 100 && 
				Math.round(pos.lng() * 100) / 100 != Math.round(long * 100) / 100) {
			var latlng = new google.maps.LatLng(lat, long);
			marker.setPosition(latlng);
			map.panTo(latlng);
		}
	}*/
	
	var latlng = new google.maps.LatLng(lat, long);
	marker.setPosition(latlng);
	map.panTo(latlng);
}