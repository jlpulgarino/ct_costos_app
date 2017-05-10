angular.module("app").controller('costeosCtrl', function($rootScope, $scope, $location, Costeo) {
    console.log('CONTROLADOR_EDIT_CST');

    refreshSb();

    function refreshSb() {

        Costeo.getAll().then(function(costeos) {
            $scope.costeos = costeos;
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

    $scope.buscaCosteos = function(){
        console.log('Buscando costeos:'+$scope.filtro.elmId)
        Costeo.getCosteos($scope.filtro.elmId).then(function(elementos) {
            if(elementos.length > 0){
                $scope.costeos = elementos[0].Costeos;
            }

        });
    };

    $scope.crearCosteo = function(){
        $rootScope.elementoIdActual = $scope.filtro.elmId;
        $location.path('/costeos/edit');

    };

});

angular.module("app").controller('editCosteosCtrl', function($rootScope, $scope, $location, Proceso, Cliente, Costeo) {
    console.log('CONTROLADOR_EDIT_CST');

    refreshSb();

    function refreshSb() {

        $scope.costeo = $rootScope.costeoIdActual;
        Proceso.getAll().then(function(procesos) {
            $scope.procesos = procesos;
            Cliente.getAll().then(function(clientes){
                $scope.clientes = clientes;
            })
        });

    }

    $scope.guardarCosteo = function() {
        var costeoTmp = {
            id: $scope.costeo.id,
            nombre: $scope.costeo.nombre,
            requerimiento: $scope.costeo.requerimiento,
            estado: $scope.costeo.estado,
            costoFinal: $scope.costeo.costoFinal,
            precioVenta: $scope.costeo.precioVenta,
            nota: $scope.costeo.nota,
            ClienteId: $scope.costeo.ClienteId,
            ProcesoId: $scope.costeo.ProcesoId

        };
        $scope.promise = Costeo.save(costeoTmp).then(function(){
            $location.path('/costeos');
        }).$promise;
    };

    $scope.cargarCosteos = function (el) {

            var grid = new Grid({
                el: el,
                stateManager: {
                    isEditable: function (rowId, colId) {
                        if (colId === 'readOnly') {
                            return false;
                        }
                        return true;
                    }
                },
                columns: [
                    {
                        id: 'readOnly',
                        title: 'Title',
                        width: '20%'
                    },
                    {
                        id: 'string',
                        title: 'String',
                        width: '20%'
                    },
                    {
                        id: 'cost',
                        title: 'Cost',
                        width: '20%',
                        type: 'cost'
                    },
                    {
                        id: 'percent',
                        title: 'Percent',
                        width: '20%',
                        type: 'percent'
                    },
                    {
                        id: 'date',
                        title: 'Date',
                        width: '20%',
                        type: 'date'
                    }
                ],
                data: [
                    {
                        id: 'id-1',
                        readOnly: 'Non editable field',
                        string: 'Hello World',
                        cost: 1000.23,
                        percent: 0.45,
                        date: '2014-03-27'
                    },
                    {
                        id: 'id-2',
                        readOnly: 'Non editable field',
                        string: 'Good Morning',
                        percent: 0.45
                    },
                    {
                        id: 'id-3',
                        readOnly: 'Non editable field',
                        cost: 1000.23,
                        percent: 0.45,
                        date: '2014-04-27'
                    }
                ]
            });
            grid.render();
            grid.on('editable-value-updated', function (/*obj*/) {
            });
        }

});
