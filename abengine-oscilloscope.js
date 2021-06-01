/*
 * 8-bit engine oscilloscope utilities
 * Version 1.2 (20201109)
 * Author: jlywxy
 */

/* 
canvas optimization 
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas 
*/
var canvas_ui = [
    document.getElementById("canvas_rt_ui"),
    document.getElementById("canvas_entire_ui"),
]
var canvas_wave = [
    document.getElementById("canvas_rt_wav"),
    document.getElementById("canvas_entire_wav"),
]



function displayBufferStereo(bufl, bufr, callBackEnd, donotplay) {
    let pbsret = null
    if (!donotplay) {
        pbsret = playBufferStereo(bufl, bufr)
    }
    let time = new Date().getTime()
    let timeBase = time
    let refreshInterval = 5
    let stopped = false

    let c = setInterval(() => {
        time = new Date().getTime()
        //refresh()
        if (sampleRate * ((time - timeBase) / 1000) > bufl.length) {
            stopped = true
            clearInterval(c)
            console.log("sequence end")
            oscilloscope_init(canvas_ui[1])
            callBackEnd()
        }
    }, refreshInterval)

    if (pbsret) pbsret[2]()   // START PLAY BUFFER CALLBACK


    //}, refreshInterval)
    //if (webkitsafari) oscilloscope_full(bufl, canvas[2])
    //if (webkitsafari) oscilloscope_full(bufr, canvas[3])


    function refresh() {
        if (stopped) return


        oscilloscope_realtime_stereo(bufl.slice(sampleRate * ((time - timeBase) / 1000), sampleRate * ((time - timeBase) / 1000) + 500), bufr.slice(sampleRate * ((time - timeBase) / 1000), sampleRate * ((time - timeBase) / 1000) + 500), canvas_wave[0])
        //oscilloscope_part(bufr.slice(sampleRate * (time / 1000), sampleRate * (time / 1000) + 1500), canvas_wave[1])
        //if (!webkitsafari) oscilloscope_full(bufl, canvas_wave[1])

        let percentage = sampleRate * ((time - timeBase) / 1000) / bufl.length
        canvas_line(canvas_ui[1].getContext('2d'), canvas_ui[1].width * percentage, 0, canvas_ui[1].width * percentage, canvas_ui[1].height)
        window.requestAnimationFrame(refresh)

    }

    window.requestAnimationFrame(refresh)
    oscilloscope_full(bufl, bufr, canvas_wave[1])

}


