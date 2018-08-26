import $ from 'jquery';
import { config, translations } from 'grav-config';
import request from '../utils/request';
import { Instance as gpm } from '../utils/gpm';
import { Promise } from 'es6-promise';

class Sorter {
    getElements(elements, container) {
        this.elements = elements || $('[data-gpm-plugin], [data-gpm-theme]');
        this.container = container || $('.gpm-plugins > table > tbody, .gpm-themes > .themes.card-row');
        return this.elements;
    }

    static sort(A, B, direction = 'asc') {
        if (A > B) { return (direction === 'asc') ? 1 : -1; }
        if (A < B) { return (direction === 'asc') ? -1 : 1; }

        return 0;
    }

    byCommon(direction = 'asc', data = '') {
        let elements = this.getElements().sort((a, b) => {
            let A = $(a).data(data).toString().toLowerCase();
            let B = $(b).data(data).toString().toLowerCase();

            return Sorter.sort(A, B, direction);
        });

        return elements.appendTo(this.container);
    }

    byName(direction = 'asc', data = 'gpm-name') {
        return this.byCommon(direction, data);
    }

    byAuthor(direction = 'asc', data = 'gpm-author') {
        return this.byCommon(direction, data);
    }

    byOfficial(direction = 'asc', data = 'gpm-official') {
        return this.byCommon(direction, data);
    }

    byReleaseDate(direction = 'asc', data = 'gpm-release-date') {
        let elements = this.getElements().sort((a, b) => {
            let A = new Date($(a).data(data)).getTime();
            let B = new Date($(b).data(data)).getTime();

            return Sorter.sort(A, B, direction === 'asc' ? 'desc' : 'asc');
        });

        elements.appendTo(this.container);
    }

    byUpdatable(direction = 'asc', data = 'gpm-updatable') {
        return this.byCommon(direction, data);
    }

    byEnabled(direction = 'asc', data = 'gpm-enabled') {
        return this.byCommon(direction, data);
    }

    byTesting(direction = 'asc', data = 'gpm-testing') {
        return this.byCommon(direction, data);
    }
}

class Packages {
    constructor() {
        this.Sort = new Sorter();
    }

    static getBackToList(type) {
        global.location.href = `${config.base_url_relative}/${type}s`;
    }

    static addDependencyToList(type, dependency, slug = '') {
        if (['admin', 'form', 'login', 'email', 'grav'].indexOf(dependency) !== -1) { return; }
        let container = $('.package-dependencies-container');
        let text = `${dependency} <a href="#" class="button" data-dependency-slug="${dependency}" data-${type}-action="remove-dependency-package">Remove</a>`;

        if (slug) {
            text += ` (was needed by ${slug})`;
        }

        container.append(`<li>${text}</li>`);
    }

    addDependenciesToList(dependencies, slug = '') {
        dependencies.forEach((dependency) => {
            Packages.addDependencyToList('plugin', dependency.name || dependency, slug);
        });
    }

    static getTaskUrl(type, task) {
        let url = `${config.base_url_relative}`;
        url += `/${type}s.json`;
        url += `/task${config.param_sep}${task}`;
        return url;
    }

    static getRemovePackageUrl(type) {
        return `${Packages.getTaskUrl(type, 'removePackage')}`;
    }

    static getReinstallPackageUrl(type) {
        return `${Packages.getTaskUrl(type, 'reinstallPackage')}`;
    }

    static getGetPackagesDependenciesUrl(type) {
        return `${Packages.getTaskUrl(type, 'getPackagesDependencies')}`;
    }

    static getInstallDependenciesOfPackagesUrl(type) {
        return `${Packages.getTaskUrl(type, 'installDependenciesOfPackages')}`;
    }

    static getInstallPackageUrl(type) {
        return `${Packages.getTaskUrl(type, 'installPackage')}`;
    }

    removePackage(type, slug) {
        let url = Packages.getRemovePackageUrl(type);

        request(url, {
            method: 'post',
            body: {
                package: slug
            }
        }, (response) => {
            if (response.status === 'success') {
                $('.remove-package-confirm').addClass('hidden');

                if (response.dependencies && response.dependencies.length > 0) {
                    this.addDependenciesToList(response.dependencies);
                    $('.remove-package-dependencies').removeClass('hidden');
                } else {
                    $('.remove-package-done').removeClass('hidden');
                }

                // The package was removed. When the modal closes, move to the packages list
                $(document).on('closing', '[data-remodal-id="remove-package"]', () => {
                    Packages.getBackToList(type);
                });
            } else {
                $('.remove-package-confirm').addClass('hidden');
                $('.remove-package-error').removeClass('hidden');
            }
        });
    }

