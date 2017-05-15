angular.module("app").controller('costeosCtrl', function($rootScope, $scope, $location, Costeo) {
    console.log('CONTROLADOR_EDIT_CST');

    refreshSb();

    function refreshSb() {

        Costeo.getAll().then(function(costeos) {
            $scope.costeos = costeos;
        });
    }

    $scope.buscaElementos = function(categoriaId) {
        var elementos = [];
        console.log('Buscando elementos:' + categoriaId);
        Categoria.getAllElementos().then(function(categorias) {
            for (var i = 0; i < categorias.length; i++) {
                if (categorias[i].id == categoriaId) {
                    for (var j = 0; j < categorias[i].elementos.length; j++) {
                        elementos.push(categorias[i].elementos[j]);
                    }

                }
            }
            $scope.elementos = elementos;
        });
    };

    $scope.buscaCosteos = function() {
        console.log('Buscando costeos:' + $scope.filtro.elmId)
        Costeo.getCosteos($scope.filtro.elmId).then(function(elementos) {
            if (elementos.length > 0) {
                $scope.costeos = elementos[0].Costeos;
            }

        });
    };

    $scope.crearCosteo = function() {
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
            Cliente.getAll().then(function(clientes) {
                $scope.clientes = clientes;
                $scope.myData = [];
                $scope.myData2 = [];
                $scope.myGridConfig = {
                    // should return your data (an array)
                    getData: function() {
                        return $scope.myData;
                    },

                    options: {
                        "showEditButton": true,
                        "editable": true,
                        "disabled": false,
                        "perRowEditModeEnabled": true,
                        "pageSize": 5,
                        "pageNum": 0,
                        "dynamicColumns": true,
                        "columns": [{
                            "field": "categoria",
                            "required": true,
                            "disabled": true,
                            "$title": "Categoria"
                        }, {
                            "field": "elemento",
                            "required": true,
                            "disabled": true,
                            "$title": "Elemento"
                        }, {
                            "field": "costoIni1",
                            "inputType": "number",
                            "$title": "CostoIni1"
                        }, {
                            "field": "costoIni2",
                            "inputType": "number",
                            "disabled": false,
                            "$title": "CostoIni2"
                        }, {
                            "field": "costoCmrc1",
                            "inputType": "number",
                            "$title": "CostoCmrc1"
                        }, {
                            "field": "costoCmrc2",
                            "inputType": "number",
                            "$title": "CostoCmrc2"
                        }, {
                            "field": "costoReal1",
                            "inputType": "number",
                            "$title": "CostoReal1"
                        }, {
                            "field": "costoReal2",
                            "inputType": "number",
                            "$title": "CostoReal2"
                        }]
                    }
                };
                $scope.myGridConfig2 = {
                    // should return your data (an array)
                    getData: function() {
                        return $scope.myData2;
                    },

                    options: {
                        "showEditButton": true,
                        "editable": true,
                        "disabled": false,
                        "perRowEditModeEnabled": true,
                        "pageSize": 5,
                        "pageNum": 0,
                        "dynamicColumns": true,
                        "columns": [{
                            "field": "categoria",
                            "required": true,
                            "disabled": true,
                            "$title": "Categoria"
                        }, {
                            "field": "elemento",
                            "required": true,
                            "disabled": true,
                            "$title": "Elemento"
                        }, {
                            "field": "costoIni1",
                            "inputType": "number",
                            "$title": "CostoIni1"
                        }, {
                            "field": "costoIni2",
                            "inputType": "number",
                            "disabled": false,
                            "$title": "CostoIni2"
                        }, {
                            "field": "costoCmrc1",
                            "inputType": "number",
                            "$title": "CostoCmrc1"
                        }, {
                            "field": "costoCmrc2",
                            "inputType": "number",
                            "$title": "CostoCmrc2"
                        }, {
                            "field": "costoReal1",
                            "inputType": "number",
                            "$title": "CostoReal1"
                        }, {
                            "field": "costoReal2",
                            "inputType": "number",
                            "$title": "CostoReal2"
                        }]
                    }
                };


            });
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

        $scope.promise = Costeo.save(costeoTmp).then(function(costeo) {
            var data = $scope.myData;
            var elmcosteoTmp = {};
            for (var i = 0; i < data.length; i++) {
                var elmentoId = data[i].elemento;
                elmcosteoTmp = {
                    id: data[i].id,
                    costoIni1: data[i].costoIni1,
                    costoIni2: data[i].costoIni2,
                    costoCmrc1: data[i].costoCmrc1,
                    costoCmrc2: data[i].costoCmrc2,
                    costoReal1: data[i].costoReal1,
                    costoReal2: data[i].costoReal2,
                    CosteoId: costeo.id,
                    ElementoprocesoId: elmentoId[0]
                };
                Costeo.saveElmnCosteo(elmcosteoTmp);
            }

            data = $scope.myData2;
            for (i = 0; i < data.length; i++) {
                elmentoId = data[i].elemento;
                elmcosteoTmp = {
                    id: data[i].id,
                    costoIni1: data[i].costoIni1,
                    costoIni2: data[i].costoIni2,
                    costoCmrc1: data[i].costoCmrc1,
                    costoCmrc2: data[i].costoCmrc2,
                    costoReal1: data[i].costoReal1,
                    costoReal2: data[i].costoReal2,
                    CosteoId: costeo.id,
                    ElementoprocesoId: elmentoId[0]
                };
                Costeo.saveElmnCosteo(elmcosteoTmp);
            }

        }).$promise;

        /*$scope.myGridConfig.options.columns[3].disabled = true;*/
        console.log($scope.myData);
    };

    $scope.cambiaProceso = function(idProceso) {
        Proceso.categoriasAll(idProceso).then(function(procesos) {
            var data = [];
            var data2 = [];
            if (procesos.length > 0) {
                for (var i = 0; i < procesos[0].categorias.length; i++) {
                    for (var j = 0; j < procesos[0].categorias[i].elementos.length; j++) {
                        var elemnt = {
                            categoria: '' + procesos[0].categorias[i].id + '|' + procesos[0].categorias[i].categoriaNbr,
                            elemento: '' + procesos[0].categorias[i].elementos[j].id + '|' + procesos[0].categorias[i].elementos[j].elemmentoNbr
                        };
                        console.log(procesos[0].categorias[i].categoriaNbr);
                        if (procesos[0].categorias[i].tipo == 'Y') {
                            data.push(elemnt);
                        } else {
                            data2.push(elemnt);
                        }
                    }
                }
            }
            $scope.myData = data;
            $scope.myData2 = data2;
            console.log(procesos);
        });

    }

    $scope.cargarCosteos = function(el) {}

});
