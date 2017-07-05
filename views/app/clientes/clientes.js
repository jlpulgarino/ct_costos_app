angular.module("app").controller('ClientesCtrl', function($rootScope, $scope,  $location, Cliente) {
    console.log('CONTROLADOR_USR');
    $scope.selected = [];

    refresh();

    function refresh() {
        if(!($rootScope.usuarioLogueado)){
            $location.path('/login');
        }else{
                    Cliente.getAll().then(function(clientes) {
                        $scope.clientes = clientes;
                    });
        }
    }


    $scope.editCliente = function(cliente) {
        $rootScope.idClienteActual = cliente;
        $location.path('/clientes/edit');
    };

    $scope.addCliente = function() {
        $rootScope.idClienteActual = null;
        $location.path('/clientes/edit');
    };

    $scope.delCliente = function(ev, cliente) {
        Cliente.delete(cliente.id).then(function(){
            Cliente.getAll().then(function(clientes) {
                $scope.clientes = clientes;
            });
        });

    };

});

angular.module("app").controller('editClienteCtrl', function($rootScope, $scope, $location, Cliente) {
    console.log('CONTROLADOR_EDIT_CLI');

    refresh();

    function refresh() {
        if(!($rootScope.usuarioLogueado)){
            $location.path('/login');
        }else{
            $scope.cliente =$rootScope.idClienteActual;
        }
    }

    $scope.guardarCliente = function() {
        console.log('$scope.cliente.nit : '+$scope.cliente.nit);
        var clienteTmp = {
            id: $scope.cliente.id,
            nit: $scope.cliente.nit,
            nombre: $scope.cliente.nombre,
            email: $scope.cliente.email
        };
        $scope.promise = Cliente.save(clienteTmp).then(function(){
            $location.path('/clientes');
        }).$promise;
    };

    $scope.cancel = function(){
        $location.path('/clientes');
    }


});