    reinstallPackage(type, slug, package_name, current_version) {
        $('.button-bar button').addClass('hidden');
        $('.button-bar .spinning-wheel').removeClass('hidden');

        let url = Packages.getReinstallPackageUrl(type);

        request(url, {
            method: 'post',
            body: {
                slug: slug,
                type: type,
                package_name: package_name,
                current_version: current_version
            }
        }, (response) => {
            if (response.status === 'success') {
                $('.reinstall-package-confirm').addClass('hidden');
                $('.reinstall-package-done').removeClass('hidden');
            } else {
                $('.reinstall-package-confirm').addClass('hidden');
                $('.reinstall-package-error').removeClass('hidden');
            }

            window.location.reload();
        });
    }

    removeDependency(type, slug, button) {
        let url = Packages.getRemovePackageUrl(type);

        request(url, {
            method: 'post',
            body: {
                package: slug
            }
        }, (response) => {
            if (response.status === 'success') {
                button.removeClass('button');
                button.replaceWith($('<span>Removed successfully</span>'));

                if (response.dependencies && response.dependencies.length > 0) {
                    this.addDependenciesToList(response.dependencies, slug);
                }
            }
        });
    }

    static addNeededDependencyToList(action, slug) {
        $('.install-dependencies-package-container .type-' + action).removeClass('hidden');
        let list = $('.install-dependencies-package-container .type-' + action + ' ul');

        if (action !== 'install') {
            let current_version = '';
            let available_version = '';
            let name = '';

            let resources = gpm.payload.payload.resources;

            if (resources.plugins[slug]) {
                available_version = resources.plugins[slug].available;
                current_version = resources.plugins[slug].version;
                name = resources.plugins[slug].name;
            } else if (resources.themes[slug]) {
                available_version = resources.themes[slug].available;
                current_version = resources.themes[slug].version;
                name = resources.themes[slug].name;
            }

            list.append(`<li>${name ? name : slug}, ${translations.PLUGIN_ADMIN.FROM} v<strong>${current_version}</strong> ${translations.PLUGIN_ADMIN.TO} v<strong>${available_version}</strong></li>`);
        } else {
            list.append(`<li>${name ? name : slug}</li>`);
        }
    }

    getPackagesDependencies(type, slugs, finishedLoadingCallback) {
        let url = Packages.getGetPackagesDependenciesUrl(type);

        request(url, {
            method: 'post',
            body: {
                packages: slugs
            }
        }, (response) => {

            finishedLoadingCallback();

            if (response.status === 'success') {
                if (response.dependencies) {
                    let hasDependencies = false;
                    for (var dependency in response.dependencies) {
                        if (response.dependencies.hasOwnProperty(dependency)) {
                            if (dependency === 'grav') {
                                continue;
                            }
                            hasDependencies = true;
                            let dependencyName = dependency;
                            let action = response.dependencies[dependency];

                            Packages.addNeededDependencyToList(action, dependencyName);
                        }
                    }

                    if (hasDependencies) {
                        $('[data-packages-modal] .install-dependencies-package-container').removeClass('hidden');
                    } else {
                        $('[data-packages-modal] .install-package-container').removeClass('hidden');
                    }
                } else {
                    $('[data-packages-modal] .install-package-container').removeClass('hidden');
                }
            } else {
                $('[data-packages-modal] .install-package-error').removeClass('hidden');
            }
        });
    }

    installDependenciesOfPackages(type, slugs, callbackSuccess, callbackError) {
        let url = Packages.getInstallDependenciesOfPackagesUrl(type);

        request(url, {
            method: 'post',
            body: {
                packages: slugs
            }
        }, callbackSuccess);
    }

    installPackages(type, slugs, callbackSuccess) {
        let url = Packages.getInstallPackageUrl(type);

        Promise.all(slugs.map((slug) => {
            return request(url, {
                method: 'post',
                body: {
                    package: slug,
                    type: type
                }
            });
        })).then(callbackSuccess);

    }

    static getSlugsFromEvent(event) {
        let slugs = '';
        if ($(event.target).is('[data-packages-slugs]')) {
            slugs = $(event.target).attr('data-packages-slugs');
        } else {
            slugs = $(event.target).parent('[data-packages-slugs]').attr('data-packages-slugs');
        }

        if (typeof slugs === 'undefined') {
            return null;
        }

        slugs = slugs.split(',');
        return typeof slugs === 'string' ? [slugs] : slugs;
    }

