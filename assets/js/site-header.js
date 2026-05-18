(() => {
    const siteHeaderConfig = {
        name: 'Kaiyan Zheng',
        title: 'Incoming PhD Student | Northwestern University',
        profileImage: 'assets/personal_website.png',
        profileAlt: 'Kaiyan Zheng',
        languageSwitch: {
            current: 'EN',
            alternateLabel: '中',
            alternateHref: 'index-zh.html',
            ariaLabel: 'Language switch'
        },
        socialLinks: [
            {
                href: 'mailto:kaiyanz@umich.edu',
                label: 'Email Kaiyan Zheng',
                title: 'Email',
                iconClass: 'fas fa-envelope'
            },
            {
                href: 'https://www.linkedin.com/in/kaiyanzheng',
                label: 'LinkedIn profile',
                title: 'LinkedIn',
                iconClass: 'fab fa-linkedin',
                external: true
            },
            {
                href: 'https://github.com/KatherynZheng',
                label: 'GitHub profile',
                title: 'GitHub',
                iconClass: 'fab fa-github',
                external: true
            },
            {
                href: 'https://scholar.google.com/scholar?q=%22Kaiyan+Zheng%22+%22Federated+Unlearning%22',
                label: 'Google Scholar',
                title: 'Google Scholar',
                iconClass: 'fas fa-graduation-cap',
                external: true
            },
            {
                href: 'assets/Resume_Kaiyan_Zheng.pdf',
                label: 'English resume',
                title: 'English Resume',
                iconClass: 'fas fa-file-pdf',
                external: true
            }
        ],
        navItems: [
            { href: 'index.html', label: 'About Me' },
            { href: 'research.html', label: 'Research' },
            { href: 'academics.html', label: 'Academics' }
        ]
    };

    function getCurrentPage() {
        return window.location.pathname.split('/').pop() || 'index.html';
    }

    function renderSocialLink(link) {
        const externalAttrs = link.external ? ' target="_blank" rel="noopener"' : '';

        return `
            <a href="${link.href}" aria-label="${link.label}" title="${link.title}"${externalAttrs}>
                <i class="${link.iconClass}"></i>
            </a>
        `;
    }

    function renderNavItem(item, currentPage) {
        const currentAttr = item.href === currentPage ? ' aria-current="page"' : '';

        return `<li><a href="${item.href}"${currentAttr}>${item.label}</a></li>`;
    }

    function renderSiteHeader() {
        const mount = document.querySelector('[data-site-header]');

        if (!mount) {
            return;
        }

        const currentPage = getCurrentPage();
        const { languageSwitch } = siteHeaderConfig;

        mount.outerHTML = `
            <div class="language-switch" aria-label="${languageSwitch.ariaLabel}">
                <span class="active">${languageSwitch.current}</span>
                <a href="${languageSwitch.alternateHref}">${languageSwitch.alternateLabel}</a>
            </div>

            <header>
                <div class="profile-container">
                    <img src="${siteHeaderConfig.profileImage}" alt="${siteHeaderConfig.profileAlt}" class="profile-img">
                    <h1 class="name">${siteHeaderConfig.name}</h1>
                    <p class="title">${siteHeaderConfig.title}</p>
                    <div class="social-links">
                        ${siteHeaderConfig.socialLinks.map(renderSocialLink).join('')}
                    </div>
                </div>
            </header>

            <nav>
                <ul>
                    ${siteHeaderConfig.navItems.map((item) => renderNavItem(item, currentPage)).join('')}
                </ul>
            </nav>
        `;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderSiteHeader);
    } else {
        renderSiteHeader();
    }
})();
