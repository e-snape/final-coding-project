//github stuff:
//


let playing;
let ampEnv1;
//let interval;

let buttonActive = false;
let spacePressed = false;
let timeyWimeyPressed = false;
let isPressed = false;
let Afill, Bfill, Cfill, Dfill, Efill, Ffill, Gfill = false;

let randomNotes = [];
let randomNumbers = [];
let randomVowels;
let sampleFile;
let mySampler = ["Aaa.wav", "Eee.wav", "Iii.wav", "Ooo.wav", "Uuu.wav"];
let pattern;
let kickSeq;
let kickPart;
let snareSeq;
let snarePart;
let hihatSeq;
let hihatPart;

let timeyWimey;
let lead, leadFilter, leadDelay;
let leadFilterValue, leadDelayValue;
let synthBass;
let plucky;
let drumMachine;

let val;
let chordStatus;

let C = [];
let D = [];
let E = [];
let F = [];
let G = [];
let A = [];
let B = [];

function setup() {
cnv = createCanvas(windowWidth, windowHeight);
generateInstruments();
loadDrumMachine();
leadFilterValue = 1500;
leadDelayValue = 0.5;
generateLead();

console.log("take me away button starts/stops transport");
console.log("press/thank you button plays timey wimey sound (once transport is started)");
console.log("pressing space starts/stops random bassline pattern (once transport is started)");

Tone.Transport.stop();
Tone.Transport.position = "0";

Tone.Transport.loop = true;
Tone.Transport.loopStart = "0:0:0"; //bar, beat, sixteenths
Tone.Transport.loopEnd = "4";

//for (let i = 0; i < 4; i++){
//  kick1 = new MyDrums(i*50, 400, 20);
//  kick[i].push(kick1)
//}
loadDrums();
addGUI();
leadFilterSlider.value(1500);
leadDelaySlider.value(0.5);
makeBassNotes();
generatePattern();
timeyWimeySequence();
}

function loadDrums(){

kick1 = new MyDrums(50, 550, 20, false, 0, "A3");
kick2 = new MyDrums(80, 550, 20, false, 0, "A3");
kick3 = new MyDrums(110, 550, 20, false, 0, "A3");
kick4 = new MyDrums(140, 550, 20, false, 0, "A3");
kick5 = new MyDrums(170, 550, 20, false, 0, "A3");
kick6 = new MyDrums(200, 550, 20, false, 0, "A3");
kick7 = new MyDrums(230, 550, 20, false, 0, "A3");
kick8 = new MyDrums(260, 550, 20, false, 0, "A3");
kick9 = new MyDrums(290, 550, 20, false, 0, "A3");
kick10 = new MyDrums(320, 550, 20, false, 0, "A3");
kick11 = new MyDrums(350, 550, 20, false, 0, "A3");
kick12 = new MyDrums(380, 550, 20, false, 0, "A3");
kick13 = new MyDrums(410, 550, 20, false, 0, "A3");
kick14 = new MyDrums(440, 550, 20, false, 0, "A3");
kick15 = new MyDrums(470, 550, 20, false, 0, "A3");
kick16 = new MyDrums(500, 550, 20, false, 0, "A3");

snare1 = new MyDrums(50, 515, 20, false, 70, "A3");
snare2 = new MyDrums(80, 515, 20, false, 70, "A3");
snare3 = new MyDrums(110, 515, 20, false, 70, "A3");
snare4 = new MyDrums(140, 515, 20, false, 70, "A3");
snare5 = new MyDrums(170, 515, 20, false, 70, "A3");
snare6 = new MyDrums(200, 515, 20, false, 70, "A3");
snare7 = new MyDrums(230, 515, 20, false, 70, "A3");
snare8 = new MyDrums(260, 515, 20, false, 70, "A3");
snare9 = new MyDrums(290, 515, 20, false, 70, "A3");
snare10 = new MyDrums(320, 515, 20, false, 70, "A3");
snare11 = new MyDrums(350, 515, 20, false, 70, "A3");
snare12 = new MyDrums(380, 515, 20, false, 70, "A3");
snare13 = new MyDrums(410, 515, 20, false, 70, "A3");
snare14 = new MyDrums(440, 515, 20, false, 70, "A3");
snare15 = new MyDrums(470, 515, 20, false, 70, "A3");
snare16 = new MyDrums(500, 515, 20, false, 70, "A3");

hihat1 = new MyDrums(50, 480, 20, false, 140, "A3");
hihat2 = new MyDrums(80, 480, 20, false, 140, "A3");
hihat3 = new MyDrums(110, 480, 20, false, 140, "A3");
hihat4 = new MyDrums(140, 480, 20, false, 140, "A3");
hihat5 = new MyDrums(170, 480, 20, false, 140, "A3");
hihat6 = new MyDrums(200, 480, 20, false, 140, "A3");
hihat7 = new MyDrums(230, 480, 20, false, 140, "A3");
hihat8 = new MyDrums(260, 480, 20, false, 140, "A3");
hihat9 = new MyDrums(290, 480, 20, false, 140, "A3");
hihat10 = new MyDrums(320, 480, 20, false, 140, "A3");
hihat11 = new MyDrums(350, 480, 20, false, 140, "A3");
hihat12 = new MyDrums(380, 480, 20, false, 140, "A3");
hihat13 = new MyDrums(410, 480, 20, false, 140, "A3");
hihat14 = new MyDrums(440, 480, 20, false, 140, "A3");
hihat15 = new MyDrums(470, 480, 20, false, 140, "A3");
hihat16 = new MyDrums(500, 480, 20, false, 140, "A3");


}

