/**
 * Author: Derek Chi
 */

$(function() {

	/*
	 * Variables to store calculation results and numbers
	 */
	var subTotal = 0.00, total = 0.00, days = 0, vehCost, taxRate = 0.07, taxDisplay = 0.00;
	/*
	 * Variables for the luxuries
	 */
	var gpsCost = 20.00, damageWaiverCost = 10.00, insuranceCost = 30.00;
	var roadsideAssistanceCost = 20.00, liabilityProtectionCost = 30.00;
	
	var vehicleClassList = new Array();
	var addressList = new Array();
	var addressStateList = new Array();
	
	var pickUpLocSelectedState, returnLocSelectedState;
	
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

				$("#RentCarPickUpLocState").html("");
				$("#RentCarReturnLocState").html("");

				var RentCarPickUpLocBody = $("#RentCarPickUpLocState");
				var RentCarReturnLocBody = $("#RentCarReturnLocState");
				
				RentCarPickUpLocBody.empty();
				RentCarReturnLocBody.empty();

				for (i = 0; i < addressList.length; i++) {
					address = addressList[i];
					
					//If the state isn't in the arrayList already
					if(!($.inArray(address.state, addressStateList) > -1)){
						addressStateList.push(address.state);
					}
				}
				for(i = 0; i < addressStateList.length; i++){
					addressState = addressStateList[i];
					
					var state1 = $("<option value=\"" + addressState + "\">"
							+ addressState + "</option>");
					var state2 = $("<option value=\"" + addressState + "\">"
							+ addressState + "</option>");
					
					state1.appendTo(RentCarPickUpLocBody);
					state2.appendTo(RentCarReturnLocBody);					
				}
				pickUpLocSelectedState = addressStateList[0];
				returnLocSelectedState = addressStateList[0];
				populateAddressPickUpOptions();
				populateAddressReturnOptions();
			},
			error : function(data, textStatus, errorThrown) {
				console.log(textStatus);
			}
		});
	}

	function getAddressID(selectedState, selectedAddress){
		for(i = 0; i < addressList.length; i++){
			if(addressList[i].state == selectedState){
				if(addressList[i].street == selectedAddress){
					return addressList[i].id;
				}
			}
		}
	}
	
	$("#RentCarPickUpLocAddress").html("");
	$("#RentCarReturnLocAddress").html("");
	var RentCarPickUpAddressBody = $("#RentCarPickUpLocAddress");
	var RentCarReturnAddressBody = $("#RentCarReturnLocAddress");

	function populateAddressPickUpOptions(){
		for(i = 0; i < addressList.length; i++){
			if(addressList[i].state == pickUpLocSelectedState){
				
				var address = $("<option value=\"" + addressList[i].street + "\">"
						+ addressList[i].city + ":	" + addressList[i].street + "</option>");
				
				address.appendTo(RentCarPickUpAddressBody);
			}else{
				console.log('selectedState', pickUpLocSelectedState);
			}
		}
	}
	
	function populateAddressReturnOptions(){
		console.log(returnLocSelectedState);
		for(i = 0; i < addressList.length; i++){
			if(addressList[i].state == returnLocSelectedState){
				
				var address = $("<option value=\"" + addressList[i].street + "\">"
						+ addressList[i].city + ":	" + addressList[i].street + "</option>");
				
				address.appendTo(RentCarReturnAddressBody);
			}else{
				console.log('selectedState', returnLocSelectedState);
			}
		}
	}
	
	$("#RentCarPickUpLocState").on('change', function(){
		pickUpLocSelectedState = $(this).val();
		$("#RentCarPickUpLocAddress").html("");
		
		RentCarPickUpAddressBody = $("#RentCarPickUpLocAddress");
		
		RentCarPickUpAddressBody.empty();
		
		populateAddressPickUpOptions();
	})
	
	$("#RentCarReturnLocState").on('change', function(){
		returnLocSelectedState = $(this).val();
		$("#RentCarReturnLocAddress").html("");
		
		RentCarReturnAddressBody = $("#RentCarReturnLocAddress");
		
		RentCarReturnAddressBody.empty();
		
		populateAddressReturnOptions();
	})
	
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
		var tax = taxDisplay;
		var confirmationNo = generateConfirmationNo();
		//TODO: get the actual userID
		var userID = "dchi";
		var class_ = $("#vehicleInfo :selected").val();
		var pickupLocID = getAddressID(pickUpLocSelectedState, $("#RentCarPickUpLocAddress :selected").val()); 
		var returnLocID = getAddressID(returnLocSelectedState, $("#RentCarReturnLocAddress :selected").val());
		var gps = isChecked($("#RentCarGps").is(":checked"));
		var damageWaiver = isChecked($("#RentCarDamageWaiver").is(":checked"));
		var insurance = isChecked($("#RentCarInsurance").is(":checked"));
		var roadsideAssistance = isChecked($("#RentCarRoadsideAssistance").is(":checked"));
		var liabilityProtection = isChecked($("#RentCarLiabilityProtection").is(":checked"));

		$.ajax({
			type : "POST",
			url : "InsertRentService",
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
			luxuryCost = luxuryCost +  gpsCost;
		}
		if($("#RentCarDamageWaiver").is(":checked")){
			luxuryCost = luxuryCost + damageWaiverCost;
		}
		if($("#RentCarInsurance").is(":checked")){
			luxuryCost = luxuryCost + insuranceCost;
		}
		if($("#RentCarRoadsideAssistance").is(":checked")){
			luxuryCost = luxuryCost + roadsideAssistanceCost;
		}
		if($("#RentCarLiabilityProtection").is(":checked")){
			luxuryCost = luxuryCost + liabilityProtectionCost;
		}	
		return luxuryCost;
	}
	
	function calculateSubTotal(){
		subTotal = days * vehCost + calculateLuxuries();
		subTotal = subTotal.toFixed(2);
		$("#RentCarSubTotal").text("SubTotal: $" + subTotal);
		calculateTax();
		calculateTotal();
	}
	
	function calculateTax(){
		taxDisplay = subTotal * taxRate;
		taxDisplay = taxDisplay.toFixed(2);
		$("#RentCarTax").text("Tax: $" + taxDisplay);
	}
	
	function calculateTotal(){
		total = parseFloat(subTotal) + parseFloat(taxDisplay);
		total = total.toFixed(2);
		$("#RentCarTotal").text("Total: $" + total);
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