var carouselApp = angular.module('carouselApp',[]);


carouselApp.controller('carouselController',function($scope,$document,$http,$log){
    
    $scope.numItemsVisible; // 4 at a time based on design
    $scope.currentIndex = 0; // initial value 
    $scope.pageArray = []; // pagination set within this
    
    // **** pull the data from JSON 
    $http.get('basic_carousel.json')
        .success(function(result){
            $scope.numItemsVisible = result.data.carousel.format.paging;
            $scope.numOfPages = Math.ceil(result.data.carousel.items.length/$scope.numItemsVisible);
            
            $scope.carouselItems = result.data.carousel.items;
            
            // **** push 4 items at a time into the array:
            for(var j=0; j<$scope.numOfPages; j++){
                var itemsObj = [];
                for(var i=0; i<$scope.numItemsVisible;i++){
                    itemsObj.push($scope.carouselItems[itemsObj.length])
                }
                // push into pageArray - this determnines the pagination
                $scope.pageArray.push(itemsObj);
            }
            
        $log.log('number of pages ++++>+ '+$scope.numOfPages);
        
        }).error(function(err){
            // in case there is an error
        });
    
    $scope.onItemClick - function(evt){
        $log.info(evt);
    }
    
    $scope.arrowClicked = function(dir){
        switch(dir){
            case "right":
                if($scope.currentIndex<$scope.numOfPages-1){
                    $scope.currentIndex++;
                }
                break;
             
            case "left":
                if($scope.currentIndex>0){
                    $scope.currentIndex--;
                }
                break;    
        }
        
        $scope.getCurrentIndex($scope.currentIndex);
        $scope.highlight($scope.currentIndex);
    }
    
    $scope.getCurrentIndex = function(index){
        var value = $scope.currentIndex === index;
        //$log.log('what is the value ' + value)
        return value;
    }
    
        
    $scope.highlight = function(index){
        var element = document.getElementsByClassName("carouselContainer");
        TweenLite.to(element,1,{left:-900*index,ease:Cubic.easeInOut});
        $scope.currentIndex = index;
        
    }
});


