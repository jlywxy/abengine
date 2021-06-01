/*
 * 8-bit engine sequence controller
 * Version 1.2 (20201109)
 * Author: jlywxy
 */
var seq = '1 0 0.5 G5,C5,A4 0.5 G4 0.5 Gb5,C5,A4 0.5 0 1 0 0.5 0 0.5 A5,E5,C5,A4 0.5 G4 0.5 E4 0.5 0 0.5 A4,D4 0.5 C4 0.5 A4,D4 1 0 0.5 G5,D5,A4 0.5 C5 0.5 Gb5,D5,A4 0.5 0 1 0 0.5 0 0.5 A5,D5,A4 0.5 G5 0.5 Eb5 0.5 Eb5 0.5 D5 0.5 C5 0.5 0 1 0 0.5 G5,C5,A4 0.5 G4 0.5 Gb5,C5,A4 0.5 0 1 0 0.5 0 0.5 A5,E5,C5,A4 0.5 G4 0.5 E4 0.5 0 0.5 A4,D4 0.5 C4 0.5 A4,Bb4 1 0 0.5 G5,D5,A4 0.5 C5 0.5 Gb5,D5,A4 0.5 0 1 0 0.5 0 0.5 A5,D5,A4 0.5 G5 0.5 E5 0.5 D5 0.5 C5,C4 0.5 D4 0.5 E4 1 0 0.5 F5,C5,A4 0.5 G4 0.5 F5,C5,A4 0.5 0 1 0 0.5 D4 0.5 Ab5,E5,B4 0.5 Ab4 0.5 E4 0.5 E4 0.5 B3 0.25 E4 0.25 B3 0.5 D4 1 0 0.5 F4,A4,D5 0.5 C5 0.5 F4,A4,D5 0.5 D4 0.5 E4 0.5 Eb4 0.5 E4 0.5 B5 0.5 Ab5 0.5 E5 0.5 Ab4 0.5 B4,G5 0.5 G4,G5 0.5 B4,G5'
var seq2 = '1 A2 0.5 0 0.5 A2 1 E2 0.5 G3 0.5 Ab3 1 A3,A2 0.5 0 0.5 A2 1 E2 1 G2 1 D3 0.5 0 0.5 D3 1 G2 0.5 E3 0.5 G3 1 D3,A3 0.5 0 0.5 D3 1 A2 0.5 C3 0.5 D3 1 A3,A2 0.5 0 0.5 A2 1 E2 0.5 G3 0.5 Ab3 1 A3,A2 0.5 0 0.5 A2 1 E2 1 G2 1 D4,D3 0.5 0 0.5 D3 1 A2 0.5 E3 0.5 G3 1 D3,A3 0.5 0 0.5 D3 1 A2 1 C3 1 F4,F3 0.5 0 0.5 F3 1 C3 0.5 G3 0.5 Ab3 1 E4,E3 0.5 0 0.5 E3 1 B2 1 D3 1 A3,F3 0.5 0 0.5 F3 2 C3 1.5 B2,B3 0.5 B2 0.5 E2 0.5 Gb2 1 Ab2'



var seq3 = '1 B5 0.5 E5 0.5 Fs5 0.5 G5 0.5 B5 1 A5 1 D5 1 A5 1 G5 0.5 Fs5 0.5 G5 0.5 Fs5 0.5 D5 1 B4 2 E5 ' +
    '1 B5 0.5 G5 0.5 A5 0.5 B5 0.5 D6 1 Db6 1 A5 0.5 A5 0.5 B5 0.5 G5 0.5 Fs5 1 D5 1 Fs5 2.5 E5'
var seq4 = '1.5 E3 1.5 0 1.5 D3 1.5 0 1.5 C3 1.5 0 1.5 B2 1.5 0 1.5 A2 1.5 0 1.5 B2 1.5 0 1.5 C3 0.5 0 1 D3 1 E3 1 0 1 B2 1 E2 2 0 ' +
    '1.5 E3 1.5 0 1.5 D3 1.5 0 1.5 C3 1.5 0 1.5 B2 1.5 0 1.5 A2 1.5 0 1.5 B2 1.5 0 1.5 C3 0.5 0 1 D3 3.5 E3'
