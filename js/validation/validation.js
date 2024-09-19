function checkEmptyValue(theThongBao, value) {
  if (value.trim() == "") {
    //thông báo lỗi cho người dùng
    theThongBao.innerText = "Vui lòng không bỏ trống";
    return false;
  } else {
    theThongBao.innerText = "";
    return true;
  }
}

// value = 'abcdef' ==> yeu cau nguoi dung du lieu nhap vao tu 4 den 10 ky tu
//6 den 10

function checkMinMaxValue(theThongBao, value, min, max) {
  if (value.length <= min || value.length >= max) {
    theThongBao.innerText = `Vui lòng nhập từ ${min} đến ${max}`;
    return false;
  } else {
    theThongBao.innerText = "";
    return true;
  }
}

function checkEmailValue(theThongBao, value) {
  const regEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(value)) {
    theThongBao.innerText = "Vui lòng nhập đúng định dạng email";
    return false;
  } else {
    theThongBao.innerText = "";
    return true;
  }
}

function checkPassword(theThongBao, value) {
  const regPassword = /^(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/;
  if (!regPassword.test(value)) {
    theThongBao.innerText =
      "Vui lòng nhập có ít nhất 1 số, 1 ký tự hoa, 1 ký tự đặc biệt";
    return false;
  } else {
    theThongBao.innerText = "";
    return true;
  }
}

function checkValueNumberMinMax(theThongBao, value, min, max) {
  const regexNumberMinMax = new RegExp(`^\\d{${min},${max}}$`);
  if (!regexNumberMinMax.test(value)) {
    theThongBao.innerText = `Vui lòng nhập ${min} - ${max} ký số`;
    return false;
  } else {
    theThongBao.innerText = "";
    return true;
  }
}

function checkContainsNoNumbers(theThongBao, value) {
  const reg = /^[^\d]*$/;
  if (!reg.test(value)) {
    theThongBao.innerText = "Vui lòng không nhập số vào trường này";
    return false;
  } else {
    theThongBao.innerText = "";
    return true;
  }
}

function checkOnlyNumber(theThongBao, value) {
  if (isNaN(value * 1)) {
    theThongBao.innerText = "Vui lòng nhập số vào trường này";
    return false;
  } else {
    theThongBao.innerText = "";
    return true;
  }
}

function checkDuring(theThongBao, value, from, to) {
  const checked = from <= value * 1 || value * 1 >= to;
  if (!checked) {
    theThongBao.innerText = `Vui lòng nhập từ ${from} - ${to}`;
    return false;
  } else {
    theThongBao.innerText = "";
    return true;
  }
}
