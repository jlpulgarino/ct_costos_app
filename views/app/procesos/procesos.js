/**
 * Controlador de las aplicaciones
 */

angular.module("app").controller('ProcesosCtrl', function($rootScope, $scope, $location, Proceso) {
    console.log('CONTROLADOR_PRC');

    refresh();

    function refresh() {

        if (!($rootScope.usuarioLogueado)) {
            $location.path('/login');
        }else{
        Proceso.getAll().then(function(procesos) {
            $scope.procesos = procesos;
        });
        }
    }


    $scope.select = function(proceso) {
        $scope.procesoSelected = proceso;
    };

    $scope.editProceso = function(proceso) {
        $rootScope.idProcesoActual = proceso;
        $location.path('/procesos/edit');
    };

    $scope.addProceso = function() {
        $rootScope.idProcesoActual = null;
        $location.path('/procesos/edit');
    };

    $scope.delProceso = function(ev, proceso) {
        Proceso.delete(proceso.id).then(function() {
            Proceso.getAll().then(function(procesos) {
                $scope.procesos = procesos;
            });
        });

    };


    $scope.getProcesos = function() {
        $scope.promise = Proceso.getAll().$promise;
    };


});


angular.module("app").controller('editProcesosCtrl', function($rootScope, $scope, $location, Proceso) {
    console.log('CONTROLADOR_EDIT_PRY');
    $scope.selected = [];

    refresh();

    function refresh() {
        var prcgActual = $rootScope.idProcesoActual;
        $scope.proceso = $rootScope.idProcesoActual;
        $scope.tree_data = [];
        if (!($rootScope.usuarioLogueado)) {
            $location.path('/login');
        }else{
        if (prcgActual) {
            $scope.col_defs = [{
                field: 'addCat',
                displayName: 'Adicionar Elemento',
                cellTemplate: '<a ng-click="cellTemplateScope.click(row)" ><span ng-class="text-success">{{row.branch[col.field] }}</a>',
                cellTemplateScope: {
                    click: function(idCat) { // this works too: $scope.someMethod;
                        $scope.addElementoProc(idCat)
                    }
                }
            }, {
                field: 'delElm',
                displayName: 'Eliminar',
                cellTemplate: '<a ng-click="cellTemplateScope.click(row)" ><span ng-class="text-success">{{row.branch[col.field] }}</a>',
                cellTemplateScope: {
                    click: function(idCat) { // this works too: $scope.someMethod;
                        $scope.delElementoProc(idCat)
                    }
                }
            }];

            Proceso.categoriasAll(prcgActual.id).then(function(procesos) {
                if (procesos.length > 0) {
                    var categorias = procesos[0].categorias;
                    if (categorias.length > 0) {
                        var dataCat = [];
                        for (var i = 0; i < categorias.length; i++) {
                            var elementos = categorias[i].elementos;
                            var elmCat = [];
                            if (elementos.length > 0) {
                                for (var j = 0; j < elementos.length; j++) {
                                    var dataElm = {
                                        Nombre: elementos[j].elemmentoNbr,
                                        Id: elementos[j].id,
                                        delElm: 'Eliminar Elemento'
                                    };
                                    elmCat.push(dataElm);
                                }
                            }
                            var catPrc = {
                                Nombre: categorias[i].categoriaNbr,
                                CatId: categorias[i].id,
                                categoriaId: categorias[i].id,
                                CategoriumId: categorias[i].CategoriumId,
                                addCat: 'Adicionar Elemento',
                                delElm: 'Eliminar Categoria',
                                children: elmCat
                            };
                            dataCat.push(catPrc);
                        }
                        $scope.tree_data = dataCat;
                    }
                }
            });
        }
        }

    }

    $scope.addElementoProc = function(idCAtegoria) {
        $rootScope.catPrcId = idCAtegoria;
        console.log(idCAtegoria.branch.CatId);
        $location.path('/procesos/elementosPrc');
    };

    $scope.addCategoriaProc = function() {
        $location.path('/procesos/categoriasPrc');
    };

    $scope.delElementoProc = function(data) {
        var categoriaId = data.branch.CatId;
        console.log(data);
        if (categoriaId){
            Proceso.deleteCategoriaPrc(categoriaId).then(function() {
                refresh();
            });
        }else{
            Proceso.deleteElementoPrc(data.branch.Id).then(function() {
                refresh();
            });
        }
    };

    $scope.guardarProceso = function() {
        var procesoTmp = {
            id: $scope.proceso.id,
            nombre: $scope.proceso.nombre,
            descripcion: $scope.proceso.descripcion,
            indirecto: $scope.proceso.indirecto,
            impuesto: $scope.proceso.impuesto
        };
        $scope.promise = Proceso.save(procesoTmp).then(function() {
            $location.path('/procesos');
        }).$promise;
    };

    $scope.cancel = function() {

        $location.path('/procesos');
    }

    $scope.delElementoPrc = function(ev, elemento) {
        Proceso.deleteElemento(elemento.id).then(function() {
            Proceso.getElementos($rootScope.idProcesoActual.id).then(function(procesos) {
                if (procesos.length > 0) {
                    $scope.elementos = procesos[0].Elementos;
                }
            });
        });

    };


});


