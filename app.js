//selecting and storing my varibles//
 const $name =$('#name');
 const $colorDiv=$('#colors-js-puns');
 const $color = $('#color');
 const $button = $('#button');
 const $design = $('#design');
 const $placeholder_option = $('#placeholder');
 const $registration = $('#activities');
 const $totalCost = $('#cost');
 const $checkboxActivities = $('#checkbox');
 const $checkbox = $('#checkbox');
 let activitiesArray = [];
 let totalCost;
 const $activities = $('#activities');
 const $submitButton = $('form button');
 const $total = $('#total');
 const $errorMessage = $('#error');
 const $payment = $('#payment');
 const $bitcoin = $('fieldset:last div:last');
 const $paypal = $('fieldset:last div:last').prev();
 const $jobSelect = $('#title option');
 const $ccNum = $('#cc-num');
 const $zip = $('#zip');
 const $cvv = $('#cvv');
 const $submit = $('#submit');
 const $messageFirstName = 'Please enter your first name.';
 const $messageLastName = 'Please enter your last name.';
 const $validate = $('#validate');
 const $validateEmail =$('#validate-email');


//selecting the "name" element and calling focus to it//
$( document ).ready(function() {
  $( "name" ).focus();
    var cust_fname = $('#cust_fname').val();
    var cust_lname = $('#cust_lname').val();
    var name_regex = /^[A-Za-z]+$/;

      $("input").blur(function(){
          if(cust_fname.length==0){
              $(name_error_msg).text("First name can't be empty");
              $(this).css("border-color", "red");
              return false;}

      $("input").focus(function(){
       $(name_error_msg).text("");
          if(cust_fname.length > 0) { 
               $(":focus").$(name_error_msg).html().css("border-color", "green"); }
      });
    })

//*JOB-ROLE SECTION*//

//create a function to target the “other” option to the Job Role section and hide it//                   
$('#other-title').hide();
$('#title').change((elem) => {
     let selectedJob = $('#title').val();
     if (selectedJob === 'other') {
         $('#other-title').show();
     }else {
         $('#other-title').hide();
     }
});

// //*T-SHIRT SECTION*//
//hide color-option when nothing is selected//
$("#colors-js-puns").hide(); 
$("#design").change( () => {
$("#color option").hide(); 

  //If color options are picked then show// 
  if ($("#design").val() == "js puns") {
    $("#colors-js-puns").show(); 
    $("#color option[value='cornflowerblue']").show(); //show right colors
    $("#color option[value='darkslategrey']").show();
    $("#color option[value='gold']").show();
    $("#color").val("cornflowerblue"); 
    //default color option//
  } else if ($("#design").val() == "heart js") {
      $("#colors-js-puns").show();
      $("#color option[value='tomato']").show();
      $("#color option[value='steelblue']").show();
      $("#color option[value='dimgrey']").show();
      $("#color").val("tomato");
    } else { 
        $("#colors-js-puns").hide();
    }
    if($("#design").val()==="Select Theme"){
      $(".shirt legend").append("<span style='color: red; font-weight:bold'> (Don't forget to pick a T-shirt)</span>");
      status = false;
    }
});

$(".activities").on("click", function() {
  var total = 0;
  if ($("input[name='all']").is(":checked")) {
    total += 200;
  }
  if ($("input[name='js-frameworks']").is(":checked")) {
    total += 100;
    $("input[name='express']").attr("disabled", true);
  } else {
    $("input[name='express']").attr("disabled", false);
  }
  if ($("input[name='js-libs']").is(":checked")) {
    total += 100;
    $("input[name='node']").attr("disabled", true);
    } else {
    $("input[name='node']").attr("disabled", false);
    }
  if ($("input[name='express']").is(":checked")) {
    total += 100;
    $("input[name='js-frameworks']").attr("disabled", true);
  } else {
    $("input[name='js-frameworks']").attr("disabled", false);
  }
  if ($("input[name='node']").is(":checked")) {
    total += 100;
    $("input[name='js-libs']").attr("disabled", true);
  } else {
    $("input[name='js-libs']").attr("disabled", false);
  }

  if ($("input[name=build-tools]").is(":checked")) {
      total += 100;
  }
  if ($("input[name=npm]").is(":checked")) {
      total += 100;
  }
   totalPrice(total);
});

//real-time validation while using the form//
function totalPrice(total) {
  if (typeof total !== 0) {
    $("#totalDiv").remove();
    $(".activities").append("<div id='totalDiv'><strong>Your total is: $" + total + "</strong></div>");
  } else {
    $("#totalDiv").remove();
  }
}

//Create function that will take care of hiding/showing the right payment options depending on the user selection
$("#payment").change(function() {
  if ($(this).val() === "paypal") {
    $("#credit-card").hide();
    $("p:contains('Bitcoin')").hide();
    $("p:contains('Paypal')").show();
  }
  //When "Bitcoin" is selected, display Bitcoin and hide CC and paypal
  if($(this).val() === "bitcoin") {
    $("#credit-card").hide();
    $("p:contains('Paypal')").hide();
    $("p:contains('Bitcoin')").show();
  }

  //When CC is selected, display the credit card information and hide the paypal and bitcoin info..
  if ($(this).val() === "credit card") {
    $("#credit-card").show();
    $("p:contains('Paypal')").hide();
    $("p:contains('Bitcoin')").hide();
  }
});

function cardFormValidate(){
    var cardValid = 0;

    //card number validation
    $('#card_number').validateCreditCard(function(result){
        if(result.valid){
            $("#card_number").removeClass('required');
            cardValid = 1;
        }else{
            $("#card_number").addClass('required');
            cardValid = 0;
        }
    });
      
    //card details validation
    var cardName = $("#name_on_card").val();
    var expMonth = $("#expiry_month").val();
    var expYear = $("#expiry_year").val();
    var cvv = $("#cvv").val();
    var regName = /^[a-z ,.'-]+$/i;
    var regMonth = /^01|02|03|04|05|06|07|08|09|10|11|12$/;
    var regYear = /^2017|2018|2019|2020|2021|2022|2023|2024|2025|2026|2027|2028|2029|2030|2031$/;
    var regCVV = /^[0-9]{3,3}$/;
    if (cardValid == 0) {
        $("#card_number").addClass('required');
        $("#card_number").focus();
        return false;
    }else if (!regMonth.test(expMonth)) {
        $("#card_number").removeClass('required');
        $("#expiry_month").addClass('required');
        $("#expiry_month").focus();
        return false;
    }else if (!regYear.test(expYear)) {
        $("#card_number").removeClass('required');
        $("#expiry_month").removeClass('required');
        $("#expiry_year").addClass('required');
        $("#expiry_year").focus();
        return false;
    }else if (!regCVV.test(cvv)) {
        $("#card_number").removeClass('required');
        $("#expiry_month").removeClass('required');
        $("#expiry_year").removeClass('required');
        $("#cvv").addClass('required');
        $("#cvv").focus();
        return false;
    }else if (!regName.test(cardName)) {
        $("#card_number").removeClass('required');
        $("#expiry_month").removeClass('required');
        $("#expiry_year").removeClass('required');
        $("#cvv").removeClass('required');
        $("#name_on_card").addClass('required');
        $("#name_on_card").focus();
        return false;
    }else{
        $("#card_number").removeClass('required');
        $("#expiry_month").removeClass('required');
        $("#expiry_year").removeClass('required');
        $("#cvv").removeClass('required');
        $("#name_on_card").removeClass('required');
        return true;
    }
}
$(document).ready(function() {
    //card validation on input fields
    $('#paymentForm input[type=text]').on('keyup',function(){
        cardFormValidate();
    });
});




 $("#submit").click( (e) => {
   e.preventDefault(); //dont submit before validation

   $(".error").removeClass("error"); //remove all errors before re-validation

  function getMsg(selector) {
    return $(selector).attr('data-msg');
}

$('#form').validate({
    $messages: {
        $firstName: getMsg('#firstName'),
        $lastName: getMsg('#lastName')
    }
});

  var sEmail = $('#txtEmail').val();
  // Checking Empty Fields
  if ($.trim(sEmail).length == 0 || $("#fname").val()=="" || $("#lname").val()=="") {
  alert('All fields are mandatory');
  e.preventDefault();
  }
  if (validateEmail(sEmail)) {
  alert('Nice!! your Email is valid, now you can continue..');
  }
  else {
  alert('Invalid Email Address');
  e.preventDefault();
  }
  });
  });
  // Function that validates email address through a regular expression.
  function validateEmail(sEmail) {
  var filter = /^[w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;
  if (filter.test(sEmail)) {
  return true;
  }
  else {
  return false;
  }
  }
 
//   //validating all required fields
//   validate($("#name")[0]);
//   if($("#name").val()==''){
//     $("label[for='contact_name']").attr("style","color:red; font-weight:bold");
//     $("label[for='contact_name']").append("<span>(Please Add Name!)</span>");
//     status = false; 
//   } 

//   validate($("#mail")[0]); 
//   if($("#mail").val()==''|| $("#mail").val().indexOf("@")<1|| $("#mail").val.lastIndexOf(".")<$("#mail").val().indexOf("@")+2|| $("#mail").val().lastIndexOf(".")+2>=($("#mail").val().length)){
//     $("label[for='mail']").attr("style","color:red; font-weight:bold");
//     $("label[for='mail']").append("<span>(Please Add a valid email!)</span>");
//     status = false; 
//   } 

//   //if no errors exists, as in no error-classes found,submit
//   if ($(".error").length == 0){
//     $("form").submit();
//   } 
// });
  
//   function handleError (errorTarget, errorMessage) {
  
//   if ($(errorTarget).hasClass("activities")) { 
//     text = $("#activities-legend");
//   } else { 
//          text = $("label[for='" + errorTarget.id + "']");
//     }
//    }

// //  function isValidForm() {
// //    let status = true;

//   //Name Section//
//   // if($name.val()==""){
//   //   alert("Name empty");
//   //   status = false; 
//   // }

//   //return status;


// $("form").submit(function(e){
//   $('label span').remove();
//   $('legend span').remove();
//   $('label span').removeAttr("style");
//   $('label').removeAttr("style");
//   let status = true;


// //activities section
// if(checkboxStatus($(".activities :checked"))==false){
//   $(".activities legend").append("<span style='color: red; font-weight:bold'> (please select an Activity)</span>");
//   status = false;
// }

// //payment section
// if($("#payment").val()==="credit card"){
//   if($("#cc-num").val()==""|| $("#cc-num").val().length<13|| $("#cc-num").val().length>16|| isNaN($("#cc-num").val())==true){
//       $("label[for='cc-num']").attr("style","color:red; font-weight:bold");
//       status = false;
//      }
//   if($("#zip").val()==""|| $("#zip").val().length !=5|| isNaN($("#zip").val())==true){
//       $("label[for='zip']").attr("style","color:red; font-weight:bold");
//       status = false;
//      }
//   if($("#cvv").val()==""|| $("#cvv").val().length !=3|| isNaN($("#cvv").val())==true){
//       $("label[for='cvv']").attr("style","color:red; font-weight:bold");
//       status = false;
//      }
     
// }

//  if(isValidForm() == false){
//     event.preventDefault();
//  }
// //   return status;
//  });
// if($("#design").val()==="Select Theme"){
//   $(".shirt legend").append("<span style='color: red; font-weight:bold'> (Don't forget to pick a T-shirt)</span>");
//   status = false;
// }
 

// $(function(){
//   $("#myform").validate();    
//   $("#myform").on('submit', function(e) {
//       var isvalid = $("#myform").valid();
//       if (isvalid) {
//           e.preventDefault();
//           alert(getvalues("myform"));
//       }
//   });
// });

// function getvalues(f)
// {
//   var form=$("#"+f);
//   var str='';
//   $("input:not('input:submit')", form).each(function(i){
//       str+='\n'+$(this).prop('name')+': '+$(this).val();
//   });
//   return str;
// }
 
