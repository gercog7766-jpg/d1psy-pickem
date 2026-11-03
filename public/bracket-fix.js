(()=>{
  // IEM Beijing lower-bracket round 2 uses crossover pairings:
  // winner of L1-1 faces loser of U2-2; winner of L1-2 faces loser of U2-1.
  if(typeof groupPick==='function'){
    groupPick=function(code){
      const t=groups[code],p=code,
        u11=[t[0],t[1]],u12=[t[2],t[3]],u13=[t[4],t[5]],u14=[t[6],t[7]],
        u21=[winner(`${p}-U1-1`),winner(`${p}-U1-2`)],
        u22=[winner(`${p}-U1-3`),winner(`${p}-U1-4`)],
        l11=[loser(`${p}-U1-1`,...u11),loser(`${p}-U1-2`,...u12)],
        l12=[loser(`${p}-U1-3`,...u13),loser(`${p}-U1-4`,...u14)],
        l21=[winner(`${p}-L1-1`),loser(`${p}-U2-2`,...u22)],
        l22=[winner(`${p}-L1-2`),loser(`${p}-U2-1`,...u21)],
        u3=[winner(`${p}-U2-1`),winner(`${p}-U2-2`)],
        l3=[winner(`${p}-L2-1`),winner(`${p}-L2-2`)];
      return `<section class="group"><div class="group-title"><b>Group ${code} Pick’em</b><span>Нажми на команду — победитель продвинется дальше</span></div><h3>Upper Bracket</h3><div class="bracket"><div class="round"><h4>Opening round</h4>${pickMatch(`${p}-U1-1`,...u11)}${pickMatch(`${p}-U1-2`,...u12)}${pickMatch(`${p}-U1-3`,...u13)}${pickMatch(`${p}-U1-4`,...u14)}</div><div class="round stagger"><h4>Upper semi-finals</h4>${pickMatch(`${p}-U2-1`,...u21)}${pickMatch(`${p}-U2-2`,...u22)}</div><div class="round final-stagger"><h4>Upper final</h4>${pickMatch(`${p}-U3-1`,...u3)}</div></div><h3>Lower Bracket</h3><div class="bracket lower"><div class="round"><h4>Lower round 1</h4>${pickMatch(`${p}-L1-1`,...l11)}${pickMatch(`${p}-L1-2`,...l12)}</div><div class="round stagger-small"><h4>Lower semi-finals</h4>${pickMatch(`${p}-L2-1`,...l21)}${pickMatch(`${p}-L2-2`,...l22)}</div><div class="round final-stagger"><h4>Lower final</h4>${pickMatch(`${p}-L3-1`,...l3)}</div></div></section>`;
    };
  }
  if(typeof groupMatches==='function'){
    groupMatches=function(x,g){
      const t=groups[g],w=id=>x[`${g}-${id}`];
      const u11=pair(t[0],t[1]),u12=pair(t[2],t[3]),u13=pair(t[4],t[5]),u14=pair(t[6],t[7]);
      const u21=pair(w('U1-1'),w('U1-2')),u22=pair(w('U1-3'),w('U1-4'));
      const l11=pair(loser(w('U1-1'),...u11),loser(w('U1-2'),...u12)),l12=pair(loser(w('U1-3'),...u13),loser(w('U1-4'),...u14));
      const l21=pair(w('L1-1'),loser(w('U2-2'),...u22)),l22=pair(w('L1-2'),loser(w('U2-1'),...u21));
      return [{id:'U1-1',p:u11},{id:'U1-2',p:u12},{id:'U1-3',p:u13},{id:'U1-4',p:u14},{id:'U2-1',p:u21},{id:'U2-2',p:u22},{id:'U3-1',p:pair(w('U2-1'),w('U2-2'))},{id:'L1-1',p:l11},{id:'L1-2',p:l12},{id:'L2-1',p:l21},{id:'L2-2',p:l22},{id:'L3-1',p:pair(w('L2-1'),w('L2-2'))}].map(m=>({...m,w:w(m.id)}));
    };
  }
})();
