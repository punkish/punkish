let generateSyntheticData;
const maxScale = 4186.01;
const minScale = 27.5;
const range = maxScale - minScale;
const intervals = 10;
const intervalSize = range / intervals;
const midRange = function(hz) {
    for (let i = 0; i < intervals; i++) {
        const min = minScale + (intervalSize * i);
        const max = min + intervalSize;

        if ((hz > min) && (hz <= max)) {
            return ((min + max) / 2);
        }
    }
};

const saw = new Wad({
    source  : 'square',
    volume  : 1.0,   // Peak volume can range from 0 to an arbitrarily high number, but you probably shouldn't set it higher than 1.
    loop    : false, // If true, the audio will loop. This parameter only works for audio clips, and does nothing for oscillators. 
    rate    : 1.0, // How fast to play an audio clip, relative to its normal speed. 2.0 is double speed, 0.5 is half speed, etc.
    offset  : 0,     // Where in the audio clip playback begins, measured in seconds from the start of the audio clip.
    //pitch   : 'C5',  // Set a default pitch on the constuctor if you don't want to set the pitch on <code>play()</code>.
    detune  : 0,     // Set a default detune on the constructor if you don't want to set detune on <code>play()</code>. Detune is measured in cents. 100 cents is equal to 1 semitone.
    panning : -.5,   // Horizontal placement of the sound source. Possible values are from 1 to -1.
    
    env     : {      // This is the ADSR envelope.
        attack  : 0.0,  // Time in seconds from onset to peak volume.  Common values for oscillators may range from 0.05 to 0.3.
        decay   : 0.0,  // Time in seconds from peak volume to sustain volume.
        sustain : 0.25,  // Sustain volume level. This is a percent of the peak volume, so sensible values are between 0 and 1.
        hold    : 0.25, // Time in seconds to maintain the sustain volume level. If this is not set to a lower value, oscillators must be manually stopped by calling their stop() method.
        release : 0     // Time in seconds from the end of the hold period to zero volume, or from calling stop() to zero volume.
    },
    /*
    filter  : {
        type      : 'lowpass', // What type of filter is applied.
        frequency : 600,       // The frequency, in hertz, to which the filter is applied.
        q         : 1,         // Q-factor.  No one knows what this does. The default value is 1. Sensible values are from 0 to 10.
        env       : {          // Filter envelope.
            frequency : 800, // If this is set, filter frequency will slide from filter.frequency to filter.env.frequency when a note is triggered.
            attack    : 0.5  // Time in seconds for the filter frequency to slide from filter.frequency to filter.env.frequency
        }
    },
    reverb  : {
        wet     : 1,                                            // Volume of the reverberations.
        impulse : 'https://www.myServer.com/path/to/impulse.wav' // A URL for an impulse response file, if you do not want to use the default impulse response.
    },
    delay   : {
        delayTime : .5,  // Time in seconds between each delayed playback.
        wet       : .25, // Relative volume change between the original sound and the first delayed playback.
        feedback  : .25, // Relative volume change between each delayed playback and the next. 
    },
    */
    // vibrato : { // A vibrating pitch effect.  Only works for oscillators.
    //     shape     : 'sine', // shape of the lfo waveform. Possible values are 'sine', 'sawtooth', 'square', and 'triangle'.
    //     magnitude : 3,      // how much the pitch changes. Sensible values are from 1 to 10.
    //     speed     : 4,      // How quickly the pitch changes, in cycles per second.  Sensible values are from 0.1 to 10.
    //     attack    : 0       // Time in seconds for the vibrato effect to reach peak magnitude.
    // },
    /*
    tremolo : { // A vibrating volume effect.
        shape     : 'sine', // shape of the lfo waveform. Possible values are 'sine', 'sawtooth', 'square', and 'triangle'.
        magnitude : 3,      // how much the volume changes. Sensible values are from 1 to 10.
        speed     : 4,      // How quickly the volume changes, in cycles per second.  Sensible values are from 0.1 to 10.
        attack    : 0       // Time in seconds for the tremolo effect to reach peak magnitude.
    },
    tuna   : {
        Chorus : {
            intensity: 0.3,  //0 to 1
            rate: 4,         //0.001 to 8
            stereoPhase: 0, //0 to 180
            bypass: 0
        }
    }
    */
});

