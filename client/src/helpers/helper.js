const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function dateFormatter(date) {
    var dateParts = date.split('-');
    if (date.includes("T")) {
        var yearParts = dateParts[2].split('T');
        var dateObj = new Date(dateParts[0], dateParts[1] - 1, yearParts[0]);
    } else {
        var dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    }
    const currentMonth = monthNames[dateObj.getMonth()];
    const currentDate = dateObj.getDate();
    console.log(dateObj);

    return `${currentMonth} ${currentDate}, ${dateObj.getFullYear()}`;
}