var seq5 = '1 0 1 E4 1 E4 1 0 1 D4 1 D4 1 0 1 E4 1 G4 1 0 1 D4 1 Fs4 1 0 1 C4 1 E4 1 0 1 D4 1 Fs4 1 0 1 G4 1 A4 3.5 B4 1 0 ' +
    '1.5 0 1 0 1 E4 1 G4 1 0 1 D4 1 Fs4 1 0 1 E4 1 G4 1 0 1 D4 1 Fs4 1 0 1 C4 1 E4 1 0 1 D4 1 Fs4 1 0 1 G4 1 A4 3.5 B4'
var seq6 = '1.5 0 0.5 G4 0.5 A4 1 B4 0.5 E4 0.5 Fs4 0.5 G4 0.5 B4 1 A4 1 D4 1 A4 1 G4 0.5 Fs4 0.5 G4 0.5 Fs4 0.5 D4 1 B3 2 E4 1 B4 ' +
    '0.5 G4 0.5 A4 0.5 B4 0.5 D5 1 Cs5 1 A4 0.5 A4 0.5 B4 0.5 G4 0.5 Fs4 1 D4 1 Fs4 2.5 E4'
function play_sequence_3() {
    a = synthesis2(seq, rcpulsenote, 0.4, effect_amp_antispike, -13, 0.38, 0.47); //main high
    a3 = synthesis2(seq, rcpulsenote, 0.2, effect_amp_antispike, -13, 0.5, 0.47); //echo
    a2 = synthesis2(seq, rcpulsenote, 0.1, effect_amp_antispike, -25, 0.5, 0.47);//bass
    b = synthesis2(seq2, trianglenote, 0.7, effect_amp_antispike, -13, 0.9, 0.47); //main low
    b2 = synthesis2(seq2, sawtoothnote, 0.35, effect_amp_antispike, -1, 0.9, 0.47); //advanced low
    c = new Float32Array(a.length);
    for (i = 0; i < c.length; i++) {
        c[i] = a[i] + a2[i] + a3[i] + b[i] + b2[i]
    };
    let f = () => displayBuffer(c, f);
    f()
}
function playnote(func, ...args) {
    alc = func(...args)
    displayBuffer(alc)
}
let p = (v) => v ? v : 0
function merge(a, b) {
    let l = a.length + b.length
    let c = new Float32Array(l)
    for (let i = 0; i < l; i++) {
        if (i < a.length) {
            c[i] = p(a[i])
        } else {
            c[i] = p(b[i - a.length])
        }
    }
    return c
}
function remix(...a) {
    let maxl = 0
    for (let i = 0; i < a.length; i++) {
        if (a[i].length > maxl) {
            maxl = a[i].length
        }
    }
    let b = new Float32Array(maxl)
    for (let i = 0; i < maxl; i++) {
        for (let j of a) {
            b[i] += p(j[i])
        }
    }
    return b
}
function echo(a) {
    let b = new Float32Array(a.length)
    for (let i = 0; i < a.length; i++) {
        b[i] = a[i] + p(a[i - 3000]) * 0.4 + p(a[i - 3000 * 2]) * 0.4 / 2 + p(a[i - 3000 * 3]) * 0.4 / 4 + p(a[i - 3000 * 4]) * 0.4 / 8
    }
    return b
}
function play_sequence_1() {
    let c = synthesis2("2 D5 2 B4", sinenote, 1, effect_amp_fullfadeout, 0, 1)
    displayBuffer(c)
}

var seq3 = '1 B5 0.5 E5 0.5 Fs5 0.5 G5 0.5 B5 1 A5 1 D5 1 A5 1 G5 0.5 Fs5 0.5 G5 0.5 Fs5 0.5 D5 1 B4 2 E5 ' +
    '1 B5 0.5 G5 0.5 A5 0.5 B5 0.5 D6 1 Db6 1 A5 0.5 A5 0.5 B5 0.5 G5 0.5 Fs5 1 D5 1 Fs5 2.5 E5'
var seq4 = '1.5 E3 1.5 0 1.5 D3 1.5 0 1.5 C3 1.5 0 1.5 B2 1.5 0 1.5 A2 1.5 0 1.5 B2 1.5 0 1.5 C3 0.5 0 1 D3 1 E3 1 0 1 B2 1 E2 1 0'
var seq5 = '1 0 1 E4 1 E4 1 0 1 D4 1 D4 1 0 1 E4 1 G4 1 0 1 D4 1 Fs4 1 0 1 C4 1 E4 1 0 1 D4 1 Fs4 1 0 1 G4 1 A4 3.5 B4 1 0'

