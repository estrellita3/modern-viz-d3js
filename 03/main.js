console.log("Hello")

d3.json("data.json").then(data => {
    console.log(data)
})

d3.csv("data.csv").then(data => {
    console.log(data)
})

