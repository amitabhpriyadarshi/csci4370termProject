$(document).ready(
		function() {

			var userSearchArray = new Array();

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

			function loadSearchData() {
				dataStringSearch = $("#myAjaxRequestForm").serialize();
				var name = $("input#name").val();
				dataStringSearch = "name=" + name;

				$.ajax({
					type : "POST",
					url : "UserSearchService",
					dataType : 'json',
					data : dataStringSearch,
					cache : false,
					success : function(data, textStatus, xhr) {
						createSearchDataList(data);
						var listTableBody = $("#ajaxResponse");
						listTableBody.empty();
						for (i = 0; i < userSearchArray.length; i++) {
							usr = userSearchArray[i];

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
					},
					error : function(data, textStatus, errorThrown) {
						console.log(textStatus)
					}
				});
			}
			function createSearchDataList(JsonObject) {
				userSearchArray.length = 0;
				$.each(JsonObject, function(key, object) {
					var usr = new User(object.userID, object.password,
							object.firstName, object.lastName, object.dob,
							object.street, object.phone, object.email,
							object.dlNumber, object.expDate, object.city,
							object.state, object.zip, object.role);
					userSearchArray.push(usr);

				});

			}

			$("#SearchUser").click(function(e) {

				$("#AllUserDiv").hide();
				$("#SearchUserDiv").show();
				$("#InsertUserDiv").hide();
				$("#LoginDiv").hide();
				$("#VehicleInfoDiv").hide();
				$("#InsertVehicleDiv").hide();
				$("#AllVehicleDiv").hide();
				$("#HomeDiv").hide();
				$("#AboutDiv").hide();
				$("#RegisterDiv").hide();
			});
			$("#SearchUserBt").click(function(e) {
				loadSearchData();
				$("#SearchUserDiv").show();
				$("#InsertUserDiv").hide();
				$("#AllUserDiv").show();
				$("#InsertVehicleDiv").hide();
				$("#AllVehicleDiv").hide();
				$("#HomeDiv").hide();
				$("#RegisterDiv").hide();
				$("#AboutDiv").hide();
				$("#ajaxResponse").html("");
				
			});

		});