function addGUI() {
  //button functions go here
    button = createButton("(press)"); //this creates a basic html button (called dom element)
    button.addClass("button");  //this follows the button styling in style.css
    button.position(1000, 250); //controls where the button is on the page
    button.mousePressed(playTimeyWimey); //controls which function is envoked when button is pressed

    transportButton = createButton("take me away baby");
    transportButton.addClass("button1");
    transportButton.position(120, 15);
    transportButton.mousePressed(transportGO);

    drumButton = createButton("big button of drum destiny");
    drumButton.addClass("button2");
    drumButton.position(45, 445);
    drumButton.mousePressed(drumMachinePart);

    drumClear = createButton("clear input");
    drumClear.addClass("button2");
    drumClear.position(285, 445);
    drumClear.mousePressed(clearDrums);

    drumShush = createButton("shut up");
    drumShush.addClass("button2");
    drumShush.position(405, 445);
    drumShush.mousePressed(drumsShush);

    updateLead = createButton("update effects");
    updateLead.addClass("button1");
    updateLead.position(625, 150);
    updateLead.mousePressed(generateLead);

    slider = createSlider(1, 4, -12, 1); // creates a basic slider
    slider.addClass("slider"); // adds styling from style.css
    slider.position(550, 100);  //sets the slider positon
    //slider.style('width', '80px');

    bpmSlider = createSlider(60, 180, -12, 1);
    bpmSlider.addClass("bpmSlider");
    bpmSlider.position(10, 120);

    leadFilterSlider = createSlider(40, 2000, -12, 1);
    leadFilterSlider.addClass("slider");
    leadFilterSlider.position(550, 200);

    leadDelaySlider = createSlider(0, 1, -12, 0.01);
    leadDelaySlider.addClass("slider");
    leadDelaySlider.position(550, 250);
  }

function draw() {
  background(220);
  fill(0, 0, 255, 25);
  rect(45, 475, 240, 100);
  rect(105, 475, 60, 100);
  rect(225, 475, 60, 100);

  fill(255, 0, 0, 25);
  rect(285, 475, 240, 100);
  rect(345, 475, 60, 100);
  rect(465, 475, 60, 100);

 noStroke();
 fill(70);
 textSize(12);
  text("hi-hat", 530, 495);
  text("snare", 530, 530);
  text("kick", 530, 565);

  text("chord", 510, 110);
  text("cutoff", 510, 210);
  text("delay", 510, 260);

//for(Cnote = 50; Cnote>=0; Cnote = Cnote - 0.1){
    if(Cfill === true){
      fill(255, 205, 0, 150);
      circle(1025, 150, 150);
    }

    if(Dfill === true){
      fill(0, 0, 200, 150);
      circle(1135, 165, 150);
    }
  //}
    if(Efill === true){
      fill(240, 50, 220, 150);
      circle(1150, 275, 150);
  //console.log(Efill);
    } 

    if(Ffill === true){
      fill(255, 160, 0, 150);
      circle(1135, 385, 150);
  //console.log(Efill);
    } 

    if(Gfill === true){
      fill(25, 0, 150, 150);
      circle(1025, 400, 150);
    }

    if(Afill === true){
      fill(255, 0, 0, 150);
      circle(925, 385, 150);
    }

    if(Bfill === true){
      fill(0, 200, 0, 150);
      circle(900, 275, 150);
    }


  //circle(1025, 150, 50)

  let transPos = Tone.Transport.position;
  let bars = transPos[0];
  let beats = transPos[2];

//interval = ((60/Tone.Transport.bpm.value)*8000);
//console.log(interval);
  
  //console.log(transPos);

noStroke();
Tone.Transport.bpm.value = bpmSlider.value();
textSize(400);
fill((bars*200), 0, 200-(bars*200), 25);
text((bpmSlider.value()), 10, 300);

val = slider.value();
leadFilterValue = leadFilterSlider.value();
leadDelayValue = leadDelaySlider.value();
//console.log(val);

sliderCommander();

textSize(150);
fill((bars*200), 0, 200-(bars*200), 50);
//text-align(right);
text(chordStatus, 700, 575); //first parameter = word, 2nd and 3rd are where

textSize(24);
fill(0);
text(transPos, 15, 30);


stroke(1);
for (let i = 0; i < 4; i ++){
  noFill();
  rect((60*i)+10, 50, 50, 50);
}

//console.log (beats);
fill((bars*200), 0, 200-(bars*200));
rect((beats*60)+10, 50, 50, 50);

//console.log(mouseX);
//console.log(mouseY);

displayKicks();
displaySnares();
displayHiHats();

}

