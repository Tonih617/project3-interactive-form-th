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
 var activitycounter;
 var submitcounter;


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



//**Form validation,an error messages should show and don't let the user submit//
$("button[type='submit']").on("click", function(e){
    //clear any existing error messages//
    $("#nameerror").remove();
    $("#titleerror").remove();
    $("#activityerror").remove();
    $("#paydetailserror").remove();
    $("#ccserror").remove();
    $("#mailerror").remove();

    // using variables to track problems with input//
     submitcounter = 0;
     activitycounter = 0;



    //Name field can't be empty//
    if ($("#name").val() === "") {
      submitcounter += 1;
      $("#name").before("<p id='nameerror' class='errortext'>Please enter your name.</p>");
      $("#name").focus();
    }

    //If Other field is selected, ensure job title is entered//
    if ( ($("#title").val() == "other") && ($("#other-title").val() === "") ) {
      submitcounter += 1;
      $("#other-title").after("<p id='titleerror' class='errortext'>Please enter your job role.</p>");
    }

    //At least one activity must be checked from the list under "Register for Actitivities."//

      $(".activities input").each(function(){
        if ($(this).is(":checked")) {
          activitycounter += 1;
        }
        return activitycounter;
      });

      if (activitycounter === 0){
        submitcounter += 1;
        $(".activities").after("<p id='activityerror' class='errortext'>Please select an activity.</p>");
      }


    
    // If "Credit card" is the selected payment option, make sure the user adds correct input information//
      if ($("#payment").val() == "credit card" && ($("#cc-num").val() === "" || $("#zip").val() === "" || ("#cvv").val() === "") ) {
          console.log("Credit card fields are blank.");
          submitcounter += 1;
          $("#payment").after("<p id='paydetailserror' class='errortext'>Please complete your payment details.</p>");
      }


    //Email field must be a validly formatted e-mail address//
      var emailinput = $("#mail").val();
      //var emailformula = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      var emailformula = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!emailformula.test(emailinput)) {
        submitcounter += 1;
        $("#mail").before("<p id='mailerror' class='errortext'>Please enter a valid email.</p>");
      }

    //Validate credit card number//
      $("#cc-num").validateCreditCard(function(result){
          $("#ccerror").remove();
          console.log(result.valid);
          if ((result.valid === false) && ($("#cc-num").val() !== "")) {
            submitcounter += 1;
            $("#payment").after("<p id='ccerror' class='errortext'>Please enter a valid card number.</p>");
            // Clear payment details error//
            $("#paydetailserror").remove();
          } else {
            console.log("This is a valid credit card number");
          }
      });

  // check if the form can be submitted//
  if (submitcounter > 0) {
    e.preventDefault();
    console.log("Submit prevented");
    console.log(submitcounter);
  } else {
    console.log("Registration accepted");//alert for user//
    alert("Registration accepted");
  }

});
});

