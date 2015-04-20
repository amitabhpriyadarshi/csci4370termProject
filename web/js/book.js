/**
 * 
 */
$(function(){
	
	var bookList = new Array();
	var addressList = new Array();
	
	var pickUpStreet, pickUpCity, pickUpState;
	var returnStreet, returnCity, returnState;
	
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
	
	function Address(id, street, city, state, country, zip){
		this.id = id;
		this.street = street;
		this.city = city;
		this.state = state;
		this.country = country;
		this.zip = zip;
	}
	
	function createDataList(JsonObject) {
		bookList.length = 0;
		$.each(JsonObject, function(key, object) {
			var book = new Rent(object.id, object.pickDate,
					object.returnDate, object.totalRent, object.tax,
					object.confirmationNo, object.userID, object.class_,
					object.pickupLocID, object.returnLocID, object.gps,
					object.damageWaiver, object.insurance,
					object.roadsideAssistance, object.liabilityProtection);
			bookList.push(book);
		});
	}
	
	//Source: http://viralpatel.net/blogs/jquery-trigger-custom-event-show-hide-element/
	$.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
          this.trigger(ev);
          return el.apply(this, arguments);
        };
      });
	
	function createAddressList(JsonObject){
		addressList.length = 0;
		$.each(JsonObject, function(key, object) {
			var address = new Address(object.id, object.street, object.city, 
					object.state, object.country, object.zip);
			addressList.push(address);
		});
	}
	
	$("#BookDiv").on('show', function(){
		var addressData = null;
		
		$.ajax({
			type : "GET",
			url : "BookService",
			dataType : "json",
			data : addressData,
			cache : false,
			success : function(data, textStatus, xhr) {
				createAddressList(data);
				var dataString = {
						userID : globalUser.userID
				};
				
				$.ajax({
					type : "POST",
					url : "BookService",
					dataType : 'json',
					data : dataString,
					cache : false,
					success : function(data, textStatus, xhr) {
						
						createDataList(data);
						
						$("#BookBody").html("");
						var bookBody = $("#BookBody");
						bookBody.empty();
						
						//VAR I !!
						for(var i = 0; i < bookList.length; i++){
							var pickUpAddress = getPickUpAddress(bookList[i].pickupLocID);
							var returnAddress = getPickUpAddress(bookList[i].returnLocID);
							
							var confirmationNo = $("<tr><td>ConfirmationNo: </td>" +
									"<td><h2>" + bookList[i].confirmationNo + "</h2></td></tr>");
							var userID = $("<tr><td>userID: </td>" +
									"<td>" + bookList[i].userID + "</td></tr>");
							var pickDate = $("<tr><td>Pick-up Date: </td>" +
									"<td>" + bookList[i].pickDate + "</td></tr>");
							var returnDate = $("<tr><td>Return Date: </td>" +
									"<td>" + bookList[i].returnDate + "</td></tr>");
							var pickAddress = $("<tr><td>Pick-up Address: </td>" +
									"<td>" + pickUpAddress + "</td></tr>");
							var returnAdd = $("<tr><td>Return Address: </td>" +
									"<td>" + returnAddress + "</td></tr>");
							var gps = $("<tr><td>GPS: </td>" +
									"<td>" + bookList[i].gps + "</td></tr>");
							var damageWaiver = $("<tr><td>Damage Waiver: </td>" +
									"<td>" + bookList[i].damageWaiver + "</td></tr>");
							var insurance = $("<tr><td>Insurance: </td>" +
									"<td>" + bookList[i].insurance + "</td></tr>");
							var roadsideAssistance = $("<tr><td>Roadside Assistance: </td>" +
									"<td>" + bookList[i].roadsideAssistance + "</td></tr>");
							var liabilityProtection = $("<tr><td>Liability Protection: </td>" +
									"<td>" + bookList[i].liabilityProtection + "</td></tr>");
							var total = $("<tr><td>Total Rent: </td>" +
									"<td>$" + bookList[i].totalRent + "</td></tr>");
							
							userID.appendTo($("#BookBody"));
							pickDate.appendTo($("#BookBody"));
							returnDate.appendTo($("#BookBody"));
							pickAddress.appendTo($("#BookBody"));
							returnAdd.appendTo($("#BookBody"));
							gps.appendTo($("#BookBody"));
							damageWaiver.appendTo($("#BookBody"));
							insurance.appendTo($("#BookBody"));
							roadsideAssistance.appendTo($("#BookBody"));
							liabilityProtection.appendTo($("#BookBody"));
							total.appendTo($("#BookBody"));
							confirmationNo.appendTo($("#BookBody"));
						}
					},
					error : function(data, textStatus, errorThrown) {
						console.log(textStatus)
					}
				});
			},
			error : function(data, textStatus, errorThrown) {
				console.log(textStatus);
			}
		});
		
		function getPickUpAddress(ID){
			for(var i = 0; i < addressList.length; i++){
				if(parseInt(addressList[i].id) == parseInt(ID)){
					var result = addressList[i].street + ", " + addressList[i].city + ", " + addressList[i].state + ", " + addressList[i].zip;
					console.log(result);
					return result;
				}
			}
		}
		
		function getReturnAddress(ID){
			for(var i = 0; i < addressList.length; i++){
				if(addressList[i].id == ID){
					var result = addressList[i].street + ", " + addressList[i].city + ", " + addressList[i].state + ", " + addressList[i].zip;
					console.log(result);
					return result;
				}
			}
		}
	})
})