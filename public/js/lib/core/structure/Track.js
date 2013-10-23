// Generated by CoffeeScript 1.6.3
(function() {
  define(["lib/core/structure/Position", "lib/core/composer/Composer"], function() {
    var Composer, Position, RVal, root;
    if (typeof global !== "undefined" && global !== null) {
      root = global.AC.Core;
    } else {
      root = window.AC.Core;
    }
    Position = AC.Core.Position;
    RVal = AC.Core.RVal;
    Composer = AC.Core.Composer;
    return root.Track = (function() {
      function Track(opt) {
        this.midi_channel = opt.midi_channel || 1;
        this.directives = opt.directives || [];
        this.sort_directives();
        if (opt.midi_events == null) {
          opt.midi_events = {};
        }
        this.midi_events = {
          notes: opt.midi_events.notes || [],
          messages: opt.midi_events.message || []
        };
        this.composer = opt.composer || new Composer;
        this.composer.track = this;
        this.score = [];
      }

      Track.prototype.tic = function() {
        var note, _i, _len, _ref;
        if (timeline.position.bar === 0 && timeline.position.sub.eq(new RVal(0))) {
          timeline.play_line(this.midi_events.notes);
          _ref = this.midi_events.notes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            note = _ref[_i];
            note.position.cycle++;
          }
        }
        while (this.directives[0].position.le(this.composer.head_position())) {
          this.composer.apply_directive(this.directives[0]);
          this.directives[0].position.cycle++;
          this.directives = _a.rotate(this.directives, 1);
        }
        return this.composer.tic();
      };

      Track.prototype.sort_directives = function() {
        return this.directives.sort(function(a, b) {
          return a.position.ge(b.position);
        });
      };

      Track.prototype.add_directive = function(d) {
        var dir, i, _i, _len, _ref, _results;
        _ref = this.directives;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          dir = _ref[i];
          if (d.position.lt(dir.position)) {
            debugger;
            _a.insert(this.directives, i, d);
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };

      Track.prototype.reset = function() {
        var dir, note, _i, _j, _len, _len1, _ref, _ref1, _results;
        _ref = this.directives;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          dir = _ref[_i];
          dir.position.cycle = 0;
        }
        this.sort_directives();
        _ref1 = this.midi_events.notes;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          note = _ref1[_j];
          _results.push(note.position.cycle = 0);
        }
        return _results;
      };

      Track.prototype.print_score = function() {
        return this.score.map(function(x) {
          return "p:" + x.pitch.value + " d:" + x.duration.numer + "/" + x.duration.denom + " at:" + x.position.sub.numer + "/" + x.position.sub.denom + " ";
        });
      };

      return Track;

    })();
  });

}).call(this);