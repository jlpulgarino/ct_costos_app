/**
 * Servicio para enviar codigo de respuesta al servicor
 */
(function() {
    angular.module('app').service('Categoria', function(Http, EventHandler) {
        var self = this;

    self.getAll = function() {
        return Http.get('categorias');
    };

    self.get = function(categoriaId) {
        return Http.get('categorias/' + categoriaId);
    };

    self.save = function(categoria) {
        return Http.post('categorias/', categoria);
    };

    self.delete = function(categoriaId) {
        return Http.delete('categorias/'+ categoriaId);
    };

    self.getElementos = function(categoriaId){
        return Http.get('categorias/'+categoriaId+'/elementos');
    };

    self.getAllElementos = function(categoriaId){
        return Http.get('categorias/0/elementosAll');
    };

    self.deleteElemento = function(elementoId) {
        return Http.delete('elementos/'+ elementoId);
    };

    });
})();
