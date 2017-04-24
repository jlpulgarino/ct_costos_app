/**
 * Controlador de las aplicaciones
 JLPULGARIN 001 2017-03-31 Implementacion con mongo
 */

angular.module("app").controller('CuentasCtrl', function($rootScope, $scope, $location, $mdDialog, Cuenta) {
    console.log('CONTROLADOR_CUENTAS');
    refresh();

    function refresh() {
        var cuentas;
        var idUsr = $rootScope.usuarioLogueado._id;
        Cuenta.getUsrCuenta(idUsr).then(function(cuentas) {
            console.log(cuentas[0]);
            var ctaTmp = cuentas[0];
            Cuenta.getConcrsCuenta(ctaTmp._id).then(function(concursos){
                $scope.concursos = concursos;
            });
            $rootScope.cuentaActual = ctaTmp;
            $scope.cuenta = ctaTmp;

            $rootScope.idCuentaActual = ctaTmp._id;
        });

        // JLPULGARIN 001 Fin

    }

    $scope.pistasConcurso = function(concursoSel) {
        $rootScope.concursoActual = concursoSel;
        $location.path('/concursos/pistas');
    }

    $scope.crearConcurso = function() {
        $rootScope.concursoActual = null;
        $location.path('/concursos/edit');
    }

    $scope.editarConcurso = function(concursoSel) {
        $rootScope.concursoActual = concursoSel;
        $location.path('/concursos/edit');
    }

    $scope.eliminaConcurso = function(concurso) {
        var idUsr = $rootScope.usuarioLogueado._id;
        Cuenta.delConcurso(concurso._id).then(function() {
            Cuenta.getConcrsCuenta($rootScope.cuentaActual._id).then(function(concursos){
                $scope.concursos = concursos;
            });
        });
    }

    $scope.registro = function() {
        var password1 = $scope.cuenta.password;
        var password2 = $scope.cuenta.password2;
        var message = {
            error: ''
        };

        if (password1 == password2) {
            var cuentaTmp = {
                id: $scope.cuenta.id,
                nombre: $scope.cuenta.nombre,
                apellido: $scope.cuenta.apellido,
                email: $scope.cuenta.email,
                password: $scope.cuenta.password,
                rol: 'A'
            };
            $scope.promise = Cuenta.save(cuentaTmp).then(function() {
                $rootScope.cuentaLogueado = cuentaTmp;
            }).$promise;
        } else {
            message.error = "Contraseñas diferentes";
        }
        $scope.message = message;
    };

    $scope.verTexto = function(concurso) {
        $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title(concurso.nombre)
            .textContent(concurso.texto)
            .ariaLabel('Left to right demo')
            .ok('Aceptar')
            // You can specify either sting with query selector
            //.openFrom('#left')
            // or an element
            .closeTo(angular.element(document.querySelector('#right')))
        );
    }

    $scope.verRecomendacion = function(concurso) {
        $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title(concurso.nombre)
            .textContent(concurso.recomendacion)
            .ariaLabel('Left to right demo')
            .ok('Aceptar')
            // You can specify either sting with query selector
            //.openFrom('#left')
            // or an element
            .closeTo(angular.element(document.querySelector('#right')))
        );
    }


});
