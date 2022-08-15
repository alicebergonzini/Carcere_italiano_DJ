// -----------------------------------------------------Animazione scroll--------------------------------

$(document).ready(function(){

  $("a").on('click', function(event) {

    if (this.hash !== "") {
      event.preventDefault();


      var hash = this.hash;

      
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

  
        window.location.hash = hash;
      });
    } 
  });
});


/* --------------- CREIAMO LE ICONE PER LE PROPORZIONI -------------- */

div_icone = document.getElementById("contieni_icone_donne");
for (i=0; i<24; i++){
    if(i%5==0){
        var br=document.createElement("br");
        div_icone.appendChild(br);
    }

    var new_element=document.createElement("img");
    new_element.setAttribute("src", "img/person.svg");
    new_element.setAttribute("width", "40");
    new_element.setAttribute("height", "40");
    new_element.setAttribute("class", "icona_prop");
    div_icone.appendChild(new_element);

}

var new_element=document.createElement("img");
    new_element.setAttribute("src", "img/woman.svg");
    new_element.setAttribute("width", "40");
    new_element.setAttribute("height", "40");
    new_element.setAttribute("class", "icona_prop");
    new_element.setAttribute("id", "iconadonna");

div_icone.appendChild(new_element);


// --------------------------------------------------BARPLOT ETA'----------------


d3.select('#bar_eta')
.append('div')
.attr("class", "tooltip")
.style("background-color", "white")
.style("font-size", "12px")
.style("color", "#081F54")
.style("border-radius", "5px")
.style("padding", "10px")
.style("position", "absolute")
.style("border", "1px solid black")



const margin_bp = {top: 30, right: 30, bottom: 70, left: 70},
    width_bp = 460 - margin_bp.left - margin_bp.right,
    height_bp = 400 - margin_bp.top - margin_bp.bottom;

