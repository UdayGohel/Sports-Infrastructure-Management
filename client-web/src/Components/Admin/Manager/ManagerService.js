export const ManagerService = {
  getData() {
    return fetch(`${ip}/getuserwithsportscomplex?Role=3`)
      .then((res) => res.json())
      .then((res) => {
        return res.data;
      });
  },

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  },

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  },

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  },

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  },

  getCustomers(params) {
    const queryParams = params
      ? Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&")
      : "";

    return fetch(`${ip}/getuser?Role=4` + queryParams).then((res) =>
      res.json()
    );
  },
};
