    const collectedArtworks = [];
    for(let i=0; i<15; i++) {
      collectedArtworks.push({
        id: 'ca'+i,
        artist: `Artist ${i+1}`,
        avatar: `https://picsum.photos/seed/coll_artist${i}/80/80`,
        media: `https://picsum.photos/seed/collected_art${i}/900/1100`,
        type: (i % 4 === 0) ? 'video' : 'image',
        title: `Collected Piece ${i+1}`,
        desc: `A unique artwork acquired on ${new Date(2023, i, i+1).toLocaleDateString()}.`,
        narrative: { kind: 'text', text: `This piece holds special meaning to my collection.` },
        price: Math.round(20000 + Math.random() * 150000),
        loc: 'Mumbai, India'
      });
    }

    const bidHistory = [
      { id: 'bh1', artworkTitle: 'Sunset Serenity', artist: 'Priya Arts', amount: 25000, status: 'Won', date: '2023-10-26' },
      { id: 'bh2', artworkTitle: 'Urban Canvas', artist: 'City Scapes', amount: 18000, status: 'Lost', date: '2023-10-25' },
      { id: 'bh3', artworkTitle: 'Abstract Dream', artist: 'Modern Strokes', amount: 32000, status: 'Won', date: '2023-10-20' },
      { id: 'bh4', artworkTitle: 'Digital Bloom', artist: 'Pixel Art', amount: 12000, status: 'Lost', date: '2023-10-18' },
      { id: 'bh5', artworkTitle: 'Sculpted Silence', artist: 'Stone Crafts', amount: 45000, status: 'Won', date: '2023-10-15' },
      { id: 'bh6', artworkTitle: 'Monsoon Melody', artist: 'Rainy Day Art', amount: 28000, status: 'Lost', date: '2023-10-10' },
    ];

    const followedArtists = [
      { id: 'fa1', name: 'Priya Arts', avatar: 'https://picsum.photos/seed/fa_priya/80/80', bio: 'Vibrant landscapes and portraits.' },
      { id: 'fa2', name: 'City Scapes', avatar: 'https://picsum.photos/seed/fa_city/80/80', bio: 'Dynamic urban photography.' },
      { id: 'fa3', name: 'Modern Strokes', avatar: 'https://picsum.photos/seed/fa_modern/80/80', bio: 'Bold abstract expressionism.' },
      { id: 'fa4', name: 'Pixel Art', avatar: 'https://picsum.photos/seed/fa_pixel/80/80', bio: 'Innovative digital creations.' },
      { id: 'fa5', name: 'Stone Crafts', avatar: 'https://picsum.photos/seed/fa_stone/80/80', bio: 'Hand-carved stone sculptures.' },
      { id: 'fa6', name: 'Canvas Dreams', avatar: 'https://picsum.photos/seed/fa_canvas/80/80', bio: 'Surreal and imaginative paintings.' },
      { id: 'fa7', name: 'Ink & Brush', avatar: 'https://picsum.photos/seed/fa_ink/80/80', bio: 'Traditional Indian miniature art.' },
      { id: 'fa8', name: 'Sculpted Forms', avatar: 'https://picsum.photos/seed/fa_forms/80/80', bio: 'Contemporary metal sculptures.' },
    ];

    const backdrop = document.getElementById('backdrop');
    const modal = document.getElementById('modal');
    const mAvatar = document.getElementById('mAvatar');
    const mArtist = document.getElementById('mArtist');
    const mClose = document.getElementById('mClose');
    const modalBodyContent = document.getElementById('modalBodyContent'); 

    const mMedia = document.getElementById('mMedia');
    const mTitle = document.getElementById('mTitle');
    const mDesc = document.getElementById('mDesc');
    const mNarr = document.getElementById('mNarr');
    const mPrice = document.getElementById('mPrice');
    const mBuy = document.getElementById('mBuy');


    function formatINR(n){ return n.toLocaleString('en-IN', { style:'currency', currency:'INR', minimumFractionDigits:0 }); }

    function openArtworkModal(artworkData){
      if(!artworkData) return;

      modal.classList.remove('followed-artists-modal');
      mAvatar.style.display = 'block';
      mArtist.textContent = artworkData.artist;
      modalBodyContent.innerHTML = ''; 

      const artworkModalBodyGrid = document.createElement('div');
      artworkModalBodyGrid.style.display = 'grid';
      artworkModalBodyGrid.style.gridTemplateColumns = '1.1fr 1fr';
      artworkModalBodyGrid.style.flexGrow = '1'; 
      artworkModalBodyGrid.style.overflowY = 'auto'; 
      const artworkMediaDiv = document.createElement('div');
      artworkMediaDiv.id = 'mMedia';
      artworkMediaDiv.className = 'modal-media';
      if(artworkData.type === 'video'){
        const v = document.createElement('video');
        v.src = artworkData.media; v.controls = true; v.autoplay = true; v.playsInline = true;
        artworkMediaDiv.appendChild(v);
      } else {
        const img = document.createElement('img'); img.src = artworkData.media; img.alt = artworkData.title;
        artworkMediaDiv.appendChild(img);
      }

      const artworkPanelDiv = document.createElement('div');
      artworkPanelDiv.className = 'modal-panel';
      artworkPanelDiv.innerHTML = `
        <div id="mTitle" style="font-weight:800;">${artworkData.title}</div>
        <div id="mDesc" style="font-size:14px; color:#6e4b2e;">${artworkData.desc}</div>
        <div id="mNarr" style="margin-top:6px;"></div>
        <div class="price-row">
          <span class="price" id="mPrice">${formatINR(artworkData.price)}</span>
          <button class="buy" id="mBuy">Buy now</button>
        </div>
        <div class="actions" style="padding:0;">
          <button class="btn"><svg class="icon"><use href="#i-heart"></use></svg><span>Like</span></button>
          <button class="btn"><svg class="icon"><use href="#i-comment"></use></svg><span>Comment</span></button>
          <button class="btn"><svg class="icon"><use href="#i-share"></use></svg><span>Share</span></button>
          <button class="btn" title="Message artist"><svg class="icon"><use href="#i-chat"></use></svg><span>Chat</span></button>
        </div>
      `;
      const mNarrElement = artworkPanelDiv.querySelector('#mNarr');
      if(artworkData.narrative){
        if(artworkData.narrative.kind === 'text'){
          const p = document.createElement('p'); p.textContent = artworkData.narrative.text; mNarrElement.appendChild(p);
        } else if(artworkData.narrative.kind === 'audio'){
          const a = document.createElement('audio'); a.controls = true; a.src = artworkData.narrative.src; mNarrElement.appendChild(a);
        } else if(artworkData.narrative.kind === 'video'){
          const vv = document.createElement('video'); vv.controls = true; vv.src = artworkData.narrative.src; mNarrElement.appendChild(vv);
        }
      }
      artworkPanelDiv.querySelector('#mBuy').onclick = () => alert('Proceed to buy ' + artworkData.title + ' for ' + formatINR(artworkData.title));


      artworkModalBodyGrid.appendChild(artworkMediaDiv);
      artworkModalBodyGrid.appendChild(artworkPanelDiv);
      modalBodyContent.appendChild(artworkModalBodyGrid);


      backdrop.classList.add('open'); modal.classList.add('open'); backdrop.setAttribute('aria-hidden','false');
    }

    function openFollowedArtistsModal(){
        modal.classList.add('followed-artists-modal');
        mAvatar.style.display = 'none';
        mArtist.textContent = 'Followed Artists';
        modalBodyContent.innerHTML = '';
        const followedList = document.createElement('ul');
        followedList.className = 'followed-artists-list-in-modal';

        followedArtists.forEach(artist => {
            const li = document.createElement('li');
            li.className = 'followed-artist-item';
            li.innerHTML = `
                <img class="avatar" src="${artist.avatar}" alt="${artist.name}">
                <div class="artist-info">
                    <div class="artist-name">${artist.name}</div>
                    <div class="artist-bio-short">${artist.bio}</div>
                </div>
                <button class="unfollow-btn">Unfollow</button>
            `;
            followedList.appendChild(li);
        });
        modalBodyContent.appendChild(followedList);

        backdrop.classList.add('open'); modal.classList.add('open'); backdrop.setAttribute('aria-hidden','false');
    }

    function closeModal(){
      modal.classList.remove('open'); backdrop.classList.remove('open'); backdrop.setAttribute('aria-hidden','true');
      modal.querySelectorAll('video,audio').forEach(m => { m.pause?.(); m.currentTime = 0; });
      modal.classList.remove('followed-artists-modal');
      mAvatar.style.display = 'block'; 
      modalBodyContent.innerHTML = ''; 
    }
    mClose.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => { if(e.target === backdrop) closeModal(); });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && backdrop.classList.contains('open')) closeModal(); });

    const collectedGrid = document.getElementById('collectedGrid');
    function renderCollectedGrid(){
      collectedGrid.innerHTML = '';
      collectedArtworks.forEach(artwork => {
        const div = document.createElement('div'); 
        div.className = 'gitem'; 
        div.innerHTML = `
          <img src="${artwork.media.replace('900/1100', '600/600')}" alt="${artwork.title}">
          ${artwork.type === 'video' ? `<div class="badge"><svg class="icon"><use href="#i-play"></use></svg></div>` : ''}
          <div class="overlay">
            <button class="action-btn"><svg class="icon"><use href="#i-heart"></use></svg></button>
            <button class="action-btn"><svg class="icon"><use href="#i-comment"></use></svg></button>
            <button class="action-btn open-artwork-btn"><svg class="icon"><use href="#i-external-link"></use></svg></button>
          </div>
        `;

        collectedGrid.appendChild(div);
      });
    }

    const bidHistoryList = document.getElementById('bidHistoryList');
        function renderBidHistory(){
      bidHistoryList.innerHTML = '';
      bidHistory.forEach(bid => {
        const li = document.createElement('li');
        li.className = 'bid-history-item';
        li.innerHTML = `
          <div>
            <div class="artwork-title">${bid.artworkTitle}</div>
            <div style="font-size:12px; color:#7a5a3b;">by ${bid.artist}</div>
          </div>
          <div class="bid-details">
            <span>${bid.status}</span>
            <span class="bid-amount">${formatINR(bid.amount)}</span>
            <span style="font-size:12px; color:#7a5a3b;">${bid.date}</span>
          </div>
        `;
        bidHistoryList.appendChild(li);
      });
    }

    function activateTab(tabName) {
      document.querySelectorAll('.p-tabs .ptab').forEach(b => b.classList.remove('active'));
      document.querySelector(`.p-tabs .ptab[data-tab="${tabName}"]`).classList.add('active');

      document.querySelectorAll('.p-pane').forEach(p => p.style.display = 'none');
      document.getElementById('tab-' + tabName).style.display = 'block';

      if (tabName === 'collected') renderCollectedGrid();
      else if (tabName === 'bids') renderBidHistory(); 
    }

    document.querySelectorAll('.p-tabs .ptab').forEach(button => {
      button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      activateTab(tabName);
      });
    });

    document.getElementById('followedArtistsLink').addEventListener('click', (e) => {
      e.preventDefault(); 
      openFollowedArtistsModal(); 
    });

    document.querySelectorAll('.tabs .tab').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        console.log('Navigating to:', tabBtn.getAttribute('data-page'));
        document.querySelectorAll('.tabs .tab').forEach(b => b.classList.remove('active'));
        tabBtn.classList.add('active');
      });
    });

    document.addEventListener('DOMContentLoaded', () => {
      const tabElement = document.querySelector('.tabs .tab[data-page="profilePage"]');
      if (tabElement) {
        tabElement.classList.add('active');
      }
      activateTab('collected');
    });
  