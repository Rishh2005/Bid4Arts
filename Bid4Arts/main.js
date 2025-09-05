    const feedData = [
      { id:'p1', artist:'claycanvas', avatar:'https://picsum.photos/seed/a1/80/80',
        media:'https://picsum.photos/seed/m1/900/1100', type:'image',
        title:'Earthen Memory', desc:'Hand-thrown earthenware, matte glaze.',
        narrative:{ kind:'text', text:'Monsoon clay captured in quiet forms.' },
        price:18500, loc:'Mumbai, India' },
      { id:'p2', artist:'inkandkhadi', avatar:'https://picsum.photos/seed/a2/80/80',
        media:'https://www.w3schools.com/html/mov_bbb.mp4', type:'video',
        title:'Monsoon Reel', desc:'A study in ink and fabric.',
        narrative:{ kind:'video', src:'https://www.w3schools.com/html/mov_bbb.mp4' },
        price:56000, loc:'Jaipur, India' },
      { id:'p3', artist:'raagacolors', avatar:'https://picsum.photos/seed/a3/80/80',
        media:'https://picsum.photos/seed/m3/900/1100', type:'image',
        title:'Raga in Ochre', desc:'Pigment on handmade paper.',
        narrative:{ kind:'audio', src:'https://www.w3schools.com/html/horse.mp3' },
        price:7200, loc:'Bengaluru, India' },
    ];

    const exploreSeeds = ['e1','e2','e3','e4','e5','e6','e7','e8','e9','e10','e11','e12'];
    const masonrySeeds = ['x1','x2','x3','x4','x5','x6','x7','x8','x9','x10','x11','x12','x13','x14'];

    const feedEl = document.getElementById('feed');
    const pages = document.querySelectorAll('.page');
    const tabs = document.querySelectorAll('.tab');

    function renderFeed(){

      if (feedEl) { feedEl.innerHTML = ''; }
      feedData.forEach(post=>{
        const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
          <header>
            <img class="avatar" src="${post.avatar}" alt="${post.artist}">
            <div>
              <div class="artist">${post.artist}</div>
              <div style="font-size:12px; color:#7a5a3b">${post.loc}</div>
            </div>
          </header>
          <button class="media-btn" aria-label="Open artwork" data-id="${post.id}">
            ${post.type==='video'
              ? `<video class="media" src="${post.media}" muted loop autoplay playsinline></video>`
              : `<img class="media" src="${post.media}" alt="${post.title}">`}
          </button>
          <div class="actions">
            <button class="btn"><svg class="icon"><use href="#i-heart"></use></svg><span>241</span></button>
            <button class="btn"><svg class="icon"><use href="#i-comment"></use></svg><span>32</span></button>
            <button class="btn"><svg class="icon"><use href="#i-share"></use></svg><span>Share</span></button>
            <button class="btn" style="margin-left:auto"><svg class="icon"><use href="#i-bookmark"></use></svg></button>
          </div>
        `;
        card.querySelector('.media-btn').addEventListener('click', ()=>openModal(post.id));
        if (feedEl) { feedEl.appendChild(card); }
      });
    }

    const backdrop = document.getElementById('backdrop');
    const modal = document.getElementById('modal');
    const mAvatar = document.getElementById('mAvatar');
    const mArtist = document.getElementById('mArtist');
    const mMedia = document.getElementById('mMedia');
    const mTitle = document.getElementById('mTitle');
    const mDesc = document.getElementById('mDesc');
    const mNarr = document.getElementById('mNarr');
    const mPrice = document.getElementById('mPrice');
    const mBuy = document.getElementById('mBuy');
    const mClose = document.getElementById('mClose');

    function formatINR(n){ return n.toLocaleString('en-IN', { style:'currency', currency:'INR', minimumFractionDigits:0 }); }

    const searchIndex = {};

    function openModal(id){
      const post = feedData.find(p=>p.id===id) || searchIndex[id];
      if(!post) return;
      mAvatar.src = post.avatar || 'https://picsum.photos/seed/px/80/80';
      mArtist.textContent = post.artist || 'artist';
      mMedia.innerHTML = '';
      if(post.type==='video'){
        const v = document.createElement('video');
        v.src = post.media; v.controls = true; v.autoplay = true; v.playsInline = true;
        mMedia.appendChild(v);
      } else {
        const img = document.createElement('img'); img.src = post.media || post.image; img.alt = post.title || 'Artwork';
        mMedia.appendChild(img);
      }
      mTitle.textContent = post.title || '';
      mDesc.textContent = post.desc || '';
      mNarr.innerHTML = '';
      if(post.narrative){
        if(post.narrative.kind==='text'){
          const p = document.createElement('p'); p.textContent = post.narrative.text; mNarr.appendChild(p);
        } else if(post.narrative.kind==='audio'){
          const a = document.createElement('audio'); a.controls = true; a.src = post.narrative.src; mNarr.appendChild(a);
        } else if(post.narrative.kind==='video'){
          const vv = document.createElement('video'); vv.controls = true; vv.src = post.narrative.src; mNarr.appendChild(vv);
        }
      }
      mPrice.textContent = formatINR(post.price || 0);
      mBuy.onclick = ()=>alert('Proceed to buy ' + (post.title||'artwork') + ' for ' + mPrice.textContent);
      backdrop.classList.add('open'); modal.classList.add('open'); backdrop.setAttribute('aria-hidden','false');
    }
    function closeModal(){
      modal.classList.remove('open'); backdrop.classList.remove('open'); backdrop.setAttribute('aria-hidden','true');
      modal.querySelectorAll('video,audio').forEach(m=>{ m.pause?.(); m.currentTime=0; });
    }
    mClose.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e)=>{ if(e.target===backdrop) closeModal(); });
    document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && backdrop.classList.contains('open')) closeModal(); });

    function switchPage(id){
      pages.forEach(p=>p.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      tabs.forEach(t=>t.classList.remove('active'));
      const tab = document.querySelector(`.tab[data-page="${id}"]`); if(tab) tab.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    tabs.forEach(t=>t.addEventListener('click', ()=>switchPage(t.getAttribute('data-page'))));
    function goHome(){ switchPage('homePage'); }

    const exploreGrid = document.getElementById('exploreGrid');
    function renderExplore(){
      if (exploreGrid) { exploreGrid.innerHTML = ''; }
      if (exploreGrid) {
  exploreSeeds.forEach((s, i) => {
    const d = document.createElement('div');
    d.className = 'tile' + ((i % 7 === 0) ? ' big' : '');
    d.innerHTML = `<img src="https://picsum.photos/seed/${s}/600/600" alt="Explore">`;
    d.addEventListener('click', () => {
      const pseudo = {
        id: 'ex' + i, artist: 'featured', avatar: 'https://picsum.photos/seed/av' + i + '/80/80',
        media: `https://picsum.photos/seed/${s}/900/1100`, type: 'image', title: 'Discover ' + (i + 1), desc: 'Curated artwork',
        narrative: { kind: 'text', text: 'Curated pick.' }, price: Math.round(10000 + Math.random() * 80000)
      };
      searchIndex['ex' + i] = pseudo;
      openModal('ex' + i);
    });
    exploreGrid.appendChild(d);
  });
}
    }

    const masonryGrid = document.getElementById('masonryGrid');
    function renderMasonry(){
      if (masonryGrid) { masonryGrid.innerHTML = ''; }
      if (masonryGrid) {
  masonrySeeds.forEach((s, i) => {
    const price = Math.round(12000 + Math.random() * 90000);
    const pin = document.createElement('div');
    const id = 'mx' + i;
    pin.className = 'pin';
    pin.innerHTML = `
      <img src="https://picsum.photos/seed/${s}/${400 + ((i % 3) * 80)}/${500 + ((i % 4) * 60)}" alt="Artwork">
      <div class="pin-body">
        <div class="title">Artwork ${i + 1}</div>
        <div class="meta"><span>Artist ${i + 1}</span> <span class="badge-price">${formatINR(price)}</span></div>
      </div>
    `;
    searchIndex[id] = {
      id,
      artist: 'Artist ' + (i + 1),
      avatar: 'https://picsum.photos/seed/ax' + i + '/80/80',
      media: `https://picsum.photos/seed/${s}/900/1100`,
      type: 'image',
      title: 'Artwork ' + (i + 1),
      desc: 'Curated discovery',
      narrative: { kind: 'text', text: 'Discovery pin.' },
      price
    };
    pin.addEventListener('click', () => openModal(id));
    masonryGrid.appendChild(pin);
  });
}
    }

    const q = document.getElementById('q');
    const clearQ = document.getElementById('clearQ');
    const chips = document.querySelectorAll('.chip');

    if (q && clearQ) {
      q.addEventListener('input', () => {
      clearQ.classList.toggle('show', q.value.trim().length > 0);
      });
      clearQ.addEventListener('click', () => {
        q.value = '';
        clearQ.classList.remove('show');
      });
    }

    chips.forEach(c=>c.addEventListener('click', ()=>{ chips.forEach(x=>x.classList.remove('active')); c.classList.add('active'); }));

    const profileGrid = document.getElementById('profileGrid');
    function renderProfileGrid(){

      if (profileGrid) { profileGrid.innerHTML = ''; }
      for(let i=0;i<12;i++){
        const btn = document.createElement('button');
        btn.className = 'gitem'+((i%5===0)?' video':'');
        btn.innerHTML = `
          <img src="https://picsum.photos/seed/pg${i}/600/600" alt="Artwork">
          ${i%5===0?`<div class="badge"><svg class="icon"><use href="#i-play"></use></svg></div>`:''}
        `;
        const id = 'pg'+i;
        searchIndex[id] = { id, artist:'priya_artisan', avatar:'https://picsum.photos/seed/profile/80/80',
          media:`https://picsum.photos/seed/pg${i}/900/1100`, type:'image', title:'Grid '+(i+1), desc:'From profile grid',
          narrative:{kind:'text', text:'Portfolio piece.'}, price: Math.round(10000+Math.random()*70000) };
        btn.addEventListener('click', ()=>openModal(id));
        if (profileGrid) {profileGrid.appendChild(btn);}
      }
    }
    document.querySelectorAll('.ptab').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        document.querySelectorAll('.ptab').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        document.querySelectorAll('.p-pane').forEach(p=>p.style.display='none');
        document.getElementById('tab-'+tab).style.display='block';
      });
    });

    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const previews = document.getElementById('previews');
    const postForm = document.getElementById('postForm');
    const clearAllBtn = document.getElementById('clearAll');
    let filesState = [];

