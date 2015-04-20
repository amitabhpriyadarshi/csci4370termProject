$(document).ready(
		function() {
			loadAllVehicleData();

			var vehicleArray = new Array();

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

			function loadAllVehicleData() {
				dataString = null;
				$.ajax({
					type : "POST",
					url : "VehicleService",
					dataType : 'json',
					data : dataString,
					cache : false,
					success : function(data, textStatus, xhr) {
						createDataList(data);
						
						$("#ajaxAllVehicleResponse").html("");
						var listAllVehicleTableBody = $("#ajaxAllVehicleResponse");
						listAllVehicleTableBody.empty();
						var vehicle;

						for (i = 0; i < vehicleArray.length; i++) {
							vehicle = vehicleArray[i];

							var row = $("<tr></tr>");
							
							var id = $("<td>" + vehicle.id+ "</td>");
							var class_ = $("<td>" + vehicle.class_ + "</td>");
							var model = $("<td>" + vehicle.model + "</td>");
							var make = $("<td>" + vehicle.make + "</td>");
							var color = $("<td>" + vehicle.color + "</td>");
							var odometer = $("<td>" + vehicle.odometer + "</td>");
							var transmission = $("<td>" + vehicle.transmission + "</td>");
							var fuel = $("<td>" + vehicle.fuel + "</td>");
							var drive = $("<td>" + vehicle.drive + "</td>");
							var plateNumber = $("<td>" + vehicle.plateNumber + "</td>");						
							var status = $("<td>" + vehicle.status + "</td>");
													
							id.appendTo(row);
							class_.appendTo(row);
							model.appendTo(row);
							make.appendTo(row);
							color.appendTo(row);
							odometer.appendTo(row);
							transmission.appendTo(row);
							fuel.appendTo(row);
							drive.appendTo(row);
							plateNumber.appendTo(row);							
							status.appendTo(row);

							row.appendTo(listAllVehicleTableBody);

						}
					},
					error : function(data, textStatus, errorThrown) {
						console.log(textStatus)
					}
				});
			}

			function createDataList(JsonObject) {

				vehicleArray.length = 0;

				$.each(JsonObject, function(key, object) {

					var vehicle = new Vehicle(object.id, object.class_,
							object.model, object.make, object.color,
							object.odometer, object.transmission, object.fuel,
							object.drive, object.plateNumber, object.status);

					vehicleArray.push(vehicle);
				});

			}

			$("#AllVehicle").click(function(e) {

				$("#AllUserDiv").hide();
				$("#SearchUserDiv").hide();
				$("#InsertUserDiv").hide();
				$("#AllVehicleDiv").show();
				$("#RegisterDiv").hide();
				$("#HomeDiv").hide();
				$("#VehicleInfoDiv").hide();
				$("#LoginDiv").hide();
				$("#InsertVehicleDiv").hide();
				$("#AboutDiv").hide();
				$("#AllRentalsDiv").hide();
				$("#InsertRentalDiv").hide();
				
			});

		});
