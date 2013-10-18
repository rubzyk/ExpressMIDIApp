define ["lib/core/base/Note", "lib/utils/Rational"], () ->

  Note = AC.Core.Note
  Rational = AC.Utils.Rational

  if typeof global != "undefined" && global != null 
    root= global.AC.MIDI
  else
    root= window.AC.MIDI

  root.play = (opt) ->
    opt = {} unless opt
    tempo= opt.tempo || 60
    notes= opt.note || new Note "C0"
    channel= 143 + opt.channel || 144
    at= opt.at || window.performance.now()

    unless notes.length
      notes = [notes]

    for n in notes
      console.log "duration: " + n.duration.toFloat() * 1000 
      midiOut.send([channel , n.pitch.value, n.velocity], at) #on
      midiOut.send([channel , n.pitch.value, 0], at + n.duration.toFloat() * 1000 - 1) #off ### -1ms to avoid cross on/off on repeated pitches
      
    "play_end"

  root.simple_play = (opt) ->
    pitch = opt.pitch
    vel = opt.velocity
    at = opt.at || window.performance.now() #default start to now
    duration = opt.duration || at + 1000 #default duration to 1s

    channel= 143 + opt.channel || 144

    midiOut.send([channel , pitch, vel], at) #on
    midiOut.send([channel , pitch, 0], at + duration) #off ### -1ms to avoid cross on/off on repeated pitches
      
    "simple_play_end"  

  root.all_off = (chan) ->
    channel = 143 + chan || 144
    for i in [0..127]
      midiOut.send [channel , i, 0], window.performance.now()

  return root  

