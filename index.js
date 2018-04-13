'use strict'

// Documentation: http://scribbletune.com/documentation.html
// Demo: https://www.youtube.com/watch?v=dIiwFzFvsmw
// Demo: https:/github.com/walmik/scribbletune
// Demo: https://github.com/BIOTONIC/ScribbletuneMusic
// x note on
// - note off
// _ sustain

const scribble 	= require('scribbletune');
const util 		= require('util');
const exec 		= util.promisify(require('child_process').exec);

let fileName 	= 'tempFile.mid';
let allChords	= scribble.listChords();

async function playFile(file) {
	  const { stdout, stderr } = await exec('start ' + file);
	  process.stdout.write('\nSTDOUT: ' + stdout);
	  process.stderr.write('\nSTDERR: ' + stderr);
	  process.stdout.write('\nBye!');
}

process.stdout.write('All available chords:\n' + allChords);

// Notes
let cMajor = scribble.scale('c', 'major');

// Partlist
const p01 = scribble.clip({
    notes: 'F#m C#m Dmaj Bm Emaj Amaj Dmaj C#m Amaj',
    pattern: 'x_x_x_--'.repeat(8),
    sizzle: true
});  
const p02 = scribble.clip({
	notes: cMajor.filter((a, x) => x % 2 === 0),
	pattern: 'x-x-x-x-x-x-x-x-'
});  
const p03 = scribble.clip({
	notes: cMajor.filter((a, x) => x % 2),
	pattern: 'x-'.repeat(8)
});  

scribble.midi(p02.concat(p03), fileName);
playFile(fileName);