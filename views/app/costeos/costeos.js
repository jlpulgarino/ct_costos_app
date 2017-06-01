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
        var disableInicial = false;
        var disableComercial = false;
        var disableReal = false;
        console.log($rootScope.costeoIdActual);
        if ($rootScope.costeoIdActual) {
            switch ($rootScope.costeoIdActual.estado) {
                case "N":
                    disableInicial = false;
                    disableComercial = true;
                    disableReal = true;
                    break;
                case "C":
                    disableInicial = true;
                    disableComercial = false;
                    disableReal = true;
                    break;
                case "F":
                    disableInicial = true;
                    disableComercial = true;
                    disableReal = false;
                    break;
            }
        } else {
            disableInicial = false;
            disableComercial = true;
            disableReal = true;
        }

        $scope.costeo = $rootScope.costeoIdActual;
        Proceso.getAll().then(function(procesos) {
            $scope.procesos = procesos;
            Cliente.getAll().then(function(clientes) {
                $scope.clientes = clientes;
                $scope.myData = [];
                $scope.myData2 = [];
                $scope.myData3 = [];
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
                            "field": "valor",
                            "disabled": false,
                            "inputType": "number",
                            "$title": "Valor"
                        }, {
                            "field": "costoIni1",
                            "disabled": disableInicial,
                            "inputType": "number",
                            "$title": "CostoIni1"
                        }, {
                            "field": "costoIni2",
                            "disabled": disableInicial,
                            "inputType": "number",
                            "$title": "CostoIni2"
                        }, {
                            "field": "costoIni3",
                            "inputType": "number",
                            "disabled": disableInicial,
                            "$title": "CostoIni3"
                        }, {
                            "field": "costoCmrc1",
                            "disabled": disableComercial,
                            "inputType": "number",
                            "$title": "CostoCmrc1"
                        }, {
                            "field": "costoCmrc2",
                            "disabled": disableComercial,
                            "inputType": "number",
                            "$title": "CostoCmrc2"
                        }, {
                            "field": "costoCmrc3",
                            "disabled": disableComercial,
                            "inputType": "number",
                            "$title": "CostoCmrc3"
                        }, {
                            "field": "costoReal1",
                            "disabled": disableReal,
                            "inputType": "number",
                            "$title": "CostoReal1"
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
                            "field": "valor",
                            "disabled": false,
                            "inputType": "number",
                            "$title": "Valor"
                        }, {
                            "field": "costoIni1",
                            "disabled": disableInicial,
                            "inputType": "number",
                            "$title": "CostoIni1"
                        }, {
                            "field": "costoIni2",
                            "inputType": "number",
                            "disabled": disableInicial,
                            "$title": "CostoIni2"
                        }, {
                            "field": "costoIni3",
                            "inputType": "number",
                            "disabled": disableInicial,
                            "$title": "CostoIni3"
                        }, {
                            "field": "costoCmrc1",
                            "disabled": disableComercial,
                            "inputType": "number",
                            "$title": "CostoCmrc1"
                        }, {
                            "field": "costoCmrc2",
                            "disabled": disableComercial,
                            "inputType": "number",
                            "$title": "CostoCmrc2"
                        }, {
                            "field": "costoCmrc3",
                            "disabled": disableComercial,
                            "inputType": "number",
                            "$title": "CostoCmrc3"
                        }, {
                            "field": "costoReal1",
                            "disabled": disableReal,
                            "inputType": "number",
                            "$title": "CostoReal1"
                        }]
                    }
                };
                $scope.myGridConfig3 = {
                    // should return your data (an array)
                    getData: function() {
                        return $scope.myData3;
                    },

                    options: {
                        "showEditButton": false,
                        "editable": false,
                        "disabled": true,
                        "perRowEditModeEnabled": false,
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
                            "field": "valor",
                            "disabled": false,
                            "inputType": "number",
                            "$title": "Valor"
                        }, {
                            "field": "costoIni1",
                            "disabled": true,
                            "inputType": "number",
                            "$title": "CostoIni1"
                        }, {
                            "field": "costoIni2",
                            "disabled": true,
                            "inputType": "number",
                            "$title": "CostoIni2"
                        }, {
                            "field": "costoIni3",
                            "disabled": true,
                            "inputType": "number",
                            "$title": "CostoIni3"
                        }, {
                            "field": "costoCmrc1",
                            "disabled": true,
                            "inputType": "number",
                            "$title": "CostoCmrc1"
                        }, {
                            "field": "costoCmrc2",
                            "disabled": true,
                            "inputType": "number",
                            "$title": "CostoCmrc2"
                        }, {
                            "field": "costoCmrc3",
                            "disabled": true,
                            "inputType": "number",
                            "$title": "CostoCmrc3"
                        }, {
                            "field": "costoReal",
                            "disabled": true,
                            "inputType": "number",
                            "$title": "CostoReal1"
                        }]
                    }
                };


            });
        });

    }

    $scope.guardarCosteo = function() {
        var data3 = $scope.myData3;

        var costeoTmp = {
            id: $scope.costeo.id,
            nombre: $scope.costeo.nombre,
            requerimiento: $scope.costeo.requerimiento,
            estado: $scope.costeo.estado,
            unidad1: $scope.costeo.unidad1,
            unidad2: $scope.costeo.unidad2,
            unidad3: $scope.costeo.unidad3,
            totalI1: data3[0].costoIni1,
            totalI2: data3[0].costoIni2,
            totalI3: data3[0].costoIni3,
            totalC1: data3[0].costoCmrc1,
            totalC2: data3[0].costoCmrc2,
            totalC3: data3[0].costoCmrc3,
            totalCR: data3[0].costoReal1,
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
                    valor: data[i].valor,
                    costoIni1: data[i].costoIni1,
                    costoIni2: data[i].costoIni2,
                    costoIni3: data[i].costoIni3,
                    costoCmrc1: data[i].costoCmrc1,
                    costoCmrc2: data[i].costoCmrc2,
                    costoCmrc3: data[i].costoCmrc3,
                    costoReal1: data[i].costoReal1,
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
                    valor: data[i].valor,
                    costoIni1: data[i].costoIni1,
                    costoIni2: data[i].costoIni2,
                    costoIni3: data[i].costoIni3,
                    costoCmrc1: data[i].costoCmrc1,
                    costoCmrc2: data[i].costoCmrc2,
                    costoCmrc3: data[i].costoCmrc3,
                    costoReal1: data[i].costoReal1,
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
            var data3 = [];
            if (procesos.length > 0) {
                for (var i = 0; i < procesos[0].categorias.length; i++) {
                    for (var j = 0; j < procesos[0].categorias[i].elementos.length; j++) {
                        var elemnt = {
                            categoria: '' + procesos[0].categorias[i].id + '|' + procesos[0].categorias[i].categoriaNbr,
                            elemento: '' + procesos[0].categorias[i].elementos[j].id + '|' + procesos[0].categorias[i].elementos[j].elemmentoNbr
                        };
                        if (procesos[0].categorias[i].tipo == 'Y') {
                            data.push(elemnt);
                        } else {
                            data2.push(elemnt);
                        }
                    }
                }
                var totales = {
                    categoria: 'Totales'
                };
                data3.push(totales);
            }
            $scope.myData = data;
            $scope.myData2 = data2;
            $scope.myData3 = data3;
            console.log(procesos);
        });

    }

    $scope.calcular = function(tipo, unidad, costo, valor) {
        var valorCalc = 0;
        switch (tipo) {
            case "M":
                valorCalc = valor * unidad;
                break;
            case "D":
                if (unidad > 0) {
                    valorCalc = Number((costo / unidad).toFixed(2));
                }
                break;
            case "A":
                if (unidad > 0) {
                    valorCalc = Number((valor / unidad).toFixed(2));
                }
                break;
            case "F":
                valorCalc = costo;
                break;
        };

        return valorCalc;
    }

    $scope.Actualizar = function(idProceso) {

        Costeo.getCostoElm(idProceso).then(function(elementos) {
            var unidad1 = $scope.costeo.unidad1;
            var unidad2 = $scope.costeo.unidad2;
            var unidad3 = $scope.costeo.unidad3;
            var unidad4 = $scope.costeo.unidad4;
            var data = $scope.myData;
            var data2 = $scope.myData2;
            var data3 = $scope.myData3;
            data3[0].costoIni1 = 0;
            data3[0].costoIni2 = 0;
            data3[0].costoIni3 = 0;
            data3[0].costoCmrc1 = 0;
            data3[0].costoCmrc2 = 0;
            data3[0].costoCmrc3 = 0;
            data3[0].costoReal1 = 0;
            for (var j = 0; j < elementos.length; j++) {
                for (var i = 0; i < data.length; i++) {
                    if (elementos[j].id == data[i].elemento[0]) {
                        data[i].costoIni1 = $scope.calcular(elementos[j].tipo, unidad1, elementos[j].valor, data[i].valor);
                        data[i].costoIni2 = $scope.calcular(elementos[j].tipo, unidad2, elementos[j].valor, data[i].valor);
                        data[i].costoIni3 = $scope.calcular(elementos[j].tipo, unidad3, elementos[j].valor, data[i].valor);
                        data3[0].costoIni1 = parseFloat(data3[0].costoIni1) + parseFloat(data[i].costoIni1);
                        data3[0].costoIni2 = parseFloat(data3[0].costoIni2) + parseFloat(data[i].costoIni2);
                        data3[0].costoIni3 = parseFloat(data3[0].costoIni3) + parseFloat(data[i].costoIni3);
                        data3[0].costoCmrc1 = parseFloat(data3[0].costoCmrc1) + parseFloat(data[i].costoCmrc1);
                        data3[0].costoCmrc2 = parseFloat(data3[0].costoCmrc2) + parseFloat(data[i].costoCmrc2);
                        data3[0].costoCmrc3 = parseFloat(data3[0].costoCmrc3) + parseFloat(data[i].costoCmrc3);
                        data3[0].costoReal1 = parseFloat(data3[0].costoReal1) + parseFloat(data[i].costoReal1);

                    }
                }
                for (i = 0; i < data2.length; i++) {
                    if (elementos[j].id == data2[i].elemento[0]) {
                        data2[i].costoIni1 = $scope.calcular(elementos[j].tipo, unidad1, elementos[j].valor, data2[i].valor);
                        data2[i].costoIni2 = $scope.calcular(elementos[j].tipo, unidad2, elementos[j].valor, data2[i].valor);
                        data2[i].costoIni3 = $scope.calcular(elementos[j].tipo, unidad3, elementos[j].valor, data2[i].valor);
                        data3[0].costoIni1 = parseFloat(data3[0].costoIni1) + parseFloat(data2[i].costoIni1);
                        data3[0].costoIni2 = parseFloat(data3[0].costoIni2) + parseFloat(data2[i].costoIni2);
                        data3[0].costoIni3 = parseFloat(data3[0].costoIni3) + parseFloat(data2[i].costoIni3);
                        data3[0].costoCmrc1 = parseFloat(data3[0].costoCmrc1) + parseFloat(data2[i].costoCmrc1);
                        data3[0].costoCmrc2 = parseFloat(data3[0].costoCmrc2) + parseFloat(data2[i].costoCmrc2);
                        data3[0].costoCmrc3 = parseFloat(data3[0].costoCmrc3) + parseFloat(data2[i].costoCmrc3);
                        data3[0].costoReal1 = parseFloat(data3[0].costoReal1) + parseFloat(data2[i].costoReal1);
                    }
                }

            }
        });

    }

    $scope.mostrarColumna = function(numCol) {
        switch (numCol) {
            case 3:
                valorCalc = valor * unidad;
                break;
            case 4:
                if (unidad > 0) {
                    valorCalc = Number((valor / unidad).toFixed(2));
                }
                break;
        }

    }


    $scope.cargarCosteos = function(el) {}

});
