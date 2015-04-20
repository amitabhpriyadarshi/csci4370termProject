/**
 * Author: Derek Chi
 */

$(function() {

	$("#myAjaxRequestForm").submit(function(e) {
		e.preventDefault();
	});

	var allRentals = new Array();

	function Rent(id, pickDate, returnDate, totalRent, tax, confirmationNo,
			userID, class_, pickupLocID, returnLocID, gps, damageWaiver,
			insurance, roadsideAssistance, liabilityProtection) {
		this.id = id;
		this.pickDate = pickDate;
		this.returnDate = returnDate;
		this.totalRent = totalRent;
		this.tax = tax;
		this.confirmationNo = confirmationNo;
		this.userID = userID
		this.class_ = class_;
		this.pickupLocID = pickupLocID;
		this.returnLocID = returnLocID;
		this.gps = gps;
		this.damageWaiver = damageWaiver;
		this.insurance = insurance;
		this.roadsideAssistance = roadsideAssistance;
		this.liabilityProtection = liabilityProtection;
	}

	function loadInitData() {
		dataString = null;

		$.ajax({
			type : "POST",
			url : "RentService",
			dataType : 'json',
			data : dataString,
			cache : false,
			success : function(data, textStatus, xhr) {
				createDataList(data);

				$("#getAllRentals").html("");

				var listTableBody = $("#getAllRentals");
				listTableBody.empty();
				for (i = 0; i < allRentals.length; i++) {
					rent = allRentals[i];

					var row = $("<tr></tr>");
					var id = $("<td>" + rent.id + "</td>");
					var pickDate = $("<td>" + rent.pickDate + "</td>");
					var returnDate = $("<td>" + rent.returnDate + "</td>");
					var totalRent = $("<td>" + rent.totalRent + "</td>");
					var tax = $("<td>" + rent.tax + "</td>");
					var confirmationNo = $("<td>" + rent.confirmationNo + "</td>");
					var userID = $("<td>" + rent.userID + "</td>");
					var class_ = $("<td>" + rent.class_ + "</td>");
					var pickupLocID = $("<td>" + rent.pickupLocID + "</td>");
					var returnLocID = $("<td>" + rent.returnLocID + "</td>");
					var gps = $("<td>" + rent.gps + "</td>");
					var damageWaiver = $("<td>" + rent.damageWaiver + "</td>");
					var insurance = $("<td>" + rent.insurance + "</td>");
					var roadsideAssistance = $("<td>" + rent.roadsideAssistance + "</td>");
					var liabilityProtection = $("<td>" + rent.liabilityProtection + "</td>");

					id.appendTo(row);
					pickDate.appendTo(row);
					returnDate.appendTo(row);
					totalRent.appendTo(row);
					tax.appendTo(row);
					confirmationNo.appendTo(row);
					userID.appendTo(row);
					class_.appendTo(row);
					pickupLocID.appendTo(row);
					returnLocID.appendTo(row);
					gps.appendTo(row);
					damageWaiver.appendTo(row);
					insurance.appendTo(row);
					roadsideAssistance.appendTo(row);
					liabilityProtection.appendTo(row);

					row.appendTo(listTableBody);

				};

			},
			error : function(data, textStatus, errorThrown) {
				console.log(textStatus)
			}
		});
	}

	function createDataList(JsonObject) {
		allRentals.length = 0;
		$.each(JsonObject, function(key, object) {
			//console.log(object);
			var rental = new Rent(object.id, object.pickDate,
					object.returnDate, object.totalRent, object.tax,
					object.confirmationNo, object.userID, object.class_,
					object.pickupLocID, object.returnLocID, object.gps,
					object.damageWaiver, object.insurance,
					object.roadsideAssistance, object.liabilityProtection);
			allRentals.push(rental);
		});
	}

	$("#AllRentals").on('click', function() {
		$("#AboutDiv").hide();
		$("#RegisterDiv").hide();
		$("#HomeDiv").hide();
		$("#AllUserDiv").hide();
		$("#SearchUserDiv").hide();
		$("#InsertUserDiv").hide();
		$("#VehicleInfoDiv").hide();
		$("#LoginDiv").hide();
		$("#InsertVehicleDiv").hide();
		$("#AllVehicleDiv").hide();
		$("#AllRentalsDiv").show();
		$("#InsertRentalDiv").hide();

		loadInitData();
	})
});