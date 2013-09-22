// Generated by CoffeeScript 1.6.3
(function() {
  define(["lib/core/RVal"], function() {
    var RVal, root;
    if (typeof global !== "undefined" && global !== null) {
      root = global.AC.Core;
    } else {
      root = window.AC.Core;
    }
    RVal = AC.Core.RVal;
    return root.Position = (function() {
      function Position(opt) {
        if (!opt) {
          opt = {};
        }
        this.cycle = opt.cycle || 0;
        this.bar = opt.bar || 0;
        this.sub = opt.sub || new RVal(0);
        this.timeline = opt.timeline || null;
      }

      Position.prototype.cycle_ms_duration = function() {
        var b, result, _i, _len, _ref;
        result = 0;
        _ref = this.timeline.grid;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          b = _ref[_i];
          result += b.ms_duration();
        }
        return result;
      };

      Position.prototype.previous_cycles_duration = function() {
        return this.cycle_ms_duration() * this.cycle;
      };

      Position.prototype.previous_bars_duration = function() {
        var i, result, _i, _ref;
        result = 0;
        if (this.bar === 0) {
          return 0;
        }
        for (i = _i = 0, _ref = this.bar - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          result += this.timeline.grid[i].ms_duration();
        }
        return result;
      };

      Position.prototype.total_time = function() {
        return this.previous_cycles_duration() + this.previous_bars_duration() + this.timeline.current_bar().ms_duration_at(this.sub);
      };

      Position.prototype.plus = function(rval) {
        var addition, clone, diff;
        clone = this.clone();
        addition = clone.sub.plus(rval);
        diff = addition.minus(clone.timeline.grid[clone.bar].duration());
        if (diff.isNegative()) {
          clone.sub = addition;
          return clone;
        } else {
          clone.sub = new RVal(0);
          if (clone.bar === clone.timeline.grid.length - 1) {
            clone.cycle++;
            clone.bar = 0;
          } else {
            clone.bar++;
          }
          return clone.plus(diff);
        }
      };

      Position.prototype.rval_to_ms = function(rval, _result) {
        var addition, clone, diff, temp;
        clone = this.clone();
        if (_result === void 0) {
          _result = clone.timeline.grid[clone.bar].ms_duration_at(clone.sub) * -1;
        }
        addition = clone.sub.plus(rval);
        diff = addition.minus(clone.timeline.grid[clone.bar].duration());
        if (diff.isNegative()) {
          clone.sub = addition;
          return _result + clone.timeline.grid[clone.bar].ms_duration_at(clone.sub);
        } else {
          temp = _result + clone.timeline.grid[clone.bar].ms_duration();
          if (diff.isZero()) {
            return temp;
          }
          _result += clone.timeline.grid[clone.bar].ms_duration();
          if (clone.bar === clone.timeline.grid.length - 1) {
            clone.cycle++;
            clone.bar = 0;
          } else {
            clone.bar++;
          }
          return clone.rval_to_ms(diff, _result);
        }
      };

      Position.prototype.positioned_rval_to_ms = function(positioned_rval) {
        return "TODO !!!!!!!!";
      };

      Position.prototype.to_performance_time = function() {
        return this.timeline.origin_point + this.total_time();
      };

      Position.prototype.clone = function() {
        return new root.Position({
          cycle: this.cycle,
          bar: this.bar,
          sub: this.sub,
          timeline: this.timeline
        });
      };

      Position.prototype.toString = function() {
        return "#cycle: " + this.cycle + " // bar: " + this.bar + " // sub: " + (this.sub.numer + '/' + this.sub.denom);
      };

      return Position;

    })();
  });

}).call(this);