    handleGettingPackageDependencies(type, event, action = 'update') {
        let slugs = Packages.getSlugsFromEvent(event);

        if (!slugs) {
            alert('No slug set');
            return;
        }

        // Cleanup
        $('.packages-names-list').html('');
        $('.install-dependencies-package-container li').remove();

        slugs.forEach((slug) => {
            if (action === 'update') {
                let current_version = '';
                let available_version = '';
                let name = '';

                let resources = gpm.payload.payload.resources;

                if (resources.plugins[slug]) {
                    available_version = resources.plugins[slug].available;
                    current_version = resources.plugins[slug].version;
                    name = resources.plugins[slug].name;
                } else if (resources.themes[slug]) {
                    available_version = resources.themes[slug].available;
                    current_version = resources.themes[slug].version;
                    name = resources.themes[slug].name;
                }

                $('.packages-names-list').append(`<li>${name ? name : slug}, ${translations.PLUGIN_ADMIN.FROM} v<strong>${current_version}</strong> ${translations.PLUGIN_ADMIN.TO} v<strong>${available_version}</strong></li>`);
            } else {
                $('.packages-names-list').append(`<li>${name ? name : slug}</li>`);
            }
        });

        event.preventDefault();
        event.stopPropagation();

        // Restore original state
        $('[data-packages-modal] .loading').removeClass('hidden');
        $('[data-packages-modal] .install-dependencies-package-container').addClass('hidden');
        $('[data-packages-modal] .install-package-container').addClass('hidden');
        $('[data-packages-modal] .installing-dependencies').addClass('hidden');
        $('[data-packages-modal] .installing-package').addClass('hidden');
        $('[data-packages-modal] .installation-complete').addClass('hidden');
        $('[data-packages-modal] .install-package-error').addClass('hidden');

        this.getPackagesDependencies(type, slugs, () => {
            let slugs_string = slugs.join();
            $(`[data-packages-modal] [data-${type}-action="install-dependencies-and-package"]`).attr('data-packages-slugs', slugs_string);
            $(`[data-packages-modal] [data-${type}-action="install-package"]`).attr('data-packages-slugs', slugs_string);
            $('[data-packages-modal] .loading').addClass('hidden');
        });
    }

    handleInstallingDependenciesAndPackage(type, event) {
        let slugs = Packages.getSlugsFromEvent(event);
        event.preventDefault();
        event.stopPropagation();

        $('[data-packages-modal] .install-dependencies-package-container').addClass('hidden');
        $('[data-packages-modal] .installing-dependencies').removeClass('hidden');

        this.installDependenciesOfPackages(type, slugs, (response) => {
            $('[data-packages-modal] .installing-dependencies').addClass('hidden');
            $('[data-packages-modal] .installing-package').removeClass('hidden');
            this.installPackages(type, slugs, () => {
                $('[data-packages-modal] .installing-package').addClass('hidden');
                $('[data-packages-modal] .installation-complete').removeClass('hidden');

                if (response.status === 'error') {
                    let remodal = $.remodal.lookup[$('[data-packages-modal]').data('remodal')];
                    remodal.close();

                    return;
                }

                setTimeout(() => {
                    if (slugs.length === 1) {
                        global.location.href = `${config.base_url_relative}/${type}s/${slugs[0]}`;
                    } else {
                        global.location.href = `${config.base_url_relative}/${type}s`;
                    }
                }, 1000);

            });
        });
    }

    handleInstallingPackage(type, event) {
        let slugs = Packages.getSlugsFromEvent(event);
        event.preventDefault();
        event.stopPropagation();

        $('[data-packages-modal] .install-package-container').addClass('hidden');
        $('[data-packages-modal] .installing-package').removeClass('hidden');

        this.installPackages(type, slugs, (response) => {
            $('[data-packages-modal] .installing-package').addClass('hidden');
            $('[data-packages-modal] .installation-complete').removeClass('hidden');

            if (response.status === 'error') {
                let remodal = $.remodal.lookup[$('[data-packages-modal]').data('remodal')];
                remodal.close();

                return;
            }

            if (slugs.length === 1) {
                global.location.href = `${config.base_url_relative}/${type}s/${slugs[0]}`;
            } else {
                global.location.href = `${config.base_url_relative}/${type}s`;
            }
        });
    }

    handleRemovingPackage(type, event) {
        let slug = $(event.target).attr('data-packages-slugs');
        event.preventDefault();
        event.stopPropagation();

        this.removePackage(type, slug);
    }

    handleReinstallPackage(type, event) {
        let target = $(event.target);
        let slug = target.attr('data-package-slug');
        let package_name = target.attr('data-package-name');
        let current_version = target.attr('data-package-current-version');

        event.preventDefault();
        event.stopPropagation();

        this.reinstallPackage(type, slug, package_name, current_version);
    }

    handleRemovingDependency(type, event) {
        let slug = $(event.target).attr('data-dependency-slug');
        let button = $(event.target);
        event.preventDefault();
        event.stopPropagation();

        this.removeDependency(type, slug, button);
    }

}

export default new Packages();
