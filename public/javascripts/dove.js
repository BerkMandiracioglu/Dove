var app = angular.module('Vidzy', ['ngResource', 'ngRoute']);
var pls,pls1,pls2,pls3,pls4,pls5,pls6,pls7;


app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        
        .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'HomeCtrl'
})
      
         
          .when('/loginPage', {
    templateUrl: 'partials/login.html',
    controller: 'loginctrl'
})
           .when('/mainPage', {
    templateUrl: 'partials/mainPage.html'
  
})
           .when('/inboxPage', {
    templateUrl: 'partials/inboxPage.html',
    controller: 'inboxCtrl'
    
})
            .when('/outboxPage', {
    templateUrl: 'partials/outboxPage.html',
    controller: 'outboxCtrl'
})
                .when('/messagePage', {
    templateUrl: 'partials/messagePage.html',
     controller: 'HomeCtrl'
})
         .when('/signupPage', {
            templateUrl: 'partials/signup.html',
            controller: 'AddVideoCtrl'
        })
         .when('/outboxPageAdmin', {
            templateUrl: 'partials/outboxPageAdmin.html',
            controller: 'outboxCtrl'
        })
         .when('/inboxPageAdmin', {
            templateUrl: 'partials/inboxPageAdmin.html',
            controller: 'inboxCtrl'
        })
         .when('/messagePageAdmin', {
            templateUrl: 'partials/messagePageAdmin.html',
            controller: 'xdCtrl'
        })
         .when('/logPageAdmin', {
            templateUrl: 'partials/logPageAdmin.html',
            controller: 'logyCtrl'
        })
         .when('/mainPageAdmin', {
            templateUrl: 'partials/mainPageAdmin.html',
            
        })
            .when('/deleteAdmin', {
    templateUrl: 'partials/deleteAdmin.html',
    controller: 'deleteCtrl'
})
        .otherwise({
            redirectTo: '/'
        });
}]);
app.controller('HomeCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var Users = $resource('/api/userss');
        Users.query(function(userss){
            $scope.userss = userss;
        });
    }]);
app.controller('xdCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var Users = $resource('/api/userss/xd');
        Users.query(function(userss){
            $scope.userss = userss;
        });
    }]);
app.controller('deleteCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var Users = $resource('/api/userss/delete');
        Users.query(function(userss){
            $scope.userss = userss;
        });
    }]);
app.controller('inboxCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var Users = $resource('/api/userss/listInbox');
        Users.query(function(userss){
            $scope.userss = userss;
        });
    }]);
app.controller('logyCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var Users = $resource('/api/userss/logy');
        Users.query(function(userss){
            $scope.userss = userss;
        });
    }]);

app.controller('logoutCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.logo = function(){
             
            var Videos = $resource('/api/userss/logout');
            Videos.save({}, function(){
                 $location.path('/loginPage');
            });
        };
    }]);
app.controller('outboxCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var Users = $resource('/api/userss/listOutbox');
        Users.query(function(userss){
            $scope.userss = userss;
        });
    }]);

app.controller('ctrlx', ['$scope', '$resource', 
    function($scope, $resource){
        
        $scope.clii = function(){
          
        $scope.hehe="-password";
    };

    }]);


app.controller('AddVideoCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Videos = $resource('/api/userss/sign');
            Videos.save($scope.users, function(memss){
                if(memss.admin==0){
                    
                 $location.path('/mainPage');
             }
             else{
               
                $location.path('/mainPageAdmin');
            }
            });
        };
    }]);

app.controller('loginctrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.logi = function(){
            
            var Videos = $resource('/api/userss/login');
            Videos.save($scope.users, function(memss){
                 if(memss.admin==0){
                   
                 $location.path('/mainPage');
             }
             else{
               
                $location.path('/mainPageAdmin');
            }
            });
        };
    }]);

app.controller('messageCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.messa = function(){
            var Videos = $resource('/api/userss/message');
            Videos.save($scope.messages, function(){
                $location.path('/');
            });
        };
    }]);


app.controller('DeleteVideoCtrl', ['$scope', '$resource', '$location','$route',
    function($scope, $resource, $location,$route){
        $scope.isSelected = function() {
    
    $scope.userss.forEach(function(user) {
        if (user.selected){
           
            var Videos = $resource('/api/userss/deleted');
           
            Videos.save( {},  {username: user.username});

        }

    });
    $route.reload();
    
};


        
    }]);


