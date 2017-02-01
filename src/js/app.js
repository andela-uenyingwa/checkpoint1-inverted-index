angular.module('InvertedIndexApp', [])
  .controller('AppController', ($scope) => {
    $scope.appName = 'Inverted Index';
    $scope.myInvertedIndex = new InvertedIndex();
    $scope.indexTable = '';
    $scope.indexTableFiles = [];
    $scope.searchResults = '';
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
          const currentContent = JSON.parse(reader.result);
          if (InvertedIndexUtilities.validateData(currentContent)) {
            $scope.myInvertedIndex.files[selected.name] = currentContent;
            $scope.$apply(() => {
              $scope.availableFiles = Object.keys($scope.myInvertedIndex.files);
              $scope.currentFile = $scope.filename;
            });
          } else {
            return false;
          }
        };
        reader.readAsText(selected);
      } else {
        return false;
      }
    };

    $scope.arrayFromFileLength = (fileName) => {
      const fileLength = $scope.myInvertedIndex.files[fileName].length;
      const arr = [];
      for (let fileIndex = 0; fileIndex < fileLength; fileIndex += 1) {
        arr.push(fileIndex);
      }
      return arr;
    };
    $scope.createIndex = () => {
      const selectBox = document.getElementById('file-to-index');
      const fileToIndex = selectBox.options[selectBox.selectedIndex].value;

      $scope.indexTable = $scope.myInvertedIndex.createIndex(fileToIndex);
      $scope.currentFile = '';
    };

    const searchField = document.getElementById('search');
    searchField.addEventListener('keyup', (e) => {
      const keyValue = e.target.value;
      $scope.$apply(() => {
        $scope.searchResults = $scope.myInvertedIndex.searchIndex(keyValue);
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

