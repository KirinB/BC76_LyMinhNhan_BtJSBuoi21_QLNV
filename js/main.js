let arrNhanVien = [];

//Onload window
window.onload = () => {
  const data = getData("arrNhanVien");
  if (data !== null) {
    arrNhanVien = convertToNhanVien(data);
    renderData();
  }
};

// Onclick Thêm nhân viên
document.getElementById("btnThemNV").onclick = () => {
  let nhanVien = getValueForm();
  if (nhanVien) {
    arrNhanVien.push(nhanVien);
    saveData("arrNhanVien", arrNhanVien);
    renderData();
    clearInput("formNhanVien");
  }
};

function convertToNhanVien(arr) {
  return arr.map((item) => {
    let nhanVien = new NhanVien();
    return Object.assign(nhanVien, item);
  });
}

//Render data to table
function renderData(array = arrNhanVien) {
  let result = "";
  for (let item of array) {
    const { tknv, name, email, datepicker: ngayLam, chucvu } = item;
    let nhanVien = new NhanVien();
    Object.assign(nhanVien, item);
    result += `
    <tr>
        <th class="nowrap">
            ${tknv}
        </th>
        <th>${name}</th>
        <th>${email}</th>
        <th>${ngayLam}</th>
        <th>${chucvu}</th>
        <th>${nhanVien.tongLuong()}</th>
        <th>${nhanVien.xepLoai()}</th>
        <th class="btn_setting" data-toggle="popover" data-content='<button class="btn btn-primary btn-sm edit-btn" data-tknv="${tknv}">Sửa</button> 
<button class="btn btn-danger btn-sm delete-btn" data-tknv="${tknv}">Xóa</button>'>
          <i class="fa fa-cog"></i>
        </th>
    </tr>
    `;
  }

  document.getElementById("tableDanhSach").innerHTML = result;
  $('[data-toggle="popover"]').popover({ html: true });
  $("body").on("click", ".edit-btn", function () {
    let tknv = $(this).data("tknv");
    $(this).closest(".popover").popover("hide");
    editNhanVien(tknv);
  });

  $("body").on("click", ".delete-btn", function () {
    let tknv = $(this).data("tknv");
    $(this).closest(".popover").popover("hide");
    deleteNhanVien(tknv);
  });
}

//function Clear input
function clearInput(idForm) {
  document.getElementById(idForm).reset();
}

//get Data form LocalStorge
function getData(key) {
  const data = JSON.parse(localStorage.getItem(key));
  return data ? data : null;
}

//save Data to LocalStorge
function saveData(key, value) {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
}

//get value form
function getValueForm() {
  let arrField = document.querySelectorAll(
    "#formNhanVien input,#formNhanVien select"
  );
  let nhanVien = new NhanVien();
  let flag = true;
  for (let field of arrField) {
    let { value, id } = field;
    if (field.tagName === "SELECT" && id === "chucvu") {
      let selectedText = field.options[field.selectedIndex].text;
      nhanVien[id] = selectedText;
    } else {
      nhanVien[id] = value;
    }
    let theThongBao =
      field.parentElement.parentElement.querySelector("span.sp-thongbao");
    if (!checkEmptyValue(theThongBao, value)) {
      flag = false;
    } else {
      let dataValue = field.getAttribute("data-validation");
      if (
        dataValue == "numberMinMax" &&
        !checkValueNumberMinMax(theThongBao, value, 4, 6)
      ) {
        flag = false;
      } else if (
        dataValue == "containNoNumber" &&
        !checkContainsNoNumbers(theThongBao, value)
      ) {
        flag = false;
      } else if (dataValue == "email" && !checkEmailValue(theThongBao, value)) {
        flag = false;
      } else if (
        dataValue == "passMinMax" &&
        (!checkMinMaxValue(theThongBao, value, 6, 10) ||
          !checkPassword(theThongBao, value))
      ) {
        flag = false;
      } else if (
        dataValue == "numberDuring" &&
        (!checkOnlyNumber(theThongBao, value) ||
          !checkDuring(theThongBao, value, 1e6, 20e6))
      ) {
        flag = false;
      } else if (
        dataValue == "numberDuring80" &&
        (!checkOnlyNumber(theThongBao, value) ||
          !checkDuring(theThongBao, value, 80, 200))
      ) {
        flag = false;
      }
    }
  }

  return flag ? nhanVien : null;
}

//delete item form
function deleteNhanVien(tknv) {
  arrNhanVien.find((item, i) => {
    if (item.tknv == tknv) {
      arrNhanVien.splice(i, 1);
      saveData("arrNhanVien", arrNhanVien);
      renderData(arrNhanVien);
    }
  });
}

//edit item form
function editNhanVien(tknv) {
  $("#myModal").modal("show");
  arrNhanVien.find((item) => {
    if (tknv == item.tknv) {
      const arrField = document.querySelectorAll(
        "#formNhanVien input,#formNhanVien select"
      );
      for (let input of arrField) {
        input.value = item[input.id];
      }
      arrField[0].disabled = true;
    }
  });
}

document.getElementById("btnCapNhat").onclick = () => {
  let nhanVien = getValueForm();
  let index = arrNhanVien.findIndex((item) => item.tknv == nhanVien.tknv);
  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    renderData();
    saveData("arrNhanVien", arrNhanVien);
    document.getElementById("tknv").disabled = false;
    clearInput("formNhanVien");
  }
};

//function onclick close modal
document.getElementById("btnDong").onclick = () => {
  clearInput("formNhanVien");
  document.getElementById("tknv").disabled = false;
};

//tim nhan vien loai
document.getElementById("btnTimNV").onclick = () => {
  const value = removeVietnameseTones(
    document.getElementById("searchName").value.trim()
  ).toLowerCase();
  const arrFind = arrNhanVien;
  const res = arrFind.filter((item) => {
    return removeVietnameseTones(item.xepLoai().toLowerCase().trim()).includes(
      value
    );
  });
  renderData(res);
};
