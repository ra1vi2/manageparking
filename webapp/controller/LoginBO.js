sap.ui.define([
	"../utils/Utility",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/Fragment"
], function(Utility, JSONModel, Filter, FilterOperator, Fragment) {
	"use strict";
	return {
		loginUser: function(oModel, Odata) {
			var aFilter = [];
			aFilter.push(new Filter("Id", FilterOperator.EQ, Odata.userID));
			aFilter.push(new Filter("Password", FilterOperator.EQ, Odata.password));
			return this.readData(oModel, "/UserSet", {
				filters: aFilter
			});
		},
		submitData: function(oModel, sPath, aData) {
			return Utility.odataCreate(oModel, sPath, aData);
		},
		readData: function(oModel, sPath, aParameters) {
			return Utility.odataRead(oModel, sPath, aParameters);
		}
	};
});