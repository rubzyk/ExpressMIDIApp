define [], () ->

  MyMIDI= {}

  MyMIDI.play = (opt) ->
    notes= opt.note || new Note "C 0", rat(2,3)
    channel= 143 + opt.channel || 144
    at= opt.at || 0

    unless notes.length
      notes = [notes]

    for n in notes
      midiOut.send([channel , n.pitch.value, n.velocity], window.performance.now() + at) #on
      midiOut.send([channel , n.pitch.value, 0], window.performance.now() + at + n.duration.toFloat() * 1000) #off
      
    "play_end"

  MyMIDI.line = (opt) ->

  	channel= 143 + opt.channel || 144
  	at= opt.at || 0

  	time_position = 0

  	console.log opt.notes
  	for n in opt.notes
  	  MyMIDI.play 
  	    note: n 
  	    at: time_position

  	  if n.duration 
  	  	dur = n.duration.toFloat() 
  	  else	
  	  	dur = n[0].duration.toFloat() 

  	  time_position += dur * 1000  

  return MyMIDI  

