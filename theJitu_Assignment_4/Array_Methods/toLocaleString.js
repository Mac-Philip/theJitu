const numberVal = 123456.789;

console.log(numberVal.toLocaleString('en-US', {style:'currency', currency:'USD'}));

const timeZone = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

// British English uses day-month-year order and 24-hour time without AM/PM
console.log(timeZone.toLocaleString('en-GB', { timeZone: 'UTC' }));




