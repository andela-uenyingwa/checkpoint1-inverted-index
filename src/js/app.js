angular.module('InvertedIndexApp', [])
  .controller('AppController', ($scope) => {
    $scope.appName = 'Inverted Index';
    $scope.myInvertedIndex = new InvertedIndex();
    $scope.indexTable = '';
    $scope.indexTableFiles = [];
    $scope.searchResults = '';
    $scope.availableFiles = [];

    $(document).ready(() => {
      $('select').material_select();
    });

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
        reader.onload = (e) => {
          const currentContent = JSON.parse(reader.result);
          if (InvertedIndexUtilities.readBookData(currentContent)) {
            $scope.myInvertedIndex.files[selected.name] = currentContent;
            $scope.$apply(() => {
              $scope.availableFiles = Object.keys($scope.myInvertedIndex.files);
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
      $scope.indexTable = $scope.myInvertedIndex.createIndex($scope.filename);
    };

    const searchField = document.getElementById('search');
    searchField.addEventListener('keyup', (e) => {
      const keyValue = e.target.value;
      $scope.$apply(() => {
        $scope.searchResults = $scope.myInvertedIndex.searchIndex(keyValue);
      });
      console.log($scope.searchResults);
      // const inputValue = e.
    });
  });
