$(document).ready(function() {
       $("#myAjaxRequestForm").submit(function(e){
                   e.preventDefault();
            });
       



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

        var phone = $("input#phone").val();
        var dob = $("input#dob").val();
        var email = $("input#email").val();
        var dlNumber = $("input#dlNumber").val();
        var expDate = $("input#expDate").val();
        var issueDate = $("input#issueDate").val();
        var userID = $("input#userID").val();
        var password = $("input#password").val();
        var street = $("input#street").val();
        var apartmentNo = $("input#apartmentNo").val();
        var city = $("input#city").val();
        var state = $("input#state").val();
        var zip = $("input#zip").val();
        var role = $("input#role").val();
        


        $.ajax({
            type: "POST",
            url: "InsertUserService",
            dataType: 'json',
            data: {name: name, phone:phone,dob:dob, email:email,dlNumber:dlNumber,expDate:expDate,
                issueDate:issueDate,userID:userID,password:password,street:street,apartmentNo:apartmentNo,
                city:city,state:state,zip:zip,role:role},
            cache: false,
            success: function (data, textStatus, xhr) {
                alert(data);
               
               
            },
            error: function (data, textStatus, errorThrown) {
                console.log(textStatus)
            }
        });
    }
          
    
        $("#InsertUser").click(function(e){
            
               
            $("#InsertUserDiv").show();	
            $("#SearchUserDiv").hide();
            $("#AllUserDiv").hide();             
         loadInitData();
            });
     
});
