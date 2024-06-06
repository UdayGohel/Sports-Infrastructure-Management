import { ip } from "../../../Config/ip";

export const FacilityService = {
  getData(id) {
    return fetch(`${ip}/getSportsComplexwithsport?manager=${id}`)
      .then((res) => res.json())
      .then((res) => {
        return res.data[0].sports;
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
