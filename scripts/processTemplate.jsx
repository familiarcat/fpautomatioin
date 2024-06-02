var args = [].slice.call(arguments);
var templatePath = args[0];
var imagePath = args[1];
var firstLine = args[2];
var secondLine = args[3];
var outputFilePath = args[4];

var doc = app.open(new File(templatePath));

function placeImage(imagePath, x, y, width, height) {
  var imageFile = new File(imagePath);
  var placedItem = doc.placedItems.add();
  placedItem.file = imageFile;
  placedItem.position = [x, y];
  placedItem.width = width;
  placedItem.height = height;
}

function replaceText(frameLabel, text) {
  for (var i = 0; i < doc.textFrames.length; i++) {
    var textFrame = doc.textFrames[i];
    if (textFrame.label == frameLabel) {
      textFrame.contents = text;
    }
  }
}

// Example positions and sizes, adjust as needed
placeImage(imagePath, 100, 100, 200, 200);
replaceText('firstLine', firstLine);
replaceText('secondLine', secondLine);

var exportOptions = new ExportOptionsPNG24();
exportOptions.artBoardClipping = true;
exportOptions.transparency = true;

var artboard = doc.artboards[0];
var rect = artboard.artboardRect;
var exportFile = new File(outputFilePath);

doc.exportFile(exportFile, ExportType.PNG24, exportOptions);
doc.close(SaveOptions.DONOTSAVECHANGES);
