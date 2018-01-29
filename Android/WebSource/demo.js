/* eslint no-alert: 0 */

'use strict';

//
// Here is how to define your module
// has dependent on mobile-angular-ui
//
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
//angular filesss
var app = angular.module('MYFabDiet', [
  'ngRoute',
  'mobile-angular-ui',

  // touch/drag feature: this is from 'mobile-angular-ui.gestures.js'.
  // This is intended to provide a flexible, integrated and and
  // easy to use alternative to other 3rd party libs like hammer.js, with the
  // final pourpose to integrate gestures into default ui interactions like
  // opening sidebars, turning switches on/off ..
  'mobile-angular-ui.gestures'
]);

app.run(function($transform) {
  window.$transform = $transform;
});

//
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false'
// in order to avoid unwanted routing.
//
app.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'home.html', reloadOnSearch: false});
  $routeProvider.when('/scroll', {templateUrl: 'scroll.html', reloadOnSearch: false});
  $routeProvider.when('/toggle', {templateUrl: 'toggle.html', reloadOnSearch: false});
  $routeProvider.when('/tabs', {templateUrl: 'tabs.html', reloadOnSearch: false});
  $routeProvider.when('/accordion', {templateUrl: 'accordion.html', reloadOnSearch: false});
  $routeProvider.when('/overlay', {templateUrl: 'overlay.html', reloadOnSearch: false});
  $routeProvider.when('/forms', {templateUrl: 'forms.html', reloadOnSearch: false});
  $routeProvider.when('/login', {templateUrl: 'login.html', reloadOnSearch: false});
  $routeProvider.when('/data', {templateUrl: 'data.html', reloadOnSearch: false});
});

//
// `$touch example`
//

app.directive('toucharea', ['$touch', function($touch) {
  // Runs during compile
  return {
    restrict: 'C',
    link: function($scope, elem) {
      $scope.touch = null;
      $touch.bind(elem, {
        start: function(touch) {
          $scope.containerRect = elem[0].getBoundingClientRect();
          $scope.touch = touch;
          $scope.$apply();
        },

        cancel: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        move: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        end: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        }
      });
    }
  };
}]);

//
// `$drag` example: drag to dismiss
//
app.directive('dragToDismiss', function($drag, $parse, $timeout) {
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem) {
        var dismiss = false;

        $drag.bind(elem, {
          transform: $drag.TRANSLATE_RIGHT,
          move: function(drag) {
            if (drag.distanceX >= drag.rect.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function() {
            elem.removeClass('dismiss');
          },
          end: function(drag) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() {
                scope.$apply(function() {
                  dismissFn(scope);
                });
              }, 300);
            } else {
              drag.reset();
            }
          }
        });
      };
    }
  };
});

//
// Another `$drag` usage example: this is how you could create
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
app.directive('carousel', function() {
  return {
    restrict: 'C',
    scope: {},
    controller: function() {
      this.itemCount = 0;
      this.activeItem = null;

      this.addItem = function() {
        var newId = this.itemCount++;
        this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
        return newId;
      };

      this.next = function() {
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
      };

      this.prev = function() {
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
      };
    }
  };
});

app.directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) {
        if (attr.type === 'text/javascript-lazy') {
          var code = elem.text();
          var f = new Function(code);
          f();
        }
      }
    };
  });

app.directive('carouselItem', function($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();

      var zIndex = function() {
        var res = 0;
        if (id === carousel.activeItem) {
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function() {
        return carousel.activeItem;
      }, function() {
        elem[0].style.zIndex = zIndex();
      });

      $drag.bind(elem, {
        //
        // This is an example of custom transform function
        //
        transform: function(element, transform, touch) {
          //
          // use translate both as basis for the new transform:
          //
          var t = $drag.TRANSLATE_BOTH(element, transform, touch);

          //
          // Add rotation:
          //
          var Dx = touch.distanceX;
          var t0 = touch.startTransform;
          var sign = Dx < 0 ? -1 : 1;
          var angle = sign * Math.min((Math.abs(Dx) / 700) * 30, 30);

          t.rotateZ = angle + (Math.round(t0.rotateZ));

          return t;
        },
        move: function(drag) {
          if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            elem.addClass('dismiss');
          } else {
            elem.removeClass('dismiss');
          }
        },
        cancel: function() {
          elem.removeClass('dismiss');
        },
        end: function(drag) {
          elem.removeClass('dismiss');
          if (Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            scope.$apply(function() {
              carousel.next();
            });
          }
          drag.reset();
        }
      });
    }
  };
});

