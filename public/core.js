var scotchWeekMenu = angular.module('scotchWeekMenu', []);

function mainController($scope, $http) {

	$scope.formData = {};

	$http.get('/api/weekmenus')
		.success(function(data){
			$scope.weekMenus = data;
		})
		.error(function(data){
			console.log('Error: ' + data);
		});

	$scope.createWeekMenu = function() {
		$http.post('/api/weekmenus', $scope.formData)
			.success(function(data){
				$scope.formData = {};
				$scope.weekMenus = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);	
			});
	};

	$scope.deleteWeekMenu = function(id) {
		$http.delete('/api/weekmenus/' + id)
			.success(function(data){
				$scope.weekMenus = data;
				console.log(data);
			})
			.error(function(data){
				console.log("Error " + data);
			});
	};

};