function displayKicks(){

kick1.show();
kick1.pressed();
//console.log(kick1.part);

kick2.show();
kick2.pressed();

kick3.show();
kick3.pressed();

kick4.show();
kick4.pressed();

kick5.show();
kick5.pressed();

kick6.show();
kick6.pressed();

kick7.show();
kick7.pressed();

kick8.show();
kick8.pressed();

kick9.show();
kick9.pressed();

kick10.show();
kick10.pressed();

kick11.show();
kick11.pressed();

kick12.show();
kick12.pressed();

kick13.show();
kick13.pressed();

kick14.show();
kick14.pressed();

kick15.show();
kick15.pressed();

kick16.show();
kick16.pressed();

}

function displaySnares(){

snare1.show();
snare1.snarePressed();

snare2.show();
snare2.snarePressed();

snare3.show();
snare3.snarePressed();

snare4.show();
snare4.snarePressed();

snare5.show();
snare5.snarePressed();

snare6.show();
snare6.snarePressed();

snare7.show();
snare7.snarePressed();

snare8.show();
snare8.snarePressed();

snare9.show();
snare9.snarePressed();

snare10.show();
snare10.snarePressed();

snare11.show();
snare11.snarePressed();

snare12.show();
snare12.snarePressed();

snare13.show();
snare13.snarePressed();

snare14.show();
snare14.snarePressed();

snare15.show();
snare15.snarePressed();

snare16.show();
snare16.snarePressed();

}

function displayHiHats(){

hihat1.show();
hihat1.hihatPressed();

hihat2.show();
hihat2.hihatPressed();

hihat3.show();
hihat3.hihatPressed();

hihat4.show();
hihat4.hihatPressed();

hihat5.show();
hihat5.hihatPressed();

hihat6.show();
hihat6.hihatPressed();

hihat7.show();
hihat7.hihatPressed();

hihat8.show();
hihat8.hihatPressed();

hihat9.show();
hihat9.hihatPressed();

hihat10.show();
hihat10.hihatPressed();

hihat11.show();
hihat11.hihatPressed();

hihat12.show();
hihat12.hihatPressed();

hihat13.show();
hihat13.hihatPressed();

hihat14.show();
hihat14.hihatPressed();

hihat15.show();
hihat15.hihatPressed();

hihat16.show();
hihat16.hihatPressed();

}

function clearDrums(){

  kick1.kickClear();
  kick2.kickClear();
  kick3.kickClear();
  kick4.kickClear();
  kick5.kickClear();
  kick6.kickClear();
  kick7.kickClear();
  kick8.kickClear();
  kick9.kickClear();
  kick10.kickClear();
  kick11.kickClear();
  kick12.kickClear();
  kick13.kickClear();
  kick14.kickClear();
  kick15.kickClear();
  kick16.kickClear();

  snare1.snareClear();
  snare2.snareClear();
  snare3.snareClear();
  snare4.snareClear();
  snare5.snareClear();
  snare6.snareClear();
  snare7.snareClear();
  snare8.snareClear();
  snare9.snareClear();
  snare10.snareClear();
  snare11.snareClear();
  snare12.snareClear();
  snare13.snareClear();
  snare14.snareClear();
  snare15.snareClear();
  snare16.snareClear();

  hihat1.hihatClear();
  hihat2.hihatClear();
  hihat3.hihatClear();
  hihat4.hihatClear();
  hihat5.hihatClear();
  hihat6.hihatClear();
  hihat7.hihatClear();
  hihat8.hihatClear();
  hihat9.hihatClear();
  hihat10.hihatClear();
  hihat11.hihatClear();
  hihat12.hihatClear();
  hihat13.hihatClear();
  hihat14.hihatClear();
  hihat15.hihatClear();
  hihat16.hihatClear();

  drumMachinePart();
}

