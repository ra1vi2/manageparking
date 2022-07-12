sap.ui.define([
	"../utils/Utility",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment"
], function(Utility, JSONModel, Filter, FilterOperator, Fragment) {
	"use strict";
	return {
		getSpotList: function(oModel, Odata) {
			return this.readData(oModel, "/SpotSet");
		},
		createReservation:function(oModel, aData){
			return this.submitData(oModel, "/ReservationHeaderSet", aData);
		},
		submitData: function(oModel, sPath, aData) {
			return Utility.odataCreate(oModel, sPath, aData);
		},
		readData: function(oModel, sPath, aParameters) {
			return Utility.odataRead(oModel, sPath, aParameters);
		}
	};
});