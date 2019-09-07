{
  const dataController = (() => {
    return {
      getProducts: getProducts(),
    };
  })();
  const uiController = (() => {})();

  const appController = ((dtCtrl, uiCtrl) => {
    return {
      init: () => {},
    };
  })(dataController, uiController);

  appController.init();
}