var seq6 = '0.5 G4 0.5 A4 1 B4 0.5 E4 0.5 Fs4 0.5 G4 0.5 B4 1 A4 1 D4 1 A4 1 G4 0.5 Fs4 0.5 G4 0.5 Fs4 0.5 D4 1 B3 2 E4 1 B4 ' + '0.5 G4 0.5 A4 0.5 B4 0.5 D5 1 Cs5 1 A4 0.5 A4 0.5 B4 0.5 G4 0.5 Fs4 1 D4 1 Fs4 2 E4 1 0'
var seq4x = '1 0 1.5 E3 1.5 0 1.5 D3 1.5 0 1.5 C3 1.5 0 1.5 B2 1.5 0 1.5 A2 1.5 0 1.5 B2 1.5 0 1.5 C3 0.5 0 1 D3 2 E3'
var seq5x = '1 0 1 0 1 E4 1 G4 1 0 1 D4 1 Fs4 1 0 1 E4 1 G4 1 0 1 D4 1 Fs4 1 0 1 C4 1 E4 1 0 1 D4 1 Fs4 1 0 1 G4 1 A4 1 B4 2 E3'

var seq4x2 = '1.5 C3 1.5 0 1.5 D3 1.5 0 1.5 E3 1.5 0 1.5 G3 1.5 0 1.5 C3 1.5 0 1.5 D3 1.5 0 1.5 E3 1.5 0 1.5 E2 1.5 0 1.5 C3 1.5 0 1.5 D3 1.5 0 1.5 E3 1.5 0 1.5 G2 1.5 0 1.5 A2 1.5 0 1.5 B2 1.5 0 1.5 C3 1.5 0'
var seq7 = '1 E5 2 B5 0.5 A5 0.5 B5 0.5 D6 0.5 A5 0.5 Fs5 0.5 D5 1 E5 1 B5 1 0 1 E5 1 B5 1 0 1 E5 2 B5 0.5 A5 0.5 B5 0.5 D6 0.5 A5 0.5 Fs5 0.5 D5 2.5 E5 3 0 0.5 0 1 E5 2 B5 0.5 A5 0.5 B5 0.5 D6 0.5 A5 0.5 Fs5 0.5 D5 1 E5 1 B5 1 0 1 E5 1 B5 1 0 1 E5 2 B5 0.5 A5 0.5 B5 0.5 D6 0.5 A5 0.5 Fs5 0.5 D5 2.5 E5'
var seq8 = '1 C3 1 E4,G4 1 E4,G4 1 D3 1 D4,Fs4 1 D4,Fs4 1 E3 1 E4,G4 1 E4,G4 1 G2 1 E4,G4 1 E4,G4 1 C3 1 E4,G4 1 E4,G4 1 D3 1 D4,Fs4 1 D4,Fs4 1 E3 1 E4,G4 1 E4,G4 1 E2 1 E4,G4 1 E4,G4' + ' 1 C3 1 E4,G4 1 E4,G4 1 D3 1 D4,Fs4 1 D4,Fs4 1 E3 1 E4,G4 1 E4,G4 1 G2 1 E4,G4 1 E4,G4 1 C3 1 E4,G4 1 E4,G4 1 D3 1 D4,Fs4 1 D4,Fs4 1 E3 1 E4,G4 1 E4,G4 1 E2'

var seq9 = '0.5 C6 0.5 Cs6 0.5 D6 0.5 Ds6 0.5 E6 0.5 F6 0.5 Fs6 0.5 G6'

