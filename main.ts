input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Fahren = true
    basic.setLedColor(0x00ff00)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    Fahren = false
    basic.turnRgbLedOff()
})
let Richtung = 0
let Geschwindigkeit = 0
let LedY = 0
let LedX = 0
let NeigungY = 0
let NeigungX = 0
let Fahren = false
let MaxNeigungswinkel = 30
radio.setGroup(1)
basic.turnRgbLedOff()
basic.forever(function () {
    if (Fahren) {
        NeigungX = input.rotation(Rotation.Roll)
        NeigungY = input.rotation(Rotation.Pitch)
        NeigungX = Math.constrain(NeigungX, MaxNeigungswinkel * -1, MaxNeigungswinkel)
        NeigungY = Math.constrain(NeigungY, MaxNeigungswinkel * -1, MaxNeigungswinkel)
        led.unplot(LedX, LedY)
        LedX = Math.map(NeigungX, MaxNeigungswinkel * -1, MaxNeigungswinkel, 0, 4)
        LedY = Math.map(NeigungY, MaxNeigungswinkel * -1, MaxNeigungswinkel, 0, 4)
        led.plot(LedX, LedY)
        Geschwindigkeit = 100 - Math.map(NeigungY, MaxNeigungswinkel * -1, MaxNeigungswinkel, 0, 100)
        Richtung = Math.map(NeigungX, MaxNeigungswinkel * -1, MaxNeigungswinkel, 0, 100)
        radio.sendValue("F", 1)
        radio.sendValue("G", Geschwindigkeit)
        radio.sendValue("R", Richtung)
        basic.pause(50)
    } else {
        radio.sendValue("F", 0)
        basic.clearScreen()
    }
})
