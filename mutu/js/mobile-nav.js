document.addEventListener('DOMContentLoaded', () => {
    const navs = document.querySelectorAll('.site-nav');

    navs.forEach((nav) => {
        const toggleButton = nav.querySelector('.nav-mobile-btn');
        const mobileMenu = nav.querySelector('[data-mobile-menu]');

        if (!toggleButton || !mobileMenu) {
            return;
        }

        const closeMenu = () => {
            mobileMenu.classList.add('hidden');
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.setAttribute('aria-label', 'Open menu');
        };

        const openMenu = () => {
            mobileMenu.classList.remove('hidden');
            toggleButton.setAttribute('aria-expanded', 'true');
            toggleButton.setAttribute('aria-label', 'Close menu');
        };

        closeMenu();

        toggleButton.addEventListener('click', () => {
            if (mobileMenu.classList.contains('hidden')) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                closeMenu();
            }
        });
    });
});
