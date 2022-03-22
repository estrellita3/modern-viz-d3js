const div = d3.select("#chart")
// var elements;
var data;


d3.json('data.json').then(_data => {
    data = Object.values(_data.worldCupWinners)
    data.map(d => {
        d.titles = +d.titles
    })
    // console.log(data)

    updateChart(data)
})

function updateChart(data) {
    // meter el patrón de actualización completo
    // 1. data binding:
    elements = div.selectAll("p").data(data)
    // 2. enter:
    // appendPs(elements.enter()) // método Alejandro
    elements.enter().call(appendPs)
    // 3. update:
    elements.call(updatePs)
    // 4. exit:
    elements.exit().call(exitPs)
}

function appendPs(selection) {
    selection.append("p")
        .text(d => `${d.country}: ${d.titles} titles`)
}

function updatePs(selection) {
    selection.style("color", "blue")
        .text(d => `${d.country}: ${d.titles} titles`)
}

function exitPs(selection) {
    selection.remove()
}

d3.select("#uefa").on("click", function() {
    newData = data.filter(d => {
        return d.confederation == "UEFA"
    })
    updateChart(newData)
})

d3.select("#conmebol").on("click", function() {
    newData = data.filter(d => {
        return d.confederation == "Conmebol"
    })
    updateChart(newData)
})


d3.select("#verTodos").on("click", function(){
    updateChart(data)
})