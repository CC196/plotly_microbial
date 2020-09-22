// function getsample(){
  d3.json("data/samples.json").then((incomingData) => {
    var sample_data = incomingData;
    var samples = sample_data.samples[0];

    var otu = samples.otu_ids;
    var values = samples.sample_values;
    var labels = samples.otu_labels;

    var otu_id_10 = otu.slice(0,10).reverse().map(stringotuid);
    var values_10 = values.slice(0,10).reverse();
    var labels_10 = labels.slice(0,10).reverse();
    function stringotuid(id){
     return "otu id: ".concat(id);
    };

    var bar_data = [{
      y:otu_id_10,
      x:values_10,
      type:"bar",
      orientation: 'h',
      text:labels_10
    }];
    Plotly.newPlot("bar",bar_data);

    var bubble_data = [{
      x:otu,
      y:values,
      marker:{
        size:values,
        color:otu,
      },
      text:labels,
      mode: 'markers'
    }];
    Plotly.newPlot("bubble",bubble_data);

    var metadata = sample_data.metadata[0];
    var mor = d3.select("#sample-metadata")
    Object.entries(metadata).forEach(([key,value]) =>{
      mor.append("p").text(`${key}: ${value}`);

    });
    
  });
// }
