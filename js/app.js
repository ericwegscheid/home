(() => {

  window._app = {
    init: () => {
      __.EVENTS.enableDelegationEvents('fnclick', 'fnenter', _app.handlers);
      window.onhashchange = e => {
        let el = __.query('[href="' + location.hash + '"]');
        if (el) {
          el.click();
        }
      };
      window.onhashchange();
    },
    common: {
      clearSelected: () => {
        let el = __.query('.current');
        if (el) {
          el.classList.remove('current');
        }
      },
      selectItem: el => {
        _app.common.clearSelected();
        el.classList.add('current');
      }
    },
    handlers: {
      select: e => _app.common.selectItem(e.target),
      deselect: e => _app.common.clearSelected(),
      test: e => {
        console.log('other test');
      }
    }
  };

  _app.init();

})();
