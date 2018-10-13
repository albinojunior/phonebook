const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})/;
const NAME_REGEX = /^(?!\s)[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]{2,250}$/;

export const validEmail = (email: string): boolean => {
    return EMAIL_REGEX.test(email);
};

export const validName = (email: string): boolean => {
    return NAME_REGEX.test(email);
};
