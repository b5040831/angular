angular.module("WADImodule").controller("appController", function ($scope, $http) {
	
	//Pre defined variables to controll the ng-show in the view + empty arrays to get the data from API
	$scope.isIndexVisible = true;
	$scope.isBookingsVisible = false;
	$scope.isVehiclesVisible = false;
	$scope.isRoutesVisible = false;
	$scope.isAboutVisible = false;
	$scope.isUserAuthenticated = false;
	$scope.isAddBookingFormVisible = false;
	$scope.isLoginFormVisible = true;
	$scope.isBookingsTableVisible = true;
	$scope.isVehiclesTableVisible = true;
	$scope.isLogoutButtonVisible = false;
	$scope.showSearchBar = false;
	$scope.bookings = [];
	$scope.vehicles = [];
	$scope.login = [];
	
	//functions controlling the displayed content in the view. this includes the whole sub pages and buttons related to the pages. 
	$scope.showIndexController = function () {
		$scope.isIndexVisible = true;
		$scope.isBookingsVisible = false;
		$scope.isVehiclesVisible = false;
		$scope.isRoutesVisible = false;
		$scope.showAddBookingButton = false;
		$scope.showCancelAddBookingButton = false;
		$scope.showAddVehicleButton = false;
		$scope.showSearchBar = false;
    };
	$scope.showBookingsController = function () {
		$scope.isBookingsVisible = true;
		$scope.isIndexVisible = false;
		$scope.isVehiclesVisible = false;
		$scope.isRoutesVisible = false;
		$scope.showCancelAddBookingButton = false;	
		$scope.showAddVehicleButton = false;
		$scope.showSearchBar = true;		

		if ($scope.isEditBookingFormVisible === true)
		{
			$scope.showAddBookingButton = false;
		} else {
			$scope.showAddBookingButton = true;
		}

    };
	$scope.showVehiclesController = function () {
		$scope.isVehiclesVisible = true;
		$scope.isBookingsVisible = false;
		$scope.isIndexVisible = false;
		$scope.isRoutesVisible = false;
		$scope.showAddBookingButton = false;
		$scope.showCancelAddBookingButton = false;
		$scope.showAddVehicleButton = true;
		$scope.showSearchBar = true;
    };

    $scope.showAddBookingFormController = function() {
    	if ($scope.isBookingsVisible === true)
    	{
	    	$scope.isAddBookingFormVisible = true;
	        $scope.isBookingsTableVisible = false;

	        $scope.showAddBookingButton = false;
	        $scope.showCancelAddBookingButton = true;
			$scope.showSearchBar = false;
    	}
    };
	
	$scope.showAddVehicleFormController = function() {
    	if ($scope.isVehiclesVisible === true)
    	{
	    	$scope.isAddVehicleFormVisible = true;
	        $scope.isVehiclesTableVisible = false;

	        $scope.showAddVehicleButton = false;
	        $scope.showCancelAddVehicleButton = true;
			$scope.showSearchBar = false;
    	}
    };

    $scope.CancelBookingButtonController = function() {
    	$scope.isAddBookingFormVisible = false;
        $scope.isBookingsTableVisible = true;

    	$scope.showAddBookingButton = true;
        $scope.showCancelAddBookingButton = false;
		$scope.showSearchBar = true;
    };
	
	$scope.CancelVehicleButtonController = function() {
    	$scope.isAddVehicleFormVisible = false;
        $scope.isVehiclesTableVisible = true;

    	$scope.showAddVehicleButton = true;
        $scope.showCancelAddVehicleButton = false;
		$scope.showSearchBar = true;
    };
	// _______ END OF NG-SHOW CONTROLLERS _______
	
	// initiation function followed by a line calling the function to get the data from the APIs and display it
    $scope.init = function () {
		$http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking")
        .success(function (response) {
        	$scope.bookings = response;
        })
        .error(function (error){
        	$scope.errorMessage = error;
        });
		
		$http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle")
        .success(function (response) {
        	$scope.vehicles = response;
        })
        .error(function (error){
        	$scope.errorMessage = error;
        });
    };
    $scope.init();
	
	// two add functions to add new records to both bookings and vehicles page. 
	// $scope.add is a function that adds new record to BOOKING. it is not named addBooking as there were issues with renaming it
	$scope.add = function () {
        var bookingDetails = {
            PassengerName: $scope.bookingName,
            DropOffLocation: $scope.bookingDropOff,
            PickupLocation: $scope.bookingPickup,
            VehicleId: $scope.bookingVehicle,
            CurrentPassenger: $scope.bookingCurrentPassenger
        };
        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking", bookingDetails)
        .success(function () {
        	$scope.init();
    	})
    	.error(function (error) {
    		$scope.errorMessage = error;
        });

        $scope.showAddBookingButton = true;
        $scope.showCancelAddBookingButton = false;
        $scope.isBookingsTableVisible = true;
        $scope.isAddBookingFormVisible = false;
		$scope.showSearchBar = true;

    };
	
	$scope.addVehicle = function () {
        var vehicleDetails = {
            Make: $scope.vehicleMake,
            Capacity: $scope.vehicleCapacity,
            Driver: $scope.vehicleDriver,
            Registration: $scope.vehicleRegistration,
            Model: $scope.vehicleModel
        };
        $http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle", vehicleDetails)
        .success(function () {
        	$scope.init();
    	})
    	.error(function (error) {
    		$scope.errorMessage = error;
        });

        $scope.showAddVehicleButton = true;
        $scope.showCancelAddVehicleButton = false;
        $scope.isVehiclesTableVisible = true;
        $scope.isAddVehicleFormVisible = false;
		$scope.showSearchBar = true;

    };
	
	// Two functions controlling cancel buttons for both vehicles and bookings
	$scope.cancelEditBooking = function () {
		$scope.isEditBookingFormVisible = false;
		$scope.isBookingsTableVisible = true;
		$scope.showAddBookingButton = true;
		$scope.showSearchBar = true;
	};
	
	$scope.cancelEditVehicle = function () {
		$scope.isEditVehicleFormVisible = false;
		$scope.isVehiclesTableVisible = true;
		$scope.showAddVehicleButton = true;
		$scope.showSearchBar = true;
	};
	
	// following two functions display the edit forms and get the data from the api and pre-populate the inputs
	$scope.showEditBookingForm = function (bookingId) {
		$scope.isEditBookingFormVisible = true;
		$scope.isBookingsTableVisible = false;
		$scope.showAddBookingButton = false;
		$scope.showSearchBar = false;
		
		$http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking/" + bookingId)
		.success(function (response){
			editBookingId = response.Id
			$scope.editBookingName = response.PassengerName;
			$scope.editBookingPickup = response.PickupLocation;
			$scope.editBookingDropOff = response.DropOffLocation;
			$scope.editBookingVehicle = response.VehicleId;
			$scope.editBookingCurrentPassenger = response.CurrentPassenger;
		})
		.error(function (error){
			$scope.errorMessage = error;
		});
		
	};
	
	$scope.showEditVehicleForm = function (vehicleId) {
		$scope.isEditVehicleFormVisible = true;
		$scope.isVehiclesTableVisible = false;
		$scope.showAddVehicleButton = false;
		$scope.showSearchBar = false;
		
		$http.get("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle/" + vehicleId)
		.success(function (response){
			editVehicleId = response.Id
			$scope.editVehicleMake = response.Make;
			$scope.editVehicleCapacity = response.Capacity;
			$scope.editVehicleDriver = response.Driver;
			$scope.editVehicleRegistration = response.Registration;
			$scope.editVehicleModel = response.Model;
		})
		.error(function (error){
			$scope.errorMessage = error;
		});
		
	};
	
	// Two functions controlling the edit. They submit the data from input using the PUT method
	$scope.editBooking = function () {
		var bookingDetails = {
			Id: editBookingId,
            PassengerName: $scope.editBookingName,
            PickupLocation: $scope.editBookingPickup,
			DropOffLocation: $scope.editBookingDropOff,
            VehicleId: $scope.editBookingVehicle,
            CurrentPassenger: $scope.editBookingCurrentPassenger,
        }
		
		$http.put("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking/", bookingDetails)
		.success(function (response){
			$scope.init();
			$scope.isEditBookingFormVisible = false;
			$scope.isBookingsTableVisible = true;
			$scope.showAddBookingButton = true;
		})
		.error(function (error){
			$scope.errorMessage = error;
		});
	};
	
	$scope.editVehicle = function () {
		var vehicleDetails = {
			Id: editVehicleId,
            Make: $scope.editVehicleMake,
            Capacity: $scope.editVehicleCapacity,
			Driver: $scope.editVehicleDriver,
            Registration: $scope.editVehicleRegistration,
            Model: $scope.editVehicleModel,
        }
		
		$http.put("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle/", vehicleDetails)
		.success(function (response){
			$scope.init();
			$scope.isEditVehicleFormVisible = false;
			$scope.isVehiclesTableVisible = true;
			$scope.showAddVehicleButton = true;
		})
		.error(function (error){
			$scope.errorMessage = error;
		});
	};
	
	// the two following functions delete a record from an array on click.
    $scope.removeBooking = function ( Id ) {
    	$http.delete("http://webteach_net.hallam.shu.ac.uk/acesjas/api/booking/" + Id)
    		.success(function() {
    			$scope.init();
    		})
    		.error(function(error) {
    			$scope.errorMessage = error;
    		});
    };
	
	$scope.removeVehicle = function ( Id ) {
    	$http.delete("http://webteach_net.hallam.shu.ac.uk/acesjas/api/vehicle/" + Id)
    		.success(function() {
    			$scope.init();
    		})
    		.error(function(error) {
    			$scope.errorMessage = error;
    		});
    };

	
	// Login logic. it gets the data from the form and sends it to API. If the credentials are true response.authenticated = true is returned
	$scope.login = function() {
		var authenticationDetails = {
			username: $scope.username,
			password: $scope.password,
		}
		$http.post("http://webteach_net.hallam.shu.ac.uk/acesjas/api/login", authenticationDetails)
        .success(function (response) {
			if (response.authenticated === true)
			{
				$scope.isUserAuthenticated = true;
				$scope.isLoginFormVisible = false;
				$scope.userFullName = response.name;
				$scope.isLogoutButtonVisible = true;
				
				if (response.role === 1)
				{
					$scope.userRole = "Staff"
					$scope.contentIsNotVisibleForStaff = false;
				}else {
					$scope.userRole = "Manager"
					$scope.contentIsNotVisibleForStaff = true;
				}
			}
		})
        .error(function (error){
        	$scope.errorMessage = "There was an error loading an API. Please check if the url provided is correct";
        });
		
	};
	
	//Logout function.
	$scope.logout = function() {
		
		$scope.isUserAuthenticated = false;
		$scope.isLoginFormVisible = true;
		$scope.isLogoutButtonVisible = false;
		
	};

});

