angular.module("app").controller('costeosCtrl', function($rootScope, $scope, $location, Costeo, Proceso, Cliente) {
    console.log('CONTROLADOR_EDIT_CST');

    refreshSb();

    function refreshSb() {

        /*if (!($rootScope.usuarioLogueado)) {
            $location.path('/login');
        } else {*/
        Costeo.getAll().then(function(costeos) {
            $scope.costeos = costeos;
            $rootScope.costeoIdActual = null;
            $scope.costeoFiltro = {};
            Proceso.getAll().then(function(procesos) {
                $scope.procesos = procesos;
                Cliente.getAll().then(function(clientes) {
                    $scope.clientes = clientes;
                });
            });
        });
        /*}*/
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

    $scope.filtraCosteos = function() {

        var costeoTmp = {
            nombre: $scope.costeoFiltro.nombre,
            requerimiento: $scope.costeoFiltro.requerimiento,
            ClienteId: $scope.costeoFiltro.ClienteId,
            ProcesoId: $scope.costeoFiltro.ProcesoId,
            fecha: $scope.costeoFiltro.fecha
        };


        Costeo.fitrar(costeoTmp).then(function(costeos) {
            $scope.costeos = costeos;
            $rootScope.costeoIdActual = null;
            console.log(costeos);
        });
    };


    $scope.crearCosteo = function() {
        $rootScope.elementoIdActual = $scope.filtro.elmId;
        $location.path('/costeos/edit');

    };


    $scope.addCosteo = function() {
        $rootScope.costeoIdActual = null;
        $location.path('/costeos/edit');
    }

    $scope.editCosteo = function(costeo) {
        Costeo.getCosteoElementos(costeo.id).then(function(costeo) {
            var elementos = [];
            var elemento = {};
            for (var i = 0; i < costeo[0].Elementocosteos.length; i++) {
                elemento = {
                    id: costeo[0].Elementocosteos[i].id,
                    valor: costeo[0].Elementocosteos[i].valor,
                    costoIni1: costeo[0].Elementocosteos[i].costoIni1,
                    costoIni2: costeo[0].Elementocosteos[i].costoIni2,
                    costoIni3: costeo[0].Elementocosteos[i].costoIni3,
                    costoCmrc1: costeo[0].Elementocosteos[i].costoCmrc1,
                    costoCmrc2: costeo[0].Elementocosteos[i].costoCmrc2,
                    costoCmrc3: costeo[0].Elementocosteos[i].costoCmrc3,
                    costoReal1: costeo[0].Elementocosteos[i].costoReal1,
                    createdAt: costeo[0].Elementocosteos[i].createdAt,
                    updatedAt: costeo[0].Elementocosteos[i].updatedAt,
                    CosteoId: costeo[0].Elementocosteos[i].CosteoId,
                    ElementoId: costeo[0].Elementocosteos[i].ElementoId + '|' + costeo[0].Elementocosteos[i].Elemento.nombre,
                    CategoriaId: costeo[0].Elementocosteos[i].Elemento.CategoriumId + '|' + costeo[0].Elementocosteos[i].Elemento.Categorium.nombre,
                    CategoriaTipo: costeo[0].Elementocosteos[i].Elemento.Categorium.tipo
                };
                elementos.push(elemento);
            }
            costeo[0].Elementocosteos = elementos;
            $rootScope.costeoIdActual = costeo[0];
            $location.path('/costeos/edit');
        });

    }

});

angular.module("app").controller('editCosteosCtrl', function($rootScope, $scope, $location, Proceso, Cliente, Costeo, Categoria) {
    console.log('CONTROLADOR_EDIT_CST');

    refresh();

    function refresh() {
        console.log($rootScope.usuarioLogueado);
        if (!($rootScope.usuarioLogueado)) {
            $location.path('/login');
        } else {
            refreshSb();
        }
    }

    function refreshSb() {
        $scope.filtro = {
            elmId: 0
        };
        var disableInicial = false;
        var disableComercial = false;
        var disableReal = false;
        var editarFilas = true;
        var elmCosteo = {};
        var data = [];
        var data2 = [];
        var data3 = [];
        var costeoActual = $rootScope.costeoIdActual;

        if (costeoActual) {
            var totc1 = costeoActual.totalC1;
            var totc2 = costeoActual.totalC2;
            var totc3 = costeoActual.totalC3;
            switch (costeoActual.estado) {
                case "N":
                    disableInicial = false;
                    disableComercial = true;
                    disableReal = true;
                    break;
                case "C":
                    disableInicial = true;
                    disableComercial = false;
                    disableReal = false;
                    break;
                case "F":
                    disableInicial = true;
                    disableComercial = true;
                    disableReal = true;
                    editarFilas = false;
                    break;
            };
            console.log('{' + totc1 + '}{' + totc2 + '}{' + totc3 + '}')
            if (!(totc1 > 0 && totc2 > 0 && totc3 > 0) && costeoActual.estado == 'C') {
                totc1 = costeoActual.totalI1;
                totc2 = costeoActual.totalI2;
                totc3 = costeoActual.totalI3;
            }
            elmCosteo = {
                categoria: 'Totales',
                costoIni1: costeoActual.totalI1,
                costoIni2: costeoActual.totalI2,
                costoIni3: costeoActual.totalI3,
                costoCmrc1: totc1,
                costoCmrc2: totc2,
                costoCmrc3: totc3,
                costoReal1: costeoActual.totalCR
            };
            data3.push(elmCosteo);
            elmCosteo = {
                categoria: 'Precio Venta',
                costoCmrc1: costeoActual.totalC1,
                costoCmrc2: costeoActual.totalC2,
                costoCmrc3: costeoActual.totalC3
            };
            data3.push(elmCosteo);
            for (var i = 0; i < costeoActual.Elementocosteos.length; i++) {
                var cmrl1 = costeoActual.Elementocosteos[i].costoCmrc1;
                var cmrl2 = costeoActual.Elementocosteos[i].costoCmrc2;
                var cmrl3 = costeoActual.Elementocosteos[i].costoCmrc3;
                if (!(cmrl1 && cmrl2 && cmrl3) && costeoActual.estado == 'C') {
                    cmrl1 = costeoActual.Elementocosteos[i].costoIni1;
                    cmrl2 = costeoActual.Elementocosteos[i].costoIni2;
                    cmrl3 = costeoActual.Elementocosteos[i].costoIni3;
                }
                elmCosteo = {
                    categoria: costeoActual.Elementocosteos[i].CategoriaId,
                    elemento: costeoActual.Elementocosteos[i].ElementoId,
                    id: costeoActual.Elementocosteos[i].id,
                    valor: costeoActual.Elementocosteos[i].valor,
                    costoIni1: costeoActual.Elementocosteos[i].costoIni1,
                    costoIni2: costeoActual.Elementocosteos[i].costoIni2,
                    costoIni3: costeoActual.Elementocosteos[i].costoIni3,
                    costoCmrc1: cmrl1,
                    costoCmrc2: cmrl2,
                    costoCmrc3: cmrl3,
                    costoReal1: costeoActual.Elementocosteos[i].costoReal1
                };
                if (costeoActual.Elementocosteos[i].CategoriaTipo == 'Y') {
                    data.push(elmCosteo);
                } else {
                    data2.push(elmCosteo);
                }
            }
        } else {
            disableInicial = false;
            disableComercial = true;
            disableReal = true;
        }
        $scope.myData = data;
        $scope.myData2 = data2;
        $scope.myData3 = data3;

        $scope.costeo = $rootScope.costeoIdActual;
        Proceso.getAll().then(function(procesos) {
            $scope.procesos = procesos;
            Cliente.getAll().then(function(clientes) {
                $scope.clientes = clientes;
                $scope.myGridConfig = {
                    // should return your data (an array)
                    getData: function() {
                        return $scope.myData;
                    },

                    options: {
                        "showEditButton": editarFilas,
                        "editable": editarFilas,
                        "disabled": false,
                        "perRowEditModeEnabled": editarFilas,
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
                            "$title": "Valor"
                        }, {
                            "field": "costoIni1",
                            "disabled": disableInicial,
                            "$title": "CostoIni1"
                        }, {
                            "field": "costoIni2",
                            "disabled": disableInicial,
                            "$title": "CostoIni2"
                        }, {
                            "field": "costoIni3",
                            "disabled": disableInicial,
                            "$title": "CostoIni3"
                        }, {
                            "field": "costoCmrc1",
                            "disabled": disableComercial,
                            "$title": "CostoCmrc1"
                        }, {
                            "field": "costoCmrc2",
                            "disabled": disableComercial,
                            "$title": "CostoCmrc2"
                        }, {
                            "field": "costoCmrc3",
                            "disabled": disableComercial,
                            "$title": "CostoCmrc3"
                        }, {
                            "field": "costoReal1",
                            "disabled": disableReal,
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
                        "showEditButton": editarFilas,
                        "editable": editarFilas,
                        "disabled": false,
                        "perRowEditModeEnabled": editarFilas,
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
                            "$title": "Valor"
                        }, {
                            "field": "costoIni1",
                            "disabled": disableInicial,
                            "$title": "CostoIni1"
                        }, {
                            "field": "costoIni2",
                            "disabled": disableInicial,
                            "$title": "CostoIni2"
                        }, {
                            "field": "costoIni3",
                            "disabled": disableInicial,
                            "$title": "CostoIni3"
                        }, {
                            "field": "costoCmrc1",
                            "disabled": disableComercial,
                            "$title": "CostoCmrc1"
                        }, {
                            "field": "costoCmrc2",
                            "disabled": disableComercial,
                            "$title": "CostoCmrc2"
                        }, {
                            "field": "costoCmrc3",
                            "disabled": disableComercial,
                            "$title": "CostoCmrc3"
                        }, {
                            "field": "costoReal1",
                            "disabled": disableReal,
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
                        "showEditButton": editarFilas,
                        "editable": editarFilas,
                        "disabled": false,
                        "perRowEditModeEnabled": editarFilas,
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
                            "$title": "Valor"
                        }, {
                            "field": "costoIni1",
                            "disabled": true,
                            "$title": "CostoIni1"
                        }, {
                            "field": "costoIni2",
                            "disabled": true,
                            "$title": "CostoIni2"
                        }, {
                            "field": "costoIni3",
                            "disabled": true,
                            "$title": "CostoIni3"
                        }, {
                            "field": "costoCmrc1",
                            "disabled": false,
                            "$title": "CostoCmrc1"
                        }, {
                            "field": "costoCmrc2",
                            "disabled": false,
                            "$title": "CostoCmrc2"
                        }, {
                            "field": "costoCmrc3",
                            "disabled": false,
                            "$title": "CostoCmrc3"
                        }, {
                            "field": "costoReal",
                            "disabled": true,
                            "$title": "CostoReal1"
                        }]
                    }
                };

                Categoria.getAllElementos().then(function(categorias) {
                    for (var i = 0; i < categorias.length; i++) {
                        if (categorias[i].tipo == "Y") {
                            categorias[i].id = "I|" + categorias[i].id + "|" + categorias[i].nombre;
                        } else {
                            categorias[i].id = "N|" + categorias[i].id + "|" + categorias[i].nombre;
                        }
                    }
                    $scope.categorias = categorias;
                });


            });
        });

    }

    $scope.cambiaCategoria = function(par_categoriaId) {
        var elementos = [];
        var categoriaId = par_categoriaId.split("|")[1];
        Categoria.getAllElementos().then(function(categorias) {
            for (var i = 0; i < categorias.length; i++) {
                if (categorias[i].id == categoriaId) {
                    for (var j = 0; j < categorias[i].elementos.length; j++) {
                        categorias[i].elementos[j].id = categorias[i].elementos[j].id + '|' + categorias[i].elementos[j].nombre;
                        elementos.push(categorias[i].elementos[j]);
                    }

                }
            }
            $scope.elementos = elementos;
        });

    }

    $scope.adicionarElemento = function() {
        var llaveElemento = $scope.filtro.elmId.split("|");
        var idElemento = llaveElemento[0];
        Costeo.getCostoElmInd(idElemento).then(function(elementos) {

            var data = $scope.myData;
            var data2 = $scope.myData2;
            var llaveCtegoria = $scope.filtro.catId.split("|");
            var llaveElemento = $scope.filtro.elmId.split("|");
            var idCategoria = llaveCtegoria[1];
            var tipoCategoria = llaveCtegoria[0];
            var nombreCategoria = llaveCtegoria[2];
            var idElemento = llaveElemento[0];
            var nombreElemento = llaveElemento[1];
            var insertada = false;
            var elemnt = {};
            var i = 0;
            if (tipoCategoria == "I") {
                for (i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    var categoria = data[i].categoria.split("|");
                    if (categoria[0] == idCategoria) {
                        elemnt = {
                            categoria: '' + categoria[0] + '|' + categoria[1],
                            elemento: '' + idElemento + '|' + nombreElemento,
                            costo: elementos[0].valor,
                            tipo: elementos[0].tipo
                        };
                        insertada = true;
                    }
                }
                if (!insertada) {
                    elemnt = {
                        categoria: '' + idCategoria + '|' + nombreElemento,
                        elemento: '' + idElemento + '|' + nombreElemento,
                        costo: elementos[0].valor,
                        tipo: elementos[0].tipo
                    };
                }
                data.push(elemnt);
            } else {
                for (i = 0; i < data2.length; i++) {
                    var categoria = data2[i].categoria.split("|");
                    if (categoria[0] == idCategoria) {
                        elemnt = {
                            categoria: '' + categoria[0] + '|' + categoria[1],
                            elemento: '' + idElemento + '|' + nombreElemento,
                            costo: elementos[0].valor,
                            tipo: elementos[0].tipo
                        };
                        insertada = true;
                    }
                }
                if (!insertada) {
                    elemnt = {
                        categoria: '' + idCategoria + '|' + nombreElemento,
                        elemento: '' + idElemento + '|' + nombreElemento,
                        costo: elementos[0].valor,
                        tipo: elementos[0].tipo
                    };
                }
                data2.push(elemnt);
            }




        });


    }


    $scope.Totalizar = function(idProceso) {
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
        var impuesto = ($scope.costeo.impuesto / 100);
        var indirecto = ($scope.costeo.indirecto / 100);


        for (var i = 0; i < data.length; i++) {
            data3[0].costoIni1 = (parseFloat(data3[0].costoIni1) + (parseFloat(data[i].costoIni1) * (1 + indirecto) * (1 + impuesto))).toFixed(2);
            data3[0].costoIni2 = (parseFloat(data3[0].costoIni2) + (parseFloat(data[i].costoIni2) * (1 + indirecto) * (1 + impuesto))).toFixed(2);
            data3[0].costoIni3 = (parseFloat(data3[0].costoIni3) + (parseFloat(data[i].costoIni3) * (1 + indirecto) * (1 + impuesto))).toFixed(2);
            data3[0].costoCmrc1 = (parseFloat(data3[0].costoCmrc1) + parseFloat(data[i].costoCmrc1)).toFixed(2);
            data3[0].costoCmrc2 = (parseFloat(data3[0].costoCmrc2) + parseFloat(data[i].costoCmrc2)).toFixed(2);
            data3[0].costoCmrc3 = (parseFloat(data3[0].costoCmrc3) + parseFloat(data[i].costoCmrc3)).toFixed(2);
            data3[0].costoReal1 = (parseFloat(data3[0].costoReal1) + parseFloat(data[i].costoReal1)).toFixed(2);
        }
        for (i = 0; i < data2.length; i++) {
            data3[0].costoIni1 = (parseFloat(data3[0].costoIni1) + (parseFloat(data2[i].costoIni1))).toFixed(2);
            data3[0].costoIni2 = (parseFloat(data3[0].costoIni2) + (parseFloat(data2[i].costoIni2))).toFixed(2);
            data3[0].costoIni3 = (parseFloat(data3[0].costoIni3) + (parseFloat(data2[i].costoIni3))).toFixed(2);
            data3[0].costoCmrc1 = (parseFloat(data3[0].costoCmrc1) + parseFloat(data2[i].costoCmrc1)).toFixed(2);
            data3[0].costoCmrc2 = (parseFloat(data3[0].costoCmrc2) + parseFloat(data2[i].costoCmrc2)).toFixed(2);
            data3[0].costoCmrc3 = (parseFloat(data3[0].costoCmrc3) + parseFloat(data2[i].costoCmrc3)).toFixed(2);
            data3[0].costoReal1 = (parseFloat(data3[0].costoReal1) + parseFloat(data2[i].costoReal1)).toFixed(2);
        }
        console.log('Costo real: ' + data3[0].costoReal1);

    };

    $scope.guardarCosteo = function() {
        var data3 = $scope.myData3;
        var estadoId = $scope.costeo.estado;
        if (!estadoId) {
            estadoId = "N";
        }
        $scope.Totalizar();
        var costeoTmp = {
            id: $scope.costeo.id,
            nombre: $scope.costeo.nombre,
            requerimiento: $scope.costeo.requerimiento,
            estado: estadoId,
            unidad1: $scope.costeo.unidad1,
            unidad2: $scope.costeo.unidad2,
            unidad3: $scope.costeo.unidad3,
            totalI1: data3[0].costoIni1,
            totalI2: data3[0].costoIni2,
            totalI3: data3[0].costoIni3,
            totalC1: data3[0].costoCmrc1,
            totalC2: data3[0].costoCmrc2,
            totalC3: data3[0].costoCmrc3,
            prcVenta1: data3[1].costoCmrc1,
            prcVenta2: data3[1].costoCmrc2,
            prcVenta3: data3[1].costoCmrc3,
            totalCR: data3[0].costoReal1,
            indirecto: $scope.costeo.indirecto,
            impuesto: $scope.costeo.impuesto,
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
                    ElementoId: elmentoId[0]
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
                    ElementoId: elmentoId[0]
                };
                Costeo.saveElmnCosteo(elmcosteoTmp);
            }

        }).$promise;

        /*$scope.myGridConfig.options.columns[3].disabled = true;*/
        //console.log($scope.myData);
    };


    $scope.cambiaProceso = function(idProceso) {
        Proceso.categoriasAll(idProceso).then(function(procesos) {
            var data = [];
            var data2 = [];
            var data3 = [];
            if (procesos.length > 0) {
                for (var i = 0; i < procesos[0].categorias.length; i++) {
                    console.log(procesos[0].categorias[i]);
                    for (var j = 0; j < procesos[0].categorias[i].elementos.length; j++) {
                        var elemnt = {
                            categoria: '' + procesos[0].categorias[i].CategoriumId + '|' + procesos[0].categorias[i].categoriaNbr,
                            elemento: '' + procesos[0].categorias[i].elementos[j].ElementoId + '|' + procesos[0].categorias[i].elementos[j].elemmentoNbr
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
                var precioVenta = {
                    categoria: 'Precio Venta'
                };
                data3.push(totales);
                data3.push(precioVenta);
            }
            $scope.myData = data;
            $scope.myData2 = data2;
            $scope.myData3 = data3;
            $scope.costeo.impuesto = parseFloat(procesos[0].impuesto);
            $scope.costeo.indirecto = parseFloat(procesos[0].indirecto);
        });

    }

    $scope.calcular = function(tipo, unidad, costo, valor) {
        var valorCalc = 0;
        switch (tipo) {
            case "M":
                valorCalc = valor * costo;
                break;
            case "D":
                if (valor > 0) {
                    valorCalc = Number((costo / valor).toFixed(2));
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
            var data = $scope.myData;
            var data2 = $scope.myData2;
            var data3 = $scope.myData3;
            var impuesto = ($scope.costeo.impuesto / 100);
            var indirecto = ($scope.costeo.indirecto / 100);
            data3[0].costoIni1 = 0;
            data3[0].costoIni2 = 0;
            data3[0].costoIni3 = 0;
            data3[0].costoCmrc1 = 0;
            data3[0].costoCmrc2 = 0;
            data3[0].costoCmrc3 = 0;
            data3[0].costoReal1 = 0;
            var costo = 0;
            var tipo;
            console.log('impuesto: ' + impuesto + ' ,  indirecto=' + indirecto);
            for (var i = 0; i < data.length; i++) {
                costo = data[i].costo;
                tipo = data[i].tipo;
                if (!costo) {
                    for (var j = 0; j < elementos.length; j++) {
                        if (elementos[j].id == data[i].elemento[0]) {
                            costo = elementos[j].valor;
                            tipo = elementos[j].tipo;
                        }
                    }
                }
                data[i].costoIni1 = $scope.calcular(tipo, unidad1, costo, data[i].valor);
                data[i].costoIni2 = $scope.calcular(tipo, unidad2, costo, data[i].valor);
                data[i].costoIni3 = $scope.calcular(tipo, unidad3, costo, data[i].valor);
                data3[0].costoIni1 = (parseFloat(data3[0].costoIni1) + (parseFloat(data[i].costoIni1) * (1 + indirecto) * (1 + impuesto))).toFixed(2);
                data3[0].costoIni2 = (parseFloat(data3[0].costoIni2) + (parseFloat(data[i].costoIni2) * (1 + indirecto) * (1 + impuesto))).toFixed(2);
                data3[0].costoIni3 = (parseFloat(data3[0].costoIni3) + (parseFloat(data[i].costoIni3) * (1 + indirecto) * (1 + impuesto))).toFixed(2);
            }
            for (i = 0; i < data2.length; i++) {
                costo = data2[i].costo;
                tipo = data2[i].tipo;
                if (!costo) {
                    for (var j = 0; j < elementos.length; j++) {
                        //console.log(elementos[j].id+' , '+data2[i].elemento[0]);
                        if (elementos[j].id == data2[i].elemento[0]) {
                            costo = elementos[j].valor;
                            tipo = elementos[j].tipo;
                        }

                    }
                }
                console.log(data2[i].elemento[0] + ' , ' + costo + ' , ' + tipo);
                data2[i].costoIni1 = $scope.calcular(tipo, unidad1, costo, data2[i].valor);
                data2[i].costoIni2 = $scope.calcular(tipo, unidad2, costo, data2[i].valor);
                data2[i].costoIni3 = $scope.calcular(tipo, unidad3, costo, data2[i].valor);
                data3[0].costoIni1 = (parseFloat(data3[0].costoIni1) + (parseFloat(data2[i].costoIni1))).toFixed(2);
                data3[0].costoIni2 = (parseFloat(data3[0].costoIni2) + (parseFloat(data2[i].costoIni2))).toFixed(2);
                data3[0].costoIni3 = (parseFloat(data3[0].costoIni3) + (parseFloat(data2[i].costoIni3))).toFixed(2);
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
