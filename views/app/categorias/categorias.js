/**
 * Controlador de las aplicaciones
 */

 angular.module("app").controller('CategoriasCtrl', function($rootScope, $scope,  $location, Categoria) {
     console.log('CONTROLADOR_CTGR');

     refresh();

     function refresh() {

         if(!($rootScope.usuarioLogueado)){
             $location.path('/login');
         }else{
             Categoria.getAll().then(function(categorias) {
                 $scope.categorias = categorias;
             });
         }
     }


     $scope.select = function(categoria) {
         $scope.categoriaSelected = categoria;
     };

     $scope.editCategoria = function(categoria) {
         $rootScope.idCategoriaActual = categoria;
         $location.path('/categorias/edit');
     };

     $scope.addCategoria = function() {
         $rootScope.idCategoriaActual = null;
         $location.path('/categorias/edit');
     };

     $scope.delCategoria = function(ev, categoria) {
         Categoria.delete(categoria.id).then(function(){
             Categoria.getAll().then(function(categorias) {
                 $scope.categorias = categorias;
             });
         });

     };


     $scope.getCategorias = function() {
         $scope.promise = Categoria.getAll().$promise;
     };


 });


 angular.module("app").controller('editCategoriasCtrl', function($rootScope, $scope, $location, Categoria) {
    console.log('CONTROLADOR_EDIT_PRY');
    $scope.selected = [];

    refresh();

    function refresh() {
        var catgActual = $rootScope.idCategoriaActual;
        $scope.categoria =$rootScope.idCategoriaActual;
        console.log(catgActual);
        if(!($rootScope.usuarioLogueado)){
            $location.path('/login');
        }else{
            if (catgActual){
                Categoria.getElementos(catgActual.id).then(function(categorias) {
                    if (categorias.length > 0){
                        console.log(categorias);
                        $scope.elementos = categorias[0].Elementos;
                    }
                });
            }
        }

    }

    $scope.guardarCategoria = function() {
        var categoriaTmp = {
            id: $scope.categoria.id,
            nombre: $scope.categoria.nombre,
            descripcion: $scope.categoria.descripcion,
            tipo: $scope.categoria.tipo
        };
        $scope.promise = Categoria.save(categoriaTmp).then(function(){
            $location.path('/categorias');
        }).$promise;
    };

    $scope.cancel = function(){

        $location.path('/categorias');
    }

    $scope.editElemento = function(elemento){
        $rootScope.idElementoActual = elemento;
        $location.path('/elementos/edit');
    }

    $scope.addElemento = function() {
        $rootScope.idElementoActual = null;
        $location.path('/elementos/edit');
    };

    $scope.delElemento = function(ev, elemento) {
        Categoria.deleteElemento(elemento.id).then(function(){
            Categoria.getElementos($rootScope.idCategoriaActual.id).then(function(categorias) {
                if (categorias.length > 0){
                    $scope.elementos = categorias[0].Elementos;
                }
            });
        });

    };


});
