(() => {

  window._app = {
    init: () => {
      console.log(
        __.select('.wrapper')
      );
      console.log(
        __.select('.wrapper', true)
      );
    }
  };

  _app.init();

})();
