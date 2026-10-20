(function () {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tabs [role="tab"]'));
    var names = tabs.map(function (t) { return t.getAttribute('data-tab'); });

    function show(id, focus) {
        if (names.indexOf(id) === -1) id = 'home';
        tabs.forEach(function (t) {
            var on = t.getAttribute('data-tab') === id;
            t.setAttribute('aria-selected', on ? 'true' : 'false');
            t.tabIndex = on ? 0 : -1;
            if (on && focus) t.focus();
        });
        names.forEach(function (n) {
            document.getElementById('panel-' + n).hidden = n !== id;
        });
    }

    function current() { return (location.hash || '#home').slice(1); }

    window.addEventListener('hashchange', function () {
        show(current());
        var top = document.querySelector('.tabs').offsetTop;
        if (window.scrollY > top) window.scrollTo({ top: top, behavior: 'smooth' });
    });

    document.querySelector('.tabs').addEventListener('keydown', function (e) {
        var i = tabs.indexOf(document.activeElement);
        if (i === -1) return;
        var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null;
        if (n === null) return;
        e.preventDefault();
        n = (n + tabs.length) % tabs.length;
        location.hash = tabs[n].getAttribute('data-tab');
        tabs[n].focus();
    });

    show(current());
})();
