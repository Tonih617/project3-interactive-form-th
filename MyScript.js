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
 const $total =$('#total');


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

//real-time validation while using the form//
$(".activities").change ( () => {
  validate($(".activities")[0]);   

//   var totalCost = 0;
//   $('.activities').append('<div id="total"></div>');
  
  

  //disable if js-frameworks is selected and add it to cost//
  if ($("input[name='js-frameworks']").prop("checked")) {
    totalCost += 100;
    $("input[name='express']").attr("disabled", true);
  } else if ($("input[name='express']").prop("checked")) {
      totalCost += 100;
      $("input[name='js-frameworks']").attr("disabled", true);
    }

  //disable js-libs if selected and add to cost//
  if ($("input[name='js-libs']").prop("checked")) {
    totalCost += 100;
    $("input[name='node']").attr("disabled", true);
  } else if ($("input[name='node']").prop("checked")) {
      totalCost += 100;
      $("input[name='js-libs']").attr("disabled", true);
    }

  if ($("input[name='build-tools']").prop("checked")) {
    totalCost += 100;
  }

  if ($("input[name='npm']").prop("checked")) {
    totalCost += 100;
  }
   

    // create div with the total cost and append it to activities fieldset//
    if (total > 0) {
      let totalDiv = $('<div>');
      totalDiv.addClass('total');
      $(totalDiv).text('Total: ' + total + '$');
      $('fieldset.activities').append(totalDiv);
    }
  });


//**HIDE NON SELETED OPTIONS IN PAYMENT**//  
$("#paypal").hide();
$("#bitcoin").hide();

//SHOW AND OR HIDE SELECTED OPTIONS//
$("#payment").change( () => {
    validate($(".payment")[0]);

  if ($("#payment").val() == "credit card") {
    $("#credit-card").show();
    $("#paypal").hide();
    $("#bitcoin").hide();
  } else if ($("#payment").val() == "paypal") {
      $("#paypal").show();
      $("#credit-card").hide();
      $("#bitcoin").hide();
    } else if ($("#payment").val() == "bitcoin") {
        $("#bitcoin").show();
        $("#paypal").hide();
        $("#credit-card").hide();
      }
});

//**Calling the validated function**///

function validate (theTarget) {
  //validating name//
  if (theTarget.id == "name"){
    if ($(theTarget).val() == "") { 
      handleError(theTarget, "(empty)");
    } else { //no error
        handleError(theTarget,"");
      }
  }

  //validating email input//
  else if (theTarget.id == "mail"){
    const criteria = /\S+@\S+\.\S+/; //somebody@somewhere.com
    if ($(theTarget).val() == "") { 
      handleError(theTarget,"(empty)");
    } else if (criteria.test($(theTarget).val())) { 
        handleError(theTarget,""); 
      } else {
          handleError(theTarget,"(not valid)");
        }
  }

  //validating credit card number//
  else if (theTarget.id == "cc-num") {
    if ($(theTarget).val() == "") { 
      handleError(theTarget,"(empty)");
    } else if ($.isNumeric($(theTarget).val()) && 
        $(theTarget).val().length >= 13 && 
        $(theTarget).val().length <= 16) { 
          handleError(theTarget,""); 
        } else {
            handleError(theTarget,"(13-16 digits)");
          }
  }

  //validating cvv code//
  else if (theTarget.id == "cvv") {
    if ($(theTarget).val() == "") { 
      handleError(theTarget,"(empty)");
    } else if ($.isNumeric($(theTarget).val()) && 
        $(theTarget).val().length == 3) { 
          handleError(theTarget,"",false);
        } else {
            handleError(theTarget,"(3 digits)");
          }
  }

  

 //validating zip code//
 else if (theTarget.id == "zip") {
  if ($(theTarget).val() == "") { 
    handleError(theTarget,"(empty)");
  } else if ($.isNumeric($(theTarget).val()) && 
      $(theTarget).val().length == 5) { 
        handleError(theTarget,""); 
      } else {
          handleError(theTarget,"(5 digits)");
        }
}
}

//**Each error should have a errorTarget and a errorMessage**//
//**If no errorMessage is given then there is no errors**//

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

