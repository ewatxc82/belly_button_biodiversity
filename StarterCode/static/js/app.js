function readSamples(id){
    d3.json("/samples.json").then((data)=> {
        var metadata = data.metadata;
        console.log(metadata);
        
        //filtering the belly data by each unique id//
        var filterData = metadata.filter(info => info.id.tostring() === id) [0];
        
        var panelBody = d3.select("#sample-metadata");
        
        //Dumping data each time before getting new data//
        panelBody.html("");
        
        Object.entries(filterData).forEach((key)=>{
            panelBody.append("p").text(key[0] + ":" + key[1]);
        });
    });
};

// Creating function for plotly plots
function plotBuild(id) {
    //retrieve data from the json file
    d3.json("samples.json").then( (data)=> {
        //filter the washing frequency by each id
        var wfreq = data.metadata.filter(f => f.id.toString() === id)[0];
        wfreq = wfreq.wfreq;
        console.log("Washing Frequency:" + wfreq);

        //filter the samples by id
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        console.log("Samples:" + samples)

        //find the top 10 samples 
        var sampleValues = samples.sample_values.slice(0, 10).reverse();
        console.log("a top 10 sample:" + tTen);

        //find tope 10 otu id for otu plot
        var OTU = (samples.otu_ids.slice(0, 10)).reverse();
        
        //map the otu ids to make the plot
        var OTU_id = OTU.map(d => "OTU " + d)
        console.log("otu id's: " + outIdmap);

        //find the top 10 labels for the plot
        var t10labels = samples.otu_lables.slice(0, 10).reverse();
        console.log("labels: " + t10labels);

        //make the trace for the plot
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: t10labels,
            type: "bar",
            oreintation: "h",
        };

        //make your data variable
        var data = [trace]

        //make bar plot
        Plotly.newPlot("bar", data);

        //make bubble chart
        var trace_bub = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };

        var layout_bub = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1200,
        };

        var data_bub = [trace_bub];

        Plotly.newPlot("bubble", data1, layout_bub);
    })
}



//Need to make init function for the drop down menu//