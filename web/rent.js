/**
 * Author: Derek Chi
 */

$(function() {

	$("#myAjaxRequestForm").submit(function(e) {
		e.preventDefault();
	});

	var allRentals = new Array();

	function Rent(id, pickupdate, returnDate, totalRent, tax, confirmationNo,
			user_id, vehicle_id, pickuploc_id, returnloc_id) {
		this.id = id;
		this.pickupdate = pickupdate;
		this.returnDate = returnDate;
		this.totalRent = totalRent;
		this.tax = tax;
		this.confirmationNo = confirmationNo;
		this.user_id = user_id;
		this.vehicle_id = vehicle_id;
		this.pickuploc_id = pickuploc_id;
		this.returnloc_id = returnloc_id;
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
					var pickupdate = $("<td>" + rent.pickupdate + "</td>");
					var returndate = $("<td>" + rent.returnDate + "</td>");
					var totalRent = $("<td>" + rent.totalRent + "</td>");
					var tax = $("<td>" + rent.tax + "</td>");
					var confirmationNo = $("<td>" + rent.confirmationNo + "</td>");
					var user_id = $("<td>" + rent.user_id + "</td>");
					var vehicle_id = $("<td>" + rent.vehicle_id + "</td>");
					var pickuploc_id = $("<td>" + rent.pickuploc_id + "</td>");
					var returnloc_id = $("<td>" + rent.returnloc_id + "</td>");

					id.appendTo(row);
					pickupdate.appendTo(row);
					returndate.appendTo(row);
					totalRent.appendTo(row);
					tax.appendTo(row);
					confirmationNo.appendTo(row);
					user_id.appendTo(row);
					vehicle_id.appendTo(row);
					pickuploc_id.appendTo(row);
					returnloc_id.appendTo(row);

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
			console.log(object);
			var rental = new Rent(object.id, object.pickdate,
					object.returnDate, object.totalRent, object.tax,
					object.confirmationNo, object.user_id, object.vehicle_id,
					object.pickuploc_id, object.returnloc_id);
			allRentals.push(rental);
		});
	}

	$("#AllRent").on('click', function() {
		/*
		 * Show hide whatever divs
		 */
		$("#AllUserDiv").hide();
		$("#SearchUserDiv").hide();
		$("#InsertUserDiv").hide();
		$("#InsertRentalsDiv").hide();
		$("#AllRentalsDiv").show();
		
		loadInitData();
	})
});