// append the svg object to the body of the page
const svg_bp = d3.select("#bar_eta")
  .append("svg")
    .attr("width", width_bp + margin_bp.left + margin_bp.right)
    .attr("height", height_bp + margin_bp.top + margin_bp.bottom)
  .append("g")
    .attr("transform",  "translate(" + margin_bp.left + "," + margin_bp.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/alicebergonzini/Data_Journalism/main/eta.csv").then( function(data) {

// X axis
var x = d3.scaleBand()
  .range([ 0, width_bp ])
  .domain(data.map(d => d.eta))
  .padding(0.2);
svg_bp.append("g")
  .attr("transform", `translate(0, ${height_bp})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", "12px");

// Add Y axis
var y = d3.scaleLinear()
  .domain([0, 11000])
  .range([ height_bp, 0]);
svg_bp.append("g")
  .call(d3.axisLeft(y))
  .style("font-size", "12px");

// Bars
svg_bp.selectAll("mybar")
  .data(data)
  .join("rect")
    .attr("x", d => x(d.eta))
    .attr("y", d => y(d.numero))
    .attr("width", x.bandwidth())
    .attr("height", d => height_bp - y(d.numero))
    .attr("class", "bars_eta")
    .attr("fill", function(d){
        if(d.eta == "50 - 59"){
          return("#EB5E28");
        }
        else{
          return("#CCC5B9");
        }
      })
    .on('mouseover', (event, datum) => {
        d3.select(".tooltip").style("opacity", "1")
          .html("Totali: " + datum.numero)
          .transition()
          .duration(200)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY)-50 + "px");
      })
    .on('mousemove', (event, datum) => {
        d3.select(".tooltip").style("left", (event.pageX) + "px")
          .style("top", (event.pageY)-50 + "px");
      })
    .on('mouseleave', (event, datum) => {
        d3.select(".tooltip").style("opacity", "0");
      }
      )
   
})



const pie = d3.pie()
const width = 525,
height = 70,
margin = 20;

const data2 = {"stranieri": 17136, "italiani": 37635}


const svg = d3.select("#pie_stranieri")
.append("svg")
.attr("width", width)
.attr("height", height)
.style("display", "block");


svg.append("rect")
  .attr("fill", "#EB5E28")
  .attr("x", "0")
  .attr("y", "0")
  .attr("width", 162)
  .attr("height", height)

svg.append("rect")
  .attr("fill", "#ccc5b9")
  .attr("x", "162")
  .attr("y", "0")
  .attr("width", width-162)
  .attr("height", height)

svg.append("text")
  .attr("x", "20")
  .attr("y", height - 15)
  .text("31%")
  .style("font-weight", "bolder")

svg.append("text")
  .attr("x", "20")
  .attr("y", height - 35)
  .text("Stranieri")
  .style("font-weight", "bolder")

svg.append("text")
  .attr("x", width-55)
  .attr("y", height - 15)
  .text("69%")
  .style("font-weight", "bolder")

  svg.append("text")
  .attr("x", width-83)
  .attr("y", height - 35)
  .text("Italiani")
  .style("font-weight", "bolder")



/*---------------------------------BUBBLE PROVENIENZA-----------------------------*/




var data_bubble = [
  {source:"UE", x: 352, y: 320, val: 2691, color: "#C9D6DF"},
  {source:"Ex Jugoslavia", x: 548, y: 252, val: 558, color: "#CCC5B9"},
  {source:"Albania", x: 568, y: 170, val: 1836, color: "#CCC5B9"},
  {source:"Altri paesi europei", x: 514, y: 303, val: 625, color: "#CCC5B9"},
  {source:"Tunisia", x: 486, y: 99, val: 1744, color: "#CCC5B9"},
  {source:"Marocco", x: 450, y: 220, val: 3333, color: "#D1C2E0"},
  {source:"Algeria", x: 572, y: 303, val: 425, color: "#CCC5B9"},
  {source:"Nigeria", x: 388, y: 118, val: 1324, color: "#CCC5B9"},
  {source:"Altri paesi africani", x: 317, y: 198, val: 2258, color: "#CCC5B9"},
  {source:"Medio oriente", x: 325, y: 122, val: 176, color: "#CCC5B9"},
  {source:"Nord America", x: 398, y: 68, val: 15, color: "#CCC5B9"},
  {source:"Sud America", x: 450, y: 326, val: 647, color: "#CCC5B9"},
  {source:"Centro America", x: 423, y: 62, val: 249, color: "#CCC5B9"},
  {source: "Altri paesi asiatici", x: 579 , y: 73, val: 1142, color: "#CCC5B9"}

]


d3.select('#bubble_stranieri')
.append('div')
.attr("id", "tooltip_bareta")
.style("background-color", "white")
.style("font-size", "12px")
.style("color", "#081F54")
.style("border-radius", "5px")
.style("padding", "10px")
.style("position", "absolute")



const width_bubble = 400,
    height_bubble = 420,
    margin_bubble = 50;

const svg_bubble = d3.select("#bubble_stranieri")
    .append("svg")
    .attr("width", width_bubble)
    .attr("height", height_bubble)

    

svg_bubble.selectAll("circle")
      .data(data_bubble).enter()
      .append("circle")
      .attr("cx", function(d) {return d.x-250})
      .attr("cy", function(d) {return d.y})
      .attr("class", "bubble_circles")
      .on('mouseover', (event, datum) => {
        d3.select("#tooltip_bareta").style("opacity", "1")
          .html("<span class='bbl_bold'>" + datum.source + "</span><br>" + "Totale: " + datum.val)
          .transition()
          .duration(200)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY)-50 + "px");
      })
      .on('mousemove', (event, datum) => {
        d3.select("#tooltip_bareta").style("left", (event.pageX) + "px")
          .style("top", (event.pageY)-50 + "px");
      })
      .on('mouseleave', (event, datum) => {
        d3.select("#tooltip_bareta").style("opacity", "0");
      }
      )
      .attr("r", function(d) {
        return Math.sqrt(d.val)/Math.PI*4 
      })
      .attr("fill", function(d){
        if(d.val > 3000){
          return("#EB5E28");
        }
        else if(d.val > 2000){
          return("#CCC5B9");
        }
        else if(d.val > 1000){
          return("#CCC5B9");
        }
        else if(d.val > 500){
          return("#CCC5B9");
        }
        else if(d.val > 100){
          return("#CCC5B9");
        }
        else{
          return("#CCC5B9")
        }
      })
    



  svg_bubble.selectAll("text")
      .data(data_bubble).enter()
      .append("text")
      .attr("x", function(d) {
        if(d.source == "Marocco"){
          return d.x+(Math.sqrt(d.val)/Math.PI)-290;
        }
        else if (d.source=="Tunisia" || d.source =="Albania"){
          return d.x+(Math.sqrt(d.val)/Math.PI)-282;
        }
        else if (d.source=="Nigeria"){
          return d.x+(Math.sqrt(d.val)/Math.PI)-280;
        }
        else if (d.source=="Altri paesi africani"){
          return d.x+(Math.sqrt(d.val)/Math.PI)-313;
        }
        else if (d.source=="UE"){
          return d.x+(Math.sqrt(d.val)/Math.PI)-273;
        }
        })
      .attr("y", function(d) {return d.y+4})
      .text(function(d) {
        if(d.val>1000){
          return d.source;
        }})
      .style("font-family", "arial")
      .style("font-size", "12px")
      .style("fill", "white")
      .style("width", function(d){
        if(d.val < 1200){
          return "0px";
        }
      })




// ------------------------------------------------------bar  TIPO DI CRIMINE ---------------------

const margin_crime = {top: 20, right: 30, bottom: 40, left: 170},
    width_crime = 600 - margin_crime.left - margin_crime.right,
    height_crime = 400 - margin_crime.top - margin_crime.bottom;


const svg_crime = d3.select("#bar_crimini")
  .append("svg")
    .attr("width", width_crime + margin_crime.left + margin_crime.right)
    .attr("height", height_crime + margin_crime.top + margin_crime.bottom)
  .append("g")
    .attr("transform", `translate(${margin_crime.left}, ${margin_crime.top})`);

d3.select('#bar_crimini')
    .append('div')
    .attr("id", "tooltip_barcrime")
    .style("background-color", "white")
    .style("font-size", "12px")
    .style("color", "#081F54")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("position", "absolute")
    .style("opacity", "0")
    .style("border", "1px solid black")
    
    
    


d3.csv("https://raw.githubusercontent.com/alicebergonzini/Data_Journalism/main/crimini.csv").then( function(data) {

 
  const x = d3.scaleLinear()
    .domain([0, 32000])
    .range([ 0, width_crime]);
  svg_crime.append("g")
    .attr("transform", `translate(0, ${height_crime})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "12px");

  
  const y = d3.scaleBand()
    .range([ 0, height_crime ])
    .domain(data.map(d => d.Tipologia_di_reato))
    .padding(.1);
  svg_crime.append("g")
    .call(d3.axisLeft(y))
    .style("font-size", "10px");

 
  svg_crime.selectAll("myRect")
    .data(data)
    .join("rect")
    .attr("x", x(0) )
    .attr("y", d => y(d.Tipologia_di_reato))
    .attr("width", d => x(d.Numero_reati))
    .attr("height", y.bandwidth())
    .attr("class", "bars_crimini")
    .attr("fill", function(d){
      if(d.Tipologia_di_reato == "CONTRO IL PATRIMONIO"){
        return("#EB5E28");
      }
      if(d.Tipologia_di_reato == "CONTRO LA PERSONA"){
        return("#EB5E28");
      }
      else{
        return("#CCC5B9");
      }
    })
    .on('mouseover', (event, datum) => {
      d3.select("#tooltip_barcrime").style("opacity", "1")
        .html("Totale: " + datum.Numero_reati)
        .transition()
        .duration(200)
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY)-50 + "px");
    })
    .on('mousemove', (event, datum) => {
      d3.select("#tooltip_barcrime").style("left", (event.pageX) + "px")
        .style("top", (event.pageY)-50 + "px");
    })
    .on('mouseleave', (event, datum) => {
      d3.select("#tooltip_barcrime").style("opacity", "0");
    }
    )

})
// --------------- ------- LINE DETENUTI ------- ----------------





