/*
 * Script Detector v1.0
 * https://github.com/barongello/script-detector
 *
 * Copyright 2016 - Now Wagner Barongello
 * Released under MIT license
 */

window.ScriptDetector = window.ScriptDetector || {
  initialized: false,

  shouldBlock: {
    localFiles: false,
    allChromeExtensions: false,
    chromeExtensionsIds: [],
    domains: [],
    filenames: [],
    regularExpressions: []
  },

  timer: 15000,
  interval: null,

  initialize: function () {
    if (this.initialized === true)
      return this;

    this.shouldBlock = {
      localFiles: false,
      allChromeExtensions: false,
      chromeExtensionsIds: [],
      domains: [],
      filenames: [],
      regularExpressions: []
    };

    this.timer = 15000;
    this.interval = null;

    this.initialized = true;

    return this;
  },

  allowLocalFiles: function () {
    if (this.initialized !== true)
      return this;

    this.shouldBlock.localFiles = false;

    return this;
  },

  disallowLocalFiles: function () {
    if (this.initialized !== true)
      return this;

    this.shouldBlock.localFiles = true;

    return this;
  },

  allowAllChromeExtensions: function () {
    if (this.initialized !== true)
      return this;

    this.shouldBlock.allChromeExtensions = false;

    return this;
  },

  disallowAllChromeExtensions: function () {
    if (this.initialized !== true)
      return this;

    this.shouldBlock.allChromeExtensions = true;

    return this;
  },

  clearChromeExtensionsIds: function () {
    if (this.initialized !== true)
      return this;

    this.shouldBlock.chromeExtensionsIds = [];

    return this;
  },

  setChromeExtensionsIds: function (chromeExtensionsIds) {
    if (this.initialized !== true)
      return this;

    if (typeof chromeExtensionsIds !== 'undefined' && chromeExtensionsIds !== null && chromeExtensionsIds.constructor === Array) {
      this.shouldBlock.chromeExtensionsIds = [];

      for (var i in chromeExtensionsIds)
        if (typeof chromeExtensionsIds[i] !== 'undefined' && chromeExtensionsIds[i] !== null && chromeExtensionsIds[i].constructor === String)
          this.shouldBlock.chromeExtensionsIds.push(chromeExtensionsIds[i]);
    }

    return this;
  },

  setDomains: function (domains) {
    if (this.initialized !== true)
      return this;

    if (typeof domains !== 'undefined' && domains !== null && domains.constructor === Array) {
      this.shouldBlock.domains = [];

      for (var i in domains)
        if (typeof domains[i] !== 'undefined' && domains[i] !== null && domains[i].constructor === String)
          this.shouldBlock.domains.push(domains[i]);
    }

    return this;
  },

  setFilenames: function (filenames) {
    if (this.initialized !== true)
      return this;

    if (typeof filenames !== 'undefined' && filenames !== null && filenames.constructor === Array) {
      this.shouldBlock.filenames = [];

      for (var i in filenames)
        if (typeof filenames[i] !== 'undefined' && filenames[i] !== null && filenames[i].constructor === String)
          this.shouldBlock.filenames.push(filenames[i]);
    }

    return this;
  },

  setRegularExpressions: function (regularExpressions) {
    if (this.initialized !== true)
      return this;

    if (typeof regularExpressions !== 'undefined' && regularExpressions !== null && regularExpressions.constructor === Array) {
      this.shouldBlock.regularExpressions = [];

      for (var i in regularExpressions)
        if (typeof regularExpressions[i] !== 'undefined' && regularExpressions[i] !== null && regularExpressions[i].constructor === RegExp)
          this.shouldBlock.regularExpressions.push(regularExpressions[i]);
    }

    return this;
  },

  setTimer: function (timer) {
    if (this.initialized !== true)
      return this;

    if (typeof timer !== 'undefined' && timer !== null && timer.constructor === Number && Number.isInteger(timer) === true) {
      this.timer = timer;

      if (this.interval !== null) {
        this.stopTimer();

        if (this.timer >= 0)
          this.startTimer();
      }
    }

    return this;
  },

  stopTimer: function () {
    if (this.initialized !== true)
      return this;

    if (this.interval !== null) {
      clearInterval(this.interval);

      this.interval = null;
    }

    return this;
  },

  startTimer: function (callbackFound, callbackNotFound) {
    if (this.initialized !== true)
      return this;

    if (typeof callbackFound === 'undefined' || (callbackFound !== null && callbackFound.constructor !== Function))
      callbackFound = null;

    if (typeof callbackNotFound === 'undefined' || (callbackNotFound !== null && callbackNotFound.constructor !== Function))
      callbackNotFound = null;

    if (this.timer >= 0) {
      var _this = this;

      this.interval = setInterval(function () { _this.doVerification(callbackFound, callbackNotFound); }, this.timer);
    }

    return this;
  },

  doVerification: function (callbackFound, callbackNotFound) {
    if (this.initialized !== true)
      return this;

    if (typeof callbackFound === 'undefined' && typeof callbackNotFound === 'undefined')
      return this;

    if (typeof callbackFound !== 'undefined' && callbackFound === null && typeof callbackNotFound !== 'undefined' && callbackNotFound === null)
      return this;

    if (typeof callbackFound !== 'undefined' && callbackFound !== null && callbackFound.constructor !== Function && typeof callbackNotFound !== 'undefined' && callbackNotFound !== null && callbackNotFound.constructor !== Function)
      return this;

    var found = [];
    var scripts = document.getElementsByTagName('script');

    for (var i in scripts) {
      var script = scripts[i];

      if (typeof script.src === 'undefined' || script.src === null || script.src.constructor !== String)
        continue;

      var src = script.src;

      if (this.shouldBlock.localFiles === true && src.split(':')[0] === 'file') {
        found.push({
          origin: 'BLOCK_LOCAL_FILES',
          src: src
        });

        continue;
      }

      var tokens = src.split('://');
      var scheme = tokens.length === 2 ? tokens.shift() : '';

      tokens = tokens[0].split('/');

      if (scheme === 'chrome-extension') {
        if (this.shouldBlock.allChromeExtensions === true) {
          found.push({
            origin: 'BLOCK_ALL_CHROME_EXTENSIONS',
            name: tokens.length > 0 ? tokens[0] : 'UNKNOWN',
            src: src
          });

          continue;
        }
        else if (tokens[0].length > 0) {
          var extensionIndex = this.shouldBlock.chromeExtensionsIds.indexOf(tokens[0]);

          if (extensionIndex > -1) {
            found.push({
              origin: 'BLOCK_CHROME_EXTENSION_IDS',
              name: this.shouldBlock.chromeExtensionsIds[extensionIndex],
              src: src
            });

            continue;
          }
        }
      }

      if (scheme.length > 0) {
        var domain = tokens[0].split(':')[0];

        if (domain.length > 0) {
          var domainIndex = this.shouldBlock.domains.indexOf(domain);

          if (domainIndex > -1) {
            found.push({
              origin: 'BLOCK_DOMAIN',
              name: this.shouldBlock.domains[domainIndex],
              src: src
            });

            continue;
          }
        }
      }

      var filename = tokens[tokens.length - 1];

      if (filename.length > 0) {
        var filenameIndex = this.shouldBlock.filenames.indexOf(filename);

        if (filenameIndex > -1) {
          found.push({
            origin: 'BLOCK_FILENAME',
            name: this.shouldBlock.filenames[filenameIndex],
            src: src
          });

          continue;
        }
      }

      for (var i in this.shouldBlock.regularExpressions)
        if (this.shouldBlock.regularExpressions[i].test(src) === true) {
          found.push({
            origin: 'BLOCK_REGULAR_EXPRESSION',
            name: this.shouldBlock.regularExpressions[i].toString(),
            src: src
          });

          break;
        }
    }

    if (found.length > 0) {
      if (callbackFound !== null && callbackFound.constructor === Function)
        callbackFound(found);
    }
    else if (callbackNotFound !== null && callbackNotFound.constructor === Function)
      callbackNotFound();

    return this;
  }
};

ScriptDetector.initialize();
