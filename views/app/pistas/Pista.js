/**
 * Servicio para enviar codigo de respuesta al servicor
 */
(function() {
    angular.module('app').service('Pista', function(Http, Upload, EventHandler) {
        var self = this;
        var pista;

        /**
         * Se encarga de cambiar la calificación recibida
         * @param nueva calificacion
         * @returns
         */
        self.setPista = function(pistaP) {
            pista = pistaP;
        };

        /**
         * Se encarga de devolver la calificacion obtenida
         * @param code El código a compilar
         * @param array Arreglo en donde se devolverán los mensajes dados como respuesta por el compilador
         * @returns {*}
         */
        self.getPista = function() {
            return pista;
        };

        /**
         * Crea o acutializa la pregunta por parámetro.
         * @param pregunta Pregunta que se va a guardar
         * @returns {*}
         */
        self.getAll = function(pista) {
            return Http.get('pistas/');
        };

        /**
         * Crea o acutializa la pregunta por parámetro.
         * @param pregunta Pregunta que se va a guardar
         * @returns {*}
         */
        self.save = function(pista) {
            return Http.post('pistas/', pista);
        };

        self.create = function(pista, pistaFile, progressCallback, endCallback) {
            Upload.upload({
                url: 'api/pistas/file',
                fields: pista,
                file: pistaFile
            }).progress(progressCallback).success(endCallback).error(EventHandler.error);
        };

        /**
         * Crea o acutializa la pregunta por parámetro.
         * @param pregunta Pregunta que se va a guardar
         * @returns {*}
         */
        self.getPistasByEstado = function(estadoId) {
            return Http.get('pistas/estado/'+estadoId);
        };

        /**
         * Crea o acutializa la pregunta por parámetro.
         * @param pregunta Pregunta que se va a guardar
         * @returns {*}
         */
        self.getPistasByConcurso = function(concursoId) {
            return Http.get('pistas/concurso/'+concursoId);
        };


    });
})();
