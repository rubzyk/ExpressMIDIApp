base_path = "lib/core/base"
composer_path = "lib/core/composer"
structure_path = "lib/core/structure"

define [
  "#{base_path}/Note"
  "#{base_path}/Interval"
  "#{base_path}/RVal"
  "#{base_path}/Degree"
  "#{base_path}/Constants"
  "#{base_path}/AbstractMode"
  "#{base_path}/Mode"
  "#{base_path}/MelodicContext"
  "#{base_path}/Domain"

  "#{composer_path}/melody/MGen"
  "#{composer_path}/melody/MelodicPatternGen"
  "#{composer_path}/rythmn/RGen"
  "#{composer_path}/harmony/HGen"
  "#{composer_path}/Composer"

  "#{structure_path}/Track"
  "#{structure_path}/Directive"
  "#{structure_path}/Position"
  "#{structure_path}/TimeLine"
  "#{structure_path}/Bar"

  ], () ->
	console.log "core_loaded"

# define (require) ->
  
