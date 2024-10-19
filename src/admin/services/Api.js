class Api {
    constructor() {
        this.apiEndpoint = "https://67054cf1031fd46a830f7334.mockapi.io/Products";
    }

    // Lấy danh sách điện thoại
    getListPhone() {
        return axios.get(this.apiEndpoint);
    }

    // Thêm điện thoại mới
    addPhone(phone) {
        return axios.post(this.apiEndpoint, phone);
    }

    // Cập nhật điện thoại
    updatePhone(phone) {
        return axios.put(`${this.apiEndpoint}/${phone.id}`, phone);
    }

    // Xóa điện thoại
    deletePhone(id) {
        return axios.delete(`${this.apiEndpoint}/${id}`);
    }

    // Lấy điện thoại theo ID
    getPhoneById(id) {
        return axios.get(`${this.apiEndpoint}/${id}`);
    }
}

export default Api;