function drumsShush(){
  if (isPressed) {
    isPressed = false;
    drumMachine.volume.value = -100;
    drumShush.html("shut up");
    console.log('drums quiet');
  } else {
    isPressed = true;
    drumMachine.volume.value = -8;
    drumShush.html("make a racket");
    console.log('drums loud');
  }
}

function transportGO() {
  //the button pressed function
  if (isPressed) {
    isPressed = false;
    Tone.Transport.stop();
    transportButton.html("take me away baby");
    console.log('transport STOPPED');
  } else {
    isPressed = true;
    Tone.Transport.start(); 
    transportButton.html("GO GO GO GO");
    console.log('transport GO');
  }
}

function playTimeyWimey() {
  //the button pressed function
  //console.log('button pressed');
  button.html("(thank you)");
  ampEnv1.triggerAttackRelease();
  //console.log('envelope triggered');
}

function timeyWimeySequence(){
  
  let myTimeyWimeySeq = [["C6", "D6", "D#6","F6"], ["G6", "G#6", "A#6", "C7", "D7"], ["D#7", "F7", "G7", "G#7", "A#7", "C8"]];
  
  timeyWimey = new Tone.Sequence((time, note) => {
  plucky.triggerAttackRelease(note, 0.1, time);
  // subdivisions are given as subarrays
  }, myTimeyWimeySeq).start(0);
}

function makeBassNotes(){

  let myBass = ["C0", 0, "D1", 0, "E0", "F0", 0, "G0", "A0", 0, "B0", 0, "C1"];

  for(let i = 0; i < 8; i++){
    randomNumbers [i] = round(random(0, 12));
    randomNotes.push(myBass[randomNumbers[i]]);
  }
  console.log(randomNotes);
}

function generatePattern(){

    pattern = new Tone.Pattern((time, note) =>{
      synthBass.triggerAttack(note, 0.1, 0.6);
      }, randomNotes, "up"). start(0);
    //pattern.start(0);
    //console.log('pattern generated');
  
  //pattern = new Tone.Pattern((time, note) =>{
  //synthBass.triggerAttack(note, 0.1, 0.8);
  //}, randomNotes, "up"). start(0);
}

function sliderCommander(){

  if (val == 1){
    chordStatus = "melody";
    C = ["C3"];
    D = ["D3"];
    E = ["E3"];
    F = ["F3"];
    G = ["G3"];
    A = ["A3"];
    B = ["B3"];
  } else if (val == 2){
    chordStatus = "company";
    //console.log("i got you");
    C = ["C3", "E3"];
    D = ["D3", "F3"];
    E = ["E3", "G3"];
    F = ["F3", "A3"];
    G = ["G3", "B3"];
    A = ["A3", "C4"];
    B = ["B3", "D4"];
  } else if (val == 3){
    chordStatus = "crowd";
    C = ["C3", "E3", "G3"];
    D = ["D3", "F3", "A3"];
    E = ["E3", "G3", "B3"];
    F = ["F3", "A3", "C4"];
    G = ["G3", "B3", "D4"];
    A = ["A3", "C4", "E4"];
    B = ["B3", "D4", "F4"];
  } else if (val == 4){
    chordStatus = "jazz";
    C = ["C3", "E3", "G3", "B3"];
    D = ["D3", "F3", "A3", "C3"];
    E = ["E3", "G3", "B3", "D4"];
    F = ["F3", "A3", "C4", "E4"];
    G = ["G3", "B3", "D4", "F4"];
    A = ["A3", "C4", "E4", "G4"];
    B = ["B3", "D4", "F4", "A4"];
  }
}

