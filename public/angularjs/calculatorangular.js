
var calci = angular.module('calculator',[]);

calci.controller('calculatorController', function($scope, $http) {
	
	var numbers = [7, 8, 9, '/', 4, 5, 6, '*', 1, 2, 3, '-',  0, '=', '+', 'clear'];
	var count = 0;
	
	$scope.text = '';
	$scope.message = '';
	
	var chunk = function(arr, size) {
		  var newArr = [];
		  for (var i=0; i<arr.length; i+=size) {
		    newArr.push(arr.slice(i, i+size));
		  }
		  return newArr;
		};

		$scope.chunkedData = chunk(numbers, 4);
		
		$scope.enterTextAndCalculate = function(item) {
			if(item === 'clear') {
				$scope.text = '';
				$scope.message = "";
				count = 0;
			} else {
			var err = [];
			if(item === '/' || item === '*' || item === '-' || item === '+') {
				count++;
				if(count > 1) {
					$http({
						method : "POST",
						url : '/calculate',
						data : {
							"expression" : $scope.text
						}
					}).success(function(data) {
						if(data.error !== 0) {
							$scope.message = data.error;
						} else {
							$scope.message = "";
							$scope.text = data.result;
							$scope.text = $scope.text + item;
						}
					}).error(function(error) {
						console.log(error);
						$scope.text = '';
					});
				}
			}
			if(item === '=') {
				count = 0;
				$http({
					method : "POST",
					url : '/calculate',
					data : {
						"expression" : $scope.text
					}
				}).success(function(data) {
					if(data.error !== 0) {
						$scope.message = data.error;
					}else {
						$scope.message = "";
						$scope.text = data.result;
					}
				}).error(function(error) {
					console.log(error);
				});
				$scope.text = '';
			} else {
				$scope.text = $scope.text.toString() + item;
			}
			}
		};
		
});