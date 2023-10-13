const formatDate = (date) => {
    var d = new Date(date);
    if(!isValidDate(d)) {
        return date;
    }
        var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

const formatDateTime = (d) => {
    if (!d)
        return '';
    var date = new Date(d);
    if(!isValidDate(date)) {
        return d;
    }

    var hours = date.getHours();
    var minutes = date.getMinutes();
    // var seconds = date.getUTCSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    var month = '' + (date.getMonth() + 1);
    if (month.length < 2)
        month = '0' + month;

    return date.getDate() + "-" + month + "-" + date.getFullYear() + "  " + strTime;
}

const addMonths = (date, month) => {
    let d = new Date(date);
    let newDate = new Date(d.setMonth(d.getMonth() + month));
    return formatDate(newDate);
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

const formatDateAsDateFirst = (date) => {
    if (!date)
        return '';
    var d = new Date(date);
    if(!isValidDate(d)) {
        return date;
    }
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}

const extractColumns = (respColumns, configColumns, configColumnHeaders) => {
    let keys = [];
    let columnHeaders = []
    if (!respColumns)
        return keys;

    let columns = Object.getOwnPropertyNames(respColumns);
    configColumns.forEach(key => {
        let columnName = ''
        if (configColumnHeaders) {
            columnName = configColumnHeaders[key]
        } else {
            columnName = key.includes('.') ? (key.charAt(0).toUpperCase() + key.slice(1).trim().replace("_", " ").split('.')[0]) : (key.charAt(0).toUpperCase() + key.slice(1).trim().replace("_", " "))
        }
        if (columns && (columns.includes(key) || columns.includes(key.split('.')[0]))) {
            keys.push({
                columnId: key,
                // columnName: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim().replace("_"," "),
                //if (configColumnHeaders) {
                //    columnName : configColumnHeaders['columnName'],
                //} else {
                //    columnName: key.includes('.') ? (key.charAt(0).toUpperCase() + key.slice(1).trim().replace("_", " ").split('.')[0]) : (key.charAt(0).toUpperCase() + key.slice(1).trim().replace("_", " ")),
                //}
                columnName : columnName,
                width: key === 'remark' ? '40%' : key === 'clientName' ? '20%' : key === "opportunity" ? '18%' :
                    key === 'mobileNumber' ? '20%' : key === 'activityType' ? '20%' : key === 'itemName' ? '25%': 
                    key === 'stepNo' ? '11%' : key === 'experimentId' ? '17%' : key === 'schemeNumber' ? '20%' : 
                    key === 'experimentBatchNo' ? '23%' : key === 'experimentName' ? '20%' : key === 'reactionType' ? '17%' : 
                    key === 'reactionName' ? '18%' : key === 'schemeStatus' ? '18%' : key === 'createDateTime' ? '20%' : 
                    key === 'lastChangedBy' ? '20%' : key === 'lastChangedDateTime' ? '26%' : '14%'
            });
        }
    });

    return keys;
}

function dataURLtoFiles(fileobj) {
    if (!fileobj)
        return null;
    let files = [];

    for (let i = 0; i < fileobj.length; i++) {
        var arr = fileobj[i].fileBase64String.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        files.push(new File([u8arr], fileobj[i].fileName, { type: mime }));
    }


    return files;
}

export default {
    formatDate,
    formatDateAsDateFirst,
    addMonths,
    extractColumns,
    dataURLtoFiles,
    formatDateTime,
}