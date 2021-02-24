function readSamples(id)=> {
    d3.json("samples.json").then((data)=> {
        var bellydata = data.metadata;
        console.log(bellydata);
        
        //filtering the belly data by each unique id//
        var filterData = metadata.filter(bdata => bdata.id.tostring() === id) [0];
        
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
        var tTen = samples.sample_values.slice(0, 10).reverse();
        console.log("a top 10 sample:" + tTen);

        //find tope 10 otu id for otu plot
        var otuId = (samples.otu_ids.slice(0, 10).reverse();
        
        //map the otu ids to make the plot
        var outIdmap = otuId.map(d => "otu " + d)
        console.log("otu id's: " + outIdmap);
        
    })
}



//Need to make init function for the drop down menu//