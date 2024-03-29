// set the dimensions and margins of the graph
var margin = {top: 50, right: 150, bottom: 60, left: 45},
    width = 2500 - margin.left - margin.right,
    height = 4000 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/vis-cape/vis-cape.github.io/main/scraper/data.csv", function(data) {

  // ---------------------------//
  //       AXIS  AND SCALE      //
  // ---------------------------//

  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 90])
    .range([20, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x).ticks(3));

  // Add X axis label:
//   svg.append("text")
//       .attr("text-anchor", "end")
//       .attr("x", width)
//       .attr("y", height+50 );

  // Add Y axis
  var y = d3.scalePoint()
    .domain(
      ['AAS', 'ANAR', 'ANBI', 'ANSC', 'ANTH', 'AWP', 'BENG', 'BIBC',
       'BICD', 'BIEB', 'BILD', 'BIMM', 'BIPN', 'BISP', 'CAT', 'CCS',
       'CENG', 'CGS', 'CHEM', 'CHIN', 'COGS', 'COMM', 'CSE', 'CSS', 'DOC',
       'DSC', 'DSGN', 'ECE', 'ECON', 'EDS', 'ENG', 'ENVR', 'ERC', 'ESYS',
       'ETHN', 'FMPH', 'GLBH', 'GSS', 'HDS', 'HIAF', 'HIEA', 'HIEU',
       'HIGL', 'HILA', 'HILD', 'HINE', 'HISC', 'HITO', 'HIUS', 'HMNR',
       'HUM', 'INTL', 'JAPN', 'JWSP', 'LATI', 'LAWS', 'LIGN', 'LIHL',
       'LTAM', 'LTCH', 'LTCS', 'LTEA', 'LTEN', 'LTEU', 'LTFR', 'LTGK',
       'LTGM', 'LTIT', 'LTKO', 'LTLA', 'LTRU', 'LTSP', 'LTTH', 'LTWL',
       'LTWR', 'MAE', 'MATH', 'MGT', 'MMW', 'MUS', 'NANO', 'PHIL', 'PHYS',
       'POLI', 'PSYC', 'RELI', 'SE', 'SIO', 'SOCI', 'SYN', 'TDAC', 'TDDE',
       'TDDM', 'TDDR', 'TDGE', 'TDHT', 'TDMV', 'TDPF', 'TDPR', 'TDPW',
       'TDTR', 'TWS', 'USP', 'VIS', 'WCWP'])
    .range([0, height]);
  svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y));

  // Add Y axis label:
  svg.append("text")
      .attr("class", "text")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", -20 )
      .text("Department")
      .attr("text-anchor", "start")

  // Add a scale for bubble size
  var z = d3.scaleSqrt()
    .domain([0, 4500])
    .range([2, 35]);

  // Add a scale for bubble color
  var myColor = d3.scaleLinear()
    .domain([2, 4])
    .range(d3.schemeSet1);


  // ---------------------------//
  //      TOOLTIP               //
  // ---------------------------//

  // -1- Create a tooltip div that is hidden by default:
  var tooltip = d3.select("#chart")
    .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "rgb(206, 206, 206)")
      .style("border-radius", "5px")
      .style("border-width", "2px")
      .style("padding", "10px")
      .style("color", "white")
      // .style("position", "absolute")

  // -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
  var tt_text = function(d) {
    return "Course: " + d.Course + "<br>" + Math.round(d.GPA*100)/100 + " GPA<br>" + d.yearly_num + " yearly students"
  }
  var offX = 70
  var offY = 280
    var showTooltip = function(d) {
    // tooltip
    //   .transition()
    //   .duration(200)
    tooltip
      .style("opacity", 1)
      .html(tt_text(d))
      .style("color", "black")
      .style("left", (d3.mouse(this)[0]+offX) + "px")
      .style("top", (d3.mouse(this)[1]+offY) + "px")
      .style("position", "absolute")
    
    // console.log(d3.mouse(this));
  }
  var moveTooltip = function(d) {
    tooltip
      .html(tt_text(d))
      .style("color", "black")
      .style("left", (d3.mouse(this)[0]+offX) + "px")
      .style("top", (d3.mouse(this)[1]+offY) + "px")
      .style("position", "absolute")
  }
  var hideTooltip = function(d) {
    tooltip
      // .transition()
      // .duration(2000)
      .style("top", (0) + "px")
      .style("opacity", 0)
  }

  // ---------------------------//
  //       CIRCLES              //
  // ---------------------------//

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", function(d) { return "bubbles " + d.Course })
      .attr("cx", function (d) { return x(d.index); } )
      .attr("cy", function (d) { return y(d.dept); } )
      .attr("r", function (d) { return z(d.yearly_num); } )
      .style("fill", function (d) { return myColor(d.GPA); } )
    // -3- Trigger the functions for hover
    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )



    // ---------------------------//
    //       LEGEND              //
    // ---------------------------//

    var xoff = 100;
    var yoff = 70;

    var key = d3.select("#key")
    .append("svg")
      .attr("width", 400)
      .attr("height", 200)
    .append("g");
    
    // Add legend: circles
    var valuesToShow = [100, 1000, 2500]
    var xCircle = 200 + xoff;
    var xLabel = 250 + xoff;
    var yLabel = yoff;

    key
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function(d){ return yLabel - z(d) } )
        .attr("r", function(d){ return z(d) })
        .style("fill", "none")
        .attr("stroke", "white")

    // Add legend: segments
    key
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("line")
        .attr('x1', function(d){ return xCircle + z(d) } )
        .attr('x2', xLabel)
        .attr('y1', function(d){ return yLabel - z(d) } )
        .attr('y2', function(d){ return yLabel - z(d) } )
        .attr('stroke', 'white')
        .style('stroke-dasharray', ('2,2'))

    // Add legend: labels
    key
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("text")
        .attr("class", "text")
        .attr('x', xLabel)
        .attr('y', function(d){ return yLabel - z(d) } )
        .text( function(d){ return d } )
        .style("font-size", 10)
        .attr('alignment-baseline', 'middle')

    // Legend title
    key.append("text")
      .attr("class", "text")
      .attr('x', xCircle)
      .attr("y", yLabel +30)
      .text("Num yearly students")
      .attr("text-anchor", "middle")

    //color title
    key.append("text")
        .attr("class", "text")
        .attr('x', xoff)
        .attr('y', -25)
        .text('GPA')
    // Add one dot in the legend for each name.
    var size = 20
    var allgroups = [2.0, 2.5, 3, 3.5, 4]
    key.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", xoff)
        .attr("cy", function(d,i){ return -10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return myColor(d)})

    // Add labels beside legend dots
    key.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", xoff + size*.8)
        .attr("y", function(d,i){ return i * (size + 5) - 10}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return myColor(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")

    // mobile site resize
    if (screen.width <= 720) {
      var key = document.getElementById("key");
      key.style.transform = 'scale(0.45)';
      key.style.position = "fixed";
      key.style.top="0";
      key.style.right="0";
      key.style.paddingTop = "250px";
    }
  })
