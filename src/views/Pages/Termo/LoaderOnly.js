import React, { Component } from 'react';
class LoderOnly extends Component {
        componentDidMount() {
          const v = (e, a) => {
            const b = {};
            let c;      for (c = e.length - 1; c >= 0; c--) {
              if (c > 0) {
                b[c] = function() {
                  const d = c;
                  return function() {
                    return w(e[d], b[d + 1], a);
                  };
                };
              } else {
                w(e[c], b[c + 1], a);
              }
            }
          };    const w = (e, n, k) => {
            const c = document.createElement('script');
            let f, g, l;      l = A(a[k] && a[k].staticVer && a[k].staticVer + '/' || e[1]);
            e[0] = e[0].replace('##version##', l);      f = e[0].split('?')[0].split('/');
            g = f[f.length - 1].split('.')[0];      if (u.test(e[1]) && l !== e[1]) {
              d('loader: Overriding configured version with staticVer.');
            }      c.setAttribute('src', e[0]);      if (c && c.addEventListener) {
              c.addEventListener('error', function() {
                b[k + '_' + g + '_load_failure'] = 'true';
              });
            } else if (c && c.attachEvent) {
              c.attachEvent('onerror', function() {
                b[k + '_' + g + '_load_failure'] = 'true';
              });
            }      if (n) {
              c.onload = n;
            }      document.getElementsByTagName('head')[0].appendChild(c);
          };    const d = (e) => {
            if (typeof a.trace_handler === 'function') {
              try {
                a.trace_handler(e);
              } catch (b) {}
            }
          };    const f = (b, a) => {
            const d = b !== null && typeof b !== 'undefined';
            return (
              !d ||
              (b.toString() !== '1' && b.toString().toLowerCase() !== 'true') ||
              (!d || (b.toString() !== '0' && b.toString().toLowerCase() !== 'false'))
                ? typeof a === 'boolean'
                  ? a
                  : false
                : true
            );
          };    const A = (a) => {
            d('********** version before replace: ' + a + ' **********');
            d('localNamespace[ "url_dots_to_dashes" ]: ' + b.url_dots_to_dashes);
            d('numericVersionPattern.test( output ): ' + u.test(a));      if (b.url_dots_to_dashes && u.test(a)) {
              a = a.replace(/\./g, '-');
            }      d('version after replace: ' + a);      return a;
          };    const g = window;
          const x = g.io_global_object_name || 'IGLOO';
          const a = g[x] = g[x] || {};
          const b = (a.loader = a.loader || {});
          const y = [];
          const z = [];
          const u = /^[0-9]{1,3}(\.[0-9]{1,3}){2}\//;    if (b.loaderMain) {
            d('loader: Loader script has already run, try reducing the number of places it\'s being included.');
            return false;
          }    b.loaderMain = this.loaderMain;
          b.loaderVer = '5.2.2';    (function() {
            const e = f(b.tp, true);
            const n = f(b.fp_static, true);
            const k = f(b.fp_dyn, true);
            const c = f(b.enable_legacy_compatibility);
            const u = f(b.tp_split);
            const v = b.tp_host && b.tp_host.replace(/\/+$/, '') || 'https://mpsnare.iesnare.com';
            const l = b.fp_static_override_uri;
            const m = typeof b.uri_hook !== 'undefined' ? b.uri_hook + '/' : '/iojs/';
            const p = (b.version || 'versionOrAliasIsRequired') + '/';
            const w = b.subkey ? g.encodeURIComponent(b.subkey) + '/' : '';
            const x = b.tp_resource || 'wdp.js';
            let q = '';
            const C = l ? '&fp_static_uri=' + g.encodeURIComponent(l) : '';
            let r, t, h;      b.tp_host = v;
            r = f(a.enable_flash, true);
            t = a.io && a.io.enable_flash;
            h = a.fp && a.fp.enable_flash;
            t = typeof t !== 'undefined' && t !== null ? f(t, true) : r;
            h = typeof h !== 'undefined' && h !== null ? f(h, true) : t;
            q += '?loaderVer=' + b.loaderVer + '&compat=' + c + '&tp=' + e + '&tp_split=' + u + '&fp_static=' + n + '&fp_dyn=' + k + C;      if (!e && !n) {
              d('loader: Not currently configured to load fp_static or tp script(s).');
            }      if (a.fp && a.fp.staticVer && a.fp.staticVer + '/' !== p) {
              p = A(a.fp.staticVer + '/');
              d('loader: Configured version replaced with that from pre-loaded static script.');
            }      if (!n || (a.fp && a.fp.staticMain)) {
              if (n) {
                if (a.fp && a.fp.staticMain) {
                  c && !a.fp.preCompatMain && d('loader: enable_legacy_compatibility on, but included static does not have the compat wrapper.');
                } else if (l) {
                  y.push([l, '']);
                } else {
                  y.push([m + 'static_wdp.js' + q + h, p]);
                }
              }        if (!k || (a.fp && a.fp.dynMain)) {
                if (a.fp && a.fp.dynMain) {
                  d('loader: First party dynamic script has already been loaded, disable fp_dyn or make sure you\'re not manually including the dynamic file separately.');
                } else {
                  y.push([m + 'dyn_wdp.js' + q + h, p]);
                }
              } else {
                d('loader: Invalid Config, first party dynamic script set to load without static.');
              }
            }      if (e) {
              if (a.io && a.io.staticMain) {
                d('loader: Third party script has already been loaded.');
              } else {
                const m = v + '/##version##' + w;
                if (u) {
                  z.push([m + 'static_wdp.js' + q + r, p]);
                  z.push([m + 'dyn_wdp.js' + q + r, p]);
                  b.tp_resource && d('loader: Invalid Config: both tp_resource and tp_split set. Ignoring tp_resource.');
                } else {
                  z.push([m + x + q + r, p]);
                }
              }
            }
          })();    v(y, 'fp');
          v(z, 'io');

          window.io_global_object_name = "IGLOO"
          window.IGLOO = window.IGLOO || {
              "enable_flash" : false,
              "bbout_element_id" : "ioBlackBox",  // this can be changed to store in a different hidden field (or removed to use a different collection method)
              "loader" : {
              "subkey"  : "",
              "fp_static" : false,
              "tp_static" : false,
              "version" : "general5"
              }
          };

          
        }  render() {
          return <div></div>;
        }
      }export default LoderOnly;