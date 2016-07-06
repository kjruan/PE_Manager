angular.module("PE_Manager", [])
	.controller('mainCtrl', function($scope) {

		$scope.funds = [ { name: "Fund1", data: [{ datetime: "3/31/2015", rate: 1.02 }, { datetime: "6/30/2015", rate: 1.12 }, { datetime: "9/30/2015", rate: 1.67 }, { datetime: "12/31/2015", rate: 1.35 }], isNew: false }, 
										 { name: "Fund2", data: [{ datetime: "3/31/2015", rate: 1.22 }, { datetime: "6/30/2015", rate: 1.15 }, { datetime: "9/30/2015", rate: 1.17 }, { datetime: "12/31/2015", rate: 1.16 }], isNew: false }, 
										 { name: "Fund3", data: [{ datetime: "3/31/2015", rate: 1.32 }, { datetime: "6/30/2015", rate: 1.18 }, { datetime: "9/30/2015", rate: 1.32 }, { datetime: "12/31/2015", rate: 1.19 }], isNew: false }, 
										 { name: "Fund4", data: [{ datetime: "3/31/2015", rate: 1.12 }, { datetime: "6/30/2015", rate: 1.19 }, { datetime: "9/30/2015", rate: 1.47 }, { datetime: "12/31/2015", rate: 1.25 }], isNew: false }
										];
		$scope.dates = ["3/31/2015", "6/30/2015", "9/30/2015", "12/31/2015"];

		$scope.AddFunds = function(name) {
			if (name) {
				var fund = {};
				fund["name"] = name;
				fund["isNew"] = true; 
				console.log($scope.funds);
				$scope.funds.push(fund);
			}
		}

	})