var synth = new Tone.Synth().toMaster();
let PANVAR = 0; // sets pan range
let synths = [];

let socket = io()
socket.on('connect', function() {
socket.emit('my event', "Connected mah boi!!!!!")
})

socket.on('server response', function(res){
  console.log(res)
})
socket.on('packet capture', function(res){

  packet = res.split("\t");
  if (packet[4] != undefined){
    port = packet[3].split(",")
  } else {
    port = ["", ""]
  }
  
  // console.log(packets[0])
  if(packet[1].includes("10.0.0")) {

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
  } else {

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

  
  //let synth = new Tone.Synth().connect(panner);

  //if (res.includes("443")) {
  //  //play a middle 'C' for the duration of an 8th note
  //  // panner.pan(-1); // synth.disconnect();
  //  PANVAR = -1;
  //  synth.disconnect();
  //  synth.connect(panner);
  //  //synth.setNote("C2");
  //  synth.triggerAttackRelease("C2", "8n");
  //  synths.push(synth);
  //  $("div.packet").replaceWith(
  //    `<div class='packet' style='color:green'>${res}</div>`
  //  );
  //} else if (res.includes("80")) {
  //  // panner.pan(1);
  //  PANVAR = 1;
  //  synth.disconnect();
  //  synth.connect(panner);
  //  //synth.setNote("C4");
  //  synth.triggerAttackRelease("C4", "8n");
  //  synths.push(synth);
  //  $("div.packet").replaceWith(
  //    `<div class='packet' style='color:red'>${res}</div>`
  //  );
  //} else {
  //  // panner.pan(0);
  //  PANVAR = 0;
  //  synth.disconnect();
  //  synth.connect(panner);
  //  //synth.setNote("C3");
  //  synth.triggerAttackRelease("c3", "8n");
  //  synths.push(synth);
  //  $("div.packet").replaceWith(
  //    `<div class='packet' style='color:black'>${res}</div>`
  //    );
  //}
  // console.log(res)
})
