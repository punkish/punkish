PK['hk'] = {
    foo: function(data) {

        let Sonde = {
            Upper: [],
            Bottom: []
        };
    
        const fields = [
            'DateTime',
            'Depth(m)',
            'Temperature(C)',
            'Salinity(ppt)',
            'Dissolved oxygen (mg/L)'
        ];
    
        for (let i = 0, j = data.data.length; i < j; i++) {
    
            const row = data.data[i];
            if (row['Sonde_Name'] === 'Upper') {
                Sonde.Upper.push(row);
            }
            else if (row['Sonde_Name'] === 'Bottom') {
                Sonde.Bottom.push(row);
            }
        }
    
        const focusOn = function(sondeName) {
    
            let focus = [];
            let data = Sonde[sondeName];
    
            const d = new Date();
            const todayDate = d.getDate();
            const todayHour = d.getHours();
            const todayMins = d.getMinutes();
    
            let newReadings = false;
    
            for (let i = 0, j = data.length; i < j; i++) {
    
                const row = data[i];
                
                const focusedRow = [
                    new Date(row['Date'] + ' ' + row['Time']),
                    parseFloat(row['Depth(m)']),
                    parseFloat(row['Temperature(C)']),
                    parseFloat(row['Salinity(ppt)']),
                    parseFloat(row['Dissolved oxygen (mg/L)'])
                ];
                const timePadding = 5;
                
                if (newReadings) {
                    focus.push(focusedRow);
                }
                else {
                    const date = parseInt(row['Date'].split('/')[1]);
    
                    if (date == todayDate) {
    
                        const time = row['Time'].split(':');
                        const hour = parseInt(time[0]);
    
                        if (hour == todayHour) {
    
                            const mins = parseInt(time[1]);
    
                            const range = [todayMins - timePadding, todayMins + timePadding]
                            if (mins > range[0] && mins < range[1]) {
    
                                focus.push(focusedRow);
                                newReadings = true;
                            }
                        }
                    }
                }
            }
    
            return focus;
        };
    
        let SondeName = 'Upper';
        const focus = focusOn(SondeName);
        let dygraphData = [focus[0]];
        //console.log(focus)
    
        
    
        PK.hk.emissions(60);
        
    },
    
    // readings are recorded at 10 min intervals. While that may be
    // fine for real life, it is too long a time period to do any 
    // meaningful visualization over short periods. So we divide the 
    // emissionPeriod by the timerAdjustment to get a fake but more 
    // visualizable emissionPeriod. A timerAdjustment of 1 will keep 
    // the emissionPeriod to 10 mins. A timerAdjustment of 2 will 
    // halve the emissionPeriod to 5 mins, and so on. A  timerAdjusment
    // of 600 is suggested for an emissionPeriod of 1 second
    emissions: function(timerAdjusment) {
        
        const emissionPeriod = 600000  / timerAdjustment;
    
        let count = 1;
        const emitter = setInterval(function() {
    
            dygraphData.push(focus[count]);
            g2.updateOptions( { 'file': dygraphData } );
            count++;
        }, emissionPeriod);
    },
    
    changeSonde: function() {
    
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
        const data = Papa.parse(
            '/entry-files/H/HO/HON/Hong-Kong-Bay-Red-Tide-Data/js/Yim-Tin-Tsai-FCZ.csv', 
            {
                header: true,
                download: true,
                complete: this.foo
            }
        );

        let g2 = new Dygraph(
            document.getElementById("graph"),
            dygraphData, 
            {
                rollPeriod: 7,
                showRoller: true,
                title: 'Yim Tin Tsai Fish Culture Zone',
                legend: 'always',
                showRangeSelector: true,
                labels: fields
            }
        );
    }
};