const margin_line = {top: 10, right: 30, bottom: 30, left: 60},
    width_line = 600 - margin_line.left - margin_line.right,
    height_line = 400 - margin_line.top - margin_line.bottom;


const svg_line = d3.select("#line_detenuti")
  .append("svg")
    .attr("width", width_line + margin_line.left + margin_line.right)
    .attr("height", height_line + margin_line.top + margin_line.bottom)
  .append("g")
    .attr("transform", `translate(${margin_line.left},${margin_line.top})`);

d3.csv("https://raw.githubusercontent.com/alicebergonzini/Data_Journalism/main/numero_detenuti.csv",


  function(d){
    return { Data_di_rilevazione : d3.timeParse("%Y-%m-%d")(d.Data_di_rilevazione), Totale : d.Totale }
  }).then(

 
  function(data) {

  
    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.Data_di_rilevazione; }))
      .range([ 0, width_line ]);
    svg_line.append("g")
      .attr("transform", `translate(0, ${height_line})`)
      .call(d3.axisBottom(x))
      .style("font-size", "12px");


    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.Totale; })])
      .range([ height_line, 0 ]);
    svg_line.append("g")
      .call(d3.axisLeft(y))
      .style("font-size", "12px");

  
    svg_line.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#EB5E28")
      .attr("stroke-width", 3)
      .attr("d", d3.line()
        .x(function(d) { return x(d.Data_di_rilevazione) })
        .y(function(d) { return y(d.Totale) })
        )

    svg_line.append("circle")
      .style("stroke", "grey")
      .style("fill", "none")
      .attr("stroke-width", 2)
      .attr("r",30)
      .attr("cx", 260)
      .attr("cy", 150)
      
    
    svg_line.append('polyline')
      .attr("stroke", "grey")
      .style("fill", "none")
      .attr("stroke-width", 2)
      .attr('points', "233, 165 150,250")
    
    svg_line.append("text")
      .attr("x", 100)
      .attr("y", 270)
      .html("Concessione d'indulto")
      .attr("font-size", "12px")

  


      svg_line.append("circle")
      .style("stroke", "grey")
      .style("fill", "none")
      .attr("stroke-width", 2)
      .attr("r",20)
      .attr("cx", 490)
      .attr("cy", 85)
    
    svg_line.append("text")
      .attr("x", 480)
      .attr("y", 120)
      .text("COVID-19")
      .attr("font-size", "12px")

      svg_line.append("circle")
      .style("stroke", "grey")
      .style("fill", "none")
      .attr("stroke-width", 2)
      .attr("r",20)
      .attr("cx", 400)
      .attr("cy", 85)

      svg_line.append('polyline')
      .attr("stroke", "grey")
      .style("fill", "none")
      .attr("stroke-width", 2)
      .attr('points', "390, 103 ,360,180")


      svg_line.append("text")
      .attr("x", 320)
      .attr("y", 198)
      .text("Sentenza Torreggiani")
      .attr("font-size", "12px")
})


