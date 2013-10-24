// Generated by CoffeeScript 1.6.3
(function() {
  define(["lib/utils/Rational", "lib/core/base/RVal", "lib/core/structure/Position", "vendors/ruby"], function() {
    var Position, RVal, root;
    if (typeof global !== "undefined" && global !== null) {
      root = global.AC.Core;
    } else {
      root = window.AC.Core;
    }
    RVal = AC.Core.RVal;
    Position = AC.Core.Position;
    root.MetaPitch = (function() {
      function MetaPitch(arg) {
        var k, v, _ref;
        if (typeof arg === 'string') {
          this.name = arg;
          this.int = root.MetaPitch.hash[this.name];
        } else {
          _ref = MetaPitch.hash;
          for (k in _ref) {
            v = _ref[k];
            if (v === arg) {
              this.name = k;
              this.int = arg;
            }
          }
        }
      }

      MetaPitch.hash = {
        "C": 0,
        "D": 2,
        "E": 4,
        "F": 5,
        "G": 7,
        "A": 9,
        "B": 11
      };

      MetaPitch.find_closest = function(int) {
        var result;
        result = _h.key(this.hash, int);
        if (result) {
          return result;
        } else {
          return _h.key(this.hash, int + 1) + 'b';
        }
      };

      return MetaPitch;

    })();
    root.Alteration = (function() {
      function Alteration(arg) {
        var hash;
        hash = {
          "bb": -2,
          "b": -1,
          "n": 0,
          "#": 1,
          "x": 2
        };
        if (typeof arg === 'string') {
          this.name = arg;
          this.int = hash[arg];
        } else {
          this.name = _h.key(hash, arg);
          this.int = arg;
        }
      }

      return Alteration;

    })();
    root.PitchClass = (function() {
      function PitchClass(arg) {
        var alt, mp;
        if (typeof arg !== 'string') {
          arg = root.MetaPitch.find_closest(arg);
        }
        mp = new root.MetaPitch(arg[0]);
        if (arg.slice(1, 3)) {
          alt = new root.Alteration(arg.slice(1, 3));
        } else {
          alt = new root.Alteration("n");
        }
        this.name = arg;
        this.int = mp.int + alt.int;
      }

      return PitchClass;

    })();
    root.Pitch = (function() {
      function Pitch(pitchClass, octave) {
        if (typeof octave === 'number') {
          this.octave = octave;
          this.pitchClass = new root.PitchClass(pitchClass);
        } else if (typeof pitchClass === "number") {
          this.octave = Math.floor(pitchClass / 12) - 5;
          this.pitchClass = new root.PitchClass(pitchClass % 12);
        } else if (typeof pitchClass === "string") {
          if (pitchClass.length === 1) {
            this.octave = 0;
            this.pitchClass = new root.PitchClass(pitchClass);
          } else if (pitchClass.length === 2) {
            if (typeof +pitchClass[1] === "number") {
              this.octave = +pitchClass[1];
              this.pitchClass = new root.PitchClass(pitchClass[0]);
            }
          } else if (pitchClass.length === 3) {
            if (pitchClass[1] === "-" && typeof +pitchClass[2] === "number") {
              this.pitchClass = new root.PitchClass(pitchClass[0]);
              this.octave = +pitchClass[2] * -1;
            } else {
              this.pitchClass = new root.PitchClass(pitchClass.slice(0, 2));
              this.octave = +pitchClass[2];
            }
          } else if (pitchClass.length === 4) {
            this.pitchClass = new root.PitchClass(pitchClass.slice(0, 2));
            this.octave = +pitchClass[3] * -1;
          } else {
            return "sorry, wrong arguments";
          }
        }
        this.name = this.pitchClass.name + this.octave;
        this.value = this.pitchClass.int + (this.octave + 5) * 12;
      }

      Pitch.prototype.dist_to = function(other_pitch) {
        return this.value - other_pitch.value;
      };

      Pitch.prototype.transposed = function(dist) {
        return new Pitch(this.value + dist);
      };

      Pitch.prototype.eq = function(pitch) {
        return this.value === pitch.value;
      };

      return Pitch;

    })();
    return root.Note = (function() {
      function Note(pitch, vel, duration, position) {
        if (vel == null) {
          vel = 60;
        }
        this.pitch = new root.Pitch(pitch);
        this.velocity = vel;
        this.duration = duration || new RVal(1);
        this.position = position || new Position();
      }

      Note.prototype.clone = function() {
        return new root.Note(this.pitch.value, this.velocity, this.duration.clone(), this.position.clone());
      };

      return Note;

    })();
  });

}).call(this);
