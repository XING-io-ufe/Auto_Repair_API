export function validatePhone(phone) {
  if (!phone) {
    return { valid: false, msg: "Утасны дугаараа оруулна уу!" };
  }
  if (!/^\d+$/.test(phone)) {
    return { valid: false, msg: "Зөвхөн тоо оруулна уу!" };
  }
  if (phone.length !== 8) {
    return { valid: false, msg: "8 оронтой утасны дугаар оруулна уу!" };
  }
  return { valid: true };
}

export function validatePhones(currentPhone, newPhone) {
  if (!currentPhone) {
    return { valid: false, msg: "Одоогийн утасны дугаараа оруулна уу!" };
  }
  if (!/^\d{8}$/.test(currentPhone)) {
    return { valid: false, msg: "Зөв 8 оронтой одоогийн дугаар оруулна уу!" };
  }
  if (!newPhone) {
    return { valid: false, msg: "Шинэ утасны дугаараа оруулна уу!" };
  }
  if (!/^\d{8}$/.test(newPhone)) {
    return { valid: false, msg: "Зөв 8 оронтой шинэ дугаар оруулна уу!" };
  }
  if (newPhone === currentPhone) {
    return { valid: false, msg: "Шинэ дугаар өмнөхтэй ижил байна!" };
  }
  return { valid: true, msg: "" };
}
