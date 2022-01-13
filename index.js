/*globals window, document, setInterval, event , localStorage */

let eCmbQuestion;
let record;

function changeMode(){
  const startTime1 = performance.now(); // 開始時間

  const startTimeHiScore = performance.now(); // 開始時間
  drawHiScore();
  const endTimeHiScore = performance.now(); // 終了時間
  
  console.log('changeMode(Hiscore) -> ' + (endTimeHiScore - startTimeHiScore)); // 何ミリ秒かかったかを表示する

  const startTimeColor = performance.now(); // 開始時間
  changeModeColor();
  const endTimeColor = performance.now(); // 終了時間
  console.log('changeMode(Color) -> ' + (endTimeColor - startTimeColor)); // 何ミリ秒かかったかを表示する

  const startTimeSelectscore = performance.now(); // 開始時間
  updateSelectScore();
  const endTimeSelectscore = performance.now(); // 終了時間
  console.log('changeMode(updateSelectScore) -> ' + (endTimeSelectscore - startTimeSelectscore)); // 何ミリ秒かかったかを表示する

  const endTime1 = performance.now(); // 終了時間
  console.log('changeMode -> ' + (endTime1 - startTime1)); // 何ミリ秒かかったかを表示する
}

function changeTarget(){
  const startTime = performance.now(); // 開始時間

  changeTargetColor();
  updateSelectScore();

  const endTime = performance.now(); // 終了時間
  console.log('changeTarget -> ' + (endTime - startTime)); // 何ミリ秒かかったかを表示する
}

function updateSelectScore(){
  let selectMode = getSelectMode();
  let selectTarget = getSelectTarget();

  for(let i in record.dataIndex){
    if(record.dataIndex[i].toString() === selectTarget){
      elblScore.innerText = record.score[i];
      elblTime.innerText = record.sec[i];
      elblSelectDataRank.innerText = record.rank[i];
      elblSelectDataRank.style.color = getRankColor(record.rank[i]);

      return 0;
    }
  }
  elblScore.innerText = '-';
  elblTime.innerText = '-';
  elblSelectDataRank.innerText = '-';
  elblSelectDataRank.style.color = '#7A756D';
}

let selectedTarget;
let selectedMode;

