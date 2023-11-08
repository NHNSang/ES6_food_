// import lớp đối tượng
import { MonAn } from '../../models/v2/MonAn.js';
import { Menu } from './../../models/v2/Menu.js';

// ẩn nút button cập nhật đi khi người dùng đang thêm
const layoutThemMon = () => {
  // cho nút button thêm được xuất hiện và ẩn nút cập nhật đi
  document.getElementById('btnThemMon').style.display = 'block';
  document.getElementById('btnCapNhat').style.display = 'none';
  // clear hết dữ liệu form
  document.getElementById('foodForm').reset();
  // tắt thuộc tính readOnly cho input mã món
  document.getElementById('foodID').readOnly = false;
};

document.getElementById('btnThem').onclick = layoutThemMon;

// khởi tạo một đối tượng đại diện cho menu
const menu = new Menu();

// ------------- lấy dữ liệu món ăn từ form ----------
const layDuLieuMonAn = () => {
  // lấy dữ liệu từ người dùng
  const arrField = document.querySelectorAll(
    '#foodForm input, #foodForm select, #foodForm textarea'
  );
  const monAn = new MonAn();
  // dùng vòng lặp để duyệt mảng
  for (let field of arrField) {
    // field là dom của các input select và textarea
    // let id = field.id;
    // let value = field.value;
    let { id, value } = field; // id=foodID, monAn["foodID"] = value
    monAn[id] = value;
  }
  return monAn;
};

// --------------- tắt modal và clear dữ liệu trong form
const tatModalVaClearDuLieu = () => {
  // tắt modal
  $('#exampleModal').modal('hide');
  document.getElementById('foodForm').reset();
};

// -------------Thêm món ăn vào danh sách---------------
const themMonAn = () => {
  // console.log(arrField);
  const monAn = layDuLieuMonAn();
  console.log(monAn);
  // thêm món ăn vào menu
  menu.themMonAn(monAn);
  hienThiMonAn();
  luuLocalStorage();
  tatModalVaClearDuLieu();
  console.log(menu.arrMonAn);
};

// chạy hàm khi người dùng click nút thêm
document.getElementById('btnThemMon').onclick = themMonAn;

// ------------ Hiển thị các món ăn trong mảng lên giao diện ----------------
// tạo một hàm giúp hiển thị dữ liệu từ mảng món ăn, hàm sẽ nhận vào tham số chính là mảng cần chạy ==> hienThiMonAn
// chạy một vòng lặp dựa trên mảng được cung cấp, tạo ra các cấu trúc chuỗi html và thêm các dữ liệu vào
// dom tới table và truyền chuỗi các html vừa được chạy vòng lặp ra giao diện
const hienThiMonAn = (arr = menu.arrMonAn) => {
  // if (!arr) {
  //   arr = menu.arrMonAn;
  // }
  let content = '';
  for (let monAn of arr) {
    // monAn = {
    //   foodID = "123"
    // }
    let monAnMoi = new MonAn();
    Object.assign(monAnMoi, monAn);
    // monAnMoi = {
    //   foodID : "123"
    // }
    // monAn = {
    //   foodID : "123"
    // }
    // monAnMoi = { ...monAnMoi, ...monAn };
    console.log(monAnMoi);
    const {
      foodID,
      tenMon,
      loai,
      giaMon,
      khuyenMai,
      tinhTrang,
      tinhGiaKhuyenMai,
    } = monAnMoi;

    content += `
    <tr>
      <td>${foodID}</td>
      <td>${tenMon}</td>
      <td>${loai == 'loai1' ? 'Chay' : 'Mặn'}</td>
      <td>${giaMon}</td>
      <td>${khuyenMai}</td>
      <td>${tinhGiaKhuyenMai()}</td>
      <td>${tinhTrang == 0 ? 'Hết' : 'Còn'}</td>
      <td>
        <button onclick="xoaMonAn('${foodID}')" class="btn btn-danger">Xoá</button>
        <button onclick="layThongTinMonAn('${foodID}')" class="btn btn-dark">Sửa</button>
      </td>
    </tr>
    `;
  }
  // dom tới body table và hiển thị lên
  document.getElementById('tbodyFood').innerHTML = content;
};
// hienThiMonAn();

// ----------- Lưu trữ mảng xuống localStorage ---------------
// tạo một hàm giúp lưu trữ dữ liệu xuống local ==> luuLocalStorage
// chuyển đổi dữ liệu object và array thành chuỗi json thông qua JSON.stringtify
// gọi tới phương thức localstorage.setItem(key,data)
const luuLocalStorage = (arr = menu.arrMonAn, key = 'arrMonAn') => {
  let jsonArr = JSON.stringify(arr);
  localStorage.setItem(key, jsonArr);
};

