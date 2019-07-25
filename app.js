//selecting and storing my varibles//
 const $name =$('#name');
 const $colorDiv=$('#colors-js-puns');
 const $color = $('#color');
 const $button = $('#button');
 const $design = $('#design');
 const $placeholder_option = $('#placeholder');
 const $validate = $('#validation');
 const $registration =$('#activities');
 const $totalCost = $('#cost');
 const $checkboxActivities = $('#checkbox');
 const $checkbox = $('#checkbox');
 let activitiesArray = [];
 let totalCost;
 const $activities = $('#activities');
 const $submitButton = $('form button');
 const $total = $('#total');
 const $error = $('#errorMessage');
 const $payment = $('#payment');
 const $bitcoin = $('fieldset:last div:last');
 const $paypal = $('fieldset:last div:last').prev();
 const $jobSelect = $('#title option');
 const $ccNum = $('#cc-num');
 const $zip = $('#zip');
 const $cvv = $('#cvv');
 const $messageFirstName = $('Please enter your first name.');
 const $messageLastName = $('Please enter your last name.');
 
//selecting the "name" element and calling focus to it//
$( document ).ready(function() {
  $( "name" ).focus();

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
    if ($(this).val() === "select_method") {
      $("#credit-card").hide();
      $("p:contains('Bitcoin')").hide();
      $("'p:contains('Paypal')").hide();
    }
  //When "PayPal" is selected, display the Paypal and hide CC and bitcoin info
  if ($(this).val() === "paypal") {
    $("#credit-card").hide();
    $("p:contains('Bitcoin')").hide();
    $("p:contains('Paypal')").show();
  }
  //When "Bitcoin" is selected, display Bitcoin and hide CC and paypal
  if ($(this).val() === "bitcoin") {
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

$("#register").click( (e) => {
  e.preventDefault(); //dont submit before validation

  $(".error").removeClass("error"); //remove all errors before re-validation

  function getMsg(selector) {
    return $(selector).attr('data-msg');
}

$('#form').validate({
    messages: {
        firstName: getMsg('#firstName'),
        lastName: getMsg('#lastName')
    }
});

  //validating all required fields
  validate($("#name")[0]);
  if($("#name").val()==''){
    $("label[for='name']").attr("style","color:red; font-weight:bold");
    $("label[for='name']").append("<span>(Please Add Name!)</span>");
    status = false; 
  } 

  validate($("#mail")[0]); 
  if($("#mail").val()==''|| $("#mail").val().indexOf("@")<1|| $("#mail").val.lastIndexOf(".")<$("#mail").val().indexOf("@")+2|| $("#mail").val().lastIndexOf(".")+2>=($("#mail").val().length)){
    $("label[for='mail']").attr("style","color:red; font-weight:bold");
    $("label[for='mail']").append("<span>(Please Add a valid email!)</span>");
    status = false; 
  } 

  //if no errors exists, as in no error-classes found,submit
  if ($(".error").length == 0){
    $("form").submit();
  } 
});
  
  function handleError (errorTarget, errorMessage) {
  
  if ($(errorTarget).hasClass("activities")) { 
    text = $("#activities-legend");
  } else { 
         text = $("label[for='" + errorTarget.id + "']");
    }
   }

//  function isValidForm() {
//    let status = true;

  //Name Section//
  // if($name.val()==""){
  //   alert("Name empty");
  //   status = false; 
  // }

  //return status;


$("form").submit(function(e){
  $('label span').remove();
  $('legend span').remove();
  $('label span').removeAttr("style");
  $('label').removeAttr("style");
  let status = true;


//activities section
if(checkboxStatus($(".activities :checked"))==false){
  $(".activities legend").append("<span style='color: red; font-weight:bold'> (please select an Activity)</span>");
  status = false;
}

//payment section
if($("#payment").val()==="credit card"){
  if($("#cc-num").val()==""|| $("#cc-num").val().length<13|| $("#cc-num").val().length>16|| isNaN($("#cc-num").val())==true){
      $("label[for='cc-num']").attr("style","color:red; font-weight:bold");
      status = false;
     }
  if($("#zip").val()==""|| $("#zip").val().length !=5|| isNaN($("#zip").val())==true){
      $("label[for='zip']").attr("style","color:red; font-weight:bold");
      status = false;
     }
  if($("#cvv").val()==""|| $("#cvv").val().length !=3|| isNaN($("#cvv").val())==true){
      $("label[for='cvv']").attr("style","color:red; font-weight:bold");
      status = false;
     }
}

 if(isValidForm() == false){
    event.preventDefault();
 }
//   return status;
 //});
if($("#design").val()==="Select Theme"){
  $(".shirt legend").append("<span style='color: red; font-weight:bold'> (Don't forget to pick a T-shirt)</span>");
  status = false;
}
 

$(function(){
  $("#myform").validate();    
  $("#myform").on('submit', function(e) {
      var isvalid = $("#myform").valid();
      if (isvalid) {
          e.preventDefault();
          alert(getvalues("myform"));
      }
  });
});

function getvalues(f)
{
  var form=$("#"+f);
  var str='';
  $("input:not('input:submit')", form).each(function(i){
      str+='\n'+$(this).prop('name')+': '+$(this).val();
  });
  return str;
}
 });
});
 


