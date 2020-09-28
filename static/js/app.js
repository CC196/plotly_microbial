d3.json("data/samples.json").then(function(incomingData){
  var samples = incomingData.names;
  var select = d3.select("#selDataset");
  // var select = document.getElementById("selDataset");
  // console.log(samples);

  for(var i=0; i < samples.length; i++){
    // var option = document.createElement("option");
    // option.text = samples[i];
    // option.value = samples[i];
    // select.appendChild(option);
    
    var option = select.append("option").attr("value", samples[i]).text(samples[i]);
  }
});


function getsample(index){
  d3.json("data/samples.json").then(function(incomingData){
    var sample_data = incomingData;
    var samples = sample_data.samples[index];

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

    var metadata = sample_data.metadata[index];
    var mor = d3.select("#sample-metadata");
    mor.text("");
    Object.entries(metadata).forEach(function([key,value]){
      mor.append("p").text(`${key}: ${value}`);

    });
    
  });
}

function optionChanged(val){
  d3.json("data/samples.json").then(function(incomingData){
    var samples = incomingData.names;
    var index = samples.indexOf(val);
    console.log(index);
    getsample(index);

  })
}
// initial
getsample(0);

