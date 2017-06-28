/**
 * Servicio para enviar codigo de respuesta al servicor
 */
(function() {
    angular.module('app').service('Costeo', function(Http, EventHandler) {
        console.log('JLPO_CREACION_SERVICIO_COSTEO');
        self = this;

        self.getAll = function() {
            return Http.get('costeos');
        };


        self.get = function(costeoId) {
            return Http.get('costeos/' + costeoId);
        };

        self.save = function(costeo) {
            return Http.post('costeos/', costeo);
        };

        self.delete = function(costeoId) {
            return Http.delete('costeos/'+ costeoId);
        };

        self.getCosteos = function(costeoId){
            return Http.get('elementos/'+costeoId+'/costeos');
        };

        self.saveElmnCosteo = function(costeo) {
            return Http.post('elementoscosteos/', costeo);
        };

        self.getCostoElm = function(elmPrcId) {
            return Http.get('elementosprocesos/costo/'+elmPrcId);
        };

        self.getCostoElmInd = function(elmPrcId) {
            return Http.get('elementos/'+elmPrcId+'/costo');
        };

        self.getCosteoElementos = function(costeoId) {
            return Http.get('costeos/'+costeoId+'/elementoscosteos');
        };

    });
})();
