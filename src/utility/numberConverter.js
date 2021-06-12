const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const persianMap = persianDigits.split("");

export const convertToEnglishNumber = (input) => {
    return input.replace(/[\u06F0-\u06F90]/g, function(m){
        return persianDigits.indexOf(m);
    });
}
export  const convertToPersianNumber = (input) => {
    return input.replace(/\d/g,function(m){
        return persianMap[parseInt(m)];
    });
}

export const  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}