PK['led-strip'] = {
    lettersUC: {
        'A': ['00100','01010','10001','10001','11111','10001','10001','00000'],
        'B': ['11110','10001','10001','11110','10001','10001','11110','00000'],
        'C': ['00111','01000','10000','10000','10000','01000','00111','00000'],
        'D': ['11100','10010','10001','10001','10001','10010','11100','00000'],
        'E': ['11111','10000','10000','11110','10000','10000','11111','00000'],
        'F': ['11111','10000','10000','11110','10000','10000','10000','00000'],
        'G': ['01111','10000','10000','10110','10001','10001','01110','00000'],
        'H': ['10001','10001','10001','11111','10001','10001','10001','00000'],
        'I': ['11111','00100','00100','00100','00100','00100','11111','00000'],
        'J': ['00001','00001','00001','00001','00001','10001','01110','00000'],
        'K': ['10001','10010','10100','11000','10100','10010','10001','00000'],
        'L': ['10000','10000','10000','10000','10000','10000','11111','00000'],
        'M': ['10001','11011','10101','10001','10001','10001','10001','00000'],
        'N': ['10001','11001','10101','10011','10001','10001','10001','00000'],
        'O': ['01110','10001','10001','10001','10001','10001','01110','00000'],
        'P': ['11110','10001','10001','11110','10000','10000','10000','00000'],
        'Q': ['01110','10001','10001','10001','10001','01110','00001','00000'],
        'R': ['11110','10001','10001','11110','10100','10010','10001','00000'],
        'S': ['01111','10000','10000','01110','00001','00001','11110','00000'],
        'T': ['11111','00100','00100','00100','00100','00100','00100','00000'],
        'U': ['10001','10001','10001','10001','10001','10001','01110','00000'],
        'V': ['10001','10001','10001','10001','10001','01010','00100','00000'],
        'W': ['10001','10001','10001','10001','10101','11011','10001','00000'],
        'X': ['10001','01010','00100','00100','00100','01010','10001','00000'],
        'Y': ['10001','01010','00100','00100','00100','00100','00100','00000'],
        'Z': ['11111','00001','00010','00100','01000','10000','11111','00000']
    },

    lettersLC: {
        'a': ['00000','11100','00010','01110','10010','10010','01101','00000'],
        'b': ['10000','10000','11110','10001','10001','10001','11110','00000'],
        'c': ['00000','00111','01000','10000','10000','01000','00111','00000'],
        'd': ['00001','00001','01111','10001','10001','10001','01111','00000'],
        'e': ['00000','01110','10001','10001','11110','10000','01111','00000'],
        'f': ['00011','00100','00100','01111','00100','00100','00100','00000'],
        'g': ['00000','01110','10001','10001','10001','01111','00001','11110'],
        'h': ['10000','10000','11110','10001','10001','10001','10001','00000'],
        'i': ['00100','00000','01100','00100','00100','00100','11111','00000'],
        'j': ['00001','00000','00001','00001','00001','00001','10001','01110'],
        'k': ['10000','10001','10010','10100','11100','10010','10001','00000'],
        'l': ['10000','10000','10000','10000','10000','10000','01111','00000'],
        'm': ['00000','11010','10101','10101','10001','10001','10001','00000'],
        'n': ['00000','10110','11001','10001','10001','10001','10001','00000'],
        'o': ['00000','01110','10001','10001','10001','10001','01110','00000'],
        'p': ['00000','11110','10001','10001','11110','10000','10000','10000'],
        'q': ['00000','01111','10001','10001','10001','01111','00001','00001'],
        'r': ['00000','10111','11000','10000','10000','10000','10000','00000'],
        's': ['00000','01111','10000','01110','00001','00001','11110','00000'],
        't': ['00100','11111','00100','00100','00100','00100','00011','00000'],
        'u': ['00000','10001','10001','10001','10001','10001','01110','00000'],
        'v': ['00000','10001','10001','10001','10001','01010','00100','00000'],
        'w': ['00000','10001','10001','10001','10101','11011','10001','00000'],
        'x': ['00000','10001','01010','00100','00100','01010','10001','00000'],
        'y': ['00000','10001','10001','10001','01111','00001','00010','11100'],
        'z': ['00000','11111','00001','00110','01100','10000','11111','00000']
    },

    numbers: {
        '0': ['01110','10001','10011','10101','11001','10001','01110','00000'],
        '1': ['00100','11100','00100','00100','00100','00100','11111','00000'],
        '2': ['11100','00010','00001','00001','00110','01000','11111','00000'],
        '3': ['11111','00010','00100','01111','00001','00010','11100','00000'],
        '4': ['00110','01010','10010','10010','11111','00010','00010','00000'],
        '5': ['11111','10000','11100','00010','00001','00010','11100','00000'],
        '6': ['00001','00010','00100','01010','10001','10001','01110','00000'],
        '7': ['11111','00001','00001','00010','00100','01000','10000','00000'],
        '8': ['00100','01010','01010','01110','10001','10001','01110','00000'],
        '9': ['01110','10001','10001','01110','00100','01000','10000','00000']
    },

    puncts: {
        '.': ['00000','00000','00000','00000','00000','00000','10000','00000'],
        ',': ['00000','00000','00000','00000','00000','00000','01000','10000'],
        ':': ['00000','00000','00000','00000','10000','00000','10000','00000'],
        ';': ['00000','00000','00000','00000','01000','00000','01000','10000'],
        ' ': ['00000','00000','00000','00000','00000','00000','00000','00000']
    }, 

    alphaNum: {
        'A': ['00100','01010','10001','10001','11111','10001','10001','00000'],
        'B': ['11110','10001','10001','11110','10001','10001','11110','00000'],
        'C': ['00111','01000','10000','10000','10000','01000','00111','00000'],
        'D': ['11100','10010','10001','10001','10001','10010','11100','00000'],
        'E': ['11111','10000','10000','11110','10000','10000','11111','00000'],
        'F': ['11111','10000','10000','11110','10000','10000','10000','00000'],
        'G': ['01111','10000','10000','10110','10001','10001','01110','00000'],
        'H': ['10001','10001','10001','11111','10001','10001','10001','00000'],
        'I': ['11111','00100','00100','00100','00100','00100','11111','00000'],
        'J': ['00001','00001','00001','00001','00001','10001','01110','00000'],
        'K': ['10001','10010','10100','11000','10100','10010','10001','00000'],
        'L': ['10000','10000','10000','10000','10000','10000','11111','00000'],
        'M': ['10001','11011','10101','10001','10001','10001','10001','00000'],
        'N': ['10001','11001','10101','10011','10001','10001','10001','00000'],
        'O': ['01110','10001','10001','10001','10001','10001','01110','00000'],
        'P': ['11110','10001','10001','11110','10000','10000','10000','00000'],
        'Q': ['01110','10001','10001','10001','10001','01110','00001','00000'],
        'R': ['11110','10001','10001','11110','10100','10010','10001','00000'],
        'S': ['01111','10000','10000','01110','00001','00001','11110','00000'],
        'T': ['11111','00100','00100','00100','00100','00100','00100','00000'],
        'U': ['10001','10001','10001','10001','10001','10001','01110','00000'],
        'V': ['10001','10001','10001','10001','10001','01010','00100','00000'],
        'W': ['10001','10001','10001','10001','10101','11011','10001','00000'],
        'X': ['10001','01010','00100','00100','00100','01010','10001','00000'],
        'Y': ['10001','01010','00100','00100','00100','00100','00100','00000'],
        'Z': ['11111','00001','00010','00100','01000','10000','11111','00000'],
        'a': ['00000','11100','00010','01110','10010','10010','01101','00000'],
        'b': ['10000','10000','11110','10001','10001','10001','11110','00000'],
        'c': ['00000','00111','01000','10000','10000','01000','00111','00000'],
        'd': ['00001','00001','01111','10001','10001','10001','01111','00000'],
        'e': ['00000','01110','10001','10001','11110','10000','01111','00000'],
        'f': ['00011','00100','00100','01111','00100','00100','00100','00000'],
        'g': ['00000','01110','10001','10001','10001','01111','00001','11110'],
        'h': ['10000','10000','11110','10001','10001','10001','10001','00000'],
        'i': ['00100','00000','01100','00100','00100','00100','11111','00000'],
        'j': ['00001','00000','00001','00001','00001','00001','10001','01110'],
        'k': ['10000','10001','10010','10100','11100','10010','10001','00000'],
        'l': ['10000','10000','10000','10000','10000','10000','01111','00000'],
        'm': ['00000','11010','10101','10101','10001','10001','10001','00000'],
        'n': ['00000','10110','11001','10001','10001','10001','10001','00000'],
        'o': ['00000','01110','10001','10001','10001','10001','01110','00000'],
        'p': ['00000','11110','10001','10001','11110','10000','10000','10000'],
        'q': ['00000','01111','10001','10001','10001','01111','00001','00001'],
        'r': ['00000','10111','11000','10000','10000','10000','10000','00000'],
        's': ['00000','01111','10000','01110','00001','00001','11110','00000'],
        't': ['00100','11111','00100','00100','00100','00100','00011','00000'],
        'u': ['00000','10001','10001','10001','10001','10001','01110','00000'],
        'v': ['00000','10001','10001','10001','10001','01010','00100','00000'],
        'w': ['00000','10001','10001','10001','10101','11011','10001','00000'],
        'x': ['00000','10001','01010','00100','00100','01010','10001','00000'],
        'y': ['00000','10001','10001','10001','01111','00001','00010','11100'],
        'z': ['00000','11111','00001','00110','01100','10000','11111','00000'],
        '0': ['01110','10001','10011','10101','11001','10001','01110','00000'],
        '1': ['00100','11100','00100','00100','00100','00100','11111','00000'],
        '2': ['11100','00010','00001','00001','00110','01000','11111','00000'],
        '3': ['11111','00010','00100','01111','00001','00010','11100','00000'],
        '4': ['00110','01010','10010','10010','11111','00010','00010','00000'],
        '5': ['11111','10000','11100','00010','00001','00010','11100','00000'],
        '6': ['00001','00010','00100','01010','10001','10001','01110','00000'],
        '7': ['11111','00001','00001','00010','00100','01000','10000','00000'],
        '8': ['00100','01010','01010','01110','10001','10001','01110','00000'],
        '9': ['01110','10001','10001','01110','00100','01000','10000','00000'],
        '.': ['00000','00000','00000','00000','00000','00000','10000','00000'],
        ',': ['00000','00000','00000','00000','00000','00000','01000','10000'],
        ':': ['00000','00000','00000','00000','10000','00000','10000','00000'],
        ';': ['00000','00000','00000','00000','01000','00000','01000','10000'],
        ' ': ['00000','00000','00000','00000','00000','00000','00000','00000']
    },
    
    letterMaker: function(letter, type) {
        
        let html = '<div class="led-letter">';
        for (let i = 0; i < 8; i++) {
            html += '<div class="led-row">';
            
            const leds = this[type][letter][i].split('');

            for (let m = 0; m < 5; m++) {
                const state = leds[m] === '1' ? 'on' : 'off';
                html += `<div class="led ${state}"></div>`;
            }

            html += '</div>';
        }
        html += '</div>';

        return html;
    }, 
    
    status: document.getElementById('status'),
    canvas: document.getElementById('smoothie-chart'),

    //The maximum is inclusive and the minimum is inclusive 
    getRandomIntInclusive: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    },

    

    generate: function() {
        if (num < maxNumOfAlpha) {
            generateSynNumbers(num);
            status.innerText = `generated ${num} numbers`;
            num++;
        }
        else {
            status.innerText = `generated ${num} numbers… done`;
        }

        chart.addTimeSeries(data, {lineWidth: 1, strokeStyle: '#00ff00'});
        chart.streamTo(this.canvas, 250);
    },

    syntheticData: function(synDataType) {
        
        status.innerText = 'starting generation of ' + synDataType + ' data…';
        const synData = document.getElementById('synData');
        let data = new TimeSeries();
        let chart = new SmoothieChart({
            tooltip: true,
            timestampFormatter: SmoothieChart.timeFormatter
        });
        let num = 0;
        const maxNumOfAlpha = 200;

        if (synDataType === 'numbers') {

            function generateSynNumbers(num, min, max) {
                const datum = PK['led-strip'].getRandomIntInclusive(min, max);
                synData.innerText = synData.innerText + ' ' + datum;
        
                const t = new Date().getTime();
                data.append(t, datum);
        
                saw.play({pitch : midRange(datum)})
                
                PK['led-strip'].drawMessage(datum.toString());
            };

            const min = 0;
            const max = 120;
            generateSynNumbers(num, min, max);
        }
        else if (synDataType === 'letters') {
            const lettersLC = Object.keys(this.lettersLC);
            const lettersUC = Object.keys(this.lettersUC);

            function generateSynLetters(num) {
                const rand = Math.random();
                const rand26 = Math.floor(rand * 26);
                const datum =  rand > 0.5 ? lettersLC[rand26] : lettersUC[rand26];
                
                synData.innerText = synData.innerText + ' ' + datum;

                const t = new Date().getTime();
                data.append(t, datum);

                saw.play({pitch : midRange(datum)})
                
                this.drawMessage(datum.toString());
            }

            function generate() {
                if (num < maxNumOfAlpha) {
                    generateSynLetters(num);
                    status.innerText = `generated ${num} letters`;
                    num++;
                }
                else {
                    status.innerText = `generated ${num} letters… done`;
                }

                chart.addTimeSeries(data, {lineWidth: 1, strokeStyle: '#00ff00'});
                chart.streamTo(this.canvas, 250);
            }
        }

        num = 0;
        generateSyntheticData = setInterval(generate, 250);
    },

    // radio buttons
    synDataType: document.getElementsByName('synDataType'),

    // form button
    synDataGenerator: document.getElementById('synDataGenerator'),

    stripContent: '',

    drawMessage: function(msg) {

        this.stripContent = this.stripContent ? this.stripContent + ' ' + msg : msg;

        //console.log(msg);
        const strip = document.getElementById('led-strip');
        const width = strip.getBoundingClientRect().width;

        // willFit is the number of letters that will fit on the strip
        const willFit = Math.round(width / 40);

        let html = '';

        if (this.stripContent.length >= willFit) {
            this.stripContent = this.stripContent.slice(msg.length + 4);
        }

        for (let i = 0; i < this.stripContent.length; i++) {
            html += this.letterMaker(this.stripContent[i], 'numbers');
        }
        
        strip.innerHTML = html;
    },

    stopSynData: function(event) {
            
        // stop data generation
        status.innerText = 'stopping generation of data…';
        clearInterval(generateSyntheticData);
        //v.stop(a.currentTime + 2);
        
        for (let i = 0, j = this.synDataType.length; i < j; i++) {
            this.synDataType[i].disabled = false;
        }

        this.synDataGenerator.removeEventListener('click', stopSynData);
        this.synDataGenerator.addEventListener('click', startSynData, false);
        this.synDataGenerator.innerText = 'start';
        this.synDataGenerator.classList.remove('button-primary');

        event.preventDefault();
    },

    startSynData: function(event) {
        
        const synDataType = PK['led-strip'].synDataType;
        const synDataGenerator = PK['led-strip'].synDataGenerator;
        const startSynData = PK['led-strip'].startSynData;
        const stopSynData = PK['led-strip'].stopSynData;

        for (const val of synDataType) {
            if (val.checked) {
                
                for (let i = 0, j = synDataType.length; i < j; i++) {
                    synDataType[i].disabled = true;
                }

                synDataGenerator.innerText = 'stop';
                synDataGenerator.classList.add('button-primary');
                synDataGenerator.removeEventListener('click', startSynData, false);
                synDataGenerator.addEventListener('click', stopSynData, false);

                PK['led-strip'].syntheticData(val.value);
                break;
            }
        }

        event.preventDefault();
    },
    
    init: function() {
        
        this.synDataGenerator.addEventListener('click', this.startSynData, false);
    }
};