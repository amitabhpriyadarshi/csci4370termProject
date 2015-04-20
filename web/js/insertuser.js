$(document).ready(
		function() {

			function User(userID, password, firstName, lastName, dob, street,
					phone, email, dlNumber, expDate, city, state, zip) {
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
			}

			function loadInitData() {
				dataString = $("#InsertUserRequestForm").serialize();

				var userID = $("input#insertUseruserID").val();
				var password = $("input#insertUserpassword").val();
				var firstName = $("input#insertUserfirstName").val();
				var lastName = $("input#insertUserlastName").val();
				var dob = $("input#insertUserdob").val();
				var street = $("input#insertUserstreet").val();
				var phone = $("input#insertUserphone").val();
				var email = $("input#insertUseremail").val();
				var dlNumber = $("input#insertUserdlNumber").val();
				var expDate = $("input#insertUserexpDate").val();
				var city = $("input#insertUsercity").val();
				var state = $("input#insertUserstate").val();
				var zip = $("input#insertUserzip").val();

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
					url : "InsertUserService",
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

			$("#InsertUser").click(function(e) {

				$("#HomeDiv").hide();
				$("#AllUserDiv").hide();
				$("#SearchUserDiv").hide();
				$("#InsertUserDiv").show();
				$("#VehicleInfoDiv").hide();
				$("#LoginDiv").hide();
				$("#InsertVehicleDiv").hide();
				$("#AllVehicleDiv").hide();
				$("#AboutDiv").hide();
				$("#RegisterDiv").hide();
				$("#AllRentalsDiv").hide();
				$("#InsertRentalDiv").hide();
				$("#BookDiv").hide();
			});

			$("#InsertUserBtn").click(function() {
				loadInitData();
			});

		});