if (dropArea && fileInput) {
  dropArea.addEventListener('click', () => fileInput.click());
  dropArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });

  ['dragenter', 'dragover'].forEach(evt => {
    dropArea.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(evt => {
    dropArea.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropArea.classList.remove('dragover');
    });
  });

  dropArea.addEventListener('drop', (e) => handleFiles(e.dataTransfer.files));
  fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
}
    function handleFiles(list){
      const arr = Array.from(list).slice(0, 10 - filesState.length);
      arr.forEach(file=>{
        if(!/^image\/|^video\//.test(file.type)) return toast('Unsupported file type');
        const id = 'f_'+Math.random().toString(36).slice(2,8);
        const url = URL.createObjectURL(file);
        filesState.push({ id, file, url, type: file.type.startsWith('video')?'video':'image' });
      });
      renderPreviews();
    }

    function renderPreviews(){
      previews.innerHTML = '';
      filesState.forEach((f, idx)=>{
        const el = document.createElement('div');
        el.className = 'preview';
        el.innerHTML = `
          ${f.type==='video'
            ? `<video src="${f.url}" muted loop autoplay playsinline></video>`
            : `<img src="${f.url}" alt="preview">`}
          <div class="pv-actions">
            <button title="Move left" aria-label="Move left" data-act="left">◀</button>
            <button title="Move right" aria-label="Move right" data-act="right">▶</button>
            <button title="Remove" aria-label="Remove" data-act="remove">✕</button>
          </div>
        `;
        el.querySelectorAll('button').forEach(btn=>{
          btn.addEventListener('click', ()=>{
            const act = btn.dataset.act;
            if(act==='remove'){ filesState = filesState.filter(x=>x.id!==f.id); }
            if(act==='left' && idx>0){ const t = filesState[idx-1]; filesState[idx-1]=filesState[idx]; filesState[idx]=t; }
            if(act==='right' && idx<filesState.length-1){ const t = filesState[idx+1]; filesState[idx+1]=filesState[idx]; filesState[idx]=t; }
            renderPreviews();
          });
        });
        previews.appendChild(el);
      });
    }

if (clearAllBtn) {
  clearAllBtn.addEventListener('click', () => {
    filesState.forEach(f => URL.revokeObjectURL(f.url));
    filesState = [];
    renderPreviews();
    if (postForm) postForm.reset();
  });
}

if (postForm) {
  postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (filesState.length === 0) {
      toast('Please add at least one image or video');
      return;
    }
    const payload = {
      title: document.getElementById('postTitle').value.trim(),
      category: document.getElementById('postCategory').value,
      price: Number(document.getElementById('postPrice').value || 0),
      desc: document.getElementById('postDesc').value.trim(),
      files: filesState.map(f => ({ name: f.file.name, type: f.type, size: f.file.size }))
    };
    console.log('Publishing post payload:', payload);
    toast('Post submitted (mock). Check console.');
    if (clearAllBtn) clearAllBtn.click();
  });
}
    const auctions = [
      { id:'a1', title:'Earthen Memory', artist:'claycanvas', thumb:'https://picsum.photos/seed/a1/800/1000',
        media:'https://picsum.photos/seed/a1/900/1200', type:'image', current: 15000, minInc: 500, reserve: 20000, endsIn: 120 },
      { id:'a2', title:'Monsoon Reel', artist:'inkandkhadi', thumb:'https://picsum.photos/seed/a2/800/1000',
        media:'https://www.w3schools.com/html/mov_bbb.mp4', type:'video', current: 56000, minInc: 1000, reserve: 65000, endsIn: 90 },
      { id:'a3', title:'Raga in Ochre', artist:'raagacolors', thumb:'https://picsum.photos/seed/a3/800/1000',
        media:'https://picsum.photos/seed/a3/900/1200', type:'image', current: 7200, minInc: 200, reserve: 10000, endsIn: 150 },
    ];
    const bidHistories = { a1:[], a2:[], a3:[] };
    let autoBidEnabled = false;

    function secToMMSS(s){ const m = Math.floor(s/60); const ss = s%60; return `${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`; }
    function fINR(n){ return n.toLocaleString('en-IN', { style:'currency', currency:'INR', minimumFractionDigits:0 }); }

    const auctionList = document.getElementById('auctionList');
    function renderAuctions(){

      if (auctionList) { auctionList.innerHTML = ''; }
      if (auctionList) {
  auctions.forEach(a => {
    const card = document.createElement('article');
    card.className = 'au-card';
    card.innerHTML = `
      <div class="au-thumb">
        ${a.type === 'video'
          ? `<video src="${a.media}" muted loop autoplay playsinline></video>`
          : `<img src="${a.thumb}" alt="${a.title}">`}
        <div class="au-time" id="t_${a.id}">${secToMMSS(a.endsIn)}</div>
      </div>
      <div class="au-body">
        <div class="au-title">${a.title}</div>
        <div class="au-row">
          <span>by ${a.artist}</span>
          <span class="badge">${fINR(a.current)}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openAuction(a.id));
    auctionList.appendChild(card);
  });
} 
    }

    let auctionTimer = null;
    function startAuctionTick(){
      clearInterval(auctionTimer);
      auctionTimer = setInterval(()=>{
        auctions.forEach(a=>{
          if(a.endsIn>0){
            a.endsIn -= 1;
            const tEl = document.getElementById('t_'+a.id);
            if(tEl) tEl.textContent = secToMMSS(a.endsIn);
          }
        });
      }, 1000);
    }

    const auctionDialog = document.getElementById('auctionDialog');
    const closeAuctionDialog = document.getElementById('closeAuctionDialog');
    const auImgThumb = document.getElementById('auImgThumb');
    const auTitle = document.getElementById('auTitle');
    const auArtist = document.getElementById('auArtist');
    const auMedia = document.getElementById('auMedia');
    const auCurrentBid = document.getElementById('auCurrentBid');
    const auMinInc = document.getElementById('auMinInc');
    const auReserve = document.getElementById('auReserve');
    const bidAmount = document.getElementById('bidAmount');
    const placeBidBtn = document.getElementById('placeBidBtn');
    const bidHint = document.getElementById('bidHint');
    const bidHistory = document.getElementById('bidHistory');
    const countdownRegion = document.getElementById('countdownRegion');
    const timeLeft = document.getElementById('timeLeft');
    const extendBtn = document.getElementById('extendBtn');

    let currentAuctionId = null;
    let detailTick = null;

    function renderBidHistory(id){
      const list = bidHistories[id]||[];
      bidHistory.innerHTML = list.map(i=>`<li><span>${i.who}</span><span>${fINR(i.amount)}</span><span style="color:#7a5a3b">${i.at}</span></li>`).join('');
    }

    function openAuction(id){
      const a = auctions.find(x=>x.id===id);
      if(!a) return;
      currentAuctionId = id;

      auImgThumb.src = a.thumb;
      auTitle.textContent = a.title;
      auArtist.textContent = a.artist;
      auMedia.innerHTML = a.type==='video'
        ? `<video src="${a.media}" controls playsinline></video>`
        : `<img src="${a.media}" alt="${a.title}">`;
      auCurrentBid.textContent = fINR(a.current);
      auMinInc.textContent = fINR(a.minInc);
      auReserve.textContent = fINR(a.reserve);
      bidAmount.value = a.current + a.minInc;
      renderBidHistory(id);

      clearInterval(detailTick);
      let lastAnnounced = Infinity;
      detailTick = setInterval(()=>{
        const au = auctions.find(x=>x.id===id);
        if(!au) return;
        timeLeft.textContent = secToMMSS(au.endsIn);
        if([60,30,10,5].includes(au.endsIn) && lastAnnounced!==au.endsIn){
          countdownRegion.setAttribute('aria-live','assertive');
          lastAnnounced = au.endsIn;
          setTimeout(()=>countdownRegion.setAttribute('aria-live','polite'), 500);
        }
        if(au.endsIn<=0){
          clearInterval(detailTick);
          placeBidBtn.disabled = true;
          extendBtn.disabled = true;
          toast('Auction ended');
        }
      }, 1000);

      auctionDialog.showModal();
    }

if (closeAuctionDialog && auctionDialog) {
  closeAuctionDialog.addEventListener('click', () => auctionDialog.close());
}

if (auctionDialog) {
  auctionDialog.addEventListener('close', () => {
    clearInterval(detailTick);
    placeBidBtn.disabled = false; extendBtn.disabled = false;
  });
}
    if (placeBidBtn) {
  placeBidBtn.addEventListener('click', () => {
    const a = auctions.find(x => x.id === currentAuctionId);
    if (!a) return;
    const val = Number(bidAmount.value || 0);
    const minRequired = a.current + a.minInc;
    if (val < minRequired) {
      bidHint.textContent = `Enter at least ${fINR(minRequired)}`;
      bidHint.style.color = '#b33';
      return;
    }
    a.current = val;
    auCurrentBid.textContent = fINR(a.current);
    bidHint.textContent = `Minimum next bid ${fINR(a.current + a.minInc)}`;
    bidHint.style.color = '#7a5a3b';
    bidAmount.value = a.current + a.minInc;

    const stamp = new Date().toLocaleTimeString();
    bidHistories[a.id].unshift({ who: 'Bidder', amount: a.current, at: stamp });
    renderBidHistory(a.id);
    toast('Bid placed successfully');

    if (a.endsIn <= 10) a.endsIn += 10;
  });
}
    if (extendBtn) {
      extendBtn.addEventListener('click', () => {
    const a = auctions.find(x => x.id === currentAuctionId);
    if (!a) return;
    a.endsIn += 10;
    toast('Extended by 10s');
  });
}
const toggleAutoBidEl = document.getElementById('toggleAutoBid');
if (toggleAutoBidEl) {
  toggleAutoBidEl.addEventListener('click', (e) => {
    autoBidEnabled = !autoBidEnabled;
    e.currentTarget.textContent = `Auto-bid: ${autoBidEnabled ? 'On' : 'Off'}`;
    toast(`Auto-bid ${autoBidEnabled ? 'enabled' : 'disabled'}`);
  });
}

const refreshAuctionsEl = document.getElementById('refreshAuctions');
if (refreshAuctionsEl) {
  refreshAuctionsEl.addEventListener('click', () => {
    auctions.forEach(a => a.current += Math.round(Math.random() * 500)); // mock changes
    renderAuctions();
    toast('Auctions refreshed');
  });
}
    let toastTimer=null;
    function toast(msg){
      let el = document.getElementById('toast');
      if(!el){
        el = document.createElement('div');
        el.id='toast';
        el.style.position='fixed'; el.style.top='16px'; el.style.right='16px';
        el.style.background='var(--brown-600)'; el.style.color='#fff';
        el.style.padding='10px 14px'; el.style.borderRadius='10px'; el.style.boxShadow='var(--shadow-md)'; el.style.zIndex='80';
        el.style.transform='translateX(160%)'; el.style.transition='transform .25s';
        document.body.appendChild(el);
      }
      el.textContent = msg;
      el.style.transform='translateX(0)';
      clearTimeout(toastTimer);
      toastTimer = setTimeout(()=>{ el.style.transform='translateX(160%)'; }, 2000);
    }

    function initBidding(){
      renderAuctions();
      startAuctionTick();
    }

    document.addEventListener('DOMContentLoaded', ()=>{
      renderFeed();
      renderExplore();
      renderMasonry();
      renderProfileGrid();
      initBidding();
    });
