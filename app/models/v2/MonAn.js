export class MonAn {
    constructor() {
      // foodID, tenMon, loai, giaMon, khuyenMai, tinhTrang, hinhMon, moTa
      this.foodID = '';
      this.tenMon = '';
      this.loai = '';
      this.giaMon = '';
      this.khuyenMai = '';
      this.tinhTrang = '';
      this.hinhMon = '';
      this.moTa = '';
  
      // phương thức
      this.tinhGiaKhuyenMai = () => {
        // gia 50000, KM 20%
        // 50000 100 %
        // ?       20%
        console.log(this);
        let giaKhuyenMai = (this.khuyenMai * this.giaMon) / 100;
        return giaKhuyenMai;
      };
    }
  }
  