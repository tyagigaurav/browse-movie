(function () {
    'use strict';

    var routeConfig = function ($ocLazyLoadProvider, $stateProvider, $urlServiceProvider, $locationProvider, Roles) {
        $urlServiceProvider.rules.otherwise({
            state: 'app'
        });

        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: true
        // });

        $stateProvider.state('app', {
            url: '/app',
            redirectTo: 'app.start-journey'
        });

        $stateProvider.state('app.start-journey', {
            url: '/apply-for-card?role&voucherCode&promo&sourceCode&thirdParty',
            resolve: {
                load: ['$http', '$rootScope', '$state', '$stateParams', 'CONFIG', 'Roles', 'AuthService', 'appState', 'UtilService', function ($http, $rootScope, $state, $stateParams, CONFIG, Roles, AuthService, appState, UtilService) {
                    UtilService.isDMZServer().then(function (res) {
                        if (res) {
                            var role = $stateParams.role || '';
                            var thirdParty = $stateParams.thirdParty || '';
                            role = role.toUpperCase() === Roles.tpsa ? Roles.tpsa : Roles.customer;
                            var voucherCode = $stateParams.voucherCode;
                            var promo = $stateParams.promo;
                            var sourceCode = $stateParams.sourceCode;
                            var url;

                            $rootScope.$broadcast('clear-app-cache');
                            appState.clearAll();
                            $rootScope.loggedUser = false;
                            appState.setNgStatus('PENDING-WITH-CUSTOMER');

                            if (!$rootScope.integrationsActive) {
                                AuthService.createRole(role);
                                $rootScope.$broadcast('log-out-visibilty');

                                if (voucherCode || promo || sourceCode) {
                                    var query = {};
                                    if (!UtilService.isEmpty(voucherCode)) {
                                        query.voucherCode = voucherCode;
                                    }
                                    if (!UtilService.isEmpty(promo)) {
                                        query.promo = promo;
                                    }
                                    if (!UtilService.isEmpty(sourceCode)) {
                                        query.sourceCode = sourceCode;
                                    }
                                }

                                if (!UtilService.isEmpty(query)) {
                                    $state.go('app.journey.s1-cards', query);
                                } else {
                                    $state.go('app.journey.s1-cards');
                                }
                                return;
                            }

                            var data = {};

                            data.role = role;

                            url = CONFIG.apiUrl + '/users/login/ANONYMOUS';

                            if (role === Roles.tpsa) {
                                data.thirdParty = thirdParty;
                            }

                            $http.post(url, JSON.stringify(data)).then(function (response) {

                                // console.log(response.headers('JOURNEY'));
                                // if (response.headers('JOURNEY') === 'STAFF' || response.config.headers['JOURNEY'] === 'STAFF') {
                                //     $rootScope.journey = 'STAFF';
                                //     $state.go('auth.login');
                                //     return;
                                // }

                                // To remove -> we will always get roles array, right now fix for backend error 
                                if (response.data.roles.length != 0) {
                                    appState.setAuth(response.data);
                                } else {
                                    AuthService.createRole(role);
                                }

                                $rootScope.$broadcast('log-out-visibilty');
                                var query = {};
                                if (!UtilService.isEmpty(voucherCode)) {
                                    query.voucherCode = voucherCode;
                                }
                                if (!UtilService.isEmpty(promo)) {
                                    query.promo = promo;
                                }
                                if (!UtilService.isEmpty(sourceCode)) {
                                    query.sourceCode = sourceCode;
                                }
                                if (!UtilService.isEmpty(query)) {
                                    $state.go('app.journey.s1-cards', query);
                                } else {
                                    $state.go('app.journey.s1-cards');
                                }
                            }, function (error) {});

                        } else {
                            $state.go('auth');
                        }
                    });
                }]
            }
        });

        $stateProvider.state('app.journey', {
            url: '/journey',
            redirectTo: 'app.journey.s1-cards',
            component: 'journey',
            data: {
                requiredAuth: false
            },
            resolve: {
                lazyLoad: ['$q', '$ocLazyLoad', 'loadingMaskHelper', function ($q, $ocLazyLoad, loadingMaskHelper) {
                    var deferred = $q.defer();
                    loadingMaskHelper.applyMask();
                    require.ensure([], function () {
                        var module = require('./components/journey/journey.module');
                        $ocLazyLoad.load({
                            name: module
                        });
                        loadingMaskHelper.removeMask();
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }]
            }
        });

        $stateProvider.state('app.otp-auth', {
            url: '/resume',
            component: 'otpAuth',
            data: {
                permissions: {
                    except: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.fulfilment, Roles.powerUser]
                    // redirectTo: 'app.journey.s1-cards'
                }
            },
            params: {
                idDocType: null,
                idValue: null
            },

            resolve: {
                lazyLoad: ['$q', '$ocLazyLoad', 'loadingMaskHelper', 'UtilService', '$state', function ($q, $ocLazyLoad, loadingMaskHelper, UtilService, $state) {
                    var deferred = $q.defer();
                    loadingMaskHelper.applyMask();
                    require.ensure([], function () {
                        var module = require('./components/journey/otp-auth/otp-auth.component');
                        $ocLazyLoad.load({
                            name: module
                        });
                        loadingMaskHelper.removeMask();
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                load: ['$state', 'UtilService', function ($state, UtilService) {
                    UtilService.isDMZServer().then(function (res) {
                        if (res) {} else {
                            $state.go('auth');
                        }
                    });
                }]
            }
        });

        $stateProvider.state('app.otp-verify', {
            url: '/otp-resume',
            component: 'otpVerify',
            params: {
                otpData: null
            },
            data: {
                permissions: {
                    except: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.fulfilment, Roles.powerUser]
                    // redirectTo: 'app.journey.s1-cards'
                }
            },

            resolve: {
                lazyLoad: ['$q', '$ocLazyLoad', 'loadingMaskHelper', function ($q, $ocLazyLoad, loadingMaskHelper) {
                    var deferred = $q.defer();
                    loadingMaskHelper.applyMask();
                    require.ensure([], function () {
                        var module = require('./components/journey/otp-auth/otp-verify/otp-verify.component');
                        $ocLazyLoad.load({
                            name: module
                        });
                        loadingMaskHelper.removeMask();
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }],
                load: ['$state', 'UtilService', function ($state, UtilService) {
                    UtilService.isDMZServer().then(function (res) {
                        if (res) {} else {
                            $state.go('auth');
                        }
                    });
                }]
            }
        });

        $stateProvider.state('app.journey.s1-cards', {
            url: '/select-cards?voucherCode&promo&sourceCode',
            component: 'step1',
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.fulfilment, Roles.powerUser, Roles.customer, Roles.tpsa],
                    redirectTo: 'app.start-journey'
                }
            },
            resolve: {
                handleBack: ['journeyService', '$state', function (journeyService, $state) {
                    var application = journeyService.getDataFromStorage();
                    if (application && application.arn) {
                        $state.go('app.journey.s3-applicant');
                    }

                }]
            }
        });

        $stateProvider.state('app.journey.s2-identification', {
            url: '/id-capture',
            component: 'step2',
            params: {
                step2data: null
            },
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.powerUser, Roles.customer, Roles.tpsa, Roles.anonymous],
                    redirectTo: 'app.start-journey'
                }
            },
            resolve: {
                handleBack: ['journeyService', '$state', function (journeyService, $state) {
                    var application = journeyService.getDataFromStorage();
                    if (application && application.arn) {
                        $state.go('app.journey.s3-applicant');
                    }
                }]
            }
        });


        $stateProvider.state('app.journey.s3-applicant', {
            url: '/applicant',
            component: 'step3',
            // redirectTo: 'app.journey.step4.tab1',
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.powerUser, Roles.fulfilment, Roles.customer, Roles.tpsa],
                    redirectTo: 'app.start-journey'
                }
            },
            resolve: {
                handleLoad: ['journeyService', '$state', function (journeyService, $state) {
                    var application = journeyService.getDataFromStorage();
                    if (!application || (application && !application.arn)) {
                        if ($state.current.name) {
                            $state.go($state.current.name);
                        }

                    }
                }]
            }
        });

        $stateProvider.state('app.journey.s4-supplementary', {
            url: '/supplementary',
            component: 'step4',
            // redirectTo: 'app.journey.step5.tab1',
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.powerUser, Roles.fulfilment, Roles.customer, Roles.tpsa],
                    redirectTo: 'app.start-journey'
                }
            },
            resolve: {
                handleLoad: ['journeyService', '$state', function (journeyService, $state) {
                    var application = journeyService.getDataFromStorage();
                    if (!application || (application && !application.arn)) {
                        if ($state.current.name) {
                            $state.go($state.current.name);
                        }

                    }
                }]
            }
        });

        $stateProvider.state('app.journey.s5-balance', {
            url: '/balance-transfer',
            component: 'stepBalanceTransfer',
            // redirectTo: 'app.journey.step5.tab1',
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.powerUser, Roles.fulfilment, Roles.customer, Roles.tpsa],
                    redirectTo: 'app.start-journey'
                }
            },
            resolve: {
                handleLoad: ['journeyService', '$state', function (journeyService, $state) {
                    var application = journeyService.getDataFromStorage();
                    if (!application || (application && !application.arn)) {
                        if ($state.current.name) {
                            $state.go($state.current.name);
                        }

                    }
                }]
            }
        });

        $stateProvider.state('app.journey.s7-documents', {
            url: '/documents',
            component: 'step7',
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.powerUser, Roles.fulfilment, Roles.customer, Roles.tpsa],
                    redirectTo: 'app.start-journey'
                }
            },
            resolve: {
                handleLoad: ['journeyService', '$state', 'accessService', 'appState', '$q', '$anchorScroll', function (journeyService, $state, accessService, appState, $q) {
                    var isCustomerJourney = accessService.isCustomerJourney();
                    var applicationStatus = appState.getNgStatus();
                    var application = journeyService.getDataFromStorage();
                    if (!application || (application && !application.arn)) {
                        if ($state.current.name) {
                            $state.go($state.current.name);
                        }

                    }
                    if (applicationStatus === 'PENDING-FOR-REVIEW' && isCustomerJourney) {
                        return $q.reject("Not Authorized");
                    }
                }]
            }
        });

        $stateProvider.state('app.journey.s6-review', {
            url: '/review',
            component: 'reviewApplication',
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.powerUser, Roles.fulfilment, Roles.customer, Roles.tpsa],
                    redirectTo: 'app.start-journey'
                }
            },
            resolve: {
                handleLoad: ['journeyService', '$state', function (journeyService, $state) {
                    var application = journeyService.getDataFromStorage();
                    if (!application || (application && !application.arn)) {
                        if ($state.current.name) {
                            $state.go($state.current.name);
                        }

                    }
                }]
            }
        });

        $stateProvider.state('app.journey.s6-consent', {
            url: '/consents',
            component: 'consentsAndDeclaration',
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.powerUser, Roles.fulfilment, Roles.customer, Roles.tpsa],
                    redirectTo: 'app.start-journey'
                }
            },
            resolve: {
                handleLoad: ['journeyService', '$state', function (journeyService, $state) {
                    var application = journeyService.getDataFromStorage();
                    if (!application || (application && !application.arn)) {
                        if ($state.current.name) {
                            $state.go($state.current.name);
                        }

                    }
                }]
            }
        });

        $stateProvider.state('app.journey.s8-banking', {
            url: '/banking',
            component: 'app.journey',
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.powerUser, Roles.fulfilment, Roles.customer, Roles.tpsa],
                    redirectTo: 'app.start-journey'
                }
            }
        });

        $stateProvider.state('app.emp-panel', {
            url: '/emp-panel',
            redirectTo: 'app.emp-panel.app-listing',
            component: 'empPanel',
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.fulfilment, Roles.powerUser],
                    redirectTo: 'auth'
                }
            },
            resolve: {
                lazyLoad: ['$q', '$ocLazyLoad', 'loadingMaskHelper', function ($q, $ocLazyLoad, loadingMaskHelper) {
                    var deferred = $q.defer();
                    loadingMaskHelper.applyMask();
                    require.ensure([], function () {
                        var module = require('./components/employee-panel/employee-panel.module');
                        $ocLazyLoad.load({
                            name: module
                        });
                        loadingMaskHelper.removeMask();
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }]
            }
        });

        $stateProvider.state('app.emp-panel.dashboard', {
            url: '/dashboard',
            views: {
                'dashboard': 'dashboard'
            },
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.fulfilment, Roles.powerUser],
                    redirectTo: 'auth'
                }
            }
        });

        $stateProvider.state('app.emp-panel.app-listing', {
            url: '/listing',
            views: {
                'listing': 'appListing'
            },
            data: {
                permissions: {

                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.fulfilment, Roles.powerUser],
                    redirectTo: 'auth'
                }
            }
        });

        $stateProvider.state('app.emp-panel.master', {
            url: '/master-management?manage',
            views: {
                'master': 'masterManagement'
            },
            redirectTo: 'app.emp-panel.master.voucher',
            data: {
                permissions: {
                    only: [Roles.powerUser],
                    redirectTo: 'auth'
                }
            }
        });

        $stateProvider.state('app.emp-panel.master.voucher', {
            url: '/voucher-code',
            component: 'voucherCode',
            data: {
                permissions: {
                    only: [Roles.powerUser],
                    redirectTo: 'auth'
                }
            }
        });

        $stateProvider.state('app.emp-panel.master.source', {
            url: '/source-code',
            component: 'sourceCode',
            data: {
                permissions: {
                    only: [Roles.powerUser],
                    redirectTo: 'auth'
                }
            }
        });

        $stateProvider.state('app.emp-panel.master.gho', {
            url: '/gho-code',
            component: 'ghoCode',
            data: {
                permissions: {
                    only: [Roles.powerUser],
                    redirectTo: 'auth'
                }
            }
        });

        $stateProvider.state('app.emp-panel.master.market', {
            url: '/market-sector-code',
            component: 'marketSectorCode',
            data: {
                permissions: {
                    only: [Roles.powerUser],
                    redirectTo: 'auth'
                }
            }
        });

        $stateProvider.state('app.emp-panel.reports', {
            url: '/reports',
            views: {
                'reports': 'reports'
            },
            redirectTo: 'app.emp-panel.reports.iccm',
            data: {
                permissions: {
                    only: [Roles.powerUser],
                    redirectTo: 'auth'
                }
            }
        });

        $stateProvider.state('app.emp-panel.reports.iccm', {
            url: '/iccm-reconcilation',
            component: 'iccmReconcilation',
            data: {
                permissions: {
                    only: [Roles.powerUser],
                    redirectTo: 'auth'
                }
            }
        });

        $stateProvider.state('app.emp-panel.reports.audit-trail', {
            url: '/audit-trail',
            component: 'auditTrail',
            data: {
                permissions: {
                    only: [Roles.powerUser],
                    redirectTo: 'auth'
                }
            }
        });

        $stateProvider.state('app.journey.completion', {
            url: '/complete',
            component: 'completion',
            params: {
                arn: null,
                idValue: null,
                loadCompletionPage: null
            },
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.powerUser, Roles.fulfilment, Roles.customer, Roles.tpsa],
                    redirectTo: 'app.start-journey'
                },
            },
            resolve: {
                handleLoad: ['journeyService', '$state', '$stateParams', function (journeyService, $state, $stateParams) {
                    var application = journeyService.getDataFromStorage();
                    if (!$stateParams.loadCompletionPage) {
                        if ($state.current.name) {
                            $state.go($state.current.name);
                        }

                    }
                }]
            }
        });

        $stateProvider.state('app.journey.save', {
            url: '/save',
            component: 'completion',
            params: {
                arn: null,
                idValue: null,
                loadCompletionPage: null
            },
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.powerUser, Roles.fulfilment, Roles.customer, Roles.tpsa],
                    redirectTo: 'app.start-journey'
                },
            },
            resolve: {
                handleLoad: ['journeyService', '$state', '$stateParams', function (journeyService, $state, $stateParams) {
                    var application = journeyService.getDataFromStorage();
                    if (!$stateParams.loadCompletionPage) {
                        if ($state.current.name) {
                            $state.go($state.current.name);
                        }

                    }
                }]
            }
        });

        $stateProvider.state('app.timeout', {
            url: '/timeout',
            component: 'timeout',
            data: {
                permissions: {
                    only: [Roles.branch, Roles.telesales, Roles.roadShow, Roles.powerUser, Roles.fulfilment, Roles.customer, Roles.tpsa],
                    redirectTo: 'app.start-journey'
                },
            }
        });

        $stateProvider.state('app.error', {
            url: '/error',
            component: 'globalExceptionHandler',
            data: {
                permissions: {
                    only: [],
                    redirectTo: 'app.start-journey'
                },
            },
            params: {
                status: null,
                exceptionCode: null
            }
        });

        $stateProvider.state('app.journey.home', {
            url: '/home',
            component: 'homeComponent'
        });

        $stateProvider.state('app.journey.detail', {
            url: '/detail',
            component: 'detailComponent',
            params : {
                filter: null
            }
        });

    };

    module.exports = routeConfig;
})();