function keyPressed(){

  if(key === 'c'){
    lead.triggerAttackRelease(C, 0.8); //0.8 is release time
    Cfill = true;
    setTimeout(()=>{
      Cfill = false;
    },500);
      //console.log(Cnote);
  } else if (key === 'd'){
    lead.triggerAttackRelease(D, 0.8);
    Dfill = true;
    setTimeout(()=>{
      Dfill = false;
    },500);
  } else if (key === 'e'){
    lead.triggerAttackRelease(E, 0.8);
    Efill = true;
    setTimeout(()=>{
      Efill = false;
    },500);
  } else if (key === 'f'){
    lead.triggerAttackRelease(F, 0.8);
    Ffill = true;
    setTimeout(()=>{
      Ffill = false;
    },500);
  } else if (key === 'g'){
    //leadEffect();
    lead.triggerAttackRelease(G, 0.8);
    Gfill = true;
    setTimeout(()=>{
      Gfill = false;
    },500);
    //console.log(G);
  } else if (key === 'a'){
    lead.triggerAttackRelease(A, 0.8);
    Afill = true
    setTimeout(()=>{
      Afill = false;
    },500);
  } else if (key === 'b'){
    lead.triggerAttackRelease(B, 0.8);
    Bfill = true
    setTimeout(()=>{
      Bfill = false;
    },500);
  }

  if (keyCode === 32) {
    if (spacePressed) {
      spacePressed = false;
      console.log('bass stopped');
      pattern.stop()
      ampEnvBass.triggerRelease();
      //console.log('envolope released');
    } else {
      spacePressed = true;
      console.log('bass started');
      pattern.start(0);
      ampEnvBass.triggerAttack();
      //console.log('envelope triggered');
    }
    }

}

function generateInstruments(){``

  //--------- BASS HERE ------

  const lfilter = new Tone.Filter({
    frequency: 1200,
    type: "lowpass",
    rolloff: -24
  }).toDestination();
  
  const crusher = new Tone.BitCrusher({
    bit: 8,
    sampleTime: 1
  }).connect(lfilter);
  
   ampEnvBass = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    decay: 0.2,
    sustain: 1.0,
    release: 0.4
  }).connect(crusher);
  
 synthBass = new Tone.Synth({
    volume: -4
  }).connect(ampEnvBass);

//--------- BASS DONE ------

//---------PLUCKY HERE ------

  const lfilter1 = new Tone.Filter({
    frequency: 2000,
    type: "lowpass",
    rolloff: -12
  }).toDestination();
  
   ampEnv1 = new Tone.AmplitudeEnvelope({
    attack: 0.01,
    decay: 1,
    sustain: 0,
    release: 0
  }).connect(lfilter1);

  const pingPong = new Tone.PingPongDelay("8n", 0.8).toDestination();
  
  plucky = new Tone.PluckSynth({
    resonance: 0.9
  }).connect(ampEnv1);
  
  reverb = new Tone.Reverb({
    wet: 0.9,
    decay: 10
  }).toDestination();
  
  lfilter1.connect(reverb);

  reverb.connect(pingPong);

//---------PLUCKY DONE ------

//---------SAMPLER HERE ------
//setInterval(console.log(randomVowels),5000);

//sampler = new Tone.Sampler({
//  urls: {
//    B3: "Uuu.wav",
//  },
//  baseUrl: "samples/",
//}).toDestination();

//sampler.volume.value = -10;

//---------SAMPLER DONE ------
}

//setInterval(() => {leadEffect()}, 1000);

function generateLead(){

  leadFilter = new Tone.Filter(leadFilterValue, "lowpass").toDestination();

  leadDelay = new Tone.FeedbackDelay({
    delayTime: "8n", 
    feedback: 0.5,
    wet: leadDelayValue,
  }).connect(leadFilter);

  lead = new Tone.PolySynth().connect(leadDelay);
// set the attributes across all the voices using 'set'
lead.set({
   volume: -10 ,
  });
}