function changeModeColor(){

  switch(selectedMode){
    case 'easy':
      elblEasy.style.background = "#000";
      elblEasy.style.color = "#FFF";
      break;
    case 'normal':
      elblNormal.style.background = "#000";
      elblNormal.style.color = "#FFF";
      break;
    case 'hard':
      elblHard.style.background = "#000";
      elblHard.style.color = "#FFF";
      break;
    default:
      alert('selectedMode error -> ' + selectedMode);
      break;
  }

  let selectMode = getSelectMode();

  switch(selectMode){
    case 'easy':
      selectedMode = 'easy';
      elblSelectDataMode.innerText = "EASY"
      elblEasy.style.background = "#FFF";
      elblEasy.style.color  = "#000";
      break;
    case 'normal':
      selectedMode = 'normal';
      elblSelectDataMode.innerText = "NORMAL"
      elblNormal.style.background = "#FFF";
      elblNormal.style.color  = "#000";
      break;
    case 'hard':
      selectedMode = 'hard';
      elblSelectDataMode.innerText = "HARD"
      elblHard.style.background = "#FFF";
      elblHard.style.color  = "#000";
      break;
    default:
      alert('selectedMode error -> ' + selectedMode);
      break;
  }
}
function changeTargetColor(){
  switch(selectedTarget){
    case '0':
      elblTohoku.style.background = "#000";
      elblTohoku.style.color = "#FFF";
      break;

    case '1':
      elblKanto.style.background = "#000";
      elblKanto.style.color = "#FFF";
      break;

    case '2':
      elblChubu.style.background = "#000";
      elblChubu.style.color = "#FFF";
      break;
    case '3':
      elblKinki.style.background = "#000";
      elblKinki.style.color = "#FFF";
      break;

    case '4':
      elblShikoku.style.background = "#000";
      elblShikoku.style.color = "#FFF";
      break;

    case '5':
      elblKyushu.style.background = "#000";
      elblKyushu.style.color = "#FFF";
      break;
    case '6':
      elblAll.style.background = "#000";
      elblAll.style.color = "#FFF";
      break;
    default:
      alert('selectedTarget error -> ' + selectedTarget);
  }

  let selectTarget = getSelectTarget();
  switch(selectTarget){
    case '0':
      selectedTarget = '0';
      elblSelectDataTrg.innerText = "Tohoku"
      elblTohoku.style.background = "#FFF";
      elblTohoku.style.color  = "#000";
      break;

    case '1':
      selectedTarget = '1';
      elblSelectDataTrg.innerText = "Kanto"
      elblKanto.style.background = "#FFF";
      elblKanto.style.color  = "#000";
      break;

    case '2':
      selectedTarget = '2';
      elblSelectDataTrg.innerText = "Chubu"
      elblChubu.style.background = "#FFF";
      elblChubu.style.color  = "#000";
      break;

    case '3':
      selectedTarget = '3';
      elblSelectDataTrg.innerText = "Kinki"
      elblKinki.style.background = "#FFF";
      elblKinki.style.color  = "#000";
      break;

    case '4':
      selectedTarget = '4';
      elblSelectDataTrg.innerText = "Shikoku"
      elblShikoku.style.background = "#FFF";
      elblShikoku.style.color  = "#000";
      break;

    case '5':
      selectedTarget = '5';
      elblSelectDataTrg.innerText = "Kyushu"
      elblKyushu.style.background = "#FFF";
      elblKyushu.style.color  = "#000";
      break;

    case '6':
      selectedTarget = '6';
      elblSelectDataTrg.innerText = "All"
      elblAll.style.background = "#FFF";
      elblAll.style.color  = "#000";
      break;

    default:
      alert('selectedTarget error -> ' + selectedTarget);
  }
}

function getSelectTarget(){
    let eRdoTrg = document.getElementsByName("rdoTrg");
    for(let i=0;i<eRdoTrg.length;i++){
	if(eRdoTrg[i].checked){
	    return eRdoTrg[i].value;
	}
    }
    return undefined;
}

function getSelectMode(){
    let eRdoMode = document.getElementsByName("rdoMode");
    for(let i=0;i<eRdoMode.length;i++){
	if(eRdoMode[i].checked){
	    return eRdoMode[i].value;
	}
    }
    return undefined;
}

function getHiScore() {
    'use strict';

    let result = new Object();

    let score = [];
    let rank = [];
    let sec = [];
    let dataIndex = [];
    let mode = [];

    let dataIndexCount = 6;

    let lsSort = [];
    let lsSortDataIndex = [];

    let selectMode = getSelectMode();

    //Loop for each data index
    for(let i = 0;i <= dataIndexCount;i++){
	for(let key in localStorage) {
	    let keys = key.split(',');

	    if(keys[0] === 'geography' &&  keys[1] === selectMode && keys[2] === i.toString()){
		lsSort.push(localStorage.getItem(keys));
		lsSortDataIndex.push(i);
	    }
	}   
    }

    let bestScore;
    let bestRank; 
    let bestSec;
    
    let beforeDataIndex = -1;

    for(let i in lsSort){
	let data = lsSort[i].split(',')
	if(beforeDataIndex === -1){
	    bestScore = data[0];
	    bestRank = data[1];
	    bestSec = data[2];

	    beforeDataIndex = lsSortDataIndex[i];

	}else if(beforeDataIndex !== lsSortDataIndex[i]){
	    score.push(bestScore);
	    rank.push(bestRank);
	    sec.push(bestSec);
	    dataIndex.push(beforeDataIndex);

	    bestScore = data[0];
	    bestRank = data[1];
	    bestSec = data[2];

	    beforeDataIndex = lsSortDataIndex[i];
	}else{
	    if(Number(bestScore) < Number(data[0])){
		bestScore = data[0];
		bestRank = data[1];
		bestSec = data[2];
	    }
	}
    }
    
    score.push(bestScore);
    rank.push(bestRank);
    sec.push(bestSec);
    dataIndex.push(beforeDataIndex);

    result.score = score;
    result.rank = rank;
    result.sec = sec;
    result.dataIndex = dataIndex;
    
    return result;
}