function play_sequence_file() {
    // https://jsfiddle.net/NicDoesCode/fz7cn004/


    var file = document.getElementById("seq_file")
    if (file.files.length > 0) {
        var reader = new FileReader();
        reader.onload = function (ev) {
            var filebuf = reader.result;
            audioCtx.decodeAudioData(filebuf, function (aubuf) {
                displayBufferStereo(aubuf.getChannelData(0), aubuf.getChannelData(1), () => { })
            });
        }
        reader.readAsArrayBuffer(file.files[0]);
    }


    // let bl=new Float32Array(pcm_data.l.length)
    // for(let i=0;i<bl.length;i++){
    //     bl[i]=(pcm_data.l[i])/65535*2
    // }
    // let br=new Float32Array(pcm_data.r.length)
    // for(let i=0;i<br.length;i++){
    //     br[i]=(pcm_data.r[i])/65535*2
    // }
    //playBufferStereo(bl,br)


}
function play_sequence_4() {

    let oamp = 5
    let c1 = synthesis2(seq3, rcpulsenote, 0.2 * oamp, effect_amp_note2, 0, 1.4, 0.41)
    let c1x = synthesis2(seq3, rcpulsenote, 0.05 * oamp, effect_amp_note2, +12, 1.4, 0.41)
    let c2 = synthesis2(seq4, rcpulsenote, 0.14 * oamp, effect_amp_note2, 0, 2.3, 0.41)
    let c3 = synthesis2(seq5, rcpulsenote, 0.12 * oamp, effect_amp_note2, 0, 1.5, 0.41)

    let p1 = remix(c1, c1x, c2, c3)

    let c2x = synthesis2(seq4x, rcpulsenote, 0.12 * oamp, effect_amp_note2, 0, 2.3, 0.41)
    let c3x = synthesis2(seq5x, rcpulsenote, 0.15 * oamp, effect_amp_note2, 0, 1.5, 0.41)

    let c4 = synthesis2(seq6, trianglenote, 0.5 * oamp, effect_amp_fadeinfadeout, 0, 1.2, 0.41)

    let p2 = remix(c2x, c3x, c4)

    let c6 = synthesis2(seq7, rcpulsenote, 0.2 * oamp, effect_amp_note2, 0, 1.4, 0.41)
    let c7 = synthesis2(seq8, rcpulsenote, 0.15 * oamp, effect_amp_fullfadeout, 0, 0.5, 0.41)
    let c8 = synthesis2(seq4x2, rcpulsenote, 0.08 * oamp, effect_amp_note2, 0, 2, 0.41)

    let p3 = remix(c6, c7, c8)

    let w = merge(merge(p1, p2), p3)
    displayBuffer(w)


}
// function play_sequence_2() {
//     playsequence(
//         [undertale_heartache_1, undertale_heartache_2],
//         [rcpulsenote, trianglenote], [0.1, 1], [effect_amp_fadeinfadeout2, effect_amp_fadeinfadeout2]
//     )
// }
var BPM = 120
var quarterNoteDuration = 120 / 60 //second

function synthesis2(sequence, instrument, gain, envelopeFunc, tune, noteduration, compress) {
    let max_length = 0
    compress = compress ? compress : 0.5
    let seqarr = sequence.split(" ")
    for (let i = 0; i < seqarr.length; i += 2) {
        max_length += parseFloat(seqarr[i])
    }
    let buf = allocateBuffer(max_length * compress)
    let framePointer = 0
    for (let k = 0; k < seqarr.length; k += 2) {
        let duration = seqarr[k] * compress

        if (seqarr[k + 1] == "0") {
            framePointer += Math.ceil(duration * sampleRate)
            continue;
        }
        let notearr = seqarr[k + 1].split(",")
        for (let j = 0; j < notearr.length; j++) {
            if (notearr[j] == 0) continue;
            let notebuf = instrument(n2f(transformTune(notearr[j], tune)), duration * noteduration, envelopeFunc ? envelopeFunc : null)

            for (let l = framePointer; l < Math.ceil(framePointer + notebuf.length); l++) {
                buf[l] += notebuf[l - framePointer] * (gain ? gain : 1) / (j / 2 + 1)
            }
        }
        framePointer += Math.ceil(duration * sampleRate)

    }
    console.log("音轨合成完成")
    return buf
}

