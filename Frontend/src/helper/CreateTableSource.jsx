export const createTableSource = (columnData) => {
    var arrData = []
    const objfile = Object.fromEntries(
        columnData.map((item, index) => [index, {
            title: item,
            field: item
        }])
    )
    console.log(objfile)
    let keysfile = Object.keys(objfile);
    for (var i = 0, n = keysfile.length; i < n; i++) {
        var key = keysfile[i];
        arrData[key] = objfile[key];
    }
    if (arrData.length) {
        return arrData
    }
}