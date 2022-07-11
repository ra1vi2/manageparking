sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"./ReservationBO",
	"sap/ui/model/json/JSONModel",
	"../utils/Formatter"
], function(Controller, History, BO, JSONModel, formatter) {
	"use strict";

	return Controller.extend("commanageparking.object.Reservation", {
		formatter: formatter,
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf commanageparking.object.view.Reservation
		 */
		onInit: function() {
			this.getOwnerComponent()
				.getRouter()
				.getRoute("detail")
				.attachPatternMatched(this._onPatternMatchedDetail, this);

		},
		_onPatternMatchedDetail: function() {
			this.getView().setModel(sap.ui.getCore().getModel("User"), "User");
			var userData = sap.ui.getCore().getModel("User").getData();
			this.getView().setModel(new JSONModel({}), "reservationDetails");
			if (userData.Type === "A") {
				this.byId("gridList").setMode("MultiSelect");
			} else {
				this.byId("gridList").setMode("SingleSelectMaster");
			}
			this.getSpotList();
		},
		onLogout: function() {
			var oModel = this.getView().getModel("User");
			oModel.setData(null);
			sap.ui.getCore().getModel("User").setData(null);
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getOwnerComponent()
					.getRouter()
					.navTo("RouteQuoteMain", {}, true);
			}
		},
		getSpotList: function() {
			var oModel = this.getView().getModel();
			BO.getSpotList(oModel)
				.then(function(oResponse) {
					this.getView().setModel(new JSONModel(oResponse.results), "spots");
				}.bind(this));
		},
		onSpotItemPress: function(oEvent) {
			this.byId("reservationdetailsform").setVisible(true);
            this.selectedSpots = oEvent.getSource(); // list. getSelectedItems
		}, 
		onPressReserve:function(){
			var userData = sap.ui.getCore().getModel("User").getData();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf commanageparking.object.view.Reservation
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf commanageparking.object.view.Reservation
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf commanageparking.object.view.Reservation
		 */
		//	onExit: function() {
		//
		//	}

	});

});