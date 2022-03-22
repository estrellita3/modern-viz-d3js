d3.json("prueba.json").then(Pedro => {
    // esta funcion convierte un objecto en un array:
    data = Object.values(Pedro)

    // en este archivo hay que bajar un nivel
    data[0].map(d => {
        d.distance = +d.distance
        // con esto convierte
        // console.log(typeof d.distance)
    })
    console.log(data)
})


const formatDate = d3.timeParse("%d/%m/%Y")
d3.csv("data.csv").then(data => {
    data.map(d => {
        d.date = formatDate(d.date)
        d.close = +d.close
        d.high = +d.high
        d.low = +d.low
        d.open = +d.open
        d.volume = +d.volume
    })
    console.log(data)

})