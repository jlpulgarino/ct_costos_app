angular.module("app").controller('costosCtrl', function($rootScope, $scope, $location, Categoria, Costo) {
    console.log('CONTROLADOR_EDIT_CST');

    refreshSb();

    function refreshSb() {
        $scope.categorias=[];
        $scope.elementos=[];
        $scope.costos=[];
        $scope.filtro = {
            elmId: 0
        };
        Categoria.getAllElementos().then(function(categorias) {
            $scope.categorias = categorias;
        });
    }

    $scope.buscaElementos = function(categoriaId){
        var elementos = [];
        console.log('Buscando elementos:'+categoriaId);
        Categoria.getAllElementos().then(function(categorias) {
            for (var i = 0; i< categorias.length; i++){
                if(categorias[i].id == categoriaId){
                    for(var j = 0; j<categorias[i].elementos.length; j++){
                        elementos.push(categorias[i].elementos[j]);
                    }

                }
            }
            $scope.elementos = elementos;
        });
    };

    $scope.buscaCostos = function(){
        console.log('Buscando costos:'+$scope.filtro.elmId)
        Costo.getCostos($scope.filtro.elmId).then(function(elementos) {
            if(elementos.length > 0){
                $scope.costos = elementos[0].Costos;
            }

        });
    };

    $scope.crearCosto = function(){
        $rootScope.elementoIdActual = $scope.filtro.elmId;
        $location.path('/costos/edit');

    };

});

angular.module("app").controller('editCostosCtrl', function($rootScope, $scope, $location, Categoria, Costo) {
    console.log('CONTROLADOR_EDIT_CST');

    refreshSb();

    function refreshSb() {
        var idElemento = $rootScope.elementoIdActual;
        var costoObj={
            ElementoId: idElemento
        };
        $scope.costo = costoObj;
    }

    $scope.guardarCostos = function() {
        var costoTmp = {
            id: $scope.costo.id,
            effdt: $scope.costo.effdt,
            valor: $scope.costo.valor,
            ElementoId: $scope.costo.ElementoId
        };
        $scope.promise = Costo.save(costoTmp).then(function(){
            $location.path('/costos');
        }).$promise;
    };


});
