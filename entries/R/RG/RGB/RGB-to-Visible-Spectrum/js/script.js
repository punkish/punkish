window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

function wl(i) {
    let [r, g, b] = [0, 0, 0];

    const gamma = 0.80;
    const depth = 255;

    if (i >= 380 && i <= 440) {
        r = -1 * (i - 440) / (440 - 380);
        b = 1;
    }
    else if (i >= 440 && i <= 490 ) {
        g = (i - 440) / (490 - 440);
        b = 1;
    }
    else if (i >= 490 && i <= 510 ) {
        g = 1;
        b = -1 * (i - 510) / (510 - 490);
    }
    else if (i >= 510 && i <= 580 ) {
        r = (i - 510) / (580 - 510);
        g = 1;
    }
    else if (i >= 580 && i <= 645 ) {
        r = 1;
        g = -1 * (i - 645) / (645 - 580);
    }
    else if (i >= 645 && i <= 780 ) {
        r = 1;
    }

    // LET THE INTENSITY SSS FALL OFF NEAR THE VISION LIMITS
    let sss = 1;
    if (i > 700) {
        sss = 0.3 + 0.7 * (780 - i) / (780 - 700);
    }
    else if (i < 420) {
        sss = 0.3 + 0.7 * (i - 380) / (420 - 380);
    }

    // GAMMA ADJUST AND WRITE IMAGE TO AN ARRAY
    r = Math.floor(depth * ((sss * r) ** gamma));
    g = Math.floor(depth * ((sss * g) ** gamma));
    b = Math.floor(depth * ((sss * b) ** gamma));

    return [r, g, b]
}

function wavelength() {
    let datasets = [];
    let labels = [];

    let colors = {
        'red': [],
        'green': [],
        'blue': []
    };

    let red = [];
    let green = [];
    let blue = [];

    for (let i = 350; i <= 800; i = i + 10) {
        labels.push(i);
        
        let [r, g, b] = wl(i);
        colors.red.push(r);
        colors.green.push(g);
        colors.blue.push(b);
    }

    for (let color in colors) {
        datasets.push({
            label: color,
            backgroundColor: window.chartColors[color],
            borderColor: window.chartColors[color],
            data: colors[color],
            fill: false
        })
    }

    return [ labels, datasets ];
}

function chart(ctx) {
    
    const [labels, datasets] = wavelength();

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Approximate RGB values for Visible Wavelengths'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'wavelength (nm)'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'RGB value'
                    }
                }]
            }
        }
    });
}
