PK['hk'] = {

    Sonde: {
        Upper: [],
        Bottom: []
    },

    fields: [
        'DateTime',
        'Depth(m)',
        'Temperature(C)',
        'Salinity(ppt)',
        'Dissolved oxygen (mg/L)'
    ],

    prepareData: function(data) {
    
        for (let i = 0, j = data.data.length; i < j; i++) {
            
            const row = data.data[i];
            
            const thisRow = [
                new Date(row['Date'] + ' ' + row['Time']),
                parseFloat(row['Depth(m)']),
                parseFloat(row['Temperature(C)']),
                parseFloat(row['Salinity(ppt)']),
                parseFloat(row['Dissolved oxygen (mg/L)'])
            ];

            PK.hk.Sonde[row['Sonde_Name']].push(thisRow);
        }

        PK.hk.initChart();
    },

    findFocus: function(sondeName) {

        const d = new Date();

        let todayDate = d.getDate();

        // Since the data are from June, the highest date possible is 30.
        // But, it is possible that todayDate might be greater than 30, 
        // so we adjust for that
        if (todayDate > 30) {
            todayDate = 1;
        }

        const todayHour = d.getHours();
        const todayMins = d.getMinutes();

        const timePadding = 5;
        const range = [todayMins - timePadding, todayMins + timePadding];

        for (let i = 0, j = PK.hk.Sonde[sondeName].length; i < j; i++) {

            const row = PK.hk.Sonde[sondeName][i];            
            const date = row[0];
            
            if (date.getDate() == todayDate) {
                
                if (date.getHours() == todayHour) {
                    
                    if (date.getMinutes() > range[0] && date.getMinutes() < range[1]) {

                        return i;
                        break;
                    }
                }
            }
        }

    },

    g: null,
    dygraphData: [],

    initChart: function(sondeName = 'Upper', timerAdjustment = 60) {

        if (PK.hk.g !== null) {
            PK.hk.g.destroy();
        }

        let focus = PK.hk.findFocus(sondeName);
        
        PK.hk.dygraphData.push(PK.hk.Sonde[sondeName][focus]);

        PK.hk.g = new Dygraph(
            document.getElementById("graph"),
            PK.hk.dygraphData, 
            {
                //rollPeriod: 7,
                showRoller: false,
                title: `Yim Tin Tsai Fish Culture Zone ${sondeName} sonde`,
                legend: 'always',
                //showRangeSelector: true,
                labels: PK.hk.fields,
                labelsDiv: document.getElementById('status'),
                labelsSeparateLines: true,
                strokeWidth: 3.0,
                drawPoints: true,
                pointSize: 1,
                highlightCircleSize: 6,
                series: {
                    'Depth(m)': {
                        color: '#ff0000'
                    },
                    'Temperature(C)': {
                        color: '#00ff00'
                    },
                    'Salinity(ppt)': {
                        color: '#0000ff'
                    },
                    'Dissolved oxygen (mg/L)': {
                        color: '#000000'
                    }
                }
            }
        );

        if (PK.hk.emitter !== null) {
            PK.hk.emitter.clearInterval();
        }
        
        PK.hk.emissions(sondeName, focus++, timerAdjustment);
        //this.countdownTimer();
    },

    emitter: null,
    
    // readings are recorded at 10 min intervals. While that may be
    // fine for real life, it is too long a time period to do any 
    // meaningful visualization over short periods. So we divide the 
    // emissionPeriod by the timerAdjustment to get a fake but more 
    // visualizable emissionPeriod. A timerAdjustment of 1 will keep 
    // the emissionPeriod to 10 mins. A timerAdjustment of 2 will 
    // halve the emissionPeriod to 5 mins, and so on. A  timerAdjustment
    // of 60 is suggested for an emissionPeriod of 10 second
    emissions: function(sondeName, focus, timerAdjustment) {
        
        const emissionPeriod = 600000  / timerAdjustment;
        
        //let count = 1;
        PK.hk.emitter = setInterval(function() {
    
            PK.hk.dygraphData.push(PK.hk.Sonde[sondeName][focus]);
            PK.hk.g.updateOptions( { 'file': PK.hk.dygraphData } );
            focus++;
        }, emissionPeriod);
    },
    
    changeSonde: function() {
        const val = document.querySelector('select[name="sonde"]');
        const sondeName = val.options[val.selectedIndex].value;
        PK.hk.initChart(sondeName, undefined);
    },
    
    changeRange: function() {
        const val = document.querySelector('input[name="time"]').value;
        
        const range = [
            ['10 mins', 600000],
            ['5 mins', 300000],
            ['2 mins', 120000],
            ['1 min', 60000],
            ['30 secs', 30000],
            ['10 secs', 10000],
            ['5 secs', 5000],
            ['1 sec', 1000]
        ];
    
        document.getElementById('timerAdjustment').innerText = range[val][0];
    },

    countdownTimer: function() {
        

        function getTimeRemaining(endtime){
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor( (t/1000) % 60 );
            var minutes = Math.floor( (t/1000/60) % 60 );
            var hours = Math.floor( (t/(1000*60*60)) % 24 );
            var days = Math.floor( t/(1000*60*60*24) );
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }
        
        function initializeClock(clock, endtime){
            //var clock = document.getElementById(id);
            var timeinterval = setInterval(function(){
                var t = getTimeRemaining(endtime);
                clock.innerHTML = 'days: ' + t.days + ' ' +
                                    'hours: '+ t.hours + ' ' +
                                    'minutes: ' + t.minutes + ' ' +
                                    'seconds: ' + t.seconds;
                if(t.total<=0){
                    clearInterval(timeinterval);
                }
            }, 1000);
        }
        
        
        
        const deadline = function(t, duration) {
            return new Date(Date.parse(t) + duration);
        };

        const now = new Date();
        const duration = 10000;
        let end = deadline(now, duration);

        const timer = setInterval(function() {
            initializeClock(document.getElementById('timer'), end);
            end = deadline(end, duration);
        }, duration)
        
    },

    init: function() {
        // const selectWidget = document.querySelector('select[name="sonde"]');
        // selectWidget.selectedIndex = 0;

        // selectWidget.addEventListener("change", PK.hk.changeSonde);
        // document.querySelector('input[name="time"]').addEventListener("change", PK.hk.changeRange);

        const data = Papa.parse(
            '/entry-files/H/HO/HON/Hong-Kong-Bay-Red-Tide-Data/js/Yim-Tin-Tsai-FCZ.csv', 
            {
                header: true,
                download: true,
                complete: this.prepareData
            }
        );
    }
};