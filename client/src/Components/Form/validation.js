export default function validation(inputs){
/*     const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const regexPassword= /^(?=\w*\d)\S{6,10}$/;
    const regexNumber = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
 */
const regexImage =/^(ftp|http|https):\/\/[^ "]+$/;
const errors={};
    
if (inputs.name.length === 0) {
    errors.name ="Este campo no puede estarssss vacio"
    
}
if (inputs.name.length > 35) {
    errors.name ="Este campo no puede exceder los 35 caracteres"
    
}
if (inputs.height.length === 0) {
    errors.height ="Este campo no puede estar vaaaacio"
    
}
if (inputs.weight === 0) {
    errors.weight ="El indice de comida saludable no puede ser 0"
    
}

if (inputs.years.length === 0) {
    errors.years="Eel indice no puede ser 0"
    
}
if (inputs.temperaments.length === 0) {
    errors.temperaments ="Este campo no puede exceder los 400 caracteres"
    
}
if ( !regexImage.test(inputs.image)) {
    errors.image ="Este campo debe ser una url"
    
}



return errors;

}