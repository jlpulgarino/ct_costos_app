/**
 * Servicio para enviar codigo de respuesta al servicor
 */
(function() {
    angular.module('app').service('Cliente', function(Http) {
        console.log('SERVICIO_CLI');
        self = this;

        self.getAll = function() {
            return Http.get('clientes');
        };

        self.get = function(clienteId) {
            return Http.get('clientes/' + clienteId);
        };

        self.save = function(cliente) {
            return Http.post('clientes/', cliente);
        };

        self.login = function(credenciales) {
            return Http.post('clientes/login', credenciales);
        };


        self.delete = function(clienteId) {
            return Http.delete('clientes/'+ clienteId);
        };


    });
})();
