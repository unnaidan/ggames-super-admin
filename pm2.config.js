module.exports = {
    apps: [{
        name: 'api.ggames.mn',
        script: './dist/main.js',
        instances: 'max',
        exec_mode: 'cluster',
        env: {
            'NODE_ENV': 'production',
            'TZ': 'Asia/Ulaanbaatar'
        }
    }]
};
