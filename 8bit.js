/*
 * 8-bit engine note generator
 * Version 1.2 (20201109)
 * Author: jlywxy
 */
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//const sampleRate = audioCtx.sampleRate
var sampleRate=audioCtx.sampleRate
//inspired of: https://support.apple.com/zh-cn/guide/logicpro/lgsife419620/10.5/mac/10.14.6

function allocateBuffer(durationSecond) {
    return new Float32Array(sampleRate * durationSecond)
}
function bit8Filter(frame){
    return (((frame*0xffffffff)&0xf8000000))/0xffffffff
}
function playBuffer(buffer) {
    let arrbuf = audioCtx.createBuffer(1, buffer.length, sampleRate)
    let buf = arrbuf.getChannelData(0);
    for (let i = 0; i < buf.length; i++) {
        buf[i] = buffer[i]
    }
    let source = audioCtx.createBufferSource();
    source.buffer = arrbuf;
    source.connect(audioCtx.destination);
    source.start()
    return buf
}
function playBufferStereo(bufferL,bufferR) {
    let arrbuf = audioCtx.createBuffer(2, bufferL.length, sampleRate)
    let bufL = arrbuf.getChannelData(0);
    for (let i = 0; i < bufL.length; i++) {
        bufL[i] = bufferL[i]
    }
    let bufR = arrbuf.getChannelData(1);
    for (let i = 0; i < bufR.length; i++) {
        bufR[i] = bufferR[i]
    }
    let source = audioCtx.createBufferSource();
    source.buffer = arrbuf;
    source.connect(audioCtx.destination);
    playCallback=()=>{
        source.start()
    }
    return [bufL,bufR,playCallback]
}
//template
function note_template(freq, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        //TODO: waveform generate code
        var percentage = i / alc.length
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
//waveform
function squareWaveForm(x, freq, dutycycle) {
    let samplePerCycle = (sampleRate / freq)
    return x % samplePerCycle < (samplePerCycle * dutycycle)
}
function sawtoothWaveForm(x, freq) {
    let samplePerCycle = (sampleRate / freq)
    return x % samplePerCycle / samplePerCycle
}
function sineWaveForm(x, freq, offset) {
    offset = offset ? offset : 0
    return Math.sin(2 * Math.PI * (x * freq / sampleRate) + offset)
}
function triangleWaveForm(x, freq) {
    let samplePerCycle = (sampleRate / freq)
    if (x % samplePerCycle > 0.5 * samplePerCycle) {
        return (samplePerCycle - x % samplePerCycle) / samplePerCycle -0.25
    } else {
        return x % samplePerCycle / samplePerCycle -0.25
    }
}
function rcpulseWaveForm(x, freq, dutycycle, sharpness) {
    let samplePerCycle = (sampleRate / freq)
    let flip = 2 * (x % samplePerCycle < (samplePerCycle * dutycycle)) - 1
    let sub_x = (x % (samplePerCycle)) / (samplePerCycle) + sharpness
    flip == 1 ? sub_x = sub_x * dutycycle : sub_x = sub_x * (1 - dutycycle)
    return flip * (1 - Math.log(sub_x * 2)) / 4
}
//note
function sinenote(freq, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = sineWaveForm(i, freq, 0) * 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function sinenote8(freq, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = bit8Filter(sineWaveForm(i, freq, 0) * 0.5)
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function sinenote_fm(freq_car, freq_mod, mod_amp, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = sineWaveForm(i, freq_car, mod_amp * sineWaveForm(i, freq_mod, 0)) * 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function sinenote_am(freq_car, freq_mod, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = sineWaveForm(i, freq_car, 0) * sineWaveForm(i, freq_mod, 0) * 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function sinenote_dtmf(freq_1, freq_2, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = (sineWaveForm(i, freq_1, 0) * 0.5 + sineWaveForm(i, freq_2, 0) * 0.5) * 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function squarewavenote(freq, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = squareWaveForm(i, freq, 0.5) * 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function sawtoothnote(freq, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = sawtoothWaveForm(i, freq) * 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function trianglenote(freq, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = triangleWaveForm(i, freq)
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function rcpulsenote(freq, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = rcpulseWaveForm(i, freq, 0.36, 0.18) * 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
//node with effects
function sinenote_vibrato(freq, freq_vib, duration, envelopeControl) {
    return sinenote_fm(freq, freq_vib, 4, duration, envelopeControl)
}
function squarewavenote_vibrato(freq, freq_vib, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = squareWaveForm(i, freq + 0.6 * sineWaveForm(i, freq_vib, 0), 0.5) * 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function sawtoothnote_vibrato(freq, freq_vib, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = sawtoothWaveForm(i, freq + 0.6 * sineWaveForm(i, freq_vib, 0)) * 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function trianglenote_vibrato(freq, freq_vib, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = triangleWaveForm(i + 30 * sineWaveForm(i, freq_vib, 0), freq)
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function rcpulsenote_vibrato(freq, freq_vib, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = rcpulseWaveForm(i, freq + 0.8 * sineWaveForm(i, freq_vib, 0), 0.2, 0.2) * 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function noisenote(nouse_freq, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = Math.random() - 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function sinenote_drum(freq) {
    let duration = 0.1
    let alc = allocateBuffer(duration)
    let freqvar = freq
    for (var i = 0; i < alc.length; i++) {
        freqvar = freq * (sampleRate * duration - i / 2) / (sampleRate * duration)
        alc[i] = sineWaveForm(i, freqvar, 0) * 0.5
        alc[i] = effect_amp_fullfadeout(i, alc.length, alc[i], alc)
    }
    return alc
}
function rcpulsenote_drum(freq) {
    let duration = 0.2
    let alc = allocateBuffer(duration)
    let freqvar = freq
    for (var i = 0; i < alc.length; i++) {
        freqvar = freq * (sampleRate * duration - i / 2) / (sampleRate * duration)
        alc[i] = rcpulseWaveForm(i, freqvar,0.5,0.1)
        alc[i] = effect_amp_fullfadeout(i, alc.length, alc[i], alc)
    }
    return alc
}
function sinenote_fm_modfreqincrease(freq_car, freq_mod, mod_amp, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    let freq_mod_var = freq_mod
    for (var i = 0; i < alc.length; i++) {
        freq_mod_var += 0.002
        alc[i] = sineWaveForm(i, freq_car, mod_amp * sineWaveForm(i, freq_mod_var, 0)) * 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
function squarewavenote_dutycyclevibrato(freq, duration, envelopeControl) {
    let alc = allocateBuffer(duration)
    for (var i = 0; i < alc.length; i++) {
        alc[i] = squareWaveForm(i, freq, sineWaveForm(i, 1, 0) * 0.4 + 0.5) * 0.5
        if (envelopeControl) alc[i] = envelopeControl(i, alc.length, alc[i], alc)
    }
    return alc
}
//amplitudeeffects
function effect_amp_fadeinfadeout(i, len, val) {
    if (i < 3000) { return val * (i) / 3000 }
    else if ((len - i) < 3000) { return val * (len - i) / 3000 }
    else { return val }
}
function effect_amp_fadeinfadeout2(i, len, val) {
    if (i / len > 0.7) { return val * ((len - i) / (len)) }
    else if ((len - i) < 5000) { return val * (len - i) / 5000 }
    else { return val }
}
function effect_amp_fullfadeout(i, len, val) {
    return val * (len - i) / len
}

var eac_v2=0,for_v2=0,threshold=0.001
function effect_amp_note2(i, len, val) {
    if(Math.abs(val-for_v2)>=threshold){
        eac_v2=for_v2
    }else{
        eac_v2=val
    }
    if(eac_v2>1)eac_v2=1
    if(eac_v2<-1)eac_v2=-1
    for_v2=val
    if (i < 10) { return eac_v2 * (i) / 10 }
    return eac_v2 * (len - i) / len 
}


function effect_amp_antispike(i, len, val) {
    if (i < 500) { return val * (i) / 500 }
    else if ((len - i) < 500) { return val * (len - i) / 500 }
    else { return val }
}
var eac_v=0,for_v=0
function effect_amp_capacitor(i, len, val){
    delta=(val-for_v)
    eac_v+=(delta>10)?10:delta
    if(eac_v>1)eac_v=1
    if(eac_v<-1)eac_v=-1
    for_v=val
    return eac_v
}