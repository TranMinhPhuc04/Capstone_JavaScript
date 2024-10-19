export default class PhoneService {
    getPhones = async () => {
        try {
            const res = await axios.get('https://67054cf1031fd46a830f7334.mockapi.io/Products');
            return res.data;
        } catch (err) {
            console.log("Error fetching phones:", err);
        }
    };

    getPhoneById = async (id) => {
        try {
            const res = await axios.get(`https://67054cf1031fd46a830f7334.mockapi.io/Products/${id}`);
            return res.data;
        } catch (err) {
            console.log("Error fetching phone by id:", err);
        }
    };
}
