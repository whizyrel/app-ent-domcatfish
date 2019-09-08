{
  const dataController = (async () => {
    const url = `http://localhost:8006/products/list`;
    let productList;
    const getProducts = (async () => {
      // await
      await fetch(url)
          .then((res) => res.json())
          .then(async (data) => {
            productList = await data;
            return productList;
          })
          .catch((err) => console.log({err}));
      return productList;
    })();

    return {
      getProducts: getProducts,
    };
  })();
  const uiController = (() => {})();

  const appController = ((dtCtrl, uiCtrl) => {
    console.log(dtCtrl.getProducts);
    return {
      init: () => {
        // alert('hello');
        console.log('getProducts', dtCtrl.getProducts);
      },
    };
  })(dataController, uiController);

  window.onpageshow = () => {
    appController.init();
  };
}
