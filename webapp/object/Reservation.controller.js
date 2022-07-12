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
				.getRoute("reservation")
				.attachPatternMatched(this._onPatternMatchedDetail, this);

		},
		_onPatternMatchedDetail: function() {
			this.getView().setModel(sap.ui.getCore().getModel("User"), "User");
			var userData = sap.ui.getCore().getModel("User").getData();
			this.getView().setModel(new JSONModel({}), "reservationDetails");
			if (userData.Type === "A") {
				this.byId("gridList").setMode("MultiSelect");
				this.byId("idReservationHistoryBtn").setVisible(true);
			} else {
				this.byId("gridList").setMode("SingleSelectMaster");
				this.byId("idReservationHistoryBtn").setVisible(false);
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
		onGridSelectionChange: function(oEvent) {

		},
		onPressReservationHistory: function() {
			this.getOwnerComponent().getRouter().navTo("history");
		},
		onPressReserve: function() {
			var userData = sap.ui.getCore().getModel("User").getData();
			var items = this.byId("gridList").getSelectedItems();

			var resData = this.getView().getModel("reservationDetails").getData();

			//concatenate current date, time and created by userid.
			// looking at reservation id will give the idea of who and when reservation was created
			var d = new Date();
			var reservationID = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString() +
				d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString() + resData.UserID;

			var aPayload = {
				UserId: userData.Id,
				ReservationId: reservationID,
				Reservations: []
			};

			items.forEach(function(item) {
				var oContext = item.getBindingContext("spots");
				var sPath = oContext.getPath();
				var selectedObject = oContext.getModel().getObject(sPath);

				var reserv = {
					ReservationId: reservationID,
					SpotId: selectedObject.SpotId,
					ReservationCommetns: selectedObject.ReservationComments,
					StartTime: resData.StartTime,
					EndTime: resData.EndTime,
					StartDate: resData.StartDate,
					EndDate: resData.EndDate,
					Status: 'R',
					Type: selectedObject.Type,
					ReservationType: userData.Type
				};
				aPayload.Reservations.push(reserv);
			});
			BO.createReservation(this.getView().getModel(), aPayload)
				.then(function(oResponse) {
					sap.m.MessageToast.show("Reservation Created Successfully");
					this._onPatternMatchedDetail();
				}.bind(this))
				.fail(function(oError) {
					sap.m.MessageBox.error(JSON.parse(oError.responseText).error.message.value);
				});
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