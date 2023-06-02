function get_int_single_for_morse(a){
    // console.log("single",a)
    switch (a){
        case ".----" : return 1
        case "..---" : return 2
        case "...--" : return 3
        case "....-" : return 4
        case "....." : return 5
        case "-...." : return 6
        case "--..." : return 7
        case "---.." : return 8
        case "----." : return 9
        case "-----" : return 0
        case "--..--": return ","
    }
}

function morse_string_to_decimal(morse_str) {
    let spl = morse_str.split(" ")
    let str = ""
    spl.forEach(i=>{
        if(i.trim().length>0){
            str+=get_int_single_for_morse(i)
        }
    })
    return str
}


self.addEventListener("message", function(e) {
    // the passed-in data is available via e.data
    // let morse = e.data
    let dataArr = e.data.split(" / ")
    let hwd = morse_string_to_decimal(dataArr[0]).split(",")
    let height = parseInt(hwd[1])
    let width = parseInt(hwd[0])
    postMessage([width,height])

    let elemc = 1
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            let rgba = morse_string_to_decimal(dataArr[elemc++]).split(",")
            postMessage([i,j,rgba[0],rgba[1],rgba[2],rgba[3]])
        }
    }

    console.log(hwd)
    // postMessage(fstr)
    // console.log(dataArr)
}, false);
