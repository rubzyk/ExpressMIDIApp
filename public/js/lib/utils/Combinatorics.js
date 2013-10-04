// Generated by CoffeeScript 1.6.3
(function() {
  define(["vendors/ruby"], function() {
    var root;
    if (typeof global !== "undefined" && global !== null) {
      root = global.AC.Utils;
    } else {
      root = window.AC.Utils;
    }
    return root.DomainPartition = (function() {
      function DomainPartition(_dom, _size, _sum) {
        var arr, _i;
        this.domain = _a.sort(_dom);
        this.results = [];
        this.sum = _sum;
        this.size = _size;
        arr = [];
        for (_i = 1; 1 <= _size ? _i <= _size : _i >= _size; 1 <= _size ? _i++ : _i--) {
          arr.push(0);
        }
        this.sumRecursive(this.size, 0, arr);
      }

      DomainPartition.prototype.sumRecursive = function(n, sumSoFar, arr) {
        var dom_bounds, final_arr, i, restricted_dom, start, temp, x, _arr, _i, _j, _len, _len1, _ref, _results;
        if (n === 1) {
          if (this.sum - sumSoFar >= arr[arr.length - 2] && this.domain.indexOf(this.sum - sumSoFar) >= 0) {
            final_arr = arr.slice(0);
            final_arr[final_arr.length - 1] = this.sum - sumSoFar;
            return this.results.push(final_arr);
          }
        } else if (n > 1) {
          if (n !== this.size) {
            start = arr[arr.length - n - 1];
          } else {
            start = this.domain[0];
          }
          dom_bounds = [start * (n - 1), this.domain[this.domain.length - 1] * (n - 1)];
          restricted_dom = [];
          _ref = this.domain;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            x = _ref[_i];
            if (x < start) {
              "nothing";
            } else if (this.size - n > 0) {
              temp = this.sum - (_a.somme(arr.slice(0, +(arr.length - n - 1) + 1 || 9e9)) + x);
              if (dom_bounds[0] <= temp && dom_bounds[1] >= temp) {
                restricted_dom.push(x);
              }
            } else if (dom_bounds[0] <= this.sum + x && dom_bounds[1] >= this.sum + x) {
              restricted_dom.push(x);
            }
          }
          _results = [];
          for (_j = 0, _len1 = restricted_dom.length; _j < _len1; _j++) {
            i = restricted_dom[_j];
            _arr = arr.slice(0);
            _arr[_arr.length - n] = i;
            _results.push(this.sumRecursive(n - 1, sumSoFar + i, _arr));
          }
          return _results;
        }
      };

      return DomainPartition;

    })();
  });

}).call(this);
