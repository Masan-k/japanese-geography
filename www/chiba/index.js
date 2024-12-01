/*globals window, document, setInterval, event , localStorage */

'use strict';

/*
let eCmbQuestion;
let record;
*/

function changeMode(){
  drawHiScore();
  updateSelectScore();
}

function changeTarget(){
  drawHiScore();
  updateSelectScore();

}
function updateSelectScore(){
  return;
}
function clickPlay() {
  let selectTarget = getSelectTarget();
  let selectMode = getSelectMode();

  if(selectMode === undefined){
    alert('Select "Mode".');
    return;
  }
  if(selectTarget === undefined){
    alert('Select "Target".');
    return;
  }
  window.location.href = 'main.html?mode='+ selectMode + '&index=' + selectTarget;
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
function getSelectTarget(){
  let eRdoTrg = document.getElementsByName("rdoTrg");
  for(let i=0;i<eRdoTrg.length;i++){
    if(eRdoTrg[i].checked){
      return eRdoTrg[i].value;
    }
  }
  return undefined;
}

window.onload = function () {
  let param = location.search.split('&')
  let prmMode;
  let prmDataIndex;
  
  btnPlay.addEventListener("click", clickPlay, false); 

  if(param.length === 2){
    prmMode = param[0].split('=')[1];
    prmDataIndex = param[1].split('=')[1];
  }

  if(prmMode === 'easy'){rdoEasy.checked = true;
  }else if(prmMode === 'normal'){rdoNormal.checked = true;
  }else if(prmMode === 'hard'){rdoHard.checked = true;
  }else if(prmMode === 'veryEasy'){rdoVeryEasy.checked = true;
  }else{rdoEasy.checked = true;}

  if(prmDataIndex === '1'){rdo1.checked=true;}
  else if(prmDataIndex === '2'){rdo2.checked=true;}
  else if(prmDataIndex === '3'){rdo3.checked=true;}
  else if(prmDataIndex === 'all'){rdoAll.checked=true;}
  else{rdo1.checked=true;}

/*
 drawHiScore();
 changeMode();
 changeTarget();
 */

 /*
  checkOption.forEach(function(e){
    e.addEventListener("click", function() {
  });
 */
};