function displayBuffer(buf, callBackEnd, donotplay) {
    displayBufferStereo(buf, buf, callBackEnd, donotplay)
    // if(!donotplay)playBuffer(buf)
    // let time = 0
    // let refreshInterval = 50
    // let c = setInterval(() => {
    //     time += refreshInterval
    //     oscilloscope_part(buf.slice(sampleRate * (time / 1000), sampleRate * (time / 1000) + 1500), canvas[0])
    //     if (!webkitsafari) oscilloscope_full(buf, canvas[1])
    //     let percentage = sampleRate * (time / 1000) / buf.length
    //     canvas_line(canvas[1].getContext('2d'), canvas[1].width * percentage, 0, canvas[1].width * percentage, canvas[1].height)
    //     if (sampleRate * (time / 1000) > buf.length) {
    //         clearInterval(c)
    //         console.log("sequence end")
    //         oscilloscope_init(canvas[0])
    //         callBackEnd()
    //         //oscilloscope_init(canvas[1])
    //     }
    // }, refreshInterval)
    // if (webkitsafari) oscilloscope_full(buf, canvas[1])
}
function canvas_init(canvas) {
    let context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    //context.fillStyle = "#00000000";
    //context.fillRect(0, 0, canvas.width, canvas.height);
}
function canvas_init2(canvas) {
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
    canvas_init2(canvas)
    let context = canvas.getContext('2d')
    context.strokeStyle = "#009f55"
    context.lineWidth = 1
    context.beginPath()
    canvas_line(context, 0, canvas.height / 4 + 0.5, canvas.width, canvas.height / 4 + 0.5)
    canvas_line(context, 0, canvas.height / 2 * 0.05 + 0.5, canvas.width, canvas.height / 2 * 0.05 + 0.5)
    canvas_line(context, 0, canvas.height / 2 * 0.95 + 0.5, canvas.width, canvas.height / 2 * 0.95 + 0.5)

    canvas_line(context, 0, canvas.height / 4 * 3 + 0.5, canvas.width, canvas.height / 4 * 3 + 0.5)

    canvas_line(context, 0, canvas.height / 2 * 1.05 + 0.5, canvas.width, canvas.height / 2 * 1.05 + 0.5)
    canvas_line(context, 0, canvas.height / 2 * 1.95 + 0.5, canvas.width, canvas.height / 2 * 1.95 + 0.5)

    context.strokeStyle = "#005f35"
}
var osc_rt_lock = 0
function oscilloscope_realtime_stereo(datal, datar, canvas) {
    //oscilloscope_init(canvas)
    canvas_init(canvas)
    let context = canvas.getContext('2d', { alpha: false })
    context.beginPath()
    context.strokeStyle = "#00dd8f"
    let x = 0;
    let interval = 3;
    let segwidth = canvas.width
    for (var i = 0; i < segwidth - 1; i += interval) {
        canvas_line(context,
            x,
            -(datal[i]) * (canvas.height * 0.48 / 2) + canvas.height / 4,
            x + interval,
            -(datal[i + interval]) * (canvas.height * 0.48 / 2) + canvas.height / 4)
        canvas_line(context,
            x,
            -(datar[i]) * (canvas.height * 0.48 / 2) + canvas.height / 4 * 3,
            x + interval,
            -(datar[i + interval]) * (canvas.height * 0.48 / 2) + canvas.height / 4 * 3)
        x += interval;
    }
    context.closePath()
}
// function oscilloscope_part(data, canvas) {
//     osc_rt_lock=0
//     //oscilloscope_init(canvas)
//     canvas_init(canvas)
//     let context = canvas.getContext('2d')
//     context.beginPath()
//     context.strokeStyle = "#00dd8f"
//     let x = 0;
//     let interval = 3;
//     let segwidth = canvas.width
//     for (var i = 0; i < segwidth - 1; i += interval) {
//         if(osc_rt_lock==1){
//             break;
//         }
//         canvas_line(context, 
//             x, 
//             -(data[i]) * (canvas.height * 0.48) + canvas.height / 2 , 
//             x + interval, 
//             -(data[i + interval]) * (canvas.height * 0.48) + canvas.height / 2) 
//         x += interval;
//     }
//     context.closePath()
// }
function oscilloscope_full(datal, datar, canvas) {
    //oscilloscope_init(canvas)
    canvas_init(canvas)
    let context = canvas.getContext('2d', { alpha: false })
    context.beginPath()
    context.strokeStyle = "#00dd8f"
    let interval = Math.floor(datal.length / canvas.width)
    let getmost = (k) => {
        let maxl = 0, minl = 0
        let maxr = 0, minr = 0
        for (let j = 0; j < interval; j++) {
            maxl = Math.max(maxl, datal[k + j] / 2)
            minl = Math.min(minl, datal[k + j] / 2)
            maxr = Math.max(maxr, datar[k + j] / 2)
            minr = Math.min(minr, datar[k + j] / 2)
        }
        return [[maxl, minl], [maxr, minr]]
    }
    for (var i = 0; i < canvas.width; i++) {
        let startptr = i * interval
        let endptr = startptr + interval
        let mx0 = getmost(startptr)
        let mx1 = getmost(endptr)
        canvas_line(context,
            i,
            -(mx0[0][0]) * (canvas.height * 0.45) + canvas.height / 4,
            i,
            -(mx1[0][1]) * (canvas.height * 0.45) + canvas.height / 4)
        canvas_line(context,
            i,
            -(mx0[1][0]) * (canvas.height * 0.45) + canvas.height / 4 * 3,
            i,
            -(mx1[1][1]) * (canvas.height * 0.45) + canvas.height / 4 * 3)
        // canvas_line(context,
        //     i,
        //     -(mx0[0]) * (canvas.height * 0.45) + canvas.height / 4,
        //     i + 1,
        //     -(mx1[0]) * (canvas.height * 0.45) + canvas.height / 4)
        // canvas_line(context,
        //     i,
        //     -(mx0[1]) * (canvas.height * 0.45) + canvas.height / 4 * 3,
        //     i + 1,
        //     -(mx1[1]) * (canvas.height * 0.45) + canvas.height / 4 * 3)
        // canvas_line(context,
        //     i,
        //     -(datal[startptr]) * (canvas.height * 0.45) + canvas.height / 4,
        //     i + 1,
        //     -(datal[endptr]) * (canvas.height * 0.45) + canvas.height / 4)
        // canvas_line(context,
        //     i,
        //     -(datar[startptr]) * (canvas.height * 0.45) + canvas.height / 4 * 3,
        //     i + 1,
        //     -(datar[endptr]) * (canvas.height * 0.45) + canvas.height / 4 * 3)
    }
    context.closePath()
}