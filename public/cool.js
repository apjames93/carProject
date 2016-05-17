$(document).ready(function() {
    var carData = '';
    var carMake = '';
    var carModel = '';
    var carYear = '';
    var engId= '';
    $.get("https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=jw8xqzaduaqsr5649c99gqny", function(data) {
        carData = data;
        for (var i = 0; i < data.makes.length; i++) {
            $('.car-make').append("<option name='role' value='" + data.makes[i].id + "'>" + data.makes[i].name + " </option>")
        };
    })
    $(".car-make").on("change", function() {
        var id = $(this).val();
        $(".car-model").empty()
        $(".car-year").empty()
        $('.car-model').append("<option>pick a model </option>")
        for (var i = 0; i < carData.makes.length; i++) {
            if (carData.makes[i].id == id) {
                carMake = carData.makes[i];

                for (var model = 0; model < carMake.models.length; model++) {

                    $('.car-model').append(
                        "<option name='role' value='" + carMake.models[model].id + "'>" + carMake.models[model].name + " </option>"
                    )
                }
            }
        }
    })
    $(".car-model").on("change", function() {
        var modelId = $(this).val();
        $(".car-year").empty()
        $('.car-year').append("<option>pick a year </option>")
        for (var i = 0; i < carMake.models.length; i++) {
            if (carMake.models[i].id == modelId) {
                carModel = carMake.models[i];
                for (var i = 0; i < carModel.years.length; i++) {

                    $('.car-year').append(
                        "<option name='role' value='" + carModel.years[i].id + "'>" + carModel.years[i].year + " </option>"
                    )
                }

            }
        }
    })
    $(".car-year").on("change", function() {
        var yearId = $(this).val()
        for (var i = 0; i < carModel.years.length; i++) {
            if (carModel.years[i].id == yearId) {
                carYear = carModel.years[i].year

            }
        }
    })
    $('.submit').on("click", function() {
$(".car-trim").empty()
$('.car-trim').append("<option>pick trim </option>")
        $.get("https://api.edmunds.com/api/vehicle/v2/" + carMake.name + "/" + carModel.name + "/" + carYear + "?fmt=json&api_key=jw8xqzaduaqsr5649c99gqny", function(data1) {
            for (var i = 0; i < data1.styles.length; i++) {
                $('.car-trim').append(
                    "<option name='role' value='" + data1.styles[i].id + "'>" + data1.styles[i].name + " </option>"
                )
            }
        })
    })
    $(".car-trim").on("change", function() {
      $(".eng").empty()
      $(".tranny").empty()
        var carTrim = $(this).val()
        $.get("https://api.edmunds.com/api/vehicle/v2/styles/" + carTrim + "/engines?fmt=json&api_key=jw8xqzaduaqsr5649c99gqny", function(data) {
            var eng = data.engines[0];
            engId = data.engines[0].id;
            for (var key in eng) {
                if (typeof eng[key] === "object") {
                    for (var innerKey in eng[key]) {

                        $(".eng").append(
                            "<li>" + innerKey + ": " + eng[key][innerKey] + "</li>")
                    }
                } else {

                    var value = eng[key];
                    $(".eng").append(
                        "<li>" + key + ": " + value + "</li>"
                    )
                }
            }
        })
        $.get("https://api.edmunds.com/api/vehicle/v2/styles/" + carTrim + "/transmissions?fmt=json&api_key=jw8xqzaduaqsr5649c99gqny", function(data) {
            var tranny = data.transmissions[0]
            for (var key in tranny) {
                var value = tranny[key];
                $(".tranny").append("<li>" + key + ": " + value + "</li>")
            }
        })
    })
  //   $(".find-eng").on("click", function(){
  //
  //     $.get("https://api.edmunds.com/api/vehicle/v2/engines/"+ engId +"?fmt=json&api_key=jw8xqzaduaqsr5649c99gqny", function(data){
  //       console.log(data)
  //   })
  // })
})
