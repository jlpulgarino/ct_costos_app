/**
 * Controlador de las aplicaciones
 */

angular.module("app").controller('PistasCtrl', function($rootScope, $scope, $location, $mdDialog, Pista) {
    console.log('CONTROLADOR_EDIT_SB');
    refresh();

    function refresh() {
        //var idConcurso = $rootScope.concursoActual.id;
        /*$scope.pista = {
            concurso: idConcurso
        };*/
        $scope.file = null;
        Pista.getAll().then(function(pistas) {
            for (var i = 0; i < pistas.length; i++){
                if(pistas[i].urlFinal.estado=2){
                    var arr = pistas[i].urlFinal.split("/");
                    pistas[i].urlFinal = "api/pistas/voz/"+arr[arr.length -1 ]
                }else{
                    pistas[i].urlFinal = "api/pistas/voz/Fortuna.mp3";
                }
            }
            $scope.pistas = pistas;
        });

    }

    $scope.guardar = function() {
        var f = document.getElementById('file').files[0],
            r = new FileReader();
        /*    console.log(f);
        r.onloadend = function(e) {
            var data = e.target.result;
            //send your binary data via $http or $resource or do anything else with it
        }*/
        r.readAsBinaryString(f);

        var pista = {
            nombre: $scope.pista.nombre,
            urlOrigen: urlOrg,
            urlFinal: urlOrg,
            observacion: 'nota 1', //$scope.pista.observacion,
            estado: 'N',
            ConcursoId: idConcurso,
            UsuarioId: idusuario
        };

        $scope.promise = Pista.save(pista).then(function() {
            Pista.create(concursoTmp, f, function(evt) {}, function(data) {
                $location.path('/portal/pistas/add');
            });
        }).$promise;

    }

    $scope.cancel = function() {

    }

    $scope.verTexto = function(pista) {
        $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title(pista.nombre)
            .textContent(pista.observacion)
            .ariaLabel('Left to right demo')
            .ok('Aceptar')
            // You can specify either sting with query selector
            //.openFrom('#left')
            // or an element
            .closeTo(angular.element(document.querySelector('#right')))
        );
    };

    $scope.crearPista = function() {
        $scope.pista = {
            ConcursoId: '58dfc1ed42065d132c2582ab'
        };
        $location.path('/portal/pistas/add');
    };



});

angular.module("app").controller('CncrsPistasCtrl', function($rootScope, $scope, $location, $mdDialog, Pista) {
    console.log('CONTROLADOR_EDIT_SB');
    refresh();

    function refresh() {
        var idConcurso = $rootScope.concursoActual.id;
        var numsort = function(a, b) {
            return a - b;
        };
        Pista.getPistasByConcurso(idConcurso).then(function(pistas) {
            pistas.sort(function(a, b) {
                var c = new Date(a.createdAt);
                var d = new Date(b.createdAt);
                return c - d;
            });
            for (var i = 0; i < pistas.length; i++) {
                var estado = pistas[i].estado;
                if (estado == 2) {
                    pistas[i].estado = "Procesado";
                } else {
                    pistas[i].estado = "No procesado";
                }
                pistas[i].createdAt = new Date(pistas[i].createdAt);
            }
            $scope.pistas = pistas;
        });

    }

    $scope.cancel = function() {

    };

    $scope.verTexto = function(pista) {
        $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title(pista.nombre)
            .textContent(pista.observacion)
            .ariaLabel('Left to right demo')
            .ok('Aceptar')
            // You can specify either sting with query selector
            //.openFrom('#left')
            // or an element
            .closeTo(angular.element(document.querySelector('#right')))
        );
    };



});

angular.module("app").controller('PistasEditCtrl', function($rootScope, $scope, $location, $mdDialog, Pista) {
    console.log('CONTROLADOR_EDIT_SB');
    refresh();

    function refresh() {
        $scope.pista = {
            ConcursoId: '58dfc1ed42065d132c2582ab'
        };

    }

    $scope.guardar = function() {
        var f = document.getElementById('file').files[0],
            r = new FileReader();
        /*    console.log(f);
        r.onloadend = function(e) {
            var data = e.target.result;
            //send your binary data via $http or $resource or do anything else with it
        }*/
        r.readAsBinaryString(f);
        var pista = {
            nombre: $scope.pista.nombre,
            apellido: $scope.pista.apellido,
            email: $scope.pista.email,
            urlOrigen: f.name,
            urlFinal: '',
            observacion: $scope.pista.observacion,
            estado: 1,
            ConcursoId: $scope.pista.ConcursoId
        };

        $scope.promise = Pista.save(pista).then(function(pistaCreada) {
            Pista.create(pistaCreada, f, function(evt) {}, function(data) {
                $location.path('/portal/pistas');
            });
        }).$promise;

    };

    $scope.cancel = function() {
        $location.path('/portal/pistas');
    };




});
