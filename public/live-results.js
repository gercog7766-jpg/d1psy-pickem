(()=>{
const results=window.TOURNAMENT_RESULTS||{};
const predictedWinner=winner;
winner=function(id){return results[id]?.winner||predictedWinner(id)};
const originalPickMatch=pickMatch;
pickMatch=function(id,a='TBD',b='TBD',bo=3){
  const r=results[id];
  if(!r)return originalPickMatch(id,a,b,bo);
  const row=n=>{const outcome=n===r.winner?'actual-winner':n===r.loser?'actual-loser':'';const selected=picks[id]===n?' selected':'';const score=r.scores?.[n]??'';return `<div class="team result-team ${outcome}${selected}">${logo(n)}<span>${n}</span>${selected?'<b class="prediction-mark">ТВОЙ ВЫБОР</b>':''}<b class="result-score">${score}</b></div>`};
  return `<div class="match pick-match completed-match"><div class="meta"><span>BO${bo} · матч завершён</span></div>${row(a)}${row(b)}</div>`;
};
const style=document.createElement('style');style.textContent=`
.completed-match{border-color:#536273}.result-team{cursor:default}.result-team.actual-winner{background:linear-gradient(90deg,#126b3c,#174d36)!important;box-shadow:inset 3px 0 #35d07f;color:#fff}.result-team.actual-loser{background:linear-gradient(90deg,#6b2431,#4b2630)!important;box-shadow:inset 3px 0 #ef6477;color:#fff}.result-score{margin-left:auto;min-width:18px;text-align:center;font-size:16px;color:#fff}.prediction-mark{margin-left:auto;font-size:7px;letter-spacing:.04em;color:#e9dcff;white-space:nowrap}.result-team .prediction-mark+.result-score{margin-left:8px}.completed-match .meta{color:#b8c3cf}
`;document.head.appendChild(style);
render(active);
})();
