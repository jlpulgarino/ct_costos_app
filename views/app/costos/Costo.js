/**
 * Servicio para enviar codigo de respuesta al servicor
 */
(function() {
    angular.module('app').service('Costo', function(Http, EventHandler) {
        console.log('JLPO_CREACION_SERVICIO_ELMN');
        self = this;

        self.getAll = function() {
            return Http.get('costos');
        };


        self.get = function(costoId) {
            return Http.get('costos/' + elementoId);
        };

        self.save = function(costo) {
            return Http.post('costos/', costo);
        };

        self.delete = function(costoId) {
            return Http.delete('costos/'+ costoId);
        };

        self.getCostos = function(elementoId){
            return Http.get('elementos/'+elementoId+'/costos');
        };


    });
})();
