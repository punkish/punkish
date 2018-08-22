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
        const todayDate = d.getDate();
        const todayHour = d.getHours();
        const todayMins = d.getMinutes();

        const timePadding = 5;
        const range = [todayMins - timePadding, todayMins + timePadding];

        //console.log(sondeName);
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
                rollPeriod: 7,
                showRoller: true,
                title: `Yim Tin Tsai Fish Culture Zone ${sondeName} sonde`,
                legend: 'always',
                showRangeSelector: true,
                labels: PK.hk.fields,
                strokeWidth: 1.0,
                drawPoints: true,
                pointSize: 1.5,
                labelsDiv: document.getElementById('status'),
                labelsSeparateLines: true
            }
        );

        if (PK.hk.emitter !== null) {
            PK.hk.emitter.clearInterval();
        }
        
        PK.hk.emissions(sondeName, focus++, timerAdjustment);
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