// function synthesis(channels, instruments, gains, effects) {
//     let max_length = 0
//     let channelarrs = []
//     for (i in channels) {
//         let arr = channels[i].split(" ")
//         channelarrs[i] = arr
//         let chlen = 0
//         for (let i = 0; i < arr.length; i += 2) {
//             chlen += parseFloat(arr[i] / 2)
//         }
//         if (max_length < chlen) max_length = chlen
//     }
//     let buf = allocateBuffer(max_length)
//     for (i in channelarrs) {
//         let channeldata = channelarrs[i]
//         let framePointer = 0
//         for (let k = 0; k < channeldata.length; k += 2) {
//             let notebuf = instruments[i](n2f(channeldata[k + 1]), channeldata[k] / 2, effects[i] ? effects[i] : null)
//             console.log(framePointer)
//             for (let j = 0; j < notebuf.length; j++) {
//                 buf[j + framePointer] = buf[j + framePointer] + notebuf[j] * (gains[i] ? gains[i] : 1)
//             }
//             framePointer += notebuf.length
//         }
//     }
//     return buf
// }
var nfmap = {
    "0": "0",
//--------------------- 
/**/"A0": "27.500",
/*----*/"Bb0": "29.135", "As0": "29.135",
/**/"B0": "30.868",
//---------------------
/**/"C1": "32.703",
/*----*/"Db1": "34.648", "Cs1": "34.648",
/**/"D1": "36.708",
/*----*/"Eb1": "38.891", "Ds1": "38.891",
/**/"E1": "41.203",
/**/"F1": "43.654",
/*----*/"Gb1": "46.249", "Fs1": "46.249",
/**/"G1": "48.999",
/*----*/"Ab1": "51.913", "Gs1": "51.913",
/**/"A1": "55.000",
/*----*/"Bb1": "58.270", "As1": "58.270",
/**/"B1": "61.735",
//---------------------
/**/"C2": "65.406",
/*----*/"Db2": "69.296", "Cs2": "69.296",
/**/"D2": "73.416",
/*----*/"Eb2": "77.782", "Ds2": "77.782",
/**/"E2": "82.407",
/**/"F2": "87.307",
/*----*/"Gb2": "92.499", "Fs2": "92.499",
/**/"G2": "97.999",
/*----*/"Ab2": "103.83", "Gs2": "103.83",
/**/"A2": "110.00",
/*----*/"Bb2": "116.54", "As2": "116.54",
/**/"B2": "123.47",
//---------------------
/**/"C3": "130.81",
/*----*/"Db3": "138.59", "Cs3": "138.59",
/**/"D3": "146.83",
/*----*/"Eb3": "155.56", "Ds3": "155.56",
/**/"E3": "164.81",
/**/"F3": "174.61",
/*----*/"Gb3": "185.00", "Fs3": "185.00",
/**/"G3": "196.00",
/*----*/"Ab3": "207.65", "Gs3": "207.65",
/**/"A3": "220.00",
/*----*/"Bb3": "233.08", "As3": "233.08",
/**/"B3": "246.94",
//---------------------
/**/"C4": "261.63",
/*----*/"Db4": "277.18", "Cs4": "277.18",
/**/"D4": "293.67",
/*----*/"Eb4": "311.13", "Ds4": "311.13",
/**/"E4": "329.63",
/**/"F4": "349.23",
/*----*/"Gb4": "369.99", "Fs4": "369.99",
/**/"G4": "392.00",
/*----*/"Ab4": "415.30", "Gs4": "415.30",
/**/"A4": "440.00",
/*----*/"Bb4": "466.16", "As4": "466.16",
/**/"B4": "493.88",
//---------------------
/**/"C5": "523.25",
/*----*/"Db5": "554.37", "Cs5": "554.37",
/**/"D5": "587.33",
/*----*/"Eb5": "622.25", "Ds5": "622.25",
/**/"E5": "659.26",
/**/"F5": "698.46",
/*----*/"Gb5": "739.99", "Fs5": "739.99",
/**/"G5": "783.99",
/*----*/"Ab5": "830.61", "Gs5": "830.61",
/**/"A5": "880.00",
/*----*/"Bb5": "932.33", "As5": "932.33",
/**/"B5": "987.77",
//---------------------
/**/"C6": "1046.5",
/*----*/"Db6": "1108.7", "Cs6": "1108.7",
/**/"D6": "1174.7",
/*----*/"Eb6": "1244.5", "Ds6": "1244.5",
/**/"E6": "1318.5",
/**/"F6": "1396.9",
/*----*/"Gb6": "1480.0", "Fs6": "1480.0",
/**/"G6": "1568.0",
/*----*/"Ab6": "1661.2", "Gs6": "1661.2",
/**/"A6": "1760.0",
/*----*/"Bb6": "1864.7", "As6": "1864.7",
/**/"B6": "1975.5",
//---------------------
/**/"C7": "2093.0",
/*----*/"Db7": "2217.5", "Cs7": "2217.5",
/**/"D7": "2349.3",
/*----*/"Eb7": "2489.0", "Ds7": "2489.0",
/**/"E7": "2637.0",
/**/"F7": "2793.0",
/*----*/"Gb7": "2960.0", "Fs7": "2960.0",
/**/"G7": "3136.0",
/*----*/"Ab7": "3322.4", "Gs7": "3322.4",
/**/"A7": "3520.0",
/*----*/"Bb7": "3729.3", "As7": "3729.3",
/**/"B7": "3951.1",
//---------------------
/**/"C8": "4186.0",
}
function n2f(note) { //note to frequency
    if (note == 0) return 0
    return nfmap[note]
}