// ----------- Lấy dữ liệu từ localStorage --------------------
// viết một hàm để xử lí lấy dữ liệu từ localStorage
// gọi tới localStorage và sử dụng phương thức getItem
// nếu như có dữ liệu, thì sẽ sử dụng JSON.parse() để chuyển đổi từ chuỗi json thành object hoặc array
// gán dữ liệu đã lấy được từ localStorage vào mảng arrMonAn
const layDuLieuLocalStorage = (key) => {
  // "[1,23]"
  let dataLocal = JSON.parse(localStorage.getItem(key));
  // return dataLocal;
  console.log(dataLocal);
  if (dataLocal) {
    menu.arrMonAn = dataLocal;
    hienThiMonAn();
  }
};
layDuLieuLocalStorage('arrMonAn');

// ------------ xoá một món ăn khỏi mảng -------------------
// viết một hàm dùng để xoá một phần tử khỏi mảng, hàm này sẽ nhận vào id của món ăn cần xoá, hàm sẽ chạy khi người dùng click nút xoá nên sẽ gọi sự kiện onclick của nút xoá
// gọi tới đối tượng menu và sử dụng phương thức xoaMonAn để xoá một món ăn khỏi mảng
// Hiển thị lên giao diện dữ liệu mới
// gọi hàm luuLocalStorage để lưu mảng mới xuống localStorage
const xoaMonAn = (id) => {
  //
  console.log(id);
  menu.xoaMonAn(id);
  hienThiMonAn();
  luuLocalStorage();
};

// gọi tới window để tạo ra một phương thức xoaMonAn
window.xoaMonAn = xoaMonAn;

// ------------ Cập nhật dữ liệu cho món ăn ---------------
// Tạo một hàm giúp người dùng khi click vào sẽ lấy ra được thông tin món ăn cần chỉnh sửa và đưa vào các input, hàm sẽ chạy khi người dùng click vào nút sửa, mở modal lên để người dùng có thể thấy dữ liệu cần chỉnh sửa
// khi người dùng chỉnh sửa xong và bấm vào nút cập nhật, lấy dữ liệu từ các input để lấy dữ liệu đã được chỉnh sửa, tìm tới phần tử người dùng muốn cập nhật và update lại dữ liệu
// lưu ý khi cho người dùng chỉnh sửa, nhớ disable input foodID để người dùng không chỉnh sửa được
// chạy hàm hienThiMonAn để có thể lấy mảng mới đưa lên giao diện cho người dùng
// chạy hàm luuLocalStorage để update lại dữ liệu mới nhất xuống localStorage
const layThongTinMonAn = (id) => {
  // mở nút cập nhật hiển thị lại trên giao diện
  document.getElementById('btnCapNhat').style.display = 'block';
  // ẩn nút button thêm
  document.getElementById('btnThemMon').style.display = 'none';
  const monAn = menu.layThongTinMonAn(id);
  // đưa dữ liệu lên các input của form
  const arrField = document.querySelectorAll(
    '#foodForm input, #foodForm select, #foodForm textarea'
  );
  for (let field of arrField) {
    field.value = monAn[field.id];
    // kiểm tra tới input mã món và thêm readonly để tránh người dùng chỉnh sửa
    if (field.id == 'foodID') {
      field.readOnly = true;
    }
  }
  // document.getElementById('btnThem').click();
  $('#exampleModal').modal('show');
};

window.layThongTinMonAn = layThongTinMonAn;

const capNhatMonAn = () => {
  // lấy dữ liệu mới từ form xuống
  const monAn = layDuLieuMonAn();
  // lấy ra id và tìm kiếm phần tử trong mảng
  // sau khi tìm được id, thay thế phần tử cũ bằng phần tử mới
  menu.capNhatMonAn(monAn);
  // tắt readonly của input
  document.getElementById('foodID').readOnly = false;
  // cập nhật dữ liệu mới lên giao diện
  hienThiMonAn();
  luuLocalStorage();
  tatModalVaClearDuLieu();
};

document.getElementById('btnCapNhat').onclick = capNhatMonAn;

// ------Lọc món ăn theo chay hoặc mặn --------
document.getElementById('selLoai').onchange = function(event){
    const { value } = event.target;
    console.log(value)
    // lọc những phầN từ trong mãng thông qua value
    const arrFilter = menu.arrMonAn.filter((monAn, index) =>{
        // Trả về kết quả khi người dùng chọn value
        return monAn.loai === value;
    })
    // Kiểm tra với trường hợp người dùng chọn tất cả hoặc chọn loai thì sẽ lọc ko chính xác vì vập ta check điều kiện nếu mãng [] thì ta hienThiMonAn ko cần truyền tham số để chạy mãng chính
    if(arrFilter.length >0){
        hienThiMonAn(arrFilter)

    }else{
        hienThiMonAn()
        
    } 
}