import { ip } from "../../../Config/ip";

export const AdminComplaintService = {
  getData(id, fromdate, todate) {
    return fetch(
      `${ip}/getComplaintsAdmin?status=${id}&from=${fromdate}&to=${todate}`
    )
      .then((res) => res.json())
      .then((res) => {
        return res.data;
      });
  },

  getCustomersSmall(id) {
    return Promise.resolve(this.getData(id).slice(0, 10));
  },

  getCustomersMedium(id) {
    return Promise.resolve(this.getData(id).slice(0, 50));
  },

  getCustomersLarge(id) {
    return Promise.resolve(this.getData(id).slice(0, 200));
  },

  getCustomersXLarge(id, fromdate, todate) {
    return Promise.resolve(this.getData(id, fromdate, todate));
  },
};
