(function() {
    'use strict';

    angular
        .module('videoChatPolice')
        .controller('VideoChatPoliceController', VideoChatPoliceController);

    VideoChatPoliceController.$inject = ['$location'];
    /* @ngInject */
    function VideoChatPoliceController($location) {
        var vm = this;
        vm.changeView = changeView;
        vm.citationSummary = citationSummary;
        vm.openCitation = openCitation;
        vm.closeCitation = closeCitation;
        vm.openConfirm = openConfirm;
        vm.closeConfirm = closeConfirm;

        activate();

        function activate() {
            console.log('POLICE VIDEO CHAT ACTIVATED');
        }

        function changeView(isValid){
            if (isValid) {
                //call search service when ready

                $location.path('/');
            }
        }

        function citationSummary() {
            //Make this a modal and show citationSummary
            window.open("police-details.html", "_self", "police-info");
        }

        function openCitation() {
            document.getElementById('citationinput').style.display="block";
        }

        function closeCitation() {
            document.getElementById('citationinput').style.display="none";
            window.name = "done";
        }

        function openConfirm() {
            document.getElementById('citationconfirm').style.display="block";
        }

        if (window.name == "done") {
            setTimeout(openConfirm, 3500);
        }

        function closeConfirm() {
            document.getElementById('citationconfirm').style.display="none";
        }
    }
})();
