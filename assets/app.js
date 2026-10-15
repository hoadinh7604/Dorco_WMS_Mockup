(function(){
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  /* menu (mobile) */
  var rail=$('.rail'),mb=$('.menu-btn');
  mb.addEventListener('click',function(){var o=rail.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
  $$('.rail nav a').forEach(function(a){a.addEventListener('click',function(){rail.classList.remove('open');mb.setAttribute('aria-expanded','false')})});

  /* scroll spy */
  var links={};$$('.rail nav a').forEach(function(a){links[a.getAttribute('href').slice(1)]=a});
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){
        $$('.rail nav a.on').forEach(function(x){x.classList.remove('on')});
        var l=links[e.target.id];if(l)l.classList.add('on');
      }
    });
  },{rootMargin:'-20% 0px -70% 0px'});
  $$('section.doc').forEach(function(s){io.observe(s)});

  /* tabs */
  $$('.tabset').forEach(function(ts){
    var btns=$$('[role=tab]',ts),panes=$$('.pane',ts);
    function sel(i){
      btns.forEach(function(b,j){b.setAttribute('aria-selected',j===i)});
      panes.forEach(function(p,j){p.classList.toggle('on',j===i)});
    }
    btns.forEach(function(b,i){
      b.addEventListener('click',function(){sel(i)});
      b.addEventListener('keydown',function(e){
        if(e.key==='ArrowRight'){sel((i+1)%btns.length);btns[(i+1)%btns.length].focus()}
        if(e.key==='ArrowLeft'){sel((i-1+btns.length)%btns.length);btns[(i-1+btns.length)%btns.length].focus()}
      });
    });
    sel(0);
  });

  /* RF handheld stepper */
  $$('.rf').forEach(function(rf){
    var steps=$$('.step',rf),dots=rf.parentNode.querySelectorAll('.dots i'),i=0;
    function show(n){
      i=n;
      steps.forEach(function(s,j){s.classList.toggle('on',j===n)});
      dots.forEach(function(d,j){d.classList.toggle('on',j===n)});
    }
    $$('[data-next]',rf).forEach(function(b){b.addEventListener('click',function(){show((i+1)%steps.length)})});
    $$('[data-back]',rf).forEach(function(b){b.addEventListener('click',function(){show(Math.max(0,i-1))})});
    show(0);
  });

  /* decision tracker (stored per viewer only) */
  var KEY='dorco-tsd-decisions';
  function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
  function save(o){try{localStorage.setItem(KEY,JSON.stringify(o))}catch(e){}}
  var state=load();
  function count(){
    var tot=$$('.dec select').length,done=$$('.dec select').filter(function(s){return s.value==='ok'||s.value==='chg'}).length;
    var c=$('#dec-count');if(c)c.textContent=done+'/'+tot+' điểm đã chốt';
  }
  $$('.dec select').forEach(function(s){
    var id=s.getAttribute('data-id');
    if(state[id])s.value=state[id];
    s.addEventListener('click',function(e){e.stopPropagation()});
    s.addEventListener('change',function(){state[id]=s.value;save(state);count()});
  });
  count();

  /* Định vị: nháy số trên hình tương ứng với thẻ thao tác */
  $$('.act .loc').forEach(function(b){
    b.addEventListener('click',function(){
      var sec=b.closest('section'),n=b.closest('.act').getAttribute('data-pin'),first=null;
      $$('.stage .mk',sec).forEach(function(mk){
        if(mk.textContent.trim()===n){mk.classList.remove('flash');void mk.offsetWidth;mk.classList.add('flash');first=first||mk}
      });
      if(first)first.scrollIntoView({block:'center',behavior:'smooth'});
    });
  });

  var pb=$('#print-btn');if(pb)pb.addEventListener('click',function(){window.print()});
})();
