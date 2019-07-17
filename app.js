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
 const $activities =$('#activities');
 const $total = $('#total');
 const $error = $('#errorMessage');

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

  //validating all required fields
  validate($("#name")[0]);
  validate($("#mail")[0]);
  //validate($(".activities")[0]);

  //validate payment if credit card is selected//
  if ($("#payment").val() == "credit card") {
    validate($("#cc-num")[0]);
    validate($("#zip")[0]);
    validate($("#cvv")[0]);
  }

  //if no errors exists, as in no error-classes found => submit
  if ($(".error").length == 0){
    $("form").submit();
  } //else => errors will display, and form will not submit
});
  
  function handleError (errorTarget, errorMessage) {
  
  if ($(errorTarget).hasClass("activities")) { 
    text = $("#activities-legend");
  } else { 
         text = $("label[for='" + errorTarget.id + "']");
    }
  
  $(text).find("span").remove(); 
  
  if (errorMessage != "") { 
    text.html(text.html() + 
      "<span class='message'>\u2718 " + errorMessage + "</span>");
    $(errorTarget).addClass("error"); 
  } else { 
     //display a checkmark//
      text.html(text.html() +
        "<span class='message'>\u2714 " + "</span>");
      $(errorTarget).removeClass("error"); 
    }
  }
  });
