/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(
		
		function() {
			
			$("#Logout").hide();
			$("#AllUser").hide();
			$("#SearchUser").hide();
			$("#InsertUser").hide();
			$("#AllVehicle").hide();
			$("#InsertVehicle").hide();
			$("#AllRentals").hide();
			
			var userArray = new Array();

			function User(userID, password, firstName, lastName, dob, street,
					phone, email, dlNumber, expDate, city, state, zip, role) {
				this.userID = userID;
				this.password = password;
				this.firstName = firstName;
				this.lastName = lastName;
				this.dob = dob;
				this.street = street;
				this.phone = phone;
				this.email = email;
				this.dlNumber = dlNumber;
				this.expDate = expDate;
				this.city = city;
				this.state = state;
				this.zip = zip;
				this.role = role;
			}

			function login() {
				dataStringSearch = $("#LoginForm").serialize();
				var userID = $("input#LoginuserID").val();
				var password = $("input#Loginpassword").val();
				dataStringSearch = "userID=" + userID;

				$.ajax({
					type : "POST",
					url : "LoginService",
					dataType : 'json',
					data : dataStringSearch,
					cache : false,
					success : function(data, textStatus, xhr) {
						createLoginDataList(data);

						for (i = 0; i < userArray.length; i++) {
							usr = userArray[i];
							if (userID === usr.userID && password === usr.password) {
								globalUser = {
										userID : usr.userID,
										role : usr.role
								};
								if(globalUser.role === "Admin"){
									console.log("globalUser is admin");
									$("#AllUser").show();
									$("#SearchUser").show();
									$("#InsertUser").hide();
									$("#AllVehicle").show();
									$("#InsertVehicle").show();
									$("#AllRentals").show();
									$("#Login").hide();
									$("#Logout").show();
									
									$("#HomeDiv").show();
									$("#AllUserDiv").hide();
									$("#SearchUserDiv").hide();
									$("#InsertUserDiv").hide();
									$("#VehicleInfoDiv").hide();
									$("#LoginDiv").hide();
									$("#InsertVehicleDiv").hide();
									$("#AllVehicleDiv").hide();
									$("#AboutDiv").hide();
									$("#RegisterDiv").hide();
									$("#AllRentalsDiv").hide();
									$("#InsertRentalDiv").hide();
									$("#BookDiv").hide();
									
									$("#username").html("Menu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome " + globalUser.userID + "!");
								}else if(globalUser.role === 'User' || globalUser.role === 'user'){
									$("#AllUser").hide();
									$("#Login").hide();
									$("#SearchUser").hide();
									$("#InsertUser").hide();
									$("#AllVehicle").hide();
									$("#InsertVehicle").hide();
									$("#AllRentals").hide();
									$("#Logout").show();
									
									$("#HomeDiv").hide();
									$("#AllUserDiv").hide();
									$("#SearchUserDiv").hide();
									$("#InsertUserDiv").hide();
									$("#VehicleInfoDiv").hide();
									$("#LoginDiv").hide();
									$("#InsertVehicleDiv").hide();
									$("#AllVehicleDiv").hide();
									$("#AboutDiv").hide();
									$("#RegisterDiv").hide();
									$("#AllRentalsDiv").hide();
									$("#InsertRentalDiv").hide();
									$("#BookDiv").show();
									$("#username").html("Menu &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome " + globalUser.userID + "!");s
								}
								break;
							} else {
								alert("login failed");
								$("#HomeDiv").show();
								$("#LoginDiv").hide();
							}
						}
					},
					error : function(data, textStatus, errorThrown) {
						console.log(textStatus)
					}
				});

			}
			
			function logout(){
				globalUser = "";
				$("#username").html("Menu");
				$("#AllUser").hide();
				$("#Login").show();
				$("#SearchUser").hide();
				$("#InsertUser").hide();
				$("#AllVehicle").hide();
				$("#InsertVehicle").hide();
				$("#AllRentals").hide();
				$("#Logout").hide();
				
				$("#HomeDiv").show();
				$("#AllUserDiv").hide();
				$("#SearchUserDiv").hide();
				$("#InsertUserDiv").hide();
				$("#VehicleInfoDiv").hide();
				$("#LoginDiv").hide();
				$("#InsertVehicleDiv").hide();
				$("#AllVehicleDiv").hide();
				$("#AboutDiv").hide();
				$("#RegisterDiv").hide();
				$("#AllRentalsDiv").hide();
				$("#InsertRentalDiv").hide();
				$("#BookDiv").hide();
			}
			
			function createLoginDataList(JsonObject) {
				userArray.length = 0;
				$.each(JsonObject, function(key, object) {
					var usr = new User(object.userID, object.password, object.firstName, object.lastName, object.dob, object.street,
							object.phone, object.email, object.dlNumber, object.expDate, object.city, object.state, object.zip, object.role);
					userArray.push(usr);
				});

			}

			$("#Login").click(function(e) {

				$("#LoginDiv").show();
				$("#AllUserDiv").hide();
				$("#SearchUserDiv").hide();
				$("#InsertUserDiv").hide();
				$("#VehicleInfoDiv").hide();
				$("#RegisterDiv").hide();
				$("#InsertVehicleDiv").hide();
				$("#AllVehicleDiv").hide();
				$("#HomeDiv").hide();
				$("#AboutDiv").hide();
				$("#RegisterDiv").hide();
				$("#AllRentalsDiv").hide();
				$("#InsertRentalDiv").hide();
				$("#BookDiv").hide();
			});
			
			$("#LoginCancelBtn").click(function(e) {

				$("#LoginDiv").hide();
				$("#AllUserDiv").hide();
				$("#SearchUserDiv").hide();
				$("#InsertUserDiv").hide();
				$("#VehicleInfoDiv").hide();
				$("#RegisterDiv").hide();
				$("#InsertVehicleDiv").hide();
				$("#AllVehicleDiv").hide();
				$("#HomeDiv").show();
				$("#AboutDiv").hide();
				$("#RegisterDiv").hide();
				$("#AllRentalsDiv").hide();
				$("#InsertRentalDiv").hide();
				$("#BookDiv").hide();
			});

			$("#LoginBtn").click(function(e) {
				login();
			});
			
			$("#Logout").click(function(){
				logout();
			})
		});
