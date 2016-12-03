// Library with basic statistical tools
function calcPearson(datasetOne, datasetTwo) {
  var sum = 0;
  var datasetOneZ = standarize(datasetOne);
  var datasetTwoZ = standarize(datasetTwo);
  for (var i = 0; i < datasetOne.length; i++) {
    sum += datasetOneZ[i]*datasetTwoZ[i];
  }
  var r = sum/(datasetOne.length - 1);
  return r;
}

function calcCovariance(datasetOne, datasetTwo) {
  var mx = calcMean(datasetOne);
  var my = calcMean(datasetTwo);
  var sum = 0;
  for (var i = 0; i < datasetOne.length ; i++)
    sum += (datasetOne[i] - mx)*(datasetTwo[i] - my);
  var cov = sum / (datasetOne.length - 1);
  return cov;
}

// Calculate Cronbach alpha for sets and given scale items number
function calcAlpha(setList, scaleItems) {
  var covarianceBetweenAllSetsList = [];
  for (var i = 0; i < setList.length; i++) {
    for (var j = 0; j < setList.length; j++) {
      covarianceBetweenAllSetsList.push(calcCovariance(setList[i], setList[j]));
    }
  }
  var varianceOfAllSetsList = [];
  for (var k = 0; k < setList.length; k++) {
    varianceOfAllSetsList.push(calcVariance(setList[k]));
  }
  var averangeCovarianceBetweenAllSets = calcMean(covarianceBetweenAllSetsList);
  var averangeVarianceOfAllSets = calcMean(varianceOfAllSetsList);
  var alpha = (scaleItems*averangeCovarianceBetweenAllSets)/(averangeVarianceOfAllSets + (scaleItems-1)*averangeCovarianceBetweenAllSets);
  return alpha;
}

function calcSD(dataset) {
  var sd = Math.pow(calcVariance(dataset),0.5);
  return sd;
}

function calcVariance(dataset) {
  var m = calcMean(dataset);
  var sum = 0;
  for (var i = 0; i < dataset.length; i++)
    sum += Math.pow((dataset[i] - m),2);
  variance = sum/(dataset.length - 1);
  return variance;
}

function calcMean(dataset) {
  var sum = 0;
  for( var i = 0; i < dataset.length; i++ ){
      sum += parseInt( dataset[i], 10 );
  }
  return sum/dataset.length;
}

function standarize(dataset) {
  m = calcMean(dataset);
  sd = calcSD(dataset);
  var standarizedDataset = [];
  for (var i = 0; i < dataset.length; i++)
    standarizedDataset[i] = (dataset[i] - m)/sd;
  return standarizedDataset;
}
