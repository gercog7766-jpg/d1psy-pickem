(()=>{
const results=window.TOURNAMENT_RESULTS||{};
const originalGroupMatches=groupMatches;
groupMatches=function(x,g){
  const t=groups[g],pred=id=>x[`${g}-${id}`],actual=id=>results[`${g}-${id}`]?.winner||pred(id);
  const u11=pair(t[0],t[1]),u12=pair(t[2],t[3]),u13=pair(t[4],t[5]),u14=pair(t[6],t[7]);
  const u21=pair(actual('U1-1'),actual('U1-2')),u22=pair(actual('U1-3'),actual('U1-4'));
  const l11=pair(loser(actual('U1-1'),...u11),loser(actual('U1-2'),...u12)),l12=pair(loser(actual('U1-3'),...u13),loser(actual('U1-4'),...u14));
  const l21=pair(actual('L1-1'),loser(actual('U2-1'),...u21)),l22=pair(actual('L1-2'),loser(actual('U2-2'),...u22));
  const defs=[['U1-1',u11],['U1-2',u12],['U1-3',u13],['U1-4',u14],['U2-1',u21],['U2-2',u22],['U3-1',pair(actual('U2-1'),actual('U2-2'))],['L1-1',l11],['L1-2',l12],['L2-1',l21],['L2-2',l22],['L3-1',pair(actual('L2-1'),actual('L2-2'))]];
  return defs.map(([id,p])=>({id,key:`${g}-${id}`,p,w:pred(id)}));
};
const originalMatchCard=matchCard;
matchCard=function(m){
  const r=results[m.key];if(!r)return originalMatchCard(m);
  const [a,b]=m.p,choice=m.w;
  const row=n=>{const outcome=n===r.winner?'actual-winner':n===r.loser?'actual-loser':'';const score=r.scores?.[n]??'';return `<div class="read-team ${outcome}"><span>${esc(n)}</span><span class="result-side">${choice===n?'<b class="user-pick">ПРЕДИКТ</b>':''}<b class="admin-score">${score}</b></span></div>`};
  return `<div class="read-match completed-admin-match"><div class="match-stage">${esc(roundNames[m.id.split('-')[0]]||m.id)}</div>${row(a)}${row(b)}</div>`;
};
const style=document.createElement('style');style.textContent=`
.read-team.actual-winner{background:linear-gradient(90deg,rgba(24,132,76,.55),rgba(24,132,76,.18));color:#fff;box-shadow:inset 3px 0 #35d07f}.read-team.actual-loser{background:linear-gradient(90deg,rgba(145,43,59,.52),rgba(145,43,59,.16));color:#fff;box-shadow:inset 3px 0 #ef6477}.result-side{display:flex;align-items:center;gap:8px}.admin-score{font-size:14px!important;color:#fff!important}.user-pick{font-size:7px!important;color:#d8c1ff!important;letter-spacing:.05em}.completed-admin-match{border-color:rgba(255,255,255,.13)}
`;document.head.appendChild(style);
})();
