/**
 * 
 */
var mode;
var utm;
function convert(m) {
	var xmlhttp;

	mode = m;
	
	var url = "./api/converter/";;
	// Get url for
	// Convert system 1 to system 2
	if (mode == 1) {
		// Define source system
		url += document.getElementById("system1").value;
		tmp = document.getElementById("project1");
		if (tmp.value != "None") {
			url += document.getElementById("project1").value;
		}
		// Define target system
		url += document.getElementById("system2").value;
		tmp = document.getElementById("project2");
		if (tmp.value != "None") {
			url += document.getElementById("project2").value;
			if (tmp.value == "UTM") {
				utm = 1;
			} else {
				utm = 0;
			}
		}
		// Get input values
		url += "?";
		url += document.getElementById("s1coord1").getAttribute("value") + "=";
		url += document.getElementById("txts1coord1").value;
		url += "&";
		url += document.getElementById("s1coord2").getAttribute("value") + "=";
		url += document.getElementById("txts1coord2").value;
		
		//Get UTM extra parameters
		if (document.getElementById("project1").value == "UTM") {
			// Zone
			url += "&zone=";
			url += document.getElementById("txts1UTMzone").value;
			// Hemisphere
			url += "&hem=";
			tmp = document.getElementsByName("s1UTMhem");
			for (var i = 0, length = tmp.length; i < length; i++) {
			    if (tmp[i].checked) {
			        url += tmp[i].value;
			        break;
			    }
			}
		}
	// Convert system 2 to system 1
	} else if (mode == 2) {
		// Define source system
		url += document.getElementById("system2").value;
		tmp = document.getElementById("project2");
		if (tmp.value != "None") {
			url += document.getElementById("project2").value;
		}
		// Define target system
		url += document.getElementById("system1").value;
		tmp = document.getElementById("project1");
		if (tmp.value != "None") {
			url += document.getElementById("project1").value;
			if (tmp.value == "UTM") {
				utm = 1;
			} else {
				utm = 0;
			}
		}
		// Get input values
		url += "?";
		url += document.getElementById("s2coord1").getAttribute("value") + "=";
		url += document.getElementById("txts2coord1").value;
		url += "&";
		url += document.getElementById("s2coord2").getAttribute("value") + "=";
		url += document.getElementById("txts2coord2").value;
		
		//Get UTM extra parameters
		if (document.getElementById("project2").value == "UTM") {
			// Zone
			url += "&zone=";
			url += document.getElementById("txts2UTMzone").value;
			// Hemisphere
			url += "&hem=";
			tmp = document.getElementsByName("s2UTMhem");
			for (var i = 0, length = tmp.length; i < length; i++) {
			    if (tmp[i].checked) {
			        url += tmp[i].value;
			        break;
			    }
			}
		}
	}
	
	document.getElementById("url").innerHTML = url;
	
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//cfunc(xmlhttp.responseText, xmlhttp.responseXML);
			str = xmlhttp.responseText;
			res = str.split(" ");
			if (mode == 1) {
				document.getElementById("txts2coord1").value = res[0];
				document.getElementById("txts2coord2").value = res[1];
				if (utm == 1) {
					document.getElementById("txts2UTMzone").value = res[2];
					if (res[3] == "North" || res[3] == "N") {
						document.getElementById("s2UTMhemN").checked = true;
					} else {
						document.getElementById("s2UTMhemS").checked = true;
					}
				}
			} else if (mode == 2) {
				document.getElementById("txts1coord1").value = res[0];
				document.getElementById("txts1coord2").value = res[1];
				if (utm == 1) {
					document.getElementById("txts1UTMzone").value = res[2];
					hem = res[3];
					if (res[3] == "North" || res[3] == "N") {
						document.getElementById("s1UTMhemN").checked = true;
					} else {
						document.getElementById("s1UTMhemS").checked = true;
					}
				}
			}
		} else {
			//document.getElementById("error-log").innerHTML = "Error occur! Conversion system not support or wrong parameters.";
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