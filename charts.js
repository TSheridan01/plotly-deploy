function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {


  // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples; 
    console.log(samplesArray);

  // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samplesArray.filter(sampleObj => sampleObj.id == sample);
    console.log(resultArray);


    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    console.log(result);



    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids;
    console.log(otuIds);




    var otuLabels = result.otu_labels;
    console.log(otuLabels);




    var sampleValues = result.sample_values;
    console.log(sampleValues);
    




    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last.
    
    // Chain the slice, map and reverse methods.
    var yticks = otuIds.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();



    console.log(yticks);

    // 8. Create the trace for the bar chart. 
       let barData = [{
        y: yticks,
        x: sampleValues.slice(0,10).reverse(),
        hovertemplate: otuLabels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h",
        marker: {
          color: "green",
          line: {
            color: "red",
            width: 1.5
          }
        }
      }];
      console.log(barData);




    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      // xaxis: {title: "Sample"},
      yaxis: {title: "Bacteria Species ID"},
      xaxis: {title: "# of Bacteria Samples"},
      paper_bgcolor: "13373f",
      plot_bgcolor: "597378"
    };
    console.log(barLayout);




  // 10. Use Plotly to plot the data with the layout. 
  Plotly.newPlot("bar", barData, barLayout, {responsive: true});


  //  Deliverable Two 


  // Bar and Bubble charts
// Create the buildCharts function.

function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {


    
    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: "56da0c"
        },
    }];




    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: {title: "Bacteria Specie ID"},
      yaxis: {title: "Number of Bacteria Samples"},
      hovermode: "closest",
      paper_bgcolor: '426e29'
    };




    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout, {responsive: true}); 



    // Deliverable 3


       // 1. Create a variable that filters the metadata array for the object with the desired sample number.
       var metadata = data.metadata;
       var metadataArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
       // 2. Create a variable that holds the first sample in the array.
       var metaresults = metadataArray[0];
   
       // 3. Create a variable that holds the washing frequency.
       var washingFrequency = metaresults.wfreq;
   
       // 4. Create the trace for the gauge chart.
       var gaugeData = [{
         domain: {x: [0, 1], y: [0, 1]},
         value: washingFrequency,
         title: {text: "Belly Button Washing Frequency</b><br>Scrubs per week"},
         type: "indicator",
         mode: "gauge+number",
         gauge: {
             axis: {range:[null, 10] },
             steps: [
               {range:[0,2], color:"blue"},
               {range:[2,4], color:"red"},
               {range:[4,6], color:"green"},
               {range:[6,8], color:"yellow"},
               {range:[8,10], color:"black"}
             ],
             bar: { color: "orange" }
         }
   
       }];
       
       // 5. Create the layout for the gauge chart.
       var gaugeLayout = { 
         paper_bgcolor: "41bad83a"
       };
   
       // 6. Use Plotly to plot the gauge data and layout.
       Plotly.newPlot("gauge", gaugeData, gaugeLayout, {responsive:true});
     });
    };