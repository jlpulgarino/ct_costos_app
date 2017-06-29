angular.module("app").controller('UsuariosCtrl', function($rootScope, $scope,  $location, Usuario) {
    console.log('CONTROLADOR_USR');
    $scope.selected = [];

    refresh();

    function refresh() {
        /*if(!(idUsuarioActual)){
            $location.path('/login');
        }else{*/
                    Usuario.getAll().then(function(usuarios) {
                        $scope.usuarios = usuarios;
                    });
        /*}*/
    }


    $scope.editUsuario = function(usuario) {
        $rootScope.idUsuarioActual = usuario;
        $location.path('/usuarios/edit');
    };

    $scope.addUsuario = function() {
        $rootScope.idUsuarioActual = null;
        $location.path('/usuarios/edit');
    };

    $scope.delUsuario = function(ev, usuario) {
        Usuario.delete(usuario.id).then(function(){
            Usuario.getAll().then(function(usuarios) {
                $scope.usuarios = usuarios;
            });
        });

    };

});

angular.module("app").controller('editUsuarioCtrl', function($rootScope, $scope, $location, Usuario) {
    console.log('CONTROLADOR_EDIT_USR');

    refresh();

    function refresh() {
        $scope.usuario =$rootScope.idUsuarioActual;
        /*if(!(idUsuarioActual)){
            $location.path('/login');
        }else{
        }*/
    }

    $scope.guardarUsuario = function() {
        var usuarioTmp = {
            id: $scope.usuario.id,
            usuario: $scope.usuario.usuario,
            nombre: $scope.usuario.nombre,
            rol: $scope.usuario.rol,
            email: $scope.usuario.email,
            password: $scope.usuario.password
        };
        $scope.promise = Usuario.save(usuarioTmp).then(function(){
            $location.path('/usuarios');
        }).$promise;
    };

    $scope.cancel = function(){
        $location.path('/usuarios');
    }


});

angular.module("app").controller('LoginCtrl', function($rootScope, $scope, $location, Usuario) {
    console.log('CONTROLADOR_EDIT_LOGIN');
    refresh();

    function refresh() {
        $scope.usuario = {

        };
        $scope.message = {
            error: ''
        };
    }

    $scope.entrar = function() {
        var message = {
            error: ''
        };

        var usuarioTmp = {
            username: $scope.usuario.username,
            password: $scope.usuario.password
        };
        $scope.promise = Usuario.login(usuarioTmp).then(function(usrLogin) {
            if (usrLogin.length > 0){
                $rootScope.usuarioLogueado = usrLogin[0];
                console.log('LOGIN::UsurioLogueado::'+$rootScope.usuarioLogueado.nombre)
                $location.path('/costeos');
            }else{
                message.error = "Usuario o contraseña invalida";
            }
            $scope.message = message;
        }).$promise;

    };


});
