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

			function loadInitData() {
				dataString = null;
				$.ajax({
					type : "POST",
					url : "UserService",
					dataType : 'json',
					data : dataString,
					cache : false,
					success : function(data, textStatus, xhr) {
						createDataList(data);

					},
					error : function(data, textStatus, errorThrown) {
						console.log(textStatus)
					}
				});
			}
			function createDataList(JsonObject) {
				userArray.length = 0;
				$.each(JsonObject, function(key, object) {
					var usr = new User(object.userID, object.password,
							object.firstName, object.lastName, object.dob,
							object.street, object.phone, object.email,
							object.dlNumber, object.expDate, object.city,
							object.state, object.zip, object.role);
					userArray.push(usr);
				});

			}
			loadInitData();
			$("#AllUser").click(function(e) {

				$("#AllUserDiv").show();
				$("#SearchUserDiv").hide();
				$("#InsertUserDiv").hide();
				$("#VehicleInfoDiv").hide();
				$("#LoginDiv").hide();
				$("#InsertVehicleDiv").hide();
				$("#AllVehicleDiv").hide();
				$("#AboutDiv").hide();
				$("#RegisterDiv").hide();
				$("#HomeDiv").hide();
				$("#ajaxResponse").html("");
				var listTableBody = $("#ajaxResponse");
				listTableBody.empty();
				for (i = 0; i < userArray.length; i++) {
					usr = userArray[i];

					var row = $("<tr></tr>");
					var userID = $("<td>" + usr.userID + "</td>");
					var password = $("<td>" + usr.password + "</td>");
					var firstName = $("<td>" + usr.firstName + "</td>");
					var lastName = $("<td>" + usr.lastName + "</td>");
					var dob = $("<td>" + usr.dob + "</td>");
					var street = $("<td>" + usr.street + "</td>");
					var phone = $("<td>" + usr.phone + "</td>");
					var email = $("<td>" + usr.email + "</td>");
					var dlNumber = $("<td>" + usr.dlNumber + "</td>");
					var expDate = $("<td>" + usr.expDate + "</td>");
					var city = $("<td>" + usr.city + "</td>");
					var state = $("<td>" + usr.state + "</td>");
					var zip = $("<td>" + usr.zip + "</td>");
					var role = $("<td>" + usr.role + "</td>");

					userID.appendTo(row);
					password.appendTo(row);
					firstName.appendTo(row);
					lastName.appendTo(row);
					dob.appendTo(row);
					street.appendTo(row);
					phone.appendTo(row);
					email.appendTo(row);
					dlNumber.appendTo(row);
					expDate.appendTo(row);
					city.appendTo(row);
					state.appendTo(row);
					zip.appendTo(row);
					role.appendTo(row);
					row.appendTo(listTableBody);

				}

			});

		});
