const https = require('https');

const data = new URLSearchParams({
    topic: 'Test Topic Node',
    details: 'This is a test from Node.js',
    informantName: 'Tester',
    contactInfo: '0812345678'
}).toString();

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data)
    }
};

const req = https.request('https://script.google.com/macros/s/AKfycbxOdHclVRf54cH5nLryWBBjdwraPGEjhvOVsCgZnmK53psNlEacMO2veWNr-Yn7PteFHg/exec', options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    
    // GAS usually responds with a 302 redirect for web apps
    if (res.statusCode === 302 && res.headers.location) {
        console.log('Redirecting to:', res.headers.location);
        const req2 = https.request(res.headers.location, { method: 'GET' }, (res2) => {
            let body = '';
            res2.on('data', (chunk) => body += chunk);
            res2.on('end', () => console.log('Final Response:', body));
        });
        req2.end();
    } else {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => console.log('Response:', body));
    }
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(data);
req.end();
