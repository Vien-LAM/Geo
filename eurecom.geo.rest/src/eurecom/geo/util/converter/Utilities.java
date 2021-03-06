package eurecom.geo.util.converter;

import javax.json.Json;
//import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonValue;
import javax.json.JsonWriter;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Utilities {

	// Algorithm 1
	/*
	 * Calculate Isometric Latitude
	 * 
	 * @param lat: Latitude coordinate
	 * 
	 * @param e: The eccentricity of the ellipsoid
	 * 
	 * @return isometric latitude
	 */
	public static double calculateIsometricLatitude(double lat, double e) {
		double t = Math.tan((Math.PI / 4) + (lat / 2));
		t = t * Math.pow((1 - e * Math.sin(lat)) / (1 + e * Math.sin(lat)),	e / 2);

		return Math.log(t);
	}

	// Algorithm 2
	/*
		 * */
	public static double calculateLatitudeFromIsoLat(double isolat, double e, double tol) {
		double phi_p = 2 * Math.atan(Math.exp(isolat)) - (Math.PI / 2);
		double phi_c = 0;
		do {
			phi_c = 2 * Math.atan(Math.pow((1 + e * Math.sin(phi_p)) / (1 - e * Math.sin(phi_p)), e / 2) * Math.exp(isolat)) - (Math.PI / 2);
			if (Math.abs(phi_c - phi_p) > tol) {
				phi_p = phi_c;
			} else {
				break;
			}
		} while (true);
		return phi_c;
	}
	
	/* Build JSON format string of 1 location
	 * @ param params: List of coordinates
	 * @ return JSON format string of coordinates
	 * */
	public static String locationToJSON(HashMap<String, Object> params) {
		String result = "";
		
		// Model of JSON object
		JsonObject model;
		// Builder for JSON object
		JsonObjectBuilder builder = Json.createObjectBuilder();
		// Traverse through the list of params
		for (Map.Entry<String, Object> entry : params.entrySet()) {
			// For each entry get the class name of the value
			String className = entry.getValue().getClass().getName();
			String[] spli = className.split("\\.");
			className = spli[spli.length - 1];
			
			// Based on which class the value belong to,
			// add an entry to the builder
			switch (className) {
				case "Double":
					builder.add(entry.getKey(), (Double) entry.getValue());
					break;
				case "Integer":
					builder.add(entry.getKey(), (Integer) entry.getValue());
					break;
				case "Long":
					builder.add(entry.getKey(), (Long) entry.getValue());
					break;
				case "String":
					builder.add(entry.getKey(), (String) entry.getValue());
					break;
				case "JsonValue":
					builder.add(entry.getKey(), (JsonValue) entry.getValue());
					break;
				default:
					builder.add(entry.getKey(), entry.getValue().toString());
					break;
			}
		}
		
		// Build JSON object model from builder
		model = builder.build();
		
		// Get a string stream writer
		StringWriter stWriter = new StringWriter();
		// Get a JSON writer to write JSON object model onto string stream writer
		JsonWriter jsonWriter = Json.createWriter(stWriter);
		jsonWriter.writeObject(model);
		jsonWriter.close();

		// Write JSON format string stream to result
		result = stWriter.toString();
		
		return result;
	}
	
	/* Build JSON format string of several locations
	 * @ param params: List of coordinates
	 * @ return JSON format string of coordinates
	 * */
	public static String locationsToJSON(ArrayList<HashMap<String, Object>> params) {
		String result = "";
		int count = 1;
		// Model of JSON object
		JsonObject model;
		// Builder for JSON object
		JsonObjectBuilder builder = Json.createObjectBuilder();
		// Traverse through the list of locations
		for (HashMap<String, Object> location : params) {
			// Create another JSON Object builder for each location
			JsonObjectBuilder lBuilder = Json.createObjectBuilder();
			// Traverse through each coordinate detail of the location
			for (Map.Entry<String, Object> entry : location.entrySet()) {
				// For each entry get the class name of the value
				String className = entry.getValue().getClass().getName();
				String[] spli = className.split("\\.");
				className = spli[spli.length - 1];
				
				// Based on which class the value belong to,
				// add an entry to the builder
				switch (className) {
					case "Double":
						lBuilder.add(entry.getKey(), (Double) entry.getValue());
						break;
					case "Integer":
						lBuilder.add(entry.getKey(), (Integer) entry.getValue());
						break;
					case "Long":
						lBuilder.add(entry.getKey(), (Long) entry.getValue());
						break;
					case "String":
						lBuilder.add(entry.getKey(), (String) entry.getValue());
						break;
					case "JsonValue":
						lBuilder.add(entry.getKey(), (JsonValue) entry.getValue());
						break;
					default:
						lBuilder.add(entry.getKey(), entry.getValue().toString());
						break;
				}
			}
			builder.add("point" + Integer.toString(count++), lBuilder);
		}
		
		// Build JSON object model from builder
		model = builder.build();
		
		// Get a string stream writer
		StringWriter stWriter = new StringWriter();
		// Get a JSON writer to write JSON object model onto string stream writer
		JsonWriter jsonWriter = Json.createWriter(stWriter);
		jsonWriter.writeObject(model);
		jsonWriter.close();

		// Write JSON format string stream to result
		result = stWriter.toString();
		
		return result;
	}
}
