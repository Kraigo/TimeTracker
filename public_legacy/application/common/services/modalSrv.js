module.exports = function(app) {
    app.service('modal', ['$q', '$uibModal', function($q, $uibModal) {
        return {
            open: function(options) {
                var modalInstance = $uibModal.open(options);
                return modalInstance.result;
            },
            confirmation: function(message, title) {
                var options = {
                    templateUrl: "application/common/templates/confirmationModalTemplate.html",
                    controller: ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                        $scope.message = message || 'No message';
                        $scope.title = title || 'Confirmation';

                        $scope.cancel = function() {
                            $uibModalInstance.dismiss('cancel');
                        }

                        $scope.accept = function() {
                            $uibModalInstance.close(true);
                        }
                    }],
                    size: 'sm'
                }
                return this.open(options)
            }

        }
    }]);
}