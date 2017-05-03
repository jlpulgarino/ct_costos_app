/**
 * Servicio para enviar codigo de respuesta al servicor
 */
(function() {
    angular.module('app').service('Proceso', function(Http, EventHandler) {
        var self = this;

    self.getAll = function() {
        return Http.get('procesos');
    };

    self.get = function(procesoId) {
        return Http.get('procesos/' + procesoId);
    };

    self.save = function(proceso) {
        return Http.post('procesos/', proceso);
    };

    self.delete = function(procesoId) {
        return Http.delete('procesos/'+ procesoId);
    };

    self.getElementos = function(procesoId){
        return Http.get('procesos/'+procesoId+'/elementos');
    };

    self.categoriasAll = function(procesoId){
        return Http.get('procesos/'+procesoId+'/categoriasAll');
    };

    self.saveElementoPrc = function(elementoPrc){
        return Http.post('elementosprocesos/', elementoPrc);
    };

    self.saveCategoriaPrc = function(categoriaPrc){
        return Http.post('categoriasprocesos/', categoriaPrc);
    };

    self.deleteElementoPrc = function(elmIdPrc) {
        return Http.delete('elementosprocesos/'+ elmIdPrc);
    };

    self.deleteCategoriaPrc = function(catIdPrc) {
        return Http.delete('categoriasprocesos/'+ catIdPrc);
    };

    });
})();
