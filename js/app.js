(() => {

  window._app = {
    init: () => {
      console.log(__.select('.wrapper'));
      console.log(__.select('.wrapper', true));
      __.EVENTS.enableDelegationEvents('fnclick', 'fnenter', _app.handlers);
    },
    handlers: {
      test: e => {
        console.log('test');
      },
      otherTest: e => {
        console.log('other test');
      }
    }
  };

  _app.init();

})();
