/**
 * Servicio para enviar codigo de respuesta al servicor
 */
(function() {
    angular.module('app').service('Concurso', function(Http, Upload, EventHandler) {
        var self = this;
        var concurso;

        /**
         * Se encarga de cambiar la calificación recibida
         * @param nueva calificacion
         * @returns
         */
        self.setConcurso = function(concursoP) {
            concurso = concursoP;
        };

        /**
         * Se encarga de devolver la calificacion obtenida
         * @param code El código a compilar
         * @param array Arreglo en donde se devolverán los mensajes dados como respuesta por el compilador
         * @returns {*}
         */
        self.getConcurso = function() {
            return concurso;
        };

        /**
         * Crea o acutializa la pregunta por parámetro.
         * @param pregunta Pregunta que se va a guardar
         * @returns {*}
         */
        self.save = function(concurso) {
            return Http.post('concursos/', concurso);
        };

        self.create = function(concurso, concursoFile, progressCallback, endCallback) {
            Upload.upload({
                url: 'api/concursos/file',
                fields: concurso,
                file: concursoFile
            }).progress(progressCallback).success(endCallback).error(EventHandler.error);
        };

        /**
         * Crea o acutializa la pregunta por parámetro.
         * @param pregunta Pregunta que se va a guardar
         * @returns {*}
         */
        self.getUsrConcurso = function(idUsuario) {
            return Http.get('usuarios/'+idUsuario+'/concurso');
        };

    });
})();
