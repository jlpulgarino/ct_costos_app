/*var checkLoggedin = function($q, $timeout, Http, $location, $rootScope, User) {
    var deferred = $q.defer();
    Http.get('/loggedin').then(function(user) {
        if (user === '0') {
            $timeout(function() {
                deferred.reject();
            }, 0);
            if ($location.url() !== '/') {
                $location.url('/');
            }
        } else {
            $timeout(deferred.resolve, 0);
            User.setUser(user);
        }
    });
};*/
'use strict';
/**
 * Se declara el modulo de la aplicacion y sus dependencias
 * @type {angular.Module}
 */
var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ui.ace', 'ui.router', 'angularResizable', 'ngFileUpload','treeGrid']);

/**
 * Configuracion del modulo de la aplicacion
 * Se determina el tema usado por Angular Material
 * Se determinan las rutas de la aplicacion
 * incluyendo los templates a usar en cada una y el controlador correspondiente
 */
 /*
app.config(function($routeProvider, $httpProvider, $mdThemingProvider) {
    //$mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('orange').backgroundPalette('grey');
    moment.locale('es');
    $routeProvider
        .when('/', {
            controller: 'UsuariosCtrl',
            templateUrl: '../../index.html'
        })
        .when('/login', {
            controller: 'CalificacionesCtrl',
            templateUrl: 'app/calificaciones/calificaciones.html'
        })
        .when('/cuentas', {
            controller: 'UsuariosCtrl',
            templateUrl: 'app/cuentas/cuenta.html'
        });
});
*/

app.config(["$stateProvider", "$urlRouterProvider", function(t, e) {
    e.otherwise("/"), t.state("index", {
        url: "/",
        templateUrl: "../app/login/login.html"
    }).state("logout", {
        url: "/logout",
        templateUrl: "../app/login/logout.html"
    }).state("usuarios", {
        url: "/usuarios",
        templateUrl: "../app/usuarios/usuarios.html"
    }).state("editUsuario", {
        url: "/usuarios/edit",
        templateUrl: "../app/usuarios/editUsuario.html"
    }).state("cambioPsw", {
        url: "/usuarios/cambioPsw",
        templateUrl: "../app/usuarios/cambiaContrasena.html"
    }).state("categorias", {
        url: "/categorias",
        templateUrl: "../app/categorias/categorias.html"
    }).state("editCategorias", {
        url: "/categorias/edit",
        templateUrl: "../app/categorias/editCategoria.html"
    }).state("editElemento", {
        url: "/elementos/edit",
        templateUrl: "../app/elementos/editElemento.html"
    }).state("costos", {
        url: "/costos",
        templateUrl: "../app/costos/costos.html"
    }).state("editCostos", {
        url: "/costos/edit",
        templateUrl: "../app/costos/editCostos.html"
    }).state("procesos", {
        url: "/procesos",
        templateUrl: "../app/procesos/procesos.html"
    }).state("editProcesos", {
        url: "/procesos/edit",
        templateUrl: "../app/procesos/editProceso.html"
    }).state("elementosPrc", {
        url: "/procesos/elementosPrc",
        templateUrl: "../app/procesos/elementosPrc.html"
    }).state("categoriasPrc", {
        url: "/procesos/categoriasPrc",
        templateUrl: "../app/procesos/categoriasPrc.html"
    }).state("clientes", {
        url: "/clientes",
        templateUrl: "../app/clientes/clientes.html"
    }).state("editCliente", {
        url: "/clientes/edit",
        templateUrl: "../app/clientes/editCliente.html"
    }).state("costeos", {
        url: "/costeos",
        templateUrl: "../app/costeos/costeos.html"
    }).state("editCosteo", {
        url: "/costeos/edit",
        templateUrl: "../app/costeos/editCosteo.html"
    })/*.state("logout", {
        url: "/logout",
        templateUrl: "../app/login/logout.html"
    }).state("tables", {
        url: "/tables",
        templateUrl: "templates/tables.html"
    }).state("dashboard", {
        url: "/dashboard",
        templateUrl: "templates/dashboard.html"
    }).state("proyectos", {
        url: "/proyectos",
        templateUrl: "../app/proyectos/proyectos.html"
    }).state("editProyecto", {
        url: "/proyectos/edit",
        templateUrl: "../app/proyectos/editProyecto.html"
    }).state("editSubproyecto", {
        url: "/subproyectos/edit",
        templateUrl: "../app/subproyectos/editSubroyecto.html"
    }).state("editTarea", {
        url: "/tareas/edit",
        templateUrl: "../app/tareas/editTarea.html"
    }).state("editTareaClbr", {
        url: "/tareas/editTareaClbr",
        templateUrl: "../app/tareas/editTarea.html"
    }).state("colaboradores", {
        url: "/colaboradores",
        templateUrl: "../app/colaboradores/colaboradores.html"
    }).state("editColaborador", {
        url: "/colaboradores/edit",
        templateUrl: "../app/colaboradores/editColaborador.html"
    }).state("cambioPsw", {
        url: "/colaboradores/cambioPsw",
        templateUrl: "../app/colaboradores/cambiaContrasena.html"
    }).state("gantt", {
        url: "/reportes/gantt",
        templateUrl: "../app/gantt/gantt.html"
    }).state("proyectoChart", {
        url: "/reportes/proyectoChart",
        templateUrl: "../app/proyectos/proyectoChart.html"
    }).state("listaTareas", {
        url: "/reportes/listaTareas",
        templateUrl: "../app/tareas/listaTarea.html"
    }).state("listaTareaSemana", {
        url: "/reportes/listaTareaSemana",
        templateUrl: "../app/tareas/listaTareaSemana.html"
    }).state("registro", {
        url: "/tareas/registro",
        templateUrl: "../app/tareas/registro.html"
    }).state("estimacion", {
        url: "/tareas/estimacion",
        templateUrl: "../app/tareas/estimacion.html"
    }).state("departamentos", {
        url: "/departamentos",
        templateUrl: "../app/departamentos/departamentos.html"
    }).state("editDepartamento", {
        url: "/departamentos/edit",
        templateUrl: "../app/departamentos/editDepartamento.html"
    })*/
}]);
