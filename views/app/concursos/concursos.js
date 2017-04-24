/**
 * Controlador de las aplicaciones
 */

angular.module("app").controller('ConcursosCtrl', function($rootScope, $scope, $location, $mdDialog, Concurso) {
    console.log('CONTROLADOR_CONCURSOS');
    refresh();

    function refresh() {
        var cuentas;
        var idCta = $rootScope.cuentaActual._id;
        console.log($rootScope.cuentaActual);
        $scope.concurso = {
            CuentumId: idCta
        };
        if($rootScope.concursoActual){
            $scope.concurso = $rootScope.concursoActual;
            $scope.concurso.fechaIni = new Date($rootScope.concursoActual.fechaIni);
            $scope.concurso.fechaFin = new Date($rootScope.concursoActual.fechaFin);
        }
        /*
        Cuenta.getUsrCuenta(idUsr).then(function(usuarios) {
            $scope.cuenta = usuarios[0].Cuenta[0];
            $rootScope.idCuentaActual = usuarios[0].Cuenta[0].id;
            console.log($scope.cuenta);
        });*/
        //console.log(params.cta);


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
        console.log('conId.Controller::'+$scope.concurso._id);
        var concursoTmp = {
            _id: $scope.concurso._id,
            nombre: $scope.concurso.nombre,
            banner: f.name,
            url: $scope.concurso.url,
            fechaIni: $scope.concurso.fechaIni,
            fechaFin: $scope.concurso.fechaFin,
            valor: $scope.concurso.valor,
            texto: $scope.concurso.texto,
            recomendacion: $scope.concurso.recomendacion,
            CuentumId: $scope.concurso.CuentumId
        };
        $scope.promise = Concurso.save(concursoTmp).then(function(concursoCreado) {
            $rootScope.concursoActual = concursoCreado;
                Concurso.create(concursoCreado, f, function(evt) {}, function(data) {
            });
            $location.path('/cuenta');
        }).$promise;

    };

});
