;(function () {
    var navbar = document.querySelector('.navbar')

    function isNavCollapsed() {
        return !!navbar && navbar.classList.contains('nav-collapsed')
    }

    function setExpanded(el, expanded) {
        el.setAttribute('aria-expanded', expanded ? 'true' : 'false')
    }

    function initThemeToggle() {
        var checkbox = document.getElementById('themeToggle')
        if (!checkbox) return

        var root = document.documentElement
        var systemDark = window.matchMedia('(prefers-color-scheme: dark)')

        function currentTheme() {
            return (
                root.getAttribute('data-theme') ||
                (systemDark.matches ? 'dark' : 'light')
            )
        }

        checkbox.checked = currentTheme() === 'dark'

        checkbox.addEventListener('change', function () {
            var next = checkbox.checked ? 'dark' : 'light'
            root.setAttribute('data-theme', next)
            try {
                localStorage.setItem('miatsuco-theme', next)
            } catch (e) {}
        })
    }

    function initNavCollapse() {
        var navLinks = document.getElementById('navLinks')
        var logo = document.querySelector('.logo')
        var navActions = document.querySelector('.navbar-actions')
        if (!navbar || !navLinks || !logo || !navActions) return

        var measureWrap = document.createElement('div')
        measureWrap.className = 'nav-links-measure-wrap'
        var measure = navLinks.cloneNode(true)
        measure.removeAttribute('id')
        measure.setAttribute('aria-hidden', 'true')
        measure.className = 'nav-links-measure'
        measureWrap.appendChild(measure)
        document.body.appendChild(measureWrap)

        function update() {
            var styles = getComputedStyle(navbar)
            var gap = parseFloat(styles.columnGap || styles.gap) || 0
            var available =
                navbar.getBoundingClientRect().width -
                logo.getBoundingClientRect().width -
                navActions.getBoundingClientRect().width -
                gap * 2
            var shouldCollapse = measure.scrollWidth > available
            if (shouldCollapse === isNavCollapsed()) return
            navbar.classList.toggle('nav-collapsed', shouldCollapse)
            document.dispatchEvent(new Event('navcollapsechange'))
        }

        update()
        window.addEventListener('resize', update)
    }

    function initHamburgerNav() {
        var toggle = document.getElementById('navToggle')
        var nav = document.getElementById('navLinks')
        if (!toggle || !nav) return

        function setOpen(open) {
            setExpanded(toggle, open)
            nav.classList.toggle('is-open', open)
            if (!open) {
                nav.querySelectorAll('.dropdown.is-open').forEach(
                    function (group) {
                        group.classList.remove('is-open')
                        var groupToggle =
                            group.querySelector('.dropdown-toggle')
                        if (groupToggle) setExpanded(groupToggle, false)
                    }
                )
            }
        }

        toggle.addEventListener('click', function () {
            setOpen(toggle.getAttribute('aria-expanded') !== 'true')
        })

        nav.addEventListener('click', function (event) {
            if (event.target.tagName === 'A') setOpen(false)
        })

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') setOpen(false)
        })

        document.addEventListener('navcollapsechange', function () {
            if (!isNavCollapsed()) setOpen(false)
        })
    }

    function initDropdowns() {
        document.querySelectorAll('.dropdown').forEach(function (group) {
            var toggle = group.querySelector('.dropdown-toggle')

            function sync() {
                var open = isNavCollapsed()
                    ? group.classList.contains('is-open')
                    : group.classList.contains('is-open') ||
                      group.matches(':hover') ||
                      group.contains(document.activeElement)
                setExpanded(toggle, open)
            }

            group.addEventListener('mouseenter', sync)
            group.addEventListener('mouseleave', sync)
            group.addEventListener('focusin', sync)
            group.addEventListener('focusout', sync)

            toggle.addEventListener('click', function () {
                if (isNavCollapsed()) {
                    group.classList.toggle('is-open')
                    sync()
                } else {
                    toggle.blur()
                    sync()
                }
            })

            group.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    group.classList.remove('is-open')
                    toggle.blur()
                    sync()
                }
            })

            document.addEventListener('navcollapsechange', sync)
        })
    }

    initThemeToggle()
    initNavCollapse()
    initHamburgerNav()
    initDropdowns()
})()
