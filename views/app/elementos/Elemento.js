/**
 * Servicio para enviar codigo de respuesta al servicor
 */
(function() {
    angular.module('app').service('Elemento', function(Http, EventHandler) {
        console.log('JLPO_CREACION_SERVICIO_ELMN');
        self = this;

        self.getAll = function() {
            return Http.get('elementos');
        };


        self.get = function(elementoId) {
            return Http.get('elementos/' + elementoId);
        };

        self.save = function(elemento) {
            return Http.post('elementos/', elemento);
        };

        self.delete = function(elementoId) {
            return Http.delete('elementos/'+ elementoId);
        };

        self.getCostos = function(elementoId){
            return Http.get('elementos/'+elementoId+'/costos');
        };


    });
})();