angular.module("app").controller('addElementoCtrl', function($rootScope, $scope, $location, Proceso, Categoria) {
    console.log('CONTROLADOR_addElm');

    refresh();

    function refresh() {

        if (!($rootScope.usuarioLogueado)) {
            $location.path('/login');
        }else{
        var idCAtegoria = $rootScope.catPrcId;
        var prcActual = $rootScope.idProcesoActual;
        var elementos = [];
        console.log('Buscando elementos:'+idCAtegoria.branch.CategoriumId);
        Categoria.getAllElementos().then(function(categorias) {
            for (var i = 0; i< categorias.length; i++){
                if(categorias[i].id == idCAtegoria.branch.CategoriumId){
                    for(var j = 0; j<categorias[i].elementos.length; j++){
                        elementos.push(categorias[i].elementos[j]);
                    }

                }
            }
            $scope.elementos = elementos;
            $scope.elementoPrc = {
                categoriaId: idCAtegoria.branch.CatId
            };
            console.log(elementos);
        });
        }
    }


    $scope.addElementoPrc = function() {

        var procesoTmp = {
            id: $scope.elementoPrc.id,
            CategoriaprocesoId: $scope.elementoPrc.categoriaId,
            ElementoId: $scope.elementoPrc.elmId
        };
        $scope.promise = Proceso.saveElementoPrc(procesoTmp).then(function() {
            $location.path('/procesos/edit');
        }).$promise;
    };

    $scope.cancel = function(ev, proceso) {
        $location.path('/procesos/edit');
    };



});

angular.module("app").controller('addCategoriaCtrl', function($rootScope, $scope, $location, Proceso, Categoria) {
    console.log('CONTROLADOR_addElm');

    refresh();

    function refresh() {

        if (!($rootScope.usuarioLogueado)) {
            $location.path('/login');
        }else{
        Categoria.getAllElementos().then(function(categorias) {
            $scope.categorias = categorias;
            var procesoActual = $rootScope.idProcesoActual;
            $scope.categoriaPrc={
                procesoId: procesoActual.id
            }
        });
        }
    }


    $scope.addCategoriaPrc = function() {

        var categoriaTmp = {
            ProcesoId: $scope.categoriaPrc.procesoId,
            CategoriumId: $scope.categoriaPrc.catId
        };
        $scope.promise = Proceso.saveCategoriaPrc(categoriaTmp).then(function() {
            $location.path('/procesos/edit');
        }).$promise;
    };

    $scope.cancel = function(ev, proceso) {
        $location.path('/procesos/edit');
    };



});
