PK['hk'] = {

    Sonde: {
        Upper: [],
        Bottom: []
    },

    // Date,Time,Site_name,Sonde_Name,Depth(m),Temperature (℃),Salinity(ppt),Dissolved oxygen (mg/L)
    fields: [
        'DateTime',
        'Depth(m)',
        'Temperature (℃)',
        'Salinity(ppt)',
        'Dissolved oxygen (mg/L)'
    ],

    prepareData: function(data) {
    
        for (let i = 0, j = data.data.length; i < j; i++) {
            
            const row = data.data[i];
            
            const thisRow = [
                new Date(row['Date'] + ' ' + row['Time']),
                parseFloat(row['Depth(m)']),
                parseFloat(row['Temperature (℃)']),
                parseFloat(row['Salinity(ppt)']),
                parseFloat(row['Dissolved oxygen (mg/L)'])
            ];

            PK.hk.Sonde[row['Sonde_Name']].push(thisRow);
        }

        PK.hk.initChart();
    },

    findFocus: function(sondeName) {

        const today = new Date();
        const todayDate = today.getDate();
        const todayHour = today.getHours();
        const todayMins = today.getMinutes();
        const todaySeconds = today.getSeconds();
        const newToday = new Date(`08/${todayDate}/18 ${todayHour}:${todayMins}:${todaySeconds}`);

        for (let i = 0, j = PK.hk.Sonde[sondeName].length; i < j; i++) {

            const row = PK.hk.Sonde[sondeName][i];            
            const date = row[0];
            
            if (date > newToday) {

                const diffFromPrev = date - PK.hk.Sonde[sondeName][i - 1][0];
                const diffFromThis = PK.hk.Sonde[sondeName][i][0] - date;
                
                return (diffFromPrev >= diffFromThis ? i : i - 1);
            }
        }

    },

    g: null,
    dygraphData: [],
    
    timer: function(t = 10000) {
        
        function pad2(number) {
            number = '0' + Math.floor(number);
            return number.substr(number.length - 2);
        }

        const seconds = Math.floor((t/1000) % 60);
        const minutes = Math.floor( (t/1000/60) % 60 );
        const hours = Math.floor( (t/(1000*60*60)) % 24 );
        const days = Math.floor( t/(1000*60*60*24) );

        document.getElementById('timer').innerHTML = pad2(hours) + 'h ' + pad2(minutes) + 'm ' + pad2(seconds) + 's';
    },

    initChart: function(sondeName = 'Upper', timerAdjustment = 60) {

        if (PK.hk.g !== null) {
            PK.hk.g.destroy();
        }

        let focus = PK.hk.findFocus(sondeName);
        
        PK.hk.dygraphData.push(PK.hk.Sonde[sondeName][focus]);
        const dygraphOpts = {
            //rollPeriod: 7,
            showRoller: false,
            title: `Yim Tin Tsai Fish Culture Zone ${sondeName} sonde`,
            legend: 'always',
            //showRangeSelector: true,
            labels: PK.hk.fields,
            labelsDiv: document.getElementById('status'),
            labelsSeparateLines: true,
            strokeWidth: 1.0,
            drawPoints: true,
            pointSize: 2.0,
            highlightCircleSize: 4.0,
            series: {
                'Depth(m)': {
                    color: 'lightblue'
                },
                'Temperature (℃)': {
                    color: 'lightcoral'
                },
                'Salinity(ppt)': {
                    color: 'darkgreen'
                },
                'Dissolved oxygen (mg/L)': {
                    color: '#444444'
                }
            }
        };

        PK.hk.g = new Dygraph(
            document.getElementById("graph"),
            PK.hk.dygraphData, 
            dygraphOpts
        );

        let duration = 600000;
        PK.hk.timer(duration);
        
        const timerUpdate = 1000;
        let timeRemaining = duration - 1000;

        setInterval(function() {
            
            if (timeRemaining == 0) {
                if (PK.hk.dygraphData.length > 100) {
                    PK.hk.dygraphData.shift();
                }
                focus++;
                PK.hk.dygraphData.push(PK.hk.Sonde[sondeName][focus]);
                PK.hk.g.updateOptions( { 'file': PK.hk.dygraphData } );
                
            }
            else if (timeRemaining < 0) {
                timeRemaining = duration;
            }
            
            PK.hk.timer(timeRemaining);
            timeRemaining = timeRemaining - timerUpdate;

            
        }, timerUpdate);
    },

    init: function() {

        const data = Papa.parse(
            '/entry-files/H/HO/HON/Hong-Kong-Bay-Water-Quality-Data/js/Yim-Tin-Tsai-FCZ-08-2018.csv', 
            {
                header: true,
                download: true,
                complete: this.prepareData
            }
        );
    }
};