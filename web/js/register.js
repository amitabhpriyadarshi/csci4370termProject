$(document).ready(
		function() {
			$("#Register").click(function(e) {

				$("#RegisterDiv").show();
				$("#InsertUserDiv").hide();
				$("#SearchUserDiv").hide();
				$("#AllUserDiv").hide();
				$("#LoginDiv").hide();
				$("#InsertVehicleDiv").hide();
				$("#AllVehicleDiv").hide();
				$("#VehicleInfoDiv").hide();
				$("#HomeDiv").hide();
				$("#AboutDiv").hide();

			});

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

			function loadRegisterData() {
				dataString = $("#RegisterForm").serialize();

				var userID = $("input#reg_userID").val();
				var password = $("input#reg_password").val();
				var firstName = $("input#reg_firstName").val();
				var lastName = $("input#reg_lastName").val();
				var dob = $("input#reg_dob").val();
				var street = $("input#reg_street").val();
				var phone = $("input#reg_phone").val();
				var email = $("input#reg_email").val();
				var dlNumber = $("input#reg_dlNumber").val();
				var expDate = $("input#reg_expDate").val();
				var city = $("input#reg_city").val();
				var state = $("input#reg_state").val();
				var zip = $("input#reg_zip").val();

				dataString = {
						userID : userID,
						password : password,
						firstName : firstName,
						lastName : lastName,
						dob : dob,
						street : street,
						phone : phone,
						email : email,
						dlNumber : dlNumber,
						expDate : expDate,
						city : city,
						state : state,
						zip : zip,
				};

				$.ajax({
					type : "POST",
					url : "RegisterService",
					dataType : 'json',
					data : dataString,
					cache : false,
					success : function(data, textStatus, xhr) {
						console.log(data);

					},
					error : function(data, textStatus, errorThrown) {
						console.log(textStatus)
					}
				});
			}

			$("#RegisterBtn").click(function(e) {
				loadRegisterData();
				$("#RegisterDiv").hide();
				$("#InsertUserDiv").hide();
				$("#SearchUserDiv").hide();
				$("#AllUserDiv").hide();
				$("#LoginDiv").show();
				$("#HomeDiv").hide();
				$("#VehicleInfoDiv").hide();
				$("#AboutDiv").hide();
			});
			
			$("#RegisterCancelBtn").click(function(e) {
				$("#RegisterDiv").hide();
				$("#InsertUserDiv").hide();
				$("#SearchUserDiv").hide();
				$("#AllUserDiv").hide();
				$("#LoginDiv").show();
				$("#HomeDiv").hide();
				$("#VehicleInfoDiv").hide();
				$("#AboutDiv").hide();
			});

		});
