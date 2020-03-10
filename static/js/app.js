d3.json("samples.json").then((incomingData) => {

var data_samples = incomingData["samples"]
var names = incomingData["names"];

var dataset = d3.select("#selDataset");
Object.entries(names).forEach(function ([key, value]){
    console.log(key);
    var option = dataset.append("option").attr("value", key);
    option.text(value);
    }

)

function filterData(sample, index) {
    return index < 10;
}


var Samples = data_samples[0]["otu_ids"];
var Values = data_samples[0]["sample_values"];
var Labels = data_samples[0]["otu_labels"];
var filteredSamplesTopTen = data_samples[0]["otu_ids"].filter(filterData);
var filteredValuesTopTen = data_samples[0]["sample_values"].filter(filterData);
var demoData = incomingData["metadata"][0];

filteredSamplesTopTen.forEach((element, index) => {
    element = "OTU " + element;
    console.log(element);
    filteredSamplesTopTen[index] = element;
});

var trace1 = {
    x: filteredValuesTopTen.reverse(),
    y: filteredSamplesTopTen.reverse(),
    type: "bar",
    orientation: "h"

};

var layout = {

    title: "OTU IDs vs. Sample Frequency",
    xaxis: { title: "Frequency"}

};

var trace2 = {
    x: Samples,
    y: Values,
    mode: "markers",
    text: Labels,
    name: "ex",
    marker: {
        size: Values,
        color: Samples,
    },
    type: "scatter"

};

var metaData = d3.select("#sample-metadata")
Object.entries(demoData).forEach(function ([key, value]){
    var row = metaData.append("tr").attr("id", key)
    row.text(key + ": " +  value);
})

var data = [trace1];
var data2 = [trace2];

layout2 = {
    xaxis: {title: "OTU ID"},
    showlegend: false};

Plotly.newPlot("bar", data, layout);
Plotly.newPlot("bubble", data2, layout2);


d3.selectAll("#selDataset").on("change", updatePlotly);

function updatePlotly(){

    // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var dataset = dropdownMenu.property("value");
  var Samples = data_samples[dataset]["otu_ids"];
  var Values = data_samples[dataset]["sample_values"];
  var Labels = data_samples[dataset]["otu_labels"];
  var filteredSamplesTopTen = data_samples[dataset]["otu_ids"].filter(filterData);
  var filteredValuesTopTen = data_samples[dataset]["sample_values"].filter(filterData);
  var demoData = incomingData["metadata"][dataset];
  filteredSamplesTopTen.forEach((element, index) => {
    element = "OTU " + element;
    console.log(element);
    filteredSamplesTopTen[index] = element;
});

  Plotly.restyle("bubble", "x", [Samples]);
  Plotly.restyle("bubble", "y", [Values]);
  Plotly.restyle("bubble", "text", [Labels]);
  Plotly.restyle("bar", "x", [filteredValuesTopTen.reverse()]);
  Plotly.restyle("bar", "y", [filteredSamplesTopTen.reverse()]);
  var demoData = incomingData["metadata"][dataset];
  
  var metaData = d3.select("#sample-metadata").html("");
    Object.entries(demoData).forEach(function ([key, value]){
    var row = metaData.append("tr").attr("id", key);
    row.text(key + ": " +  value);
})
}


});



//var filteredData = incomingData
//d3.selectAll("#selDataset").on("change", updatePlotly);