// var exampleSequence = "1 A4 1 A5 0.5 A3 0.5 A2"
// var undertale_heartache_1 =
//     "0.25 Bb2 0.25 Db3 0.25 C3 0.25 Db3 0.25 Bb2 0.25 0 0.25 Bb2 0.25 C3 0.25 Db3 0.25 Gs3 0.25 F3 0.25 0\
//  0.25 Bb2 0.25 Db3 0.25 C3 0.25 Db3 0.25 Bb2 0.25 0 0.25 Bb2 0.25 C3 0.25 Db3 0.25 Gs3 0.25 F3 0.25 0\
//  0.25 Bb2 0.25 Db3 0.25 C3 0.25 Db3 0.25 Bb2 0.25 0 0.25 Bb2 0.25 C3 0.25 Db3 0.25 Gs3 0.25 F3 0.25 0\
// "
// var undertale_heartache_2 = 
//     "0.75 Fs2 0.75 0 0.75 Fs2 0.75 0 0.75 Fs2 0.75 0 0.75 Fs2 0.75 0 0.75 As2 0.75 0 0.75 As2 0.75 0"

// function synthesis_midi(channels,instruments,gains,effects){
//     let max_length=0
//     let channelarrs=[]
//     for(i in channels){
//         let arr=channels[i].split(" ")
//         channelarrs[i]=arr
//         let chlen=0
//         for(let i=0;i<arr.length;i+=2){
//             chlen+=parseFloat(arr[i]/2)
//         }
//         if(max_length<chlen)max_length=chlen*3
//     }
//     let buf=allocateBuffer(max_length)
//     for(i in channelarrs){
//         let channeldata=channelarrs[i]
//         let framePointer=0
//         for(let k=0;k<channeldata.length;k+=2){
//             let notebuf=instruments[i](n2f(channeldata[k+1]),0.25,effects[i])
//             console.log(framePointer)
//             for(let j=0;j<notebuf.length;j++){
//                 buf[j+framePointer]=buf[j+framePointer]+notebuf[j]*gains[i]
//             }
//             framePointer+=channeldata[k]*sampleRate*0.4
//         }
//     }
//     return buf
// }

// function playunt() {
//     playSequence(rcpulsenote, undertale_heartache_1, 0.3,1)
//     playSequence(trianglenote, undertale_heartache_2, 5,2)
// }
// function playSequence(note, seq, gain,index) {
//     var seqarr = seq.split(" ")
//     let pointer = -2
//     function play() {
//         if (pointer + 2 < seqarr.length) {
//             pointer += 2
//             nextnote()
//         } else {
//             //loop?
//             pointer = 0; nextnote()
//         }
//         //console.log(index, pointer)
//         let dur = seqarr[pointer]
//         let freq = n2f(seqarr[pointer + 1])
//         if (freq != 0) {
//             alc = note(freq, dur / 2.5, (...args) => effect_amp_fadeinfadeout2(...args) * gain)
//             playBuffer(alc)
//             // oscilloscope_part(alc.buffer,canvas[0])
//             // oscilloscope_full(alc.buffer,canvas[1])
//         }
//     }
//     function nextnote(){
//         setTimeout(() => {
//             play()
//         }, seqarr[pointer] * 1000 / 2)
//     }
//     nextnote()
// }