$(document).ready(function() {
       $("#myAjaxRequestForm").submit(function(e){
                   e.preventDefault();
            });
       


    var userArray = new Array();

    function User(name,phone,dob,email,dlNumber,expDate,issueDate,userID,password,street,apartmentNo,city,state,zip,role){
   
        this.name=name;
        this.phone = phone;
        this.dob = dob;
        this.email = email;
        this.dlNumber = dlNumber;
        this.expDate = expDate;
        this.issueDate = issueDate;
        this.userID =  userID;
        this.password = password;
        this.street = street;
        this.apartmentNo = apartmentNo;
        this.city = city;
        this.state =  state;
        this.zip = zip;
        this.role = role;
   
    }

    function loadInitData(){
        dataString = $("#myAjaxRequestForm").serialize();
                                var name = $("input#name").val(); 
                    dataString = "name="+name;

        $.ajax({
            type: "POST",
            url: "UserSearchService",
            dataType: 'json',
            data: dataString,
            cache: false,
            success: function (data, textStatus, xhr) {
                
                createDataList(data);
               
            },
            error: function (data, textStatus, errorThrown) {
                console.log(textStatus)
            }
        });
    }
    function createDataList(JsonObject){
            
        $.each(JsonObject,function(key, object){
            var usr = new User(object.name,object.phone,object.dob,object.email,object.dlNumber,object.expDate,object.issueDate,object.userID,object.password,object.street,object.apartmentNo,object.city,object.state,object.zip,object.role);
            userArray.push(usr);
            
        });
          
    }
  $("#SearchUser").click(function(e){
      
             
        $("#AllUserDiv").show();	
        $("#SearchUserDiv").show();
        $("#InsertUserDiv").hide();           
    });                   	
  $("#SearchUserBt").click(function(e){
        loadInitData();
                       
                 $("#ajaxResponse").html("");
        var listTableBody = $("#ajaxResponse");
        listTableBody.empty();
        for(i=0;i<userArray.length;i++){
            alert(userArray[i].name);
            usr = userArray[i];
        	 
            var row = $("<tr></tr>");
            var name=$("<td>"+usr.name+"</td>");
            var phone = $("<td>"+usr.phone+"</td>");
            var dob = $("<td>"+usr.dob+"</td>");
            var email = $("<td>"+usr.email+"</td>");
            var dlNumber = $("<td>"+usr.dlNumber+"</td>");
            var expDate = $("<td>"+usr.expDate+"</td>");
            var issueDate = $("<td>"+usr.issueDate+"</td>");
            var userID =  $("<td>"+usr.userID+"</td>");
            var password = $("<td>"+usr.password+"</td>");
            var street = $("<td>"+usr.street+"</td>");
            var apartmentNo = $("<td>"+usr.apartmentNo+"</td>");
            var city = $("<td>"+usr.city+"</td>");
            var state =  $("<td>"+usr.state+"</td>");
            var zip = $("<td>"+usr.zip+"</td>");
            var role = $("<td>"+usr.role+"</td>");
   
             
            name.appendTo(row);
            phone.appendTo(row);
            dob.appendTo(row);
            email.appendTo(row);
            dlNumber.appendTo(row);
            expDate.appendTo(row);
            issueDate.appendTo(row);
            userID.appendTo(row);
            password.appendTo(row);
            street.appendTo(row);
            apartmentNo.appendTo(row);
            city.appendTo(row);
            state.appendTo(row);
            zip.appendTo(row);
            role.appendTo(row);
            row.appendTo(listTableBody);
              
        }







            });

});
    