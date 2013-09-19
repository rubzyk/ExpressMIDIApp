// Generated by CoffeeScript 1.6.3
(function() {
  define(["vendors/EventEmitter", "lib/core/RVal", "lib/utils/Rational"], function(EventEmitter) {
    var RVal, Rational, root;
    if (typeof global !== "undefined" && global !== null) {
      root = global.AC.Core;
    } else {
      root = window.AC.Core;
    }
    Rational = AC.Utils.Rational;
    RVal = AC.Core.RVal;
    window.ee = new EventEmitter;
    return root.TimeLine = (function() {
      function TimeLine(opt) {
        var _this = this;
        this.origin_point = null;
        this.position = {
          cycle: 0,
          bar: 0,
          sub: new RVal(0, 1)
        };
        this.resolution = opt.resolution || new Rational(1, 4);
        this.grid = opt.grid || [];
        this.cycle = opt.cycle || false;
        this.is_on = false;
        this.emitter = new EventEmitter;
        this.on_tic = function() {
          return console.log("" + (_this.position.bar + '>' + _this.position.sub.numer + '/' + _this.position.sub.denom + ' mode: ' + _this.current_bar().h_dir_at(_this.position.sub).name));
        };
        this.emitter.addListeners({
          tic: this.on_tic
        });
      }

      TimeLine.prototype.start = function(position) {
        var instance,
          _this = this;
        if (position) {
          this.position = position;
        } else {
          this.position = {
            cycle: 0,
            bar: 0,
            sub: new RVal(0, 1)
          };
        }
        this.origin_point = window.performance.now();
        this.is_on = true;
        this.speed = (60000 / this.current_bar().bpm) * this.current_bar().resolution.toFloat();
        this.emitter.trigger('start', this);
        this.emitter.trigger('tic', this);
        instance = function() {
          var diff;
          _this.position.sub.add(_this.current_bar().resolution);
          if (_this.position.sub.eq(_this.current_bar().duration())) {
            _this.position.bar++;
            if (_this.cycle && _this.position.bar === _this.grid.length) {
              _this.position.bar = 0;
              _this.position.cycle++;
            }
            _this.speed = (60000 / _this.current_bar().bpm) * _this.current_bar().resolution.toFloat();
            _this.position.sub = new RVal(0, 1);
          }
          _this.emitter.trigger('tic', _this);
          diff = _this.check_precision();
          if (_this.is_on) {
            return setTimeout(instance, _this.speed - diff);
          }
        };
        setTimeout(instance, this.speed);
      };

      TimeLine.prototype.stop = function() {};

      TimeLine.prototype.total = function() {
        return this.position.sub.plus(this.position.bar);
      };

      TimeLine.prototype.cycle_ms_duration = function() {
        var b, result, _i, _len, _ref;
        result = 0;
        _ref = this.grid;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          b = _ref[_i];
          result += b.ms_duration();
        }
        return result;
      };

      TimeLine.prototype.previous_cycles_duration = function() {
        return this.cycle_ms_duration() * this.position.cycle;
      };

      TimeLine.prototype.previous_bars_duration = function() {
        var i, result, _i, _ref;
        result = 0;
        if (this.position.bar === 0) {
          return 0;
        }
        for (i = _i = 0, _ref = this.position.bar - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          result += this.grid[i].ms_duration();
        }
        return result;
      };

      TimeLine.prototype.check_precision = function() {
        var computed, real, result;
        real = window.performance.now() - this.origin_point;
        computed = this.previous_cycles_duration() + this.previous_bars_duration() + this.current_bar().ms_duration_at(this.position.sub);
        result = real - computed;
        return result;
      };

      TimeLine.prototype.current_bar = function() {
        return this.grid[this.position.bar];
      };

      return TimeLine;

    })();
  });

}).call(this);
