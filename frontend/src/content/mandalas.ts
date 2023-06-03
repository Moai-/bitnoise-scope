import { Mandala } from '../redux/types';

const mandalas: Array<Mandala> = [
    {
        name: 'Pretty bubbles 🧼',
        id: 'pretty-bubbles',
        layers: [
            {
                name: 'Bubbles',
                id: 'layer-bubbles',
                signal: {
                    id: 'random-range-per-seconds',
                    props: {
                        min: 1000000,
                        max: 9999999,
                        seconds: 0.25
                    }
                },
                code:'\
const centerX = int(`${seed[1]}${seed[3]}`) * 10;\n\
const centerY = int(`${seed[2]}${seed[4]}`) * 10;\n\
const radius = int(seed[5]) * int(seed[6]);\n\
const last = seed.length - 1;\n\
const col1 = `#${seed[0] === "-" ? seed.substring(1, 7) : seed.substring(0, 6)};`\n\
const col2 = `#F${seed[last]}F${seed[last - 1]}F${seed[last - 2]}`\n\
const grd = context.createLinearGradient(0, 0, 200, 0);\n\
grd.addColorStop(0, col1);\n\
grd.addColorStop(1, col2);\n\
\n\
context.fillStyle = grd;\n\
context.beginPath();\n\
context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);\n\
context.fill();\n\
context.lineWidth = 1;\n\
context.strokeStyle = col1;\n\
context.stroke();\n\
context.closePath();\n\
',
            }
        ]
    },
    {
        name: 'Confusing Numbers 🔢',
        id: 'confusing-numbers',
        layers: [
            {
                name: 'Words',
                id: 'words-layer',
                signal: {
                    id: 'random-range-per-seconds',
                    props: {
                        min: 1000000,
                        max: 9999999,
                        seconds: 0.25
                    }
                },
                code:'\n\
context.fillStyle = `#${seed.substring(0, 6)}`;\n\
context.font = "30px Arial";\n\
context.fillText(\n\
    `${seed[1]}${seed[2]}`,\n\
    int(`${seed[3]}${seed[4]}`) * 10,\n\
    int(`${seed[5]}${seed[6]}`) * 10\n\
);\n\
',
            }
        ]
    }
]

export default mandalas;