// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

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
 
   
    // Create the yticks for the bar chart.
    var yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();




    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot();
  });
}
