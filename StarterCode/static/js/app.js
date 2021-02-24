function readSamples(id)=>{
    d3.json("../samples.json").then((data)=> {
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

//Think I can create a function that includes all info for plots//

//Need to make init function for the drop down menu//