$(document).ready(function(){
    
   getData(); //fetch data from DB
    
    //Validates user's name input when typing
    $("input[name='name']").keyup(function(){
        isInputValid($(this), this.value.length > 0);  
    });
    
    //Validates user's email input when typing
    $("input[name='email']").keyup(function(){
        isInputValid($(this), this.value.length > 0 && isValidEmailAddress(this.value));
    }); 
    
    //Validates user's age input when typing
    $("input[name='age']").bind('keyup mouseup',function (){
        isInputValid($(this),isValidAge(this.value));
    });     
    
    //When user clicks submit button, validate input and if the data is valid post it to DB
    $("#mainForm").submit(function(){
        event.preventDefault();
        
        var isNameValid = isInputValidOnSubmit($("input[name='name']").val().length > 0, $("#nameError"), "Please enter your name");   
        
        var isEmailValid = isInputValidOnSubmit(isValidEmailAddress($("input[name='email']").val()), $("#emailError"), "Please enter a  valid email address like: example@mail.com");
        
        var isAgeValid = isInputValidOnSubmit(isValidAge($("input[name='age']").val()), $("#ageError"), "Please enter an age between 1 and 100"); 
        
        var isSexValid = isInputValidOnSubmit($("input[name='sex']:checked").length > 0, $("#sexError"), "Please select Male or Female");
        
        //If the form input is not valid return false
        if(!isNameValid || !isEmailValid || !isAgeValid || !isSexValid){
            return false; 
        }
        
        $.ajax({
            type: "POST",
            url: "post.php",
            data: $("#mainForm").serialize(),
            success: function(data){
                $("#result").html(data);
                $("#outputTable > tbody").html(""); //clear table body
                getData(); //reload data
            },
            error: function(){
                $("#result").html("Something went wrong while saving your input... Contact lindviveronika@gmail.com if the problem remains.");
            }
        });
        clearInput(); //clear input fields
    });
    
});

//Gets data from DB
function getData(){
    $.ajax({
        type: "GET",
        url: "get.php",
        data: "",
        datatype: "json",
        success: function(data){
            drawTable(data);
        }
    });
}

//Checks if an email address is valid
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    return pattern.test(emailAddress);
};

//Checks if an age is valid
function isValidAge(age){
    if(age != null && age > 0 && age <= 100){
        return true;
    }
    else {
        return false;
    }
}

//Mark input as valid or not valid
function isInputValid(inputField,valid){
    if(valid){
        inputField.addClass("green");
    }
    else{
        inputField.removeClass("green");
    }  
}

//Adds error message under input fild is input is not valid
function isInputValidOnSubmit(valid, messageField, message){
    if(!valid){
        messageField.html(message);
        return false;
    }
    else {
        messageField.html("");
        return true;
    }
}

//Draws a table
function drawTable(data){
    
    //Parse the JSON formatted data and draw a table row for each instance of the data
    var obj = jQuery.parseJSON(data);
    for(var i = 0; i < obj.length; i++){
        drawRow(obj[i]);
    }
}

//Draws a table row using mustache.js
function drawRow(rowData) {
    var template = $('#template').html();
    var rendered = Mustache.render(template, rowData);
    $("#outputTable > tbody").append(rendered);
}

//Clears all the input fields
function clearInput(){
    $("#user-info").find("input[type='text']").val("");
    $("#user-info").find("input[type='email']").val("");
    $("#user-info").find("input[type='number']").val("");
    $("#user-info").find("input[type='radio']").prop('checked', false);
    $(".green").removeClass("green");
}