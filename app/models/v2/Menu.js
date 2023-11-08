// danh sách các món được thêm vào, những phương thức giúp xử lí menu
export class Menu {
    arrMonAn = [];
  
    // themMonAn
    themMonAn = (monAn) => {
      this.arrMonAn.push(monAn);
    };
  
    // timViTriMonAnTrongMang
    timViTriMonAnTrongMang = (id) => {
      let index = this.arrMonAn.findIndex((item, index) => {
        return item.foodID == id;
      });
      return index;
    };
  
    // xoaMonAn
    xoaMonAn = (id) => {
      let index = this.timViTriMonAnTrongMang(id);
      if (index != -1) {
        this.arrMonAn.splice(index, 1);
      }
    };
  
    // layThongTinMonAn
    layThongTinMonAn = (id) => {
      // bắt đầu duyệt mảng để tìm kiếm phần tử được người dùng kiếm
      let monAn = this.arrMonAn.find((monAn, index) => {
        return monAn.foodID == id;
      });
      if (monAn) {
        return monAn;
      }
    };
  
    // update món ăn
    capNhatMonAn = (monAn) => {
      const { foodID } = monAn;
      let index = this.timViTriMonAnTrongMang(foodID);
      if (index != -1) {
        this.arrMonAn[index] = monAn;
      }
    };
  }
  