(() ->
  INITIAL_TIME = 300
  accessText = (id, value=null) ->
    ele = document.getElementById(id)
    if value is null
      return ele.textContent
    else
      ele.textContent = value

  minits = (value=null) ->
    return accessText("minits", value)

  seconds = (value=null) ->
    return accessText("seconds", ("0" + value).substr(-2))


  class Timer
    constructor: () ->
      @timer = document.getElementById("timer")
      @isRunning = false
      @reset()

    start: () ->
      @timerId = setInterval =>
        @timer.setAttribute("time", --@time)
      , 1000
      @blinkId = setInterval =>
        if document.getElementById("coron").style.color == "rgb(255, 255, 255)"
          document.getElementById("coron").style.color = "#000"
        else
          document.getElementById("coron").style.color = "#fff"
      , 500
      @isRunning = true

    stop: () ->
      clearInterval(@timerId)
      clearInterval(@blinkId)
      document.getElementById("coron").style.color = "#000"
      @isRunning = false

    reset: () ->
      @stop()
      @timer.setAttribute("time", INITIAL_TIME)
      @time = INITIAL_TIME

  timer = new Timer()
  screen = document.getElementsByTagName("html")[0]
  screen.onclick = (e) ->
    if timer.isRunning
      timer.stop()
    else
      timer.start()

  screen.ondblclick = (e) ->
    timer.reset()


  setInterval ->
    minits Math.floor(timer.time / 60)
    seconds timer.time % 60
    if timer.time <= 0
      if timer.isRunning
        sounds = [
          "explode1.ogg.wav", "explode2.ogg.wav", "explode3.ogg.wav", "explode4.ogg.wav",
        ]
        sound = new Audio("/docs/assets/sounds/" + sounds[Math.floor(Math.random() * sounds.length)]).play()
      timer.stop()
  , 10
)()
