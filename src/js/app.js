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
          try {
            const currentContent = JSON.parse(reader.result);
            if (InvertedIndexUtilities.validateData(currentContent)) {
              $scope.myInvertedIndex.files[selected.name] = currentContent;
              $scope.$apply(() => {
                $scope.availableFiles = Object.keys(
                    $scope.myInvertedIndex.files
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

    $scope.arrayFromFileLength = (fileName) => {
      const selectBox = document.getElementById('file-to-index');
      const fileToIndex = selectBox.options[selectBox.selectedIndex].value;
      const fileLength = $scope.myInvertedIndex.files[fileToIndex].length;
      const arr = [];
      for (let fileIndex = 0; fileIndex < fileLength; fileIndex += 1) {
        arr.push(fileIndex);
      }
      return arr;
    };

    $scope.createIndex = () => {
      const selectBox = document.getElementById('file-to-index');
      const fileToIndex = selectBox.options[selectBox.selectedIndex].value;
      if (fileToIndex !== '') {
        $scope.myInvertedIndex.createIndex(fileToIndex);
        $scope.indexTable = $scope.myInvertedIndex.getIndex(fileToIndex);
        $scope.currentFile = '';
      } else {
        swal({
          title: 'Are you sure you have selected a file?',
          text: `I'm just saying cos I don't think you have!
            Now kindly select a file, then create index.`,
          type: 'error',
          confirmButtonText: 'Ok'
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
        if (fileToSearch === '') {
          $scope.searchResults = $scope.myInvertedIndex.searchIndex(keyValue);
        } else {
          $scope.searchResults = $scope.myInvertedIndex
          .searchIndex(keyValue, fileToSearch);
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