// ----------------------------------------- MAPPA --------------------------------------------

var map = L.map('map').setView([42.100, 12.342], 6);
var tms = 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}@2x.png';
L.tileLayer(tms,{attribution: ''}).addTo(map);
var markers = L.markerClusterGroup({
	spiderfyOnMaxZoom: false,
    disableClusteringAtZoom: 7,
	showCoverageOnHover: false,
    maxClusterRadius: 90,
});

var circleOptions = {radius: 5, weight: 8, color: "red", nomeClasse: "" }
var mydata = JSON.parse(data);
var i;
var nomeClasse;
for (i=0; i < 190; i++) {
    posti_eccesso = mydata[i].posti_occupati - mydata[i].capienza_regolamentare;
    var percentuale="nan";
    if(posti_eccesso>0){
      percentuale = posti_eccesso*100/mydata[i].capienza_regolamentare;
    }

    if(percentuale == "nan"){
        nomeClasse = "posti_occupatiGREEN";
        circleOptions.color = "green";
    } else if (percentuale<5){
        nomeClasse = "posti_occupatiRED";
        circleOptions.color = "#FFDC00";
    } else if (percentuale<20){
      nomeClasse = "posti_occupatiRED";
      circleOptions.color = "orange";
    } else {
      nomeClasse = "posti_occupatiRED";
      circleOptions.color = "red";
    }
    marker = L.circle([mydata[i].Latitudine, mydata[i].Longitudine],circleOptions)
        .bindPopup("<span class='NomeIstituto'>" + mydata[i].Istituto + "</span></br><span class='NomeCitta'>Citta': " + mydata[i].Citta + "</span>" + "</br><span class='capienza_regolamentare'> Capienza Regolamentare: " + mydata[i].capienza_regolamentare + "</span></br><span class='"+ nomeClasse +"'>Detenuti presenti: " + mydata[i].posti_occupati + "</span>");
    markers.addLayer(marker);
}   
map.addLayer(markers);

const svg_map = d3.select("#legenda_mappa")
  .append("svg")
    .attr("width", 200)
    .attr("height", 600)


svg_map.append("text")
    .attr("x", 5)
    .attr("y", 90)
    .text("Tasso di sovraffollamento")
    .attr("font-size", "15px")
    .attr("font-weight", "bold")
  


svg_map.append("circle")
  .style("fill", "green")
  .attr("r",5)
  .attr("cx", 5)
  .attr("cy", 110)

svg_map.append("text")
  .attr("x", 15)
  .attr("y", 115)
  .text("Non sovraffollato")
  .attr("font-size", "14px")

svg_map.append("circle")
  .style("fill", "yellow")
  .attr("r",5)
  .attr("cx", 5)
  .attr("cy", 130)

svg_map.append("text")
  .attr("x", 15)
  .attr("y", 135)
  .text("Sotto il 5%")
  .attr("font-size", "14px")


