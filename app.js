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
 const $title = $('#title');
 const $ccNum = $('#cc-num');
 const $zip = $('#zip');
 const $cvv = $('#cvv');
 const $submit = $('#submit');
 const $messageFirstName = 'Please enter your first name.';
 const $messageLastName = 'Please enter your last name.';
 const $validate = $('#validate');
 const $validateEmail =$('#validate-email');
 const $cc = $('#credit-card');
 const $error = $('#error');
 var activitycounter;
 var submitcounter;


//selecting the "name" element and calling focus to it//
$( document ).ready(function() {
  $( "#firstName" ).focus();


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

//If Other field is selected, ensure job title is entered//
// if ( ($("#title").val() == "other") && ($("#other-title").val() === "") ) {
//   $("#other-title").after("<p id='titleerror' class='errortext'>Please enter your job role.</p>");
//   $("#titleerror").hide();
//   $('#other-title').on('focusout', function() {
//     if ($('#other-title').val() === '') {
//       $("#titleerror").show();
//       $('#other-title').css('border-color', '#ff0000');
//       $('#other-title').addClass('error'); 
//     } else {
//       $('#other-title').css('border-color', '#00ff0c');
//       $('#other-title').removeClass('error');
//       $("#titleerror").hide();
//     }

  
// });
//}

// //*T-SHIRT SECTION*//
//hide color-option when nothing is selected//
$("#colors-js-puns").hide();
$("#design option").eq(0).hide();  
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

const ccErrorSpan = $('<div>');
$('#exp-month').prev().before(ccErrorSpan);
$("option[value='select_method']").remove();

//hide payment information for the other two options//
$("#paypal").hide();
$("#bitcoin").hide();

//display payment sections based on chosen payment option//
$("#payment").change(function(){
    //clear any existing error messages//
    $("#ccerror").remove();
    $("#paydetailserror").remove();
    $(this).val() === "credit card" ? $("#credit-card").show() : $("#credit-card").hide();
    $(this).val() === "paypal" ? $("#paypal").show() : $("#paypal").hide();
    $(this).val() === "bitcoin" ? $("#bitcoin").show() : $("#bitcoin").hide();
});

//add focus to first name and last name, an error should be a red border if no input and green when input is correct//  
$("#firstName").after("<p id='firstNameerror' class='errortext'>Please enter your first name.</p>")
$("#firstNameerror").hide();

function isFirstNameValid() {
    if ($('#firstName').val() === '') {
      $("#firstNameerror").show();
      $('#firstName').css('border-color', '#ff0000');
      $('#firstName').addClass('error');
      return false;  
    } else {
      $('#firstName').css('border-color', '#00ff0c');
      $('#firstName').removeClass('error');
      $("#firstNameerror").hide();
      return true;
    }
}

$('#firstName').on('focusout', function() {
  isFirstNameValid(); 
});


$("#lastName").after("<p id='lastNameerror' class='errortext'>Please enter your last name.</p>");
$("#lastNameerror").hide();

function isLastNameValid() {
      if ($('#lastName').val() === '') {
        $("#lastNameerror").show();
        $('#lastName').css('border-color', '#ff0000');
        $('#lastName').addClass('error');
        return false;  
      } else {
        $('#lastName').css('border-color', '#00ff0c');
        $('#lastName').removeClass('error');
        $("#lastNameerror").hide();
        return true; 
      }
}

$('#lastName').on('focusout', function() {
  isLastNameValid(); 
});

  //validating email,if email is invalid an error should show an alert to the user//
function isEmailValid() {
    var email = $("#email").val();
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
      alert('Please provide a valid email address');
      $("#error_email").text(email+" is not a valid email");
      email.focus;
      return false;
   } else {
       $("#error_email").text("");
       return true; 
   }
}

$("#email").on('focusout',function() {
  isEmailValid(); 
}); 

function isActivitiesValid() {
  if ($(".activities input:checkbox:checked").length === 0) {
    alert('Please choose an activity');
    return false; 
  } else {
    return true; 
  }
}
  //validating Credit Card Number, if no input then credit card section's border will be red and then green once correct info is added//
 // $("#cc-num").after("<p id='cc-numerror' class='errortext'>Please enter your credit card information.</p>"); 
  //$("#cc-numerror").hide();

function isCreditCardValid () {
   let ccNum = $("#cc-num").val(); 
   let ccNumWithoutSpaces = ccNum.replace(/-|\s/g,"")
   let ccRegex = /^[0\d][0-9]{12,15}$/

  if ($('#payment option[value = "credit card"]').prop('selected')) {
    if ($('#cc-num').val() === '' || ccRegex.test(ccNumWithoutSpaces) === false) {
      $('#cc-num').css('border-color', '#ff0000');
      $('#cc-num').addClass('error');
      ccErrorSpan.text('Please enter your credit card information.');
      return false; 
    } else {
      $('#cc-num').css('border-color', '#00ff0c');
      $('#cc-num').removeClass('error');
      ccErrorSpan.hide();
      return true; 
    }
  }
}

$('#cc-num').on('focusout', function() {
  isCreditCardValid(); 
}); 

//zip validations, if no zip code is entered a red border will show and form will not submit until the correct zip format is added//
// $("#zip").after("<p id='ziperror' class='errortext'>Please enter your zip code.</p>");
// $("#ziperror").hide();

function isZipValid() {
    let zip = $('#zip').val()
    let zipRegex = /^[0\d][0-9]{4}$/

  if ($('#payment option[value = "credit card"]').prop('selected')) {
    if ($('#zip').val() === '' || zipRegex.test(zip) === false) {
      //$("#ziperror").show();
      $('#zip').css('border-color', '#ff0000');
      $('#zip').addClass('error');
      ccErrorSpan.text('Please enter your zip code.');
      return false; 
    } else {
      $('#zip').css('border-color', '#00ff0c');
      $('#zip').removeClass('error');
      $("#ziperror").hide();
      ccErrorSpan.hide();
      return true; 
    }
  }
}

$('#zip').on('focusout', function() {
  isZipValid(); 
}); 

function isCvvValid() {
    let cvv = $('#cvv').val()
    let cvvRegex = /^[0\d][0-9]{2}$/

 if ($('#payment option[value = "credit card"]').prop('selected')) {
    if ($('#cvv').val() === '' || cvvRegex.test(cvv) === false) {
      $('#cvv').css('border-color', '#ff0000');
      $('#cvv').addClass('error'); 
      ccErrorSpan.text('Please enter your cvv');
      return false; 
    } else {
      $('#cvv').css('border-color', '#00ff0c');
      $('#cvv').removeClass('error');
      ccErrorSpan.hide();
      return true; 
    }
  }
}

$('#cvv').on('focusout', function() {
  isCvvValid(); 
}); 


// if ($('#firstName').val()==''){
//   alert('Please add your first name');
// }

//**Form validation,an error messages should show and don't let the user submit//
$("form").on("submit", function(e){

if (isFirstNameValid() === false || isLastNameValid() === false || isEmailValid() === false || isCreditCardValid() === false || isZipValid() === false || isCvvValid() === false || isActivitiesValid() === false) {
  e.preventDefault(); 
  isFirstNameValid(); 
  isLastNameValid();
  isEmailValid(); 
  isActivitiesValid(); 
  isCreditCardValid(); 
  isZipValid();
  isCvvValid(); 
} else {
  console.log("Registration accepted");//alert for user//
  alert("Registration accepted");
}


  //   if ($('p:contains("Please check if text boxes are filled in, then click Register again.")').length>0 || $('p:contains("Please check at least one checkbox and click Register again.")').length>0) {
  //     $('p:contains("Please check if text boxes are filled in, then click Register again.")').hide();
  //   }
  //   var hasError=$('#firstName').hasClass('error') || $('#lastName').hasClass('error') || $('#mail').hasClass('error') || $('#creditCard').hasClass('error') || $('#activities').hasClass('error');
  //   if (hasError) {
  //     $('button').after('<p>Please check if your information is filled in correctly, then click Register again.</p>');
  //     event.preventDefault(); 
  //   }
  //   //clear any existing error messages//
  //   //$("#firstNameerror").remove();
  //   //$("#lastNameerror").remove();
  //   // $("#titleerror").remove();
  //   // $("#activityerror").remove();
  //   // $("#paydetailserror").remove();
  //   // $("#ccserror").remove();
  //   // $("#mailerror").remove();

  //   // using variables to track problems with input//
  //    submitcounter = 0;
  //    activitycounter = 0;


  //   //At least one activity must be checked from the list under "Register for Actitivities."//

  //     $(".activities input").each(function(){
  //       if ($(this).is(":checked")) {
  //         activitycounter += 1;
  //       }
  //       return activitycounter;
  //     });

  //     if (activitycounter === 0){
  //       console.log("Activities section is unchecked");
  //       submitcounter += 1;
  //       $("#activities").after("<p id='activityerror' class='errortext'>Please select an activity.</p>");
  //     }

      
   

  // // check if the form can be submitted//
  //    if (submitcounter > 0) {
  //   e.preventDefault();
  //   console.log("Submit prevented");
  //   console.log(submitcounter);
  //   } else {
  //   console.log("Registration accepted");//alert for user//
  //   alert("Registration accepted");
  // }

 
 });
 });
