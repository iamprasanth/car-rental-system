const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function dateFormatter(date) {
    var date = new Date(date);
    const currentMonth = monthNames[date.getMonth()];
    const currentDate = date.getDate();
    return `${currentMonth} ${currentDate}, ${date.getFullYear()}`;
}