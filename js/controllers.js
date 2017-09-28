var userControllers = angular.module('userControllers', ['ui.bootstrap']);

userControllers.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});

userControllers.controller('UserFormController', ['$scope', '$http', '$location', '$window', 'myFactory', function ($scope, $http, $location, $window, myFactory) {
    var dataObj = "";
    var config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }
    $http.get('js/province.json')
        .success(function (data) {
            $scope.provinces = data;
        })
        .error(function () {
            defer.reject('could not find someFile.json');
        });


    $scope.submitForm = function (user) {
        myFactory.set(user);                  // Set data to myFactory to share with ConfirmationController 
        dataObj = {
            "name": user.name, 
            "province": user.province.name, 
            "telephone": user.telephone,
            "postalcode": user.postalcode, 
            "salary": user.salary,
            "pid" : user.province.pid
        }
       // console.log(dataObj);
        $http.post('ajax/DB_formSave.php', dataObj)
        .success(function(data) {
           console.log(data);
        })
        $location.path('confirmation');
    }

}]);


userControllers.controller('ConfirmationController', ['$scope', 'myFactory', function ($scope, myFactory) {
    $scope.data = myFactory.get();        // get data from UserFormController
    $scope.name = $scope.data.name;
    $scope.province = $scope.data.province;  // $scope.data.province.name
    $scope.telephone = $scope.data.telephone;
    $scope.postalcode = $scope.data.postalcode;
    $scope.salary = $scope.data.salary;
}]);


userControllers.controller('UserListController', ['$scope', '$http', 'filterFilter', function ($scope, $http, filterFilter) {
    
    $http.get('ajax/DB_listData.php')
    .then(function (response) {
        console.log("inside response.dat->>>"); 
        console.log(response.data);
        $scope.users = response.data;

        $scope.currentPage = 1;
        $scope.totalItems = $scope.users.length;
        console.log($scope.users.length);
        $scope.entryLimit = 10; // items per page
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
    });


    
}]);

