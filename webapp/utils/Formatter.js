sap.ui.define([

], function() {
	"use strict";
	return {
		getSpotColor: function(sType) {
			if (sType === "C") {
				return "Success";
			} else {
				return "Warning";
			}

		},
		getSpotStatusText: function(sType) {
			if (sType === "F") {
				return "Free";
			} else {
				return "Reserved";
			}
		},
		getSpotTypeText: function(sType) {
			if (sType === "C") {
				return "Charging";
			} else {
				return "Non-Charging";
			}
		}
	};
});