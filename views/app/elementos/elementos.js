angular.module("app").controller('editElementosCtrl', function($rootScope, $scope, $location, Elemento) {
    console.log('CONTROLADOR_EDIT_SB');

    refreshSb();

    function refreshSb() {
        $scope.elemento = $rootScope.idElementoActual;
        if ($rootScope.idElementoActual){
            /*Elemento.getCostos(idSubProyActual.id).then(function(tareas) {
                $scope.tareas = tareas;
            });*/
        }
    }

    $scope.guardarElemento = function() {
        console.log('idCategoriaActual.id = '+$rootScope.idCategoriaActual.id);
        var elementoTmp = {
            id: $scope.elemento.id,
            nombre: $scope.elemento.nombre,
            descripcion: $scope.elemento.descripcion,
            tipo: $scope.elemento.tipo,
            CategoriumId: $rootScope.idCategoriaActual.id
        };
        $scope.promise = Elemento.save(elementoTmp).then(function(){
            $location.path('/categorias/edit');
        }).$promise;
    };

    $scope.cancel = function(){
        $location.path('/categorias/edit');
    };


});
