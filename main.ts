let Throttle = 0
let Turn = 0
input.setAccelerometerRange(AcceleratorRange.OneG)
let ServoScale = 135
let SpeedAmplifier = 200
let TurnAmplifier = 200
let strip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB)
let range = strip.range(0, 3)
basic.forever(function () {
    Turn = Math.map(input.acceleration(Dimension.Z), -1023, 1023, TurnAmplifier, 0 - TurnAmplifier)
    Throttle = Math.map(input.acceleration(Dimension.X), -1023, 1023, 0 - SpeedAmplifier, SpeedAmplifier)
    robotbit.GeekServo(robotbit.Servos.S1, 90 + Math.constrain(Turn - Throttle, 0 - ServoScale, ServoScale))
    robotbit.GeekServo(robotbit.Servos.S2, 90 + Math.constrain(Turn + Throttle, 0 - ServoScale, ServoScale))
    robotbit.GeekServo(robotbit.Servos.S3, 90 + Math.constrain(Turn + Throttle, 0 - ServoScale, ServoScale))
    robotbit.GeekServo(robotbit.Servos.S4, 90 + Math.constrain(Turn - Throttle, 0 - ServoScale, ServoScale))
    led.toggle(Math.map(input.acceleration(Dimension.X), -1023, 1024, 0, 5), Math.map(input.acceleration(Dimension.Z), -1023, 1024, 0, 5))
    strip.showColor(neopixel.hsl(Math.abs(Turn), 0, Math.abs(Throttle)))
})
