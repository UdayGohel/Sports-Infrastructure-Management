import { ip } from "../../Config/ip";

export const SlotServices = {
  getData(id) {
    return fetch(`${ip}/getGuest`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return res;
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
