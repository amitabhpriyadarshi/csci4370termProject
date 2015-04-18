/**
 * Author: Derek Chi
 */

$(function() {

	var vehicleList = new Array();

	$("#myAjaxRequestForm").submit(function(e) {
		e.preventDefault();
	});

	function Vehicle(model, numberPlate) {
		this.model = model;
		this.numberPlate = numberPlate;
	}

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

	/*
	 * Need to get all the information for the different vehicles that can be
	 * rented.
	 */
	function loadInitData() {
		var dataString = null;
		$.ajax({
			type : "GET",
			url : "InsertRentService",
			dataType : "json",
			data : dataString,
			cache : false,
			success : function(data, textStatus, xhr) {
				console.log('Vehicle Data', data);

				createVehicleList(data);

				$("#vehicleInfo").html("");

				var vehicleInfoBody = $("#vehicleInfo");
				vehicleInfoBody.empty();

				for (i = 0; i < vehicleList.length; i++) {
					vehicle = vehicleList[i];

					var model = $("<option value=\"" + vehicle.model + "\">"
							+ vehicle.model + "</option>");

					model.appendTo(vehicleInfoBody);
				}
			},
			error : function(data, textStatus, errorThrown) {
				console.log(textStatus);
			}
		});
	}

	function createVehicleList(JsonObject) {
		vehicleList.length = 0;
		$.each(JsonObject, function(key, object) {
			var vehicle = new Vehicle(object.model, object.numberPlate);
			vehicleList.push(vehicle);
		});
	}

	/*
	 * Set up the date pickers
	 */
	$("#pickupDate").datepicker({ dateFormat : "yy-mm-dd" });
	$("#returnDate").datepicker({ dateFormat : "yy-mm-dd" });

	$("#insertRental").on('click', function() {
		dataString = $("#myAjaxRequestForm").serialize();

		var model = $("#vehicleInfo :selected").val();
		/*
		 * These variables are just stubs..
		 * TODO: fix these variables to match with database and give best type of data
		 */
		var pickdate = $("#pickupDate").val();
		var returnDate = $("#returnDate").val();
		var totalRent = 1024.12;
		var tax = totalRent * 0.07;
		var confirmationNo = generateConfirmationNo();
		
		$.ajax({
			type : "POST",
			url : "InsertRentService",
			dataType : 'json',
			data : {
				pickdate : pickdate,
				returnDate : returnDate,
				totalRent : totalRent,
				tax : tax,
				confirmationNo : confirmationNo
//				user_id : user_id,
//				vehicle_id : vehicle_id,
//				pickuploc_id : pickuploc_id,
//				returnloc_id : returnloc_id
			},
			cache : false,
			success : function(data, textStatus, xhr) {
				console.log(data);

			},
			error : function(data, textStatus, errorThrown) {
				console.log(textStatus)
			}
		});
	})

	function generateConfirmationNo() {
		var text = "";
		var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 10; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	$("#InsertRent").on('click', function() {
		$("#AllUserDiv").hide();
		$("#SearchUserDiv").hide();
		$("#InsertUserDiv").hide();
		$("#InsertRentalsDiv").show();
		$("#AllRentalsDiv").hide();

		loadInitData();
	})
})