module.exports = function(app) {
    app.service('modal', ['$q', 'ModalService', function($q, ModalService) {
        return {
            open: function(options) {
                var deferred = $q.defer();

                ModalService.showModal(options)
                    .then(function(modal) {
                        modal.element.modal();
                        modal.close.then(function(result) {
                            deferred.resolve(result);
                        });
                    })

                return deferred.promise;
            }

        }
    }]);
}