svg_map.append("circle")
  .style("fill", "orange")
  .attr("r",5)
  .attr("cx", 5)
  .attr("cy", 150)

svg_map.append("text")
  .attr("x", 15)
  .attr("y", 155)
  .text("Sotto il 20%")
  .attr("font-size", "14px")

svg_map.append("circle")
  .style("fill", "red")
  .attr("r",5)
  .attr("cx", 5)
  .attr("cy", 170)

svg_map.append("text")
  .attr("x", 15)
  .attr("y", 175)
  .text("Sopra il 20%")
  .attr("font-size", "14px")



// ------------------------------------------------------------ bar titolo studio -------------------------



const margin_t = {top: 30, right: 30, bottom: 70, left: 70},
    width_t = 600 - margin_t.left - margin_t.right,
    height_t = 400 - margin_t.top - margin_t.bottom;


const svg_t = d3.select("#titolo_studio")
  .append("svg")
    .attr("width", width_t + margin_t.left + margin_t.right)
    .attr("height", height_t + margin_t.top + margin_t.bottom)
  .append("g")
    .attr("transform",  "translate(" + margin_t.left + "," + margin_t.top + ")");

d3.select('#titolo_studio')
    .append('div')
    .attr("id", "tooltip_bartitolo")
    .style("background-color", "white")
    .style("font-size", "12px")
    .style("color", "#081F54")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("position", "absolute")
    .style("opacity", "0")
    .style("border", "1px solid black")
    

d3.csv("https://raw.githubusercontent.com/alicebergonzini/Data_Journalism/main/titolostudio.csv").then( function(data) {
  


var x = d3.scaleBand()
  .range([ 0, width_t ])
  .domain(data.map(d => d.titolo))
  .padding(0.2);
svg_t.append("g")
  .attr("transform", `translate(0, ${height_t})`)
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");
    


var y = d3.scaleLinear()
  .domain([0, 18000])
  .range([ height_t, 0])

svg_t.append("g")
  .call(d3.axisLeft(y))
  .style("font-size", "12px");


svg_t.selectAll("mybar")
  .data(data)
  .join("rect")
    .attr("x", d => x(d.titolo))
    .attr("y", d => y(d.numero))
    .attr("width", x.bandwidth())
    .attr("height", d => height_bp - y(d.numero))
    .attr("class", "bars_titolo")
    .attr("fill", function(d){
        if(d.titolo == "MEDIE"){
          return("#EB5E28");
        }
        if(d.titolo == "NON RILEVATO"){
          return("#403D39");
        }
        else{
          return("#CCC5B9");
        }
      })
    .on('mouseover', (event, datum) => {
        d3.select("#tooltip_bartitolo").style("opacity", "1")
          .html("Totale: " + datum.numero)
          .transition()
          .duration(200)
          .style("left", (event.pageX) + "px")
          .style("top", (event.pageY)-50 + "px");
      })
    .on('mousemove', (event, datum) => {
        d3.select("#tooltip_bartitolo").style("left", (event.pageX) + "px")
          .style("top", (event.pageY)-50 + "px");
      })
    .on('mouseleave', (event, datum) => {
        d3.select("#tooltip_bartitolo").style("opacity", "0");
      }
      )
   
})

// -------------------------------------  LAUREATI ------------------------------------------
const margin_uni = {top: 20, right: 30, bottom: 40, left: 170},
    width_uni = 600 - margin_uni.left - margin_uni.right,
    height_uni = 400 - margin_uni.top - margin_uni.bottom;


const svg_uni = d3.select("#donugt")
  .append("svg")
    .attr("width", width_uni + margin_uni.left + margin_uni.right)
    .attr("height", height_uni + margin_uni.top + margin_uni.bottom)
  .append("g")
    .attr("transform", `translate(${margin_uni.left}, ${margin_uni.top})`);


d3.select('#donugt')
    .append('div')
    .attr("id", "tooltip_barlaureati")
    .style("background-color", "white")
    .style("font-size", "12px")
    .style("color", "#081F54")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("position", "absolute")
    .style("opacity", "0")
    .style("border", "1px solid black")
    


