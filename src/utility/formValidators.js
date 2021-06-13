import {convertToEnglishNumber} from "./numberConverter";


export const required = value => (value || typeof value === 'number' ? undefined : 'این قسمت لازم است')
export const image = image => (image?.name?.match(/\.(jpg|jpeg|png|gif)$/) ? undefined : 'لطفاً تصویر معتبر را انتخاب کنید')

export const maxLength = max => value =>
    value && value.length > max ? `باید حداکثر ${max} کاراکتر یا کمتر باشد` : undefined
export const maxLength15 = maxLength(15);
export const minLength = min => value =>
    value && value.length < min ? `باید حداقل ${min} کاراکتر یا بیشتر باشد` : undefined
export const minLength2 = minLength(2)
export const number = value =>
    value && isNaN(Number(value)) && isNaN(Number(convertToEnglishNumber(value))) ? 'باید یک عدد باشد' : undefined
export const minValue = min => value =>
    value && value < min ? `باید حداقل ${min} باشد` : undefined
export const maxValue = max => value =>
    value && value > max ? `باید حداکثر ${max} باشد` : undefined
export const minValue13 = minValue(13)
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'آدرس ایمیل نامعتبر است'
        : undefined
export const tooYoung = value =>
    value && value < 13
        ? 'شما حداقل سن لازم را ندارید!'
        : undefined
export const aol = value =>
    value && /.+@aol\.com/.test(value)
        ? 'واقعاً؟ شما هنوز هم از AOL برای ایمیل خود استفاده می کنید؟'
        : undefined
export const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'فقط مجاز به وارد کردن حروف الفبا و اعداد هستید'
        : undefined
export const phoneNumber = value =>
    value && !/^(0|[1-9][0-9]{9})$/i.test(value)
        ? 'شماره تلفن نامعتبر است ، باید 10 رقم باشد'
        : undefined


