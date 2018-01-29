function populateTotalPercent(e, a) {
    if ("carb" == a) l = e + parseInt($("#protein_slider").slider("value")) + parseInt($("#fat_slider").slider("value"));
    else if ("protein" == a) l = e + parseInt($("#carb_slider").slider("value")) + parseInt($("#fat_slider").slider("value"));
    else if ("fat" == a) var l = e + parseInt($("#carb_slider").slider("value")) + parseInt($("#protein_slider").slider("value"));
    l > 100 ? $("#total_percent").removeClass("label-success label-warning").addClass("label-danger") : l < 100 ? $("#total_percent").removeClass("label-success label-danger").addClass("label-warning") : $("#total_percent").removeClass("label-warning label-danger").addClass("label-success"), $("#total_percent").text(l + "%")
}

function setupSlider(e, a, l) {
    $("#" + e + "_slider").slider({
        value: a,
        min: 0,
        max: 100,
        step: 1,
        slide: function(a, t) {
            $(".btn").button("reset"), $("#" + e + "_percent").text(t.value + "%"), populateTotalPercent(t.value, e), fillInCalorieAmounts(t.value, l, e)
        },
        change: function(a, t) {
            $("#presets > .btn").removeClass("active"), $("#" + e + "_percent").text(t.value + "%"), populateTotalPercent(t.value, e), fillInCalorieAmounts(t.value, l, e)
        }
    }), $("#" + e + "_percent").text($("#" + e + "_slider").slider("value") + "%")
}

function popupSliderCals() {
    $("div#displayCalsAmount > span").text($("#calories").val()), $("div#displayCalsAmount").show(), fillInCalorieAmounts($("#carb_slider").slider("value"), 4, "carb"), fillInCalorieAmounts($("#protein_slider").slider("value"), 4, "protein"), fillInCalorieAmounts($("#fat_slider").slider("value"), 9, "fat")
}

function fillInCalorieAmounts(e, a, l) {
    var t = $("#calories").val();
    if ($.isNumeric(t)) {
        t = parseFloat(t);
        var s = Math.round(t * e * .01 / a);
        $("#" + l + "_cals").text(s);
        var i = $("#meals_per_day_input").val();
        $.isNumeric(i) && $("#" + l + "_cals_per_meal").text(Math.round(s / i))
    }
}

function moveSliders(e, a, l) {
    $("#carb_slider").slider("value", e), $("#protein_slider").slider("value", a), $("#fat_slider").slider("value", l)
}

function calcDailyCals() {
    var e = "standard" === $("input[name='units']:checked").val(),
        a = validateDailyCalsValues(e);
    if (a) alert(a);
    else {
        var l = 0,
            t = parseFloat($("#weight").val());
        e && (t *= .453592);
        var s = parseFloat($("#feet_cm").val());
        e && (s = 30.48 * s + 2.54 * parseFloat($("#inches").val()));
        var i = parseFloat($("#age").val()),
            r = $("input[name='sex']:checked").val(),
            n = $("#activity_level").val();
        l = "male" == r ? 88.362 + 13.397 * t + 4.799 * s - 5.677 * i : 447.593 + 9.247 * t + 3.098 * s - 4.33 * i, "no" === n ? l *= 1.2 : "light" === n ? l *= 1.375 : "moderate" === n ? l *= 1.55 : "heavy" === n ? l *= 1.725 : "extreme" === n && (l *= 1.9);
        var o = Math.round(l + parseInt($("#gain_loss_amount").val()));
        $("#calAmount").text(o > 1200 ? o : 1200), $("#modalMessage").hide(), $("#dc_results").show()
    }
}

function validateDailyCalsValues(e) {
    var a = "";
    $.isNumeric($("#age").val()) || (a += "Age value must be a number\n"), $.isNumeric($("#weight").val()) || (a += "Weight value must be a number\n"), $.isNumeric($("#feet_cm").val()) || (a += e ? "Feet " : "Height ", a += "value must be a number\n");
    var l = $("#inches").val();
    return !e || $.isNumeric(l) || parseFloat(l) < 12 || (a += "Inches value must be a number less than 12\n"), a
}

function copyVal(e) {
    $("#calories").val($("#" + e).text()), $("#myDailyCals").modal("hide"), setTimeout(popupSliderCals, 1e3)
}
$(function() {
    function e(e) {
        var a = $("#gain_loss_amount");
        a.empty(), $.each(e, function(e, l) {
            var t = {
                value: l
            };
            0 === l && (t.selected = "selected"), a.append($("<option></option>").attr(t).text(e))
        })
    }
    var a = {
            "Lose 2 Pounds per Week": -1e3,
            "Lose 1.5 Pounds per Week": -750,
            "Lose 1 Pounds per Week": -500,
            "Lose 0.5 Pounds per Week": -250,
            "Stay the Same Weight": 0,
            "Gain 0.5 Pound per Week": 250,
            "Gain 1 Pound per Week": 500,
            "Gain 1.5 Pounds per Week": 750,
            "Gain 2 Pounds per Week": 1e3
        },
        l = {
            "Lose 1 Kg per Week": -1100,
            "Lose 0.75 Kg per Week": -825,
            "Lose 0.5 Kg per Week": -550,
            "Lose 0.25 Kg per Week": -275,
            "Stay the Same Weight": 0,
            "Gain 0.25 Kg per Week": 275,
            "Gain 0.5 Kg per Week": 550,
            "Gain 0.75 Kg per Week": 825,
            "Gain 1 Kg per Week": 1100
        };
    setupSlider("carb", 50, 4), setupSlider("protein", 30, 4), setupSlider("fat", 20, 9), $("#gramsPerMeal").change(function() {
        this.checked ? ($("#numberMeals").slideDown("slow"), $("#macro_table th:nth-child(3)").show(), $("#macro_table td:nth-child(4)").show()) : ($("#numberMeals").slideUp("slow"), $("#macro_table th:nth-child(3)").hide(), $("#macro_table td:nth-child(4)").hide())
    }), $("#calculateBtn").click(function() {
        var e = $("#calories").val();
        $.isNumeric(e) ? popupSliderCals() : alert("Please enter a valid calorie amount")
    }), $("#presets > .btn").click(function() {
        $("#presets > .btn").removeClass("active"), $(this).toggleClass("active")
    }), $("#sex > .btn").click(function() {
        $("#sex > .btn").removeClass("active"), $(this).toggleClass("active")
    }), $('input[name="units"]').change(function() {
        "standard" === $(this).val() ? ($("#weigth_units").text("Pounds"), $("#height_units").text("Feet"), $(".inches").show(), e(a)) : ($("#weigth_units").text("Kg"), $("#height_units").text("Cm"), $(".inches").hide(), e(l))
    }), e(a), $("#calories").focus()
});