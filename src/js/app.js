const myApp = angular.module('InvertedIndexApp', [])
  .controller('AppController', ($scope) => {
    $scope.appName = 'Inverted Index';
    $scope.myInvertedIndex = new InvertedIndex();
    const files = {};
    $scope.indexTable = '';
    $scope.indexTableFiles = [];
    $scope.availableFiles = [];
    $scope.currentFile = '';

    const uploadField = document.getElementById('upload');
    uploadField.addEventListener('change', (e) => {
      const selectedFiles = e.target.files;
      for (let file = 0; file < selectedFiles.length; file += 1) {
        $scope.readAndCheckFile(selectedFiles[file]);
      }
    });

    $scope.readAndCheckFile = (selected) => {
      $scope.filename = selected.name;
      const acceptedFIleType = 'application/json';
      if (Object.is(selected.type, acceptedFIleType)) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const currentContent = JSON.parse(reader.result);
            if (InvertedIndexUtilities.validateData(currentContent)) {
              files[selected.name] = currentContent;
              swal({
                title: 'Great!...',
                text: 'File uploaded successfully!',
                showConfirmButton: false,
                timer: 1000
              });
              $scope.$apply(() => {
                $scope.availableFiles = Object.keys(
                  files
                );
                $scope.currentFile = $scope.filename;
              });
            } else {
              swal('Oops...', `Invalid JSON format!
              Please select a valid JSON file`);
            }
          } catch (err) {
            swal('Oops...', `Invalid JSON format!
            Please select a valid JSON file`);
          }
        };
        reader.readAsText(selected);
      } else {
        swal('Oops...', `Invalid file format!
        Please select a JSON file`);
      }
    };

    $scope.arrayFromFileLength = () => {
      const selectBox = document.getElementById('file-to-index');
      const fileName = selectBox.options[selectBox.selectedIndex].value;
      const fileLength = files[fileName].length;
      const arr = [];
      for (let fileIndex = 0; fileIndex < fileLength; fileIndex += 1) {
        arr.push(fileIndex);
      }
      return arr;
    };

    $scope.createIndex = () => {
      const selectBox = document.getElementById('file-to-index');
      const fileName = selectBox.options[selectBox.selectedIndex].value;
      if (fileName !== '' && !$scope.myInvertedIndex.indexMap[fileName]) {
        $scope.myInvertedIndex.createIndex(fileName, files[fileName]);
        $scope.indexTable = $scope.myInvertedIndex.getIndex(fileName);
        $scope.currentFile = '';
      } else if (fileName === '') {
        swal({
          title: 'Are you sure you have selected a file?',
          text: `I'm just saying cos I don't think you have!
            Now kindly select a file, then create index.`,
          type: 'error',
          confirmButtonText: 'Ok'
        });
      } else {
        swal({
          title: '',
          text: 'Index has already been created!',
          showConfirmButton: false,
          timer: 1000
        });
      }
    };

    const searchField = document.getElementById('search');
    searchField.addEventListener('keyup', (e) => {
      const selectSearch = document.getElementById('file-to-search');
      const fileToSearch = selectSearch
        .options[selectSearch.selectedIndex].value;
      const keyValue = e.target.value;
      $scope.$apply(() => {
        $scope.searchResults = {};
        const keys = Object.keys($scope.myInvertedIndex.indexMap);
        if (keys.length !== 0) {
          if (fileToSearch === '') {
            $scope.searchResults = $scope.myInvertedIndex
              .searchIndex(keyValue);
          } else {
            $scope.searchResults = $scope.myInvertedIndex
              .searchIndex(keyValue, fileToSearch);
          }
        } else {
          swal({
            title: '',
            text: 'Please create index first'
          });
        }
      });
    });
  });

$(document).ready(() => {
  $('select').material_select();
  $('.collapsible').collapsible();

  $('select').on('DOMSubtreeModified', () => {
    setTimeout(() => {
      $('select').material_select();
    }, 1000);
  });
});

myApp.directive('toggle', () => {
  return {
    restrict: 'A',
    link: (scope, element) => {
      $(element).addClass('active');
      $('.collapsible').collapsible({
        accordion: false
      });
    }
  };
});
