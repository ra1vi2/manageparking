sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"../utils/Utility"
], function(Controller, History, JSONModel, Utility) {
	"use strict";

	return Controller.extend("commanageparking.history.controller.ReservationHistory", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf commanageparking.object.view.ReservationHistory
		 */
		onInit: function() {
			this.getOwnerComponent()
				.getRouter()
				.getRoute("history")
				.attachPatternMatched(this._onPatternMatchedDetail, this);

		},
		_onPatternMatchedDetail: function() {
			this.getView().setModel(sap.ui.getCore().getModel("User"), "User");
			var userData = sap.ui.getCore().getModel("User").getData();

			if (userData.Type === "A") {
				this.readData(this.getView().getModel(), "/ReservationSet")
					.then(function(oResponse) {
						this.getView().setModel(new JSONModel(oResponse.results), "history");
					}.bind(this))
					.fail(function() {
						sap.m.MessageToast.show("Error");
					});

			} else {
				sap.m.MessageToast.show("You are NOT authorized for this page!");
			}
			this.getSpotList();
		},
		readData: function(oModel, sPath, aParameters) {
			return Utility.odataRead(oModel, sPath, aParameters);
		},
		onNavBack: function() {
				var oModel = this.getView().getModel("User");
				oModel.setData(null);
				sap.ui.getCore().getModel("User").setData(null);
				var sPreviousHash = History.getInstance().getPreviousHash();

				if (sPreviousHash !== undefined) {
					history.go(-1);
				} else {
					this.getOwnerComponent()
						.getRouter()
						.navTo("reservation", {}, true);
				}
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf commanageparking.object.view.ReservationHistory
			 */
			//	onBeforeRendering: function() {
			//
			//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf commanageparking.object.view.ReservationHistory
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf commanageparking.object.view.ReservationHistory
		 */
		//	onExit: function() {
		//
		//	}

	});

});