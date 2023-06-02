function get_morse_for_int_single(a){
    // console.log("single",a)
    switch (a){
        case 1 : return ".---- "
        case 2 : return "..--- "
        case 3 : return "...-- "
        case 4 : return "....- "
        case 5 : return "..... "
        case 6 : return "-.... "
        case 7 : return "--... "
        case 8 : return "---.. "
        case 9 : return "----. "
        case 0 : return "----- "
    }
}

function get_morse_for_int_str(int_str){
    // console.log("STR",int_str)
    let str = ""
    for (let i = 0; i < int_str.length; i++) {
        str+=get_morse_for_int_single(parseInt(int_str[i]))
    }
    return str
}

function get_morse_for_rgba_array(arr){
    let str = ""
    for (let i = 0; i < arr.length; i++) {
        str+= get_morse_for_int_str(arr[i])
        if(i<arr.length-1)
            str+="--..-- "
    }
    return str
}

self.addEventListener("message", function(e) {
    // the passed-in data is available via e.data
    let c = e.data.data
    let width = e.data.width
    let height = e.data.height
    let fstr = get_morse_for_rgba_array([width+"",height+""])
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const indicies = getColorIndicesForCoord(i,j,width)
            const r = (c[indicies[0]]+"").padStart(3,'0')
            const g = (c[indicies[1]]+"").padStart(3,'0')
            const b = (c[indicies[2]]+"").padStart(3,'0')
            const a = (c[indicies[3]]+"").padStart(3,'0')
            const morse = get_morse_for_rgba_array([r,g,b,a])
            fstr+=" / " +morse.trim()
        }
        // console.log("WORKER",i)
    }
    postMessage(fstr)
    // console.log(fstr)
}, false);
const getColorIndicesForCoord = (x, y, width) => {
    const red = y * (width * 4) + x * 4;
    return [red, red + 1, red + 2, red + 3];
};