function getRankColor(rank){
    if(rank === 'AAA' || rank === 'AA' || rank === 'A' || rank === 'B'){
	return '#00CC00';
    }else if(rank === 'C' || rank === 'D'){
	return '#FFFF00';
    }else if(rank === 'E'){
	return '#FF0000';
    }else if(rank === 'F'){
	return '#FF00FF';
    }else{
	return '#FFFFFF';
    }
}    
function drawHiScore(){
    'use strict';

    elblTohokuRank.innerText = '';
    elblTohokuRank.style.color = '#7A756D';

    elblKantoRank.innerText = '';
    elblKantoRank.style.color = '#7A756D';

    elblChubuRank.innerText = '';
    elblChubuRank.style.color =  '#7A756D';

    elblKansaiRank.innerText =  '';
    elblKansaiRank.style.color = '#7A756D';

    elblShikokuRank.innerText = '';
    elblShikokuRank.style.color = '#7A756D';

    elblKyushuRank.innerText = '';
    elblKyushuRank.style.color = '#7A756D';

    elblAllRank.innerText = ''; 
    elblAllRank.style.color = '#7A756D';

    record = getHiScore();
    for(let i in record.dataIndex){
	if(record.dataIndex[i] === 0){
	    elblTohokuRank.innerText = record.rank[i];
	    elblTohokuRank.style.color = getRankColor(record.rank[i]);
	    
	}else if(record.dataIndex[i] === 1){
	    elblKantoRank.innerText = record.rank[i];
	    elblKantoRank.style.color = getRankColor(record.rank[i]);

	}else if(record.dataIndex[i] === 2){
	    elblChubuRank.innerText = record.rank[i];
	    elblChubuRank.style.color = getRankColor(record.rank[i]);

	}else if(record.dataIndex[i] === 3){
	    elblKansaiRank.innerText = record.rank[i];
	    elblKansaiRank.style.color = getRankColor(record.rank[i]);

	}else if(record.dataIndex[i] === 4){
	    elblShikokuRank.innerText = record.rank[i];
	    elblShikokuRank.style.color = getRankColor(record.rank[i]);

	}else if(record.dataIndex[i] === 5){
	    elblKyushuRank.innerText = record.rank[i];
	    elblKyushuRank.style.color = getRankColor(record.rank[i]);

	}else if(record.dataIndex[i] === 6){
	    elblAllRank.innerText = record.rank[i];
	    elblAllRank.style.color = getRankColor(record.rank[i]);
	}

    }	
}

function clickPlay() {
    'use strict';
    let selectDataIndex = getSelectTarget();
    let selectMode = getSelectMode();

    // MAIN
    if(selectMode === undefined){
	alert('Select "Mode".');
	return;
    }
    if(selectDataIndex === undefined){
	alert('Select "Target".');
	return;
    }
    window.location.href = 'main.html?mode='+ selectMode + '&index=' + selectDataIndex;

}
function clickData(){
  window.location.href = 'note.html';
}

function clickScoreReset() {
  let check = window.confirm("Deletes the score of the selected MODE. Is it OK?");

  if (check){
    let selectMode = getSelectMode();
    for(let key in localStorage) {
      let keys = key.split(',');
      if(keys[0] === 'geography' &&  keys[1] === selectMode){
        localStorage.removeItem(key);
        drawHiScore();
      }
    }
  }
}
let elblScore;
let elblTime;
let elblSelectDataRank;
let elblSelectDataMode;
let elblEasy;
let elblNormal;
let elblHard;
let elblSelectDataTrg;
let elblTohoku;
let elblKanto;
let elblChubu;
let elblKinki;
let elblShikoku;
let elblKyushu;
let elblAll;
let elblTohokuRank;
let elblKantoRank;
let elblChubuRank;
let elblKansaiRank;
let elblShikokuRank;
let elblKyushuRank;
let elblAllRank;

