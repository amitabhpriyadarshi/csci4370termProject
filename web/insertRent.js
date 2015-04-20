/**
 * Author: Derek Chi
 */

$(function() {

	/*
	 * Variables to store calculation results and numbers
	 */
	var subTotal, total, days = 0, vehCost, taxRate = 0.07, tax = 0.00;
	/*
	 * Variables for the luxuries
	 */
	var gpsCost = 20.00, damageWaiverCost = 10.00, insuranceCost = 30.00;
	var roadsideAssistanceCost = 20.00, liabilityProtectionCost = 30.00;
	
	var vehicleClassList = new Array();
	var addressList = new Array();

	$("#myAjaxRequestForm").submit(function(e) {
		e.preventDefault();
	});

	function Address(id, street, city, state, country, zip){
		this.id = id;
		this.street = street;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zip = zip;
	}
	
	function VehicleClass(class_, cost, features) {
		this.class_ = class_;
		this.cost = cost;
		this.features = features;
	}

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

	/*
	 * Need to get all the information for the different vehicles that can be
	 * rented.
	 */
	function loadInitData() {
		var dataString1 = null;
		var dataString2 = null;
		$.ajax({
			type : "GET",
			url : "InsertRentService",
			dataType : "json",
			data : dataString1,
			cache : false,
			success : function(data, textStatus, xhr) {

				createVehicleClassList(data);

				$("#vehicleInfo").html("");

				var vehicleInfoBody = $("#vehicleInfo");
				vehicleInfoBody.empty();

				for (i = 0; i < vehicleClassList.length; i++) {
					vehicleClass = vehicleClassList[i];

					var class_ = $("<option value=\"" + vehicleClass.class_ + "\">"
							+ vehicleClass.class_ + "</option>");

					class_.appendTo(vehicleInfoBody);
					
					$("#RentCarCostPerDay").text("$"+vehicleClassList[i].cost+"\/day");
					vehCost = vehicleClassList[i].cost;
				}
			},
			error : function(data, textStatus, errorThrown) {
				console.log(textStatus);
			}
		});
		$.ajax({
			type : "GET",
			url : "AddressService",
			dataType : "json",
			data : dataString2,
			cache : false,
			success : function(data, textStatus, xhr) {

				createAddressList(data);

				$("#RentCarPickUpLoc").html("");
				$("#RentCarReturnLoc").html("");

				var RentCarPickUpLocBody = $("#RentCarPickUpLoc");
				var RentCarReturnLocBody = $("#RentCarReturnLoc");
				RentCarPickUpLocBody.empty();
				RentCarReturnLocBody.empty();

				for (i = 0; i < addressList.length; i++) {
					address = addressList[i];

					var id1 = $("<option value=\"" + address.id + "\">"
							+ address.id + "</option>");
					var id2 = $("<option value=\"" + address.id + "\">"
							+ address.id + "</option>");
					
					id1.appendTo(RentCarPickUpLocBody);
					id2.appendTo(RentCarReturnLocBody);
				}
			},
			error : function(data, textStatus, errorThrown) {
				console.log(textStatus);
			}
		});
	}
	
	function createVehicleClassList(JsonObject) {
		vehicleClassList.length = 0;
		$.each(JsonObject, function(key, object) {
			var vehicleClass = new VehicleClass(object.class_, object.cost, object.features);
			vehicleClassList.push(vehicleClass);
		});
	}

	function createAddressList(JsonObject){
		addressList.length = 0;
		$.each(JsonObject, function(key, object){
			var address = new Address(object.id, object.street, object.city,
					object.state, object.country, object.zip);
			addressList.push(address);
		})
	}
	
	function generateConfirmationNo() {
		var text = "";
		var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 10; i++){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	/*
	 * Set up the date pickers
	 */
	$("#RentCarPickDate").datepicker({ dateFormat : "yy-mm-dd" });
	$("#RentCarReturnDate").datepicker({ dateFormat : "yy-mm-dd" });

	/*
	 * Attach click event to selected options for the vehicle classes
	 */
	$("#vehicleInfo").on('change', function(){
		var class_ = $(this).val();
		for(i = 0; i < vehicleClassList.length; i++){
			if(class_ == vehicleClassList[i].class_){
				$("#RentCarCostPerDay").text("$"+vehicleClassList[i].cost+"\/day");
				vehCost = vehicleClassList[i].cost;
				calculateSubTotal();
			}
		}
	})
	
	$("#RentCarBtn").on('click', function() {
		dataString = $("#myAjaxRequestForm").serialize();

		/*
		 * These variables are just stubs..
		 * TODO: fix these variables to match with database and give best type of data
		 */
		var pickDate = $("#RentCarPickDate").val();
		var returnDate = $("#RentCarReturnDate").val();
		var totalRent = total;
		var tax = tax;
		var confirmationNo = generateConfirmationNo();
		//TODO: get the actual userID
		var userID = "chi";
		var class_ = $("#vehicleInfo :selected").val();
		var pickupLocID;
		var returnLocID;
		var gps = isChecked($("#RentCarGps").is(":checked"));
		var damageWaiver = isChecked($("#RentCarDamageWaiver").is(":checked"));
		var insurance = isChecked($("#RentCarInsurance").is(":checked"));
		var roadsideAssistance = isChecked($("#RentCarRoadsideAssistance").is(":checked"));
		var liabilityProtection = isChecked($("#RentCarLiabilityProtection").is(":checked"));
		
		$.ajax({
			type : "POST",
			//TODO: UNCOMMENT THE SERVICE
			//url : "InsertRentService",
			url: "",
			dataType : 'json',
			data : {
				pickDate : pickDate,
				returnDate : returnDate,
				totalRent : totalRent,
				tax : tax,
				confirmationNo : confirmationNo,
				userID : userID,
				class_ : class_,
				pickupLocID : pickupLocID,
				returnLocID : returnLocID,
				gps : gps,
				damageWaiver : damageWaiver,
				insurance : insurance,
				roadsideAssistance : roadsideAssistance,
				liabilityProtection : liabilityProtection
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

	/*
	 * Get the numbers of days on the change of either datepicker
	 */
	$("#RentCarPickDate").on('change', function(){
		if(!$("#RentCarReturnDate").datepicker('getDate')){
			console.log('return date empty');
		}else{
			days = getNumOfDays($("#RentCarPickDate").datepicker('getDate'), $("#RentCarReturnDate").datepicker('getDate'));
			calculateSubTotal();
		}
	})
	$("#RentCarReturnDate").on('change', function(){
		if(!$("#RentCarPickDate").datepicker('getDate')){
			console.log('pick date empty');
		}else{
			days = getNumOfDays($("#RentCarPickDate").datepicker('getDate'), $("#RentCarReturnDate").datepicker('getDate'));
			calculateSubTotal();	
		}
	})
	
	/*
	 * Return yes or no whether the checkbox is checked or not
	 */
	function isChecked(valOfIDObject){
		if(valOfIDObject){
			return 'yes';
		}else{
			return 'no';
		}
	}
	
	/*
	 * Function to calcualte number of days being rented
	 */
	function getNumOfDays(start, end){
		var startDay = start.getTime();
		var endDay = end.getTime();
		var minutes = 1000 * 60;
		var hours = minutes * 60;
		var days = hours * 24;
		
		var diff = Math.abs(startDay - endDay);
		
		return diff/days;
	}
	
	/*
	 * Individual events for the checkboxes
	 */
	$("#RentCarGps").on('change', function(){
		calculateSubTotal();
	})
	$("#RentCarDamageWaiver").on('change', function(){
		calculateSubTotal();
	})
	$("#RentCarInsurance").on('change', function(){
		calculateSubTotal();
	})
	$("#RentCarRoadsideAssistance").on('change', function(){
		calculateSubTotal();
	})
	$("#RentCarLiabilityProtection").on('change', function(){
		calculateSubTotal();
	})
	
	function calculateLuxuries(){
		luxuryCost = 0.00;
		if($("#RentCarGps").is(":checked")){
			luxuryCost += gpsCost;
		}
		if($("#RentCarDamageWaiver").is(":checked")){
			luxuryCost += damageWaiverCost;
		}
		if($("#RentCarInsurance").is(":checked")){
			luxuryCost += insuranceCost;
		}
		if($("#RentCarRoadsideAssistance").is(":checked")){
			luxuryCost += roadsideAssistanceCost;
		}
		if($("#RentCarLiabilityProtection").is(":checked")){
			luxuryCost += liabilityProtectionCost;
		}	
		return luxuryCost;
	}
	
	function calculateSubTotal(){
		subTotal = days * vehCost + calculateLuxuries();
		$("#RentCarSubTotal").text("SubTotal: $" + subTotal);
		calculateTax();
		calculateTotal();
	}
	
	function calculateTax(){
		tax = subTotal * taxRate;
		$("#RentCarTax").text("Tax: $" + tax.toFixed(2));
	}
	
	function calculateTotal(){
		total = tax * subTotal;
		$("#RentCarTotal").text("Total: $" + total.toFixed(2));
	}
	
	$("#InsertRental").on('click', function() {
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
		$("#AllRentalsDiv").hide();
		$("#InsertRentalDiv").show();

		loadInitData();
	})
})