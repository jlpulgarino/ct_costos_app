/**
 * Servicio para enviar codigo de respuesta al servicor
 */
(function() {
    angular.module('app').service('Usuario', function(Http) {
        console.log('SERVICIO_USR');
        self = this;

        self.getAll = function() {
            return Http.get('usuarios');
        };

        self.get = function(usuarioId) {
            return Http.get('usuarios/' + usuarioId);
        };

        self.save = function(usuario) {
            return Http.post('usuarios/', usuario);
        };

        self.login = function(credenciales) {
            return Http.post('usuarios/login', credenciales);
        };


        self.delete = function(usuarioId) {
            return Http.delete('usuarios/'+ usuarioId);
        };


    });
})();