window.onload = function () {
  'use strict';
  elblScore         = document.getElementById("lblScore");
  elblTime          = document.getElementById("lblTime");
  elblSelectDataRank= document.getElementById("lblSelectDataRank");
  elblSelectDataMode= document.getElementById("lblSelectDataMode");
  elblEasy          = document.getElementById("lblEasy");
  elblNormal        = document.getElementById("lblNormal");
  elblHard          = document.getElementById("lblHard");
  elblSelectDataTrg = document.getElementById("lblSelectDataTrg");
  elblTohoku        = document.getElementById("lblTohoku");
  elblKanto         = document.getElementById("lblKanto");
  elblChubu         = document.getElementById("lblChubu");
  elblKinki         = document.getElementById("lblKinki");
  elblShikoku       = document.getElementById("lblShikoku");
  elblKyushu        = document.getElementById("lblKyushu");
  elblAll           = document.getElementById("lblAll");
  elblTohokuRank    = document.getElementById("lblTohokuRank");
  elblKantoRank     = document.getElementById("lblKantoRank");
  elblChubuRank     = document.getElementById("lblChubuRank");
  elblKansaiRank    = document.getElementById("lblKansaiRank");
  elblShikokuRank   = document.getElementById("lblShikokuRank");
  elblKyushuRank    = document.getElementById("lblKyushuRank");
  elblAllRank       = document.getElementById("lblAllRank");

  rdoTohoku.addEventListener("click", changeTarget, false); 
  rdoKanto.addEventListener("click", changeTarget, false);  
  rdoChubu.addEventListener("click", changeTarget, false);  
  rdoKinki.addEventListener("click", changeTarget, false); 
  rdoShikoku.addEventListener("click", changeTarget, false); 
  rdoKyushu.addEventListener("click", changeTarget, false); 
  rdoAll.addEventListener("click", changeTarget, false); 

  btnScoreReset.addEventListener("click", clickScoreReset, false); 
  btnData.addEventListener("click", clickData, false); 
  btnPlay.addEventListener("click", clickPlay, false); 

  rdoEasy.addEventListener("click", changeMode, false); 
  rdoNormal.addEventListener("click", changeMode, false); 
  rdoHard.addEventListener("click", changeMode, false); 

  let param = location.search.split('&')
  let prmMode;
  let prmDataIndex;
  if(param.length === 2){
    prmMode = param[0].split('=')[1];
    prmDataIndex = param[1].split('=')[1];
  }else{
    prmMode = 'easy';
    prmDataIndex = '0';
  }
 
 if(prmMode === 'easy'){
      rdoEasy.checked = true;
      selectedMode = 'easy';
 }else if(prmMode === 'normal'){
      rdoNormal.checked = true;
      selectedMode = 'normal';
 }else if(prmMode === 'hard'){
      rdoHard.checked = true;
      selectedMode = 'hard';
 }else{
      rdoEasy.checked = true;
      selectedMode = 'error';
 }

 if(prmDataIndex === '0'){
   rdoTohoku.checked=true
   selectedTarget = '0';
 }else if(prmDataIndex === '1'){
   rdoKanto.checked=true;
   selectedTarget = '1';
 }else if(prmDataIndex === '2'){
   rdoChubu.checked=true;
   selectedTarget = '2';
 }else if(prmDataIndex === '3'){
   rdoKinki.checked=true;
   selectedTarget = '3';

 }else if(prmDataIndex === '4'){
   rdoShikoku.checked=true;
   selectedTarget = '4';
 }else if(prmDataIndex === '5'){
   rdoKyushu.checked=true;
   selectedTarget = '5';
 }else if(prmDataIndex === '6'){
   rdoAll.checked=true;
   selectedTarget = '6';
 }else{
   selectedTarget = '-1';
 }

 drawHiScore();
 changeMode();
 changeTarget();

  let checkOption = document.getElementsByName('rdoMode');
  checkOption.forEach(function(e) {
      e.addEventListener("click", function() {           

      });
  });
};
