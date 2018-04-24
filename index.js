var dgram = require('dgram'),
    server = dgram.createSocket('udp4'),
    dns = require('dns');

server.bind(14235);

server.on('message', function(msgBuf, rinfo) {
	var msg = msgBuf.toString('utf8');

	if(msg.indexOf(',') > -1) {
		var input = msg.split(','),
		ip = input[0],
		mac = input[1];

	dns.reverse(ip, function(err, hostnames) {
		var hostname = "";
		if(hostnames && hostnames.length > 0) {
			hostname = hostnames[0];
			if (hostname.indexOf('.') > -1) {
				hostname = hostname.substring(0, hostname.indexOf('.'));
			}
		}
		var date = new Date().toISOString(); 
		console.log(date + ',' + mac + ',' + ip + ',' + hostname);
	})
		
	
		server.send(Buffer.from(mac), rinfo.port, rinfo.address);
	} else if (msg.substring(0,2) == "OK") {
//		console.log('OK!');
	} else if (msg.substring(0,5) == "FAILD") {
//		console.log('Failed');
	} else {
		console.log('Unknown Message: '+ msg);
	}	
});
