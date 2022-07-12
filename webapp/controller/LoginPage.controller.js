sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"./LoginBO"
], function(Controller, JSONModel, BO) {
	"use strict";

	return Controller.extend("commanageparking.controller.LoginPage", {
		onInit: function() {
			this.getView().setModel(new JSONModel({}), "login");
		},
		onUserLogin: function() {
			var oData = this.getView().getModel("login").getData();
			var oModel = this.getView().getModel();
			var that = this;
			BO.loginUser(oModel, oData)
				.then(function(oResponse) {
					//navigate to
					sap.ui.getCore().setModel(new JSONModel(oResponse.results[0]), "User");
					that.getOwnerComponent().getRouter().navTo("reservation");
				})
				.fail(function(oError) {
					sap.m.MessageBox.error(JSON.parse(oError.responseText).error.message.value);
				});
		}

	});
});