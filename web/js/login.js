/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(
		function() {

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
								alert("login successful");
								break;
							} else {
								alert("login failed");
							}
						}
					},
					error : function(data, textStatus, errorThrown) {
						console.log(textStatus)
					}
				});

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
				$("#HomeDiv").hide();
				$("#AboutDiv").hide();
				$("#RegisterDiv").hide();
				$("#AllRentalsDiv").hide();
				$("#InsertRentalDiv").hide();
			});

			$("#LoginBtn").click(function(e) {
				login();
				$("#SearchUserDiv").hide();
				$("#InsertUserDiv").hide();
				$("#AllUserDiv").hide();
				alert("logging in...");
				

			});

		});