app.directive('dragMe', ['$drag', function($drag) {
  return {
    controller: function($scope, $element) {
      $drag.bind($element,
        {
          //
          // Here you can see how to limit movement
          // to an element
          //
          transform: $drag.TRANSLATE_INSIDE($element.parent()),
          end: function(drag) {
            // go back to initial position
            drag.reset();
          }
        },
        { // release touch when movement is outside bounduaries
          sensitiveArea: $element.parent()
        }
      );
    }
  };
}]);

//
// For this trivial demo we have just a unique MainController
// for everything
//

app.controller('MainController', function($rootScope, $scope) {

  $scope.swiped = function(direction) {
    alert('Swiped ' + direction);
  };

  // User agent displayed in home page
  $scope.userAgent = navigator.userAgent;

  // Needed for the loading screen
  $rootScope.$on('$routeChangeStart', function() {
    $rootScope.loading = true;
  });

  $rootScope.$on('$routeChangeSuccess', function() {
    $rootScope.loading = false;
  });

  // Fake text i used here and there.
  $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
    'Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum ' +
    'corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';

  //
  // 'Scroll' screen
  //
  var scrollItems = [];

  for (var i = 1; i <= 100; i++) {
    scrollItems.push('Item ' + i);
  }

  $scope.scrollItems = scrollItems;

  $scope.bottomReached = function() {
    alert('Congrats you scrolled to the end of the list!');
  };

  //
  // Right Sidebar
  //
  $scope.chatUsers = [
    {name: 'Carlos  Flowers', online: true},
    {name: 'Byron Taylor', online: true},
    {name: 'Jana  Terry', online: true},
    {name: 'Darryl  Stone', online: true},
    {name: 'Fannie  Carlson', online: true},
    {name: 'Holly Nguyen', online: true},
    {name: 'Bill  Chavez', online: true},
    {name: 'Veronica  Maxwell', online: true},
    {name: 'Jessica Webster', online: true},
    {name: 'Jackie  Barton', online: true},
    {name: 'Crystal Drake', online: false},
    {name: 'Milton  Dean', online: false},
    {name: 'Joann Johnston', online: false},
    {name: 'Cora  Vaughn', online: false},
    {name: 'Nina  Briggs', online: false},
    {name: 'Casey Turner', online: false},
    {name: 'Jimmie  Wilson', online: false},
    {name: 'Nathaniel Steele', online: false},
    {name: 'Aubrey  Cole', online: false},
    {name: 'Donnie  Summers', online: false},
    {name: 'Kate  Myers', online: false},
    {name: 'Priscilla Hawkins', online: false},
    {name: 'Joe Barker', online: false},
    {name: 'Lee Norman', online: false},
    {name: 'Ebony Rice', online: false}
  ];

  //
  // 'Forms' screen
  //
 /* $scope.rememberMe = true;
  $scope.email = 'me@example.com';

  $scope.login = function() {
    alert('You submitted the login form');
  };*/

  //
  // 'Drag' screen
  //
  $scope.notices = [];

  for (var j = 0; j < 10; j++) {
    $scope.notices.push({icon: 'envelope', message: 'Notice ' + (j + 1)});
  }

  $scope.deleteNotice = function(notice) {
    var index = $scope.notices.indexOf(notice);
    if (index > -1) {
      $scope.notices.splice(index, 1);
    }
  };

  
});

app.controller('CalController', function($rootScope, $scope, $http, $location, $httpParamSerializer) {
  $scope.Zone = 2
   $scope.checkboxModel = {
       value1 : 'null',
       value2 : 'null',
       value3 : 'null',
       value4 : 'null',
       value5 : 'null'
     };
     $scope.myValue = false
     $scope.myValue2 = true
  $scope.myFunc = function() {
        
        // alert($scope.calories)
        $scope.pro_per = document.getElementById("protein_percent").innerHTML
        $scope.fat_per = document.getElementById("fat_percent").innerHTML
        $scope.carb_per = document.getElementById("carb_percent").innerHTML
        $scope.pro_val = document.getElementById("protein_cals").innerHTML
        $scope.fat_val = document.getElementById("fat_cals").innerHTML
        $scope.carb_val = document.getElementById("carb_cals").innerHTML
        var jsonS={
                  pro_p:$scope.pro_per,
                  carb_p: $scope.carb_per,
                  fat_p:$scope.fat_per,
                  fat_g: $scope.fat_val,
                  pro_g:$scope.pro_val,
                  carb_g:$scope.carb_val,
                  zone: $scope.Zone
                  
               }
        $scope.fg = []
        if($scope.checkboxModel.value1 != 'null')
          $scope.fg.push('1100')
        if($scope.checkboxModel.value2 != 'null')
          $scope.fg.push('1800')
        if($scope.checkboxModel.value3 != 'null')
          $scope.fg.push('0100')
        if($scope.checkboxModel.value4 != 'null')
          $scope.fg.push('0800')
        if($scope.checkboxModel.value5 != 'null')
          $scope.fg.push('0900')
        jsonS.fg=$scope.fg
        if($scope.fg.length == 0)
          $scope.message = 'Enter the Food Group'
        console.log(JSON.stringify(jsonS))
         // $http:post("127.0.0.1:3000/nutr", $httpParamSerializer(jsonS)).success( function(response) {
         //    $scope.students = response; 
         //    alert(JSON.stringify($scope.students))
         // });

         $http({
              method : "POST",
              url : "http://129.21.94.106:3000/nutr",
              data :  jsonS,
              headers: {'Content-Type': 'application/json'}
          }).then(function mySuccess(response) {
              $scope.response = response.data[0];
              $scope.dataArray = $scope.response 
              $scope.valueArray = response.data[1];
              $scope.repeatData = $scope.dataArray.map(function(value, index) {
                  return {
                      data: value,
                      value: $scope.valueArray[index]
                  }
              });
              $scope.loading = false;
              console.log(JSON.stringify($scope.repeatData))
              $scope.myValue = true
              $scope.myValue2 = false
          }, function myError(response) {
                // alert("Something went wrong" +JSON.stringify(response))
                $scope.myValue = false
                $scope.myValue2 = true
                $scope.message = "Something went wrong"

          });
    
         // $http.post('127.0.0.1:3000/nutr', jsonS).success(function(response) {
         //    $scope.response = response;
         //    $scope.loading = false;
         //    alert(JSON.stringify($scope.response))
          // });
      //   $http.post("127.0.0.1:3000/nutr", jsonS).success(function(data, status, headers, config) {
      //   // this callback will be called asynchronously
      //   // when the response is available
      //   console.log(data);
      // }).error(function(data, status, headers, config) {
      //   // called asynchronously if an error occurs
      //   // or server returns response with an error status.
      // });
        // $location.path( "/data" );



        // alert($scope.pro_val)
    };
    $scope.zone = function(valUE) {
        
        // alert(valUE)
        $scope.Zone= valUE
        // $scope.pro_per = document.getElementById("protein_percent").innerHTML
        // $scope.fat_per = document.getElementById("fat_percent").innerHTML
        // $scope.carb_per = document.getElementById("carb_percent").innerHTML
        // $scope.pro_val = document.getElementById("protein_cals").innerHTML
        // $scope.fat_val = document.getElementById("fat_cals").innerHTML
        // $scope.carb_val = document.getElementById("carb_cals").innerHTML


        // alert($scope.pro_val)
    };
   //  $http:post("127.0.0.1:3000/nutr", $httpParamSerializer(jsonS)).success( function(response) {
   //    $scope.students = response; 
   //    alert(JSON.stringify($scope.students))
   // });


  });
app.controller('logController', function($scope) {
   $scope.rememberMe = true;
    $scope.emailid = 'me@example.com';

    $scope.login = function() {
      alert('You submitted the login form');
    };

  });

