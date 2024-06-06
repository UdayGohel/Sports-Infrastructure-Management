import { ip } from "../../../Config/ip";

export const AuthorityComplaintService = {
  getData(id) {
    return fetch(`${ip}/getAuthorityComplaint?DistrictId=${id}`)
      .then((res) => res.json())
      .then((res) => {
        return res.status0;
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

  getCustomersXLarge(id) {
    return Promise.resolve(this.getData(id));
  },
};
