define [
  "lib/core/base/RVal"
  "lib/core/composer/rythmn/RGen"
  "lib/core/composer/melody/MGen"
  "lib/core/composer/harmony/HGen"
  ], ->

  if typeof global != "undefined" && global != null 
    root= global.AC.Core
  else
    root= window.AC.Core
  
  RVal = AC.Core.RVal
  RGen = AC.Core.RGen
  MGen = AC.Core.MGen
  HGen = AC.Core.HGen
  #DGen = AC.Core.DGen

  class root.Composer

    constructor: (opt) ->    
      #temp
      opt ?= {} 

      @strategy = @set_strategy opt.strategy #global strategy (way that generators are used together etc...)

      @rgen = opt.rgen || new RGen #rythmic generator
      @mgen = opt.mgen || new MGen  #melodic generator
      @hgen = opt.hgen || new HGen  #harmonic generator
      #@dgen = opt.dgen || new DGen  #dynamic generator

      #reference composer in each generator (cyclic ref...)
      @rgen.composer = @mgen.composer = @hgen.composer = @ #@dgen.composer = @ 

      @ahead = new RVal 0
      @advance = opt.advance || new RVal 2 #default advance of 2 beats
      @track = undefined #assign in track constructor

    head_position: ->
      timeline.position.plus @ahead  

    apply_directive: (d) -> #directive objet
      switch d.type
        when "rythmic"  then @rgen[d.method_name](d.args...)  
        when "melodic"  then @mgen[d.method_name](d.args...)  
        when "harmonic" 
          @hgen[d.method_name](d.args...) 
          @mgen.set_melodic_context(@hgen.current) #update mgen mode
          #console.log @mgen.mode.name 


    tic: ->
      # temp # call #generate on each generator , when @strategy will be implemented, 
      # the order of called generators should change depending on it , 
      # and other directives should be send to generators
      @strategy() if @ahead.lt @advance
      @ahead.subtract timeline.resolution 
      

    set_strategy: (strat_name = "default") ->  
      if strat_name is "default"
        return =>
          rythmn_line = @rgen.generate()
          line = @mgen.melodize(rythmn_line)
          #timeline.play_line line 
          for x in line #append line to score
            @track.score.push x 
            @track.queue.push x

    temp_strat: ->
      rythmn_line = @rgen.generate2()
      line = @mgen.melodize(rythmn_line)
      #timeline.play_line line 
      for x in line #append line to score
        @track.score.push x 
        @track.queue.push x              
            











