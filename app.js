angular.module('PE_Manager', ['ui.grid', 'ui.grid.edit', 'ui.grid.cellNav'])
	.controller('mainCtrl', function($scope) {
		$scope.funds = [{ name: "Fund1", dates: [{ datetime: "3/31/2015", rate: 1.02 }, { datetime: "6/30/2015", rate: 1.12 }, { datetime: "9/30/2015", rate: 1.67 }, { datetime: "12/31/2015", rate: 1.35 }], isNew: false }, 
										{ name: "Fund2", dates: [{ datetime: "3/31/2015", rate: 1.22 }, { datetime: "6/30/2015", rate: 1.15 }, { datetime: "9/30/2015", rate: 1.17 }, { datetime: "12/31/2015", rate: 1.16 }], isNew: false }, 
										{ name: "Fund3", dates: [{ datetime: "3/31/2015", rate: 1.32 }, { datetime: "6/30/2015", rate: 1.18 }, { datetime: "9/30/2015", rate: 1.32 }, { datetime: "12/31/2015", rate: 1.19 }], isNew: false }, 
										{ name: "Fund4", dates: [{ datetime: "3/31/2015", rate: 1.12 }, { datetime: "6/30/2015", rate: 1.19 }, { datetime: "9/30/2015", rate: 1.47 }, { datetime: "12/31/2015", rate: 1.25 }], isNew: false }
									 ];

		$scope.AddFunds = function(name) {
			if (name) {
				var fund = {};
				fund["name"] = name;
				fund["dates"] = CreateDateModel();
				fund["isNew"] = true; 
				$scope.funds.push(fund);
				$scope.columns.push(fund);
			}
		}

		var CreateDateModel = function() {
			var output = [];
			var dates = GetQueriedDates($scope.funds);
			for (var i in dates) {
				var obj = {};
				obj["datetime"] = dates[i];
				obj["rate"] = null;
				output.push(obj);
			}
			return output;
		}

		var GetQueriedDates = function(data) {
			var output = [];
			if (data !== null) {
				for (var i in data[0].dates) {
					output.push(data[0].dates[i].datetime);
				}
			}
			return output;
		}

		var GetFundHeaders = function(data) {
			var output = [{name: "Date", field: 'datetime', enableCellEdit: false}]; 
			for (var obj in data) {
				if (data.hasOwnProperty(obj)) {
					if (data[obj].hasOwnProperty("name")) {
						var col_name_obj = { name: data[obj].name, field: data[obj].name };
						output.push(col_name_obj); 
					}
				}
			}
			return output;
		}

		var TranslateDataToGrid = function(funds) {

		// Model ->
		// $scope.funds_test = [
		// 										 {datetime: "3/31/2015", Fund1: 1.02, Fund2: 1.03, Fund3: 1.03, Fund4: 1.03}, 
		// 									   {datetime: "6/30/2015", Fund1: 1.02, Fund2: 1.03, Fund3: 1.03, Fund4: 1.03}, 
		// 									   {datetime: "9/30/2015", Fund1: 1.02, Fund2: 1.03, Fund3: 1.03, Fund4: 1.03}, 
		// 									   {datetime: "12/31/2015", Fund1: 1.02, Fund2: 1.03, Fund3: 1.03, Fund4: 1.03}											
		// 									  ]; 
			var data_array = [];
			var temp = {}; 

			for (var f in funds) {
				for (var d in funds[f].dates) {
					if (!temp.hasOwnProperty(funds[f].dates[d].datetime)) {
						var t_obj = {}; 
						t_obj["datetime"] = funds[f].dates[d].datetime;
						t_obj[funds[f].name] = funds[f].dates[d].rate; 			
						data_array.push(t_obj);
						temp[funds[f].dates[d].datetime] = 1;
					} else {
						if (data_array.length > 0) {
							for (var i in data_array) {
								if (data_array[i].datetime === funds[f].dates[d].datetime) {
									data_array[i][funds[f].name] = funds[f].dates[d].rate; 
								}
							}
						}	
					}
				}
			}
			return data_array;			
		}

  	$scope.columns = GetFundHeaders($scope.funds);
  	$scope.msg = {};
  	$scope.gridOptions = {
  		enableSorting: true,
  		columnDefs: $scope.columns,
  		data: TranslateDataToGrid($scope.funds),
  		onRegisterApi: function(gridApi) {
      	$scope.gridApi = gridApi;
    	  gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue){
	        $scope.msg.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
	        $scope.$apply();
      	});
     		gridApi.cellNav.on.navigate($scope,function(newRowCol, oldRowCol){
         // var rowCol = {row: newRowCol.row.index, col:newRowCol.col.colDef.name};
         // var msg = 'New RowCol is ' + angular.toJson(rowCol);
         // if(oldRowCol){
         //    rowCol = {row: oldRowCol.row.index, col:oldRowCol.col.colDef.name};
         //    msg += ' Old RowCol is ' + angular.toJson(rowCol);
         // }
        		console.log(newRowCol)
        });
    	}
  	};
	})