app.controller('myCtrl',['$scope', '$resource', '$location', function($scope,$resource, $location) {
   
   $scope.cli = function() {
    pls = $scope.user.username;
   }
  $scope.searchChanged = function() {

    var Videos = $resource('/api/userss/change');
             
            
            Videos.save( {},  {username: pls,newusername:$scope.user.newusername});
            pls=$scope.user.newusername;
  }
}]).directive('contenteditable', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elm, attr, ngModel) {

      function updateViewValue() {
        ngModel.$setViewValue(this.innerHTML);
      }

      //Or bind it to any other events
      elm.on('keyup', updateViewValue);

      scope.$on('$destroy', function() {
        elm.off('keyup', updateViewValue);
      });

     

    }
  }
});
app.controller('myCtrl1',['$scope', '$resource', '$location', function($scope,$resource, $location) {
   
   $scope.cli = function() {
    //pls1 = $scope.user.username;
   }
  $scope.searchChanged = function() {

    var Videos = $resource('/api/userss/change1');
            
             
            Videos.save( {},  {username: $scope.user.username,newpassword:$scope.user.newpassword});
           // pls1=$scope.user.newpassword;
  }
}]).directive('contenteditable', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elm, attr, ngModel) {

      function updateViewValue() {
        ngModel.$setViewValue(this.innerHTML);
      }

      //Or bind it to any other events
      elm.on('keyup', updateViewValue);

      scope.$on('$destroy', function() {
        elm.off('keyup', updateViewValue);
      });

     

    }
  }
});
app.controller('myCtrl2',['$scope', '$resource', '$location', function($scope,$resource, $location) {
   
   $scope.cli = function() {
    //pls2 = $scope.user.username;
   }
  $scope.searchChanged = function() {

    var Videos = $resource('/api/userss/change2');
             console.log($scope.user.username);
             console.log($scope.user.newname);
            Videos.save( {},  {username: $scope.user.username,newname:$scope.user.newname});
            //pls2=$scope.user.newname;
  }
}]).directive('contenteditable', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elm, attr, ngModel) {

      function updateViewValue() {
        ngModel.$setViewValue(this.innerHTML);
      }

      //Or bind it to any other events
      elm.on('keyup', updateViewValue);

      scope.$on('$destroy', function() {
        elm.off('keyup', updateViewValue);
      });

     

    }
  }
});
app.controller('myCtrl3',['$scope', '$resource', '$location', function($scope,$resource, $location) {
   
   $scope.cli = function() {
    //pls7 = $scope.user.username;
   }
  $scope.searchChanged = function() {

    var Videos = $resource('/api/userss/change3');
             console.log($scope.user.username);
             console.log($scope.user.newsurname);
            Videos.save( {},  {username: $scope.user.username,newsurname:$scope.user.newsurname});
           // pls7=$scope.user.newsurname;
  }
}]).directive('contenteditable', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elm, attr, ngModel) {

      function updateViewValue() {
        ngModel.$setViewValue(this.innerHTML);
      }

      //Or bind it to any other events
      elm.on('keyup', updateViewValue);

      scope.$on('$destroy', function() {
        elm.off('keyup', updateViewValue);
      });

     

    }
  }
});
app.controller('myCtrl4',['$scope', '$resource', '$location', function($scope,$resource, $location) {
   
   $scope.cli = function() {
    //pls3 = $scope.user.username;
   }
  $scope.searchChanged = function() {

    var Videos = $resource('/api/userss/change4');
             console.log($scope.user.username);
             console.log($scope.user.newusername);
            Videos.save( {},  {username: $scope.user.username,newdate:$scope.user.newdate});
            //pls3=$scope.user.newdate;
  }
}]).directive('contenteditable', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elm, attr, ngModel) {

      function updateViewValue() {
        ngModel.$setViewValue(this.innerHTML);
      }

      //Or bind it to any other events
      elm.on('keyup', updateViewValue);

      scope.$on('$destroy', function() {
        elm.off('keyup', updateViewValue);
      });

     

    }
  }
});

app.controller('myCtrl5',['$scope', '$resource', '$location', function($scope,$resource, $location) {
   
   $scope.cli = function() {
    //pls4 = $scope.user.username;
   }
  $scope.searchChanged = function() {

    var Videos = $resource('/api/userss/change5');
             console.log($scope.user.username);
             console.log($scope.user.newgender);
            Videos.save( {},  {username: $scope.user.username,newgender:$scope.user.newgender});
           // pls4=$scope.user.newgender;
  }
}]).directive('contenteditable', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elm, attr, ngModel) {

      function updateViewValue() {
        ngModel.$setViewValue(this.innerHTML);
      }

      //Or bind it to any other events
      elm.on('keyup', updateViewValue);

      scope.$on('$destroy', function() {
        elm.off('keyup', updateViewValue);
      });

     

    }
  }
});


app.controller('myCtrl6',['$scope', '$resource', '$location', function($scope,$resource, $location) {
   
   $scope.cli = function() {
   // pls5 = $scope.user.username;
   }
  $scope.searchChanged = function() {

    var Videos = $resource('/api/userss/change6');
             console.log($scope.user.username);
             console.log($scope.user.newemail);
            Videos.save( {},  {username: $scope.user.username,newemail:$scope.user.newemail});
            //pls5=$scope.user.newemail;
  }
}]).directive('contenteditable', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elm, attr, ngModel) {

      function updateViewValue() {
        ngModel.$setViewValue(this.innerHTML);
      }

      //Or bind it to any other events
      elm.on('keyup', updateViewValue);

      scope.$on('$destroy', function() {
        elm.off('keyup', updateViewValue);
      });

     

    }
  }
});
app.controller('myCtrl7',['$scope', '$resource', '$location', function($scope,$resource, $location) {
   
   $scope.cli = function() {
    //pls6 = $scope.user.username;
   }
  $scope.searchChanged = function() {

    var Videos = $resource('/api/userss/change7');
             console.log($scope.user.username);
             console.log($scope.user.newadmin);
            Videos.save( {},  {username: $scope.user.username,newadmin:$scope.user.newadmin});
            //pls6=$scope.user.newadmin;
  }
}]).directive('contenteditable', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, elm, attr, ngModel) {

      function updateViewValue() {
        ngModel.$setViewValue(this.innerHTML);
      }

      //Or bind it to any other events
      elm.on('keyup', updateViewValue);

      scope.$on('$destroy', function() {
        elm.off('keyup', updateViewValue);
      });

     

    }
  }
});