d3.csv("https://raw.githubusercontent.com/alicebergonzini/Data_Journalism/main/uni.csv").then( function(data) {

 
  const x = d3.scaleLinear()
    .domain([0, 250])
    .range([ 0, width_uni]);
  svg_uni.append("g")
    .attr("transform", `translate(0, ${height_uni})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end")
      .style("font-size", "12px");


  const y = d3.scaleBand()
    .range([ 0, height_uni ])
    .domain(data.map(d => d.Gruppo_disciplinare))
    .padding(.1);
  svg_uni.append("g")
    .call(d3.axisLeft(y))
    .style("font-size", "12px");


  svg_uni.selectAll("myRect")
    .data(data)
    .join("rect")
    .attr("x", x(0) )
    .attr("y", d => y(d.Gruppo_disciplinare))
    .attr("width", d => x(d.Totale))
    .attr("height", y.bandwidth())
    .attr("class", "bars_laureati")
    .attr("fill", function(d){
      if(d.Gruppo_disciplinare == "Politico - Sociale"){
        return("#EB5E28");
      } else if 
        (d.Gruppo_disciplinare == "Giuridico"){
          return("#EB5E28");
      }
      else{
        return("#CCC5B9");
      }
    })
    .on('mouseover', (event, datum) => {
      d3.select("#tooltip_barlaureati").style("opacity", "1")
        .html("Totale: " + datum.Totale)
        .transition()
        .duration(200)
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY)-50 + "px");
    })
  .on('mousemove', (event, datum) => {
      d3.select("#tooltip_barlaureati").style("left", (event.pageX) + "px")
        .style("top", (event.pageY)-50 + "px");
    })
  .on('mouseleave', (event, datum) => {
      d3.select("#tooltip_barlaureati").style("opacity", "0");
    }
    )

})


// --------------------------------------------------LINE LAVORATORI-----------------------------------



const margin_line1 = {top: 10, right: 30, bottom: 30, left: 60},
    width_line1 = 600 - margin_line1.left - margin_line1.right,
    height_line1 = 400 - margin_line1.top - margin_line1.bottom;

const width_legend = 205
    height_legend = 400


const svg_line1 = d3.select("#stack")
  .append("svg")
    .attr("width", width_line + margin_line1.left + margin_line1.right)
    .attr("height", height_line + margin_line1.top + margin_line1.bottom)
  .append("g")
    .attr("transform", `translate(${margin_line1.left},${margin_line1.top})`);


d3.csv("https://raw.githubusercontent.com/alicebergonzini/Data_Journalism/main/lavoro.csv",


  function(d){
    return { Data : d3.timeParse("%Y-%m-%d")(d.Data) , Lavoranti_alle_dipendenze_dellamministrazione_penitenziaria : d.Lavoranti_alle_dipendenze_dellamministrazione_penitenziaria, Lavoranti_non_alle_dipendenze_dellamministrazione_penitenziaria : d.Lavoranti_non_alle_dipendenze_dellamministrazione_penitenziaria}
  }).then(


  function(data) {


    const x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.Data; }))
      .range([ 0, width_line1 ]);
    svg_line1.append("g")
      .attr("transform", `translate(0, ${height_line1})`)
      .call(d3.axisBottom(x))
      .style("font-size", "12px");

  
    const y = d3.scaleLinear()
      .domain([0, 18000])
      .range([ height_line1, 0 ]);
    svg_line1.append("g")
      .call(d3.axisLeft(y))
      .style("font-size", "12px");


    svg_line1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#EB5E28")
    .attr("stroke-width", 3)
    .attr("d", d3.line()
      .x(function(d) { return x(d.Data) })
      .y(function(d) { return y(d.Lavoranti_alle_dipendenze_dellamministrazione_penitenziaria) })
      )
    svg_line1.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#e62314")
    .attr("stroke-width", 3)
    .attr("d", d3.line()
      .x(function(d) { return x(d.Data) })
      .y(function(d) { return y(d.Lavoranti_non_alle_dipendenze_dellamministrazione_penitenziaria) })
      )

 
      

})

const svg_legend = d3.select("#stack")
  .append("svg")
    .attr("width", width_legend)
    .attr("height", height_legend)


svg_legend.append("circle")
  .style("fill", "#EB5E28")
  .attr("r",5)
  .attr("cx", 5)
  .attr("cy", 86)

svg_legend.append("text")
  .attr("x", 15)
  .attr("y", 90)
  .text("Lavoranti all'interno del carcere")
  .attr("font-size", "12px")

svg_legend.append("circle")
  .style("fill", "#e62314")
  .attr("r",5)
  .attr("cx", 5)
  .attr("cy", 116)

svg_legend.append("text")
  .attr("x", 15)
  .attr("y", 120)
  .text("Lavoranti al di fuori del carcere")
  .attr("font-size", "12px")


