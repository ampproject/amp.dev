import $ from 'jquery';
import packages from '../utils/packages';

// Themes Switcher Warning
$(document).on('mousedown', '[data-remodal-target="theme-switch-warn"]', (event) => {
    let name = $(event.target).closest('[data-gpm-theme]').find('.gpm-name a:first').text();
    let remodal = $('.remodal.theme-switcher');

    remodal.find('strong').text(name);
    remodal.find('.button.continue').attr('href', $(event.target).attr('href'));
});

// Removing theme
$(document).on('click', '[data-theme-action="remove-package"]', (event) => {
    packages.handleRemovingPackage('theme', event);
});

// Reinstall theme
$(document).on('click', '[data-theme-action="reinstall-package"]', (event) => {
    packages.handleReinstallPackage('theme', event);
});

$(document).on('click', '[data-theme-action="remove-dependency-package"]', (event) => {
    packages.handleRemovingDependency('theme', event);
});

// Opened the add new theme / update theme modal
$(document).on('click', '[data-theme-action="start-package-installation"]', (event) => {
    packages.handleGettingPackageDependencies('theme', event, 'install');
});

// Trigger the update all themes modal
$(document).on('click', '[data-theme-action="start-packages-update"]', (event) => {
    packages.handleGettingPackageDependencies('theme', event);
});

// Install a theme dependencies and the theme
$(document).on('click', '[data-theme-action="install-dependencies-and-package"]', (event) => {
    packages.handleInstallingDependenciesAndPackage('theme', event);
});

// Install a theme
$(document).on('click', '[data-theme-action="install-package"]', (event) => {
    packages.handleInstallingPackage('theme', event);
});

