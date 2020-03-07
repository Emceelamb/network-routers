let PANVAR = 0; // sets pan range
// let synths = [];

let socket = io()
socket.on('connect', function() {
  socket.emit('my event', "Connected mah boi!!!!!")
})

socket.on('server response', function(res){
  ip = res.split(":");
  console.log(ip[3])
  $('#peers').append(
    `
    <li class="peerIp">${ip[3]}</li>
    `
  )
})
socket.on('packet capture', function(res){
  let panner = new Tone.Panner(PANVAR).toDestination();
  let synth = new Tone.Synth().connect(panner);
  packet = res.split("\t");
  if (packet[4] != undefined){
    port = packet[3].split(",")
  } else {
    port = ["", ""]
  }
  
  // console.log(packets[0])
  if(packet[1].includes("10.0.0")) {

    PANVAR = -1;
    synth.disconnect();
    synth.connect(panner);
    //synth.setNote("C2");
    synth.triggerAttackRelease("C2","64n");
    // synths.push(synth);
  $("#outbound").html(
    `
          <div class="divTableRow">
            <div class="divTableCell"><strong>Domain</strong></div>
            <div class="divTableCell" id="packetDns">${packet[0]}</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell"><strong>Source IP<br /></strong></div>
            <div class="divTableCell" id="packetSrcIp">${packet[1]}</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell"><strong>Destination IP<br /></strong></div>
            <div class="divTableCell" id="packetSrcIp">${packet[2]}</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell"><strong>Source Port<br /></strong></div>
            <div class="divTableCell" id="packetSrcPort">${port[0]}</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell"><strong>Destination Port<br /></strong></div>
            <div class="divTableCell" id="packetDstPort">${port[1]}</div>
          </div>
    `
  )
  } else {

    PANVAR = 1;
    synth.disconnect();
    synth.connect(panner);
    //synth.setNote("C4");
    synth.triggerAttackRelease("C4", "64n");
    // synths.push(synth);
  $("#inbound").html(
    `
          <div class="divTableRow">
            <div class="divTableCell"><strong>Domain</strong></div>
            <div class="divTableCell" id="packetDns">${packet[0]}</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell"><strong>Source IP<br /></strong></div>
            <div class="divTableCell" id="packetSrcIp">${packet[1]}</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell"><strong>Destination IP<br /></strong></div>
            <div class="divTableCell" id="packetSrcIp">${packet[2]}</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell"><strong>Source Port<br /></strong></div>
            <div class="divTableCell" id="packetSrcPort">${port[0]}</div>
          </div>
          <div class="divTableRow">
            <div class="divTableCell"><strong>Destination Port<br /></strong></div>
            <div class="divTableCell" id="packetDstPort">${port[1]}</div>
          </div>
    `
  )
  }
  // $("div#packetDns").append(
  //   `${packets[0]}`
  // )
  // $("div#packetSrcIp").append(
  //   `${packets[1]}`
  // )
  // $("div#packetDstIp").append(
  //   `${packets[2]}`
  // )
  // $("div#packetSrcPort").append(
  //   `${packets[3]}`
  // )
  // $("div#packetDstPort").append(
  //   `${packets[4]}`
  // )

  
  // console.log(res)
})
