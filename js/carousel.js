var carouselApp = angular.module('carouselApp',[]);

// **** CONTROLLER:
carouselApp.controller('carouselController',function($scope,$document,$http,$log){
    
    $scope.numItemsVisible; // 4 at a time based on design
    $scope.currentIndex = 0; // initial value 
    $scope.pageArray = []; // pagination set within this
    $scope.childItems = [];
   
    
    // **** pull the data from JSON 
    $http.get('basic_carousel.json')
        .success(function(result){
            $scope.numItemsVisible = result.data.carousel.format.paging;
            $scope.numOfPages = Math.ceil(result.data.carousel.items.length/$scope.numItemsVisible);
            $scope.carouselItems = result.data.carousel.items;
        
           angular.element(document).ready(function () {
               $scope.setPages();
            }); 
            
        
        }).error(function(err){
            // in case there is an error
        });
    
    // **** URL Clicks from items:
    $scope.onItemClick = function(url,event){
      window.open(url);
    }
    
    window.onresize = function(){
        $scope.setPages();
    };
    
    $scope.setPages = function(){
        
        $scope.pageArray = [];
        $scope.numItemsVisible = Math.floor(document.getElementById("wrapper").offsetWidth/225);
        var gap = Math.floor(document.getElementById("wrapper").offsetWidth - (225 * $scope.numItemsVisible));
        
        document.getElementById('carouselContainer').style.marginLeft = (gap/2)+'px';
        //margin:10px;
        $scope.numOfPages = Math.ceil($scope.carouselItems.length/$scope.numItemsVisible);
            // **** push 4 items at a time into the array:
        
        $log.info('visible >> '+$scope.numItemsVisible + " / pages >> "+$scope.numOfPages, gap)
        
        for(var i=0; i<$scope.carouselItems.length; i+=$scope.numItemsVisible){
            var itemsObj = $scope.carouselItems.slice(i,i+$scope.numItemsVisible)
            $scope.pageArray.push(itemsObj);
        }
         for(var k=0; k<$scope.pageArray.length; k++){
            for (var j = 0; j<$scope.pageArray[k].length; j++){
                
                var element = document.getElementById("childItem_"+$scope.carouselItems.indexOf($scope.pageArray[k][j]));
                element.style.left = j*225 +'px';
                element.style.top = '250px';
            }
         }
            // push into pageArray - this determnines the pagination
        $scope.currentIndex = 0;
        $scope.getCurrentIndex(0);
        $scope.highlight($scope.currentIndex);    
        $scope.$apply();
        
        //$log.log('number of pages ++++>+ '+$scope.numOfPages, $scope.numItemsVisible);
    }
    
    
    
    // **** LEFT/RIGHT Arrow clicks:
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
    
    // **** Gets the current index to set states for dots/pagination:
    $scope.getCurrentIndex = function(index){
        var value = $scope.currentIndex === index;
        return value;
    }
    
    // **** sets the position of ChildItems/images set in div:
    $scope.setChildIndex = function(index){
        var value = index * 225 +'px';
        $scope.childVo = {};
        
        $scope.childVo.name = 'childItem_'+index;
        $scope.childVo.index = index;
        
        
        $scope.childItems.push($scope.childVo)
        
         
        return value;
    }
    
   
    
    // **** HIGHLIGHT - take to the carousel part of the page as per the index:
    $scope.highlight = function(index){
        //$log.log($scope.childItems[0]);
        $scope.currentIndex = index; 
        for(var i=0; i<$scope.pageArray.length; i++){
            
            for (var j = 0; j<$scope.pageArray[i].length; j++){
                
                var element = document.getElementById("childItem_"+$scope.carouselItems.indexOf($scope.pageArray[i][j]));
                
                if($scope.pageArray[i][j]===$scope.pageArray[$scope.currentIndex][j]){
                    //$log.info(element.index)
                    
                    TweenLite.to(element,1,{top:0,overwite:0,ease:Cubic.easeOut,delay:j*.08});
                }else{
                    //$log.info(element);
                    TweenLite.to(element,.4,{top:250,overwite:0,ease:Cubic.easeIn,delay:j*.04});
                }
            }
        }
        
        
        //var element = document.getElementsByClassName("carouselContainer");
        //TweenLite.to(element,1,{left:-900*index,ease:Cubic.easeInOut});
    }
});

  