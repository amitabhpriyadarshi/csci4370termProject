/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {

	$("#About").click(function(e) {
		$("#HomeDiv").hide();
		$("#AllUserDiv").hide();
		$("#SearchUserDiv").hide();
		$("#InsertUserDiv").hide();
		$("#VehicleInfoDiv").hide();
		$("#LoginDiv").hide();
		$("#InsertVehicleDiv").hide();
		$("#AllVehicleDiv").hide();
		$("#AboutDiv").show();
		$("#RegisterDiv").hide();
		$("#AllRentalsDiv").hide();
		$("#InsertRentalDiv").hide();
		$("#BookDiv").hide();
	});
});