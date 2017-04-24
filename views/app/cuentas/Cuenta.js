/**
 * Servicio para enviar codigo de respuesta al servicor
 */
(function() {
    angular.module('app').service('Cuenta', function(Http) {
        var self = this;
        var cuenta;

        /**
         * Se encarga de cambiar la calificación recibida
         * @param nueva calificacion
         * @returns
         */
        self.setCuenta = function(cuentaP) {
            cuenta = cuentaP;
        };

        /**
         * Se encarga de devolver la calificacion obtenida
         * @param code El código a compilar
         * @param array Arreglo en donde se devolverán los mensajes dados como respuesta por el compilador
         * @returns {*}
         */
        self.getCuenta = function() {
            return cuenta;
        };

        /**
         * Crea o acutializa la pregunta por parámetro.
         * @param pregunta Pregunta que se va a guardar
         * @returns {*}
         */
        self.save = function(cuenta) {
            return Http.post('cuentas/', cuenta);
        };

        /**
         * Crea o acutializa la pregunta por parámetro.
         * @param pregunta Pregunta que se va a guardar
         * @returns {*}
         */
        self.getUsrCuenta = function(idUsuario) {
            return Http.get('cuentas/usuario/'+idUsuario);
        };

        self.getConcrsCuenta = function(idCuenta) {
            return Http.get('concursos/cuenta/'+idCuenta);
        };

        self.delConcurso = function(idConcurso) {
            return Http.delete('concursos/'+idConcurso);
        };

    });
})();
