const alto = 600
const ancho = 800
const margen = {
    izquierdo: 40,
    derecho: 10,
    superior: 10,
    inferior: 40
}

const svg = d3.select("#chart").append("svg").attr("id", "svg").attr("width", ancho).attr("height", alto)
const grupoElementos = svg.append("g").attr("id", "grupoElementos")
    .attr("transform", `translate(${margen.izquierdo}, ${margen.superior})`)

var x = d3.scaleBand().range([0, ancho - margen.izquierdo - margen.derecho]).padding(0.1)
var y = d3.scaleLinear().range([alto - margen.superior - margen.inferior, 0])

const grupoEjes = svg.append("g").attr("id", "grupoEjes")
const grupoX = grupoEjes.append("g").attr("id", "grupoX")
    .attr("transform", `translate(${margen.izquierdo}, ${alto - margen.inferior})`)
const grupoY = grupoEjes.append("g").attr("id", "grupoY")
    .attr("transform", `translate(${margen.izquierdo}, ${margen.superior})`)

const ejeX = d3.axisBottom().scale(x)
const ejeY = d3.axisLeft().scale(y)

d3.json("data.json").then(misDatos => {
    var datos2 = Object.values(misDatos.worldCupWinners)
    datos2.map(perro => {
        perro.titles = +perro.titles
    })

    x.domain(datos2.map(dato => dato.country))
    y.domain([0, d3.max(datos2.map(dato => dato.titles))]) // [min, max]

    grupoX.call(ejeX)
    grupoY.call(ejeY)

    // data binding:
    var elementos = grupoElementos.selectAll("rect").data(datos2)

    elementos.enter().append("rect")
        .attr("height", d => alto - margen.superior - margen.inferior - y(d.titles)) // alto total - la posición que me da la función y(d.titles)
        .attr("y", d => y(d.titles)) // esto es donde empieza la barra
        .attr("x", d => x(d.country)) // esto es el retorno natural de la escala x
        .attr("width", x.bandwidth())  // el valor del ancho de la banda calculado con la escala x


    console.log(datos2)
})