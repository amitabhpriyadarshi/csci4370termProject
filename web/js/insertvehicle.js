$(document).ready(
		function() {
			$("#myAjaxRequestForm").submit(function(e) {
				e.preventDefault();
			});

			function Vehicle(id, class_, model, make, color, odometer,
					transmission, fuel, drive, plateNumber, status) {
				this.id = id;
				this.class_ = class_;
				this.model = model;
				this.make = make;
				this.color = color;
				this.odometer = odometer;
				this.transmission = transmission;
				this.fuel = fuel;
				this.drive = drive;
				this.plateNumber = plateNumber;
				this.status = status;
			}
			
			function loadVehicleData() {
				dataString = $("#InsertVehicleRequestForm").serialize();

				var class_ = $("input#InsertVehicleclass_").val();
				var model = $("input#InsertVehiclemodel").val();
				var make = $("input#InsertVehiclemake").val();
				var color = $("input#InsertVehiclecolor").val();
				var odometer = $("input#InsertVehicleodometer").val();
				var transmission = $("input#InsertVehicletransmission").val();
				var fuel = $("input#InsertVehiclefuel").val();
				var drive = $("input#InsertVehicledrive").val();
				var plateNumber = $("input#InsertVehicleplateNumber").val();
				var status = $("input#InsertVehiclestatus").val();

				dataString = {
					class_ : class_,
					model : model,
					make : make,
					color : color,
					odometer : odometer,
					transmission : transmission,
					fuel : fuel,
					drive : drive,
					plateNumber : plateNumber,
					status : status
				};

				$.ajax({
					type : "POST",
					url : "InsertVehicleService",
					dataType : 'json',
					data : dataString,
					cache : false,
					success : function(data, textStatus, xhr) {
						console.log(data);
						alert("Insertion complete.");
					},
					error : function(data, textStatus, errorThrown) {
						console.log(textStatus)
					}
				});
			}

			$("#InsertVehicle").click(function(e) {

				$("#HomeDiv").hide();
				$("#AllUserDiv").hide();
				$("#SearchUserDiv").hide();
				$("#InsertUserDiv").hide();
				$("#VehicleInfoDiv").hide();
				$("#LoginDiv").hide();
				$("#InsertVehicleDiv").show();
				$("#AllVehicleDiv").hide();
				$("#AboutDiv").hide();
				$("#RegisterDiv").hide();
				$("#AllRentalsDiv").hide();
				$("#InsertRentalDiv").hide();
				$("#BookDiv").hide();
			});

			$("#InsertVehicleBtn").click(function(e) {
				loadVehicleData();

			});

		});
