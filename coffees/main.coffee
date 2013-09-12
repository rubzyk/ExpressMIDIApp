require.config
  paths:
    jquery: 'vendors/jquery-1.10.2.min'
    underscore: 'vendors/underscore'
    backbone: 'vendors/backbone'
  shim: 
    underscore: 
      exports: '_'
    backbone: 
      deps: ["underscore", "jquery"]
      exports: "Backbone"
    
require ["lib/music-module","lib/UIobjects/RythmnValSelector",
"jquery"], (rvs, $)->

  jQuery ($) ->
    window.rythmnValSel = new RVS 
      el: "#rvs"
      generator: new RGen

    



  # window.MM = my_midi

  # rgh = [
  #   {value: rat(1,2), occ: 1}
  #   {value: rat(1,4), occ: 1}
  #   {value: rat(3,8), occ: 3}
  #   {value: rat(1,3), occ: 1}
  #   {value: rat(1,6), occ: 1}
  # ]

  # rg = new RGen(rgh)
  
  # rvals = rg.next(20)

  # window.line = []
  # for x in [0..20]
  #   pitch = Math.floor(Math.random()*30 + 40)
  #   vel = Math.floor(Math.random()*30 + 40)
  #   dur = rvals[x]

  #   line.push [new Note(pitch, vel, dur), new Note(pitch + 5, vel, dur)]

  # # my_midi.line
  # #   notes: line   
  
  # r = rat(4,2)
  # r.add(rat(1,3))
  # puts r

  # puts r
  # window.n = new Note(48, 60 , r)
  # puts n
  
  #console.log line  
  # my_midi.play
  #   note: n
  
  # rg.add [
  #   { value: rat(1,4),occ: 2}
  # ] 

  # a = rg.denoms()
  # console.log a

  # rg.remove(rat(1,2))
  # console.log rg

  # puts "rvs"
  # console.log RVS
  # #RVS = rvs.RVS
  
      