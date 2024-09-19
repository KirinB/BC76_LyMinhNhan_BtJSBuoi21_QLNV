//Định nghĩa class object
class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";
  tongLuong = function () {
    let result;
    switch (this.chucvu) {
      case "Sếp":
        result = this.luongCB * 3;
        break;
      case "Trưởng phòng":
        result = this.luongCB * 2;
        break;
      case "Nhân viên":
        result = this.luongCB * 1;
        break;
      default:
        break;
    }
    return result;
  };
  xepLoai = function () {
    let result;
    this.gioLam * 1;
    if (this.gioLam < 160) {
      return (result = "Nhân viên trung bình");
    } else if (this.gioLam < 176) {
      return (result = "Nhân viên khá");
    } else if (this.gioLam < 192) {
      return (result = "Nhân viên giỏi");
    } else if (this.gioLam >= 192) {
      return (result = "Nhân viên xuất sắc");
    }
  };
}
