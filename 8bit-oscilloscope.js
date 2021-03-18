/*
 * 8-bit engine oscilloscope utilities
 * Version 1.2 (20201109)
 * Author: jlywxy
 */
var canvas = [
    document.getElementById("canvas"),
    document.getElementById("canvas2"),
]

function displayBuffer(buf,callBackEnd) {
    playBuffer(buf)
    let time = 0
    let refreshInterval = 50
    let c = setInterval(() => {
        time += refreshInterval
        oscilloscope_part(buf.slice(sampleRate * (time / 1000), sampleRate * (time / 1000) + 1500), canvas[0])
        if (!webkitsafari) oscilloscope_full(buf, canvas[1])
        let percentage = sampleRate * (time / 1000) / buf.length
        canvas_line(canvas[1].getContext('2d'), canvas[1].width * percentage, 0, canvas[1].width * percentage, canvas[1].height)
        if (sampleRate * (time / 1000) > buf.length) {
            clearInterval(c)
            console.log("sequence end")
            oscilloscope_init(canvas[0])
            callBackEnd()
            //oscilloscope_init(canvas[1])
        }
    }, refreshInterval)
    if (webkitsafari) oscilloscope_full(buf, canvas[1])
}

function canvas_init(canvas) {
    let context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);
}
function canvas_line(context, x1, y1, x2, y2) {
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
}
function oscilloscope_init(canvas) {
    canvas_init(canvas)
    let context = canvas.getContext('2d')
    context.strokeStyle = "#007f55"
    context.beginPath()
    canvas_line(context, 0, canvas.height / 2, canvas.width, canvas.height / 2)
    canvas_line(context, 0, canvas.height * 0.05, canvas.width, canvas.height * 0.05)
    canvas_line(context, 0, canvas.height * 0.95, canvas.width, canvas.height * 0.95)
}
function oscilloscope_part(data, canvas) {
    oscilloscope_init(canvas)
    let context = canvas.getContext('2d')
    context.beginPath()
    context.strokeStyle = "#00dd8f"
    let x = 0;
    for (var i = 0; i < 1400 - 1; i += 5) {
        canvas_line(context, x, -(data[i]) * (canvas.height * 0.45) + canvas.height / 2, x + 2, -(data[i + 5]) * (canvas.height * 0.45) + canvas.height / 2)
        x += 2;
    }
}
function oscilloscope_full(data, canvas) {
    oscilloscope_init(canvas)
    let context = canvas.getContext('2d')
    context.beginPath()
    context.strokeStyle = "#00dd8f"
    for (var i = 0; i < canvas.width - 1; i++) {
        canvas_line(context, i, -(data[i * Math.floor(data.length / canvas.width)]) * (canvas.height * 0.45) + canvas.height / 2, i + 1, -(data[(i + 1) * Math.floor(data.length / canvas.width)]) * (canvas.height * 0.45) + canvas.height / 2)
    }
}