function drumMachinePart(){

//console.log("loop set");
//console.log(kick1.part);
//console.log(kick2.part);
//console.log(kick3.part);
//console.log(kick4.part);
//console.log(kick9.part);
//console.log(kick10.part);
//.log(kick11.part);
//console.log(kick12.part);

kickPart = [["0:0:0", kick1.part],["0:0:2", kick2.part],["0:1:0", kick3.part],["0:1:2", kick4.part],["0:2:0", kick5.part],["0:2:2", kick6.part],["0:3:0", kick7.part],["0:3:2", kick8.part],["1:0:0", kick9.part],["1:0:2", kick10.part], ["1:1:0", kick11.part],["1:1:2", kick12.part],["1:2:0", kick13.part],["1:2:2", kick14.part],["1:3:0", kick15.part],["1:3:2", kick16.part]];

  kickSeq = new Tone.Part((time, note) => {
    drumMachine.triggerAttackRelease(note, 0.1, time);
  }, kickPart).start(0);

  //console.log(kickSeq.length);

snarePart = [["0:0:0", snare1.part],["0:0:2", snare2.part],["0:1:0", snare3.part],["0:1:2", snare4.part],["0:2:0", snare5.part],["0:2:2", snare6.part],["0:3:0", snare7.part],["0:3:2", snare8.part],["1:0:0", snare9.part],["1:0:2", snare10.part], ["1:1:0", snare11.part],["1:1:2", snare12.part],["1:2:0", snare13.part],["1:2:2", snare14.part],["1:3:0", snare15.part],["1:3:2", snare16.part]];

  snareSeq = new Tone.Part((time, note) => {
    drumMachine.triggerAttackRelease(note, 0.1, time);
  }, snarePart).start(0);

hihatPart = [["0:0:0", hihat1.part],["0:0:2", hihat2.part],["0:1:0", hihat3.part],["0:1:2", hihat4.part],["0:2:0", hihat5.part],["0:2:2", hihat6.part],["0:3:0", hihat7.part],["0:3:2", hihat8.part],["1:0:0", hihat9.part],["1:0:2", hihat10.part], ["1:1:0", hihat11.part],["1:1:2", hihat12.part],["1:2:0", hihat13.part],["1:2:2", hihat14.part],["1:3:0", hihat15.part],["1:3:2", hihat16.part]];

  hihatSeq = new Tone.Part((time, note) => {
    drumMachine.triggerAttackRelease(note, 0.1, time);
  }, hihatPart).start(0);

}

function loadDrumMachine(){

drumMachine = new Tone.Sampler({
  urls: {
    C3: "kick.wav",
    A3: "silence.wav",
    E3: "snare.wav",
    B3: "hihat.wav",
  },
  baseUrl: "samples/",
}).toDestination();
  
drumMachine.volume.value = -10;
}

class MyDrums{
  constructor(x, y, s, buttonActive, c, part){
    this.x = x;
    this.y = y;
    this.s = s;
    this.buttonActive = buttonActive;
    this.c = c;
    this.part = part;
  }

show() {
  noStroke();
  fill(this.c);
  rect(this.x, this.y, this.s);
}

pressed(){
if(mouseIsPressed){
  if((mouseX>this.x && mouseX<this.x+this.s) && (mouseY>this.y && mouseY<this.y+this.s)){
    //console.log("mouse inside")

    if(this.buttonActive){
      this.buttonActive = false;
      //console.log("button inactive");
      this.c = 0;
      this.part = "A3";
      //drumMachinePart();
      //console.log(this.part);
    } else{
      this.buttonActive = true;
      //console.log("button active");
      this.c = 255;
      this.part = "C3";
      //console.log(this.part);
    }

  } else{
  //console.log("mouse outside")
}}}

kickClear(){
  this.c = 0;
  this.part = "A3";
}

snarePressed(){
  if(mouseIsPressed){
  if((mouseX>this.x && mouseX<this.x+this.s) && (mouseY>this.y && mouseY<this.y+this.s)){
    //console.log("mouse inside")

    if(this.buttonActive){
      this.buttonActive = false;
      //console.log("button inactive");
      this.c = 70;
      this.part = "A3";
      //drumMachinePart();
      //console.log(this.part);
    } else{
      this.buttonActive = true;
      //console.log("button active");
      this.c = 255;
      this.part = "E3";
      //console.log(this.part);
    }

  } else{
  //console.log("mouse outside")
}}}

snareClear(){
  this.c = 70;
  this.part = "A3";
}

hihatPressed(){
  if(mouseIsPressed){
  if((mouseX>this.x && mouseX<this.x+this.s) && (mouseY>this.y && mouseY<this.y+this.s)){
    //console.log("mouse inside")

    if(this.buttonActive){
      this.buttonActive = false;
      //console.log("button inactive");
      this.c = 140;
      this.part = "A3";
      //drumMachinePart();
      //console.log(this.part);
    } else{
      this.buttonActive = true;
      //console.log("button active");
      this.c = 255;
      this.part = "B3";
      //console.log(this.part);
    }

  } else{
  //console.log("mouse outside")
}}}

hihatClear(){
  this.c = 140;
  this.part = "A3";
}

}
