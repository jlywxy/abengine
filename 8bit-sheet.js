/*
 * 8-bit engine sheet-sequence convertor & note utilities
 * Version 1.2 (20201109)
 * Author: jlywxy
 */
/*
*        
                                high  low
      14                        D6    F4
----- 13 ---                    C6    E4
      12                        B5    D4
----- 11 ---                    A5    C4
      10                        G5    B3
*------9------------------------F5    A3
       8                        E5    G3
*------7------------------------D5    F3
       6                        C5    E3
*------5------------------------B4    D3
       4                        A4    C3
*------3------------------------G4    B3
       2                        F4    A2
*------1------------------------E4    G2
       0                        D4    F2
----- -1 ---                    C4    E2
      -2                        B3    D2
----- -3 ---                    A3    C2
      -4                        G3    B1
*
*/
highmap = ["G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6", "D6"]
lowmap = ["B1", "C2", "D2", "E2", "F2", "G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4", "D4", "E4", "F4"]
nameuniform={
    "Cs": "Bb",
    "Ds": "Eb",
    "Fs": "Gb",
    "Gs": "Ab",
    "As": "Bb",
}
noteTransformMap = [["C", "Bb", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"], ["B", "Bb", "A", "Ab", "G", "Gb", "F", "E", "Eb", "D", "Db", "C"]]
function transformTone(note, by) {
    let map = by > 0 ? noteTransformMap[0] : noteTransformMap[1]
    if (by == 0) return note
    else {
        let level = parseInt(note[note.length - 1])
        let notename=note.substring(0, note.length - 1)
        if(nameuniform[notename])notename=nameuniform[notename]
        let noteindex = map.indexOf(notename)
        let newindex = noteindex + Math.abs(by)
        if (by > 0) level += Math.floor(newindex / 12)
        else if (by < 0) level -= Math.floor(newindex / 12)
        newindex = newindex % 12
        return map[newindex] + level
    }
}

function s2n(sheetnote, low) {
    let mapoffset = 4
    let trans = 0
    if(sheetnote=="x")return 0
    if (sheetnote[0] == "#") { trans = 1 }
    else if (sheetnote[0] == "b") { trans = -1 }
    else { trans = 0 }
    let newnote=""
    if (trans == 0) {
        if (!low) { newnote= highmap[parseInt(sheetnote) + mapoffset] }
        else { newnote= lowmap[parseInt(sheetnote) + mapoffset] }
    } else {
        let noteindex = parseInt(sheetnote.substr(1))
        newnote = (!low) ? highmap[noteindex + mapoffset] : lowmap[noteindex + mapoffset]
    }
    return transformTone(newnote, trans)
}
function sheet2sequence(sheet, lowsheet) {
    sheet = sheet.replace(/\|\n/g, " ")
    let sheetarr = sheet.split(" ")
    let ret = ""
    for (let i = 0; i < sheetarr.length; i += 2) {
        let notearr = sheetarr[i + 1].split(",")
        ret += sheetarr[i] + " "
        for (let j = 0; j < notearr.length; j++) {
            ret += s2n(notearr[j], lowsheet,"b4") + ((j == notearr.length - 1) ? "" : ",")
        }
        ret += " "
    }
    return ret
}

// function applyTone(note, tonetype) {
//     if (tonetype == 0) return note
//     let notename = note.substr(0, note.length - 1)
//     let match = ["F", "C", "G", "D", "A", "E", "B"]
//     let rftype = tonetype[0]
//     let tonelevel = tonetype[1]
//     if (rftype == "#") {
//         let submatch = match.slice(0, tonelevel)
//         if (submatch.indexOf(notename) != -1) {
//             return transformTone(note, +1)
//         } else {
//             return note
//         }
//     } else {
//         let submatch = match.slice(7 - tonelevel, 7)
//         if (submatch.indexOf(notename) != -1) {
//             return transformTone(note, -1)
//         } else {
//             return note
//         }
//     }
// }