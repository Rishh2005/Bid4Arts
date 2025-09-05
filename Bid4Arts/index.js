const trendingArtworksData = [
  { id: 'ta1', title: 'Abstract Flow', artist: 'Artisan A', image: 'https://picsum.photos/seed/landart1/400/500' },
  { id: 'ta2', title: 'Cityscape Dawn', artist: 'Artisan B', image: 'https://picsum.photos/seed/landart2/400/500' },
  { id: 'ta3', title: 'Serene Landscape', artist: 'Artisan C', image: 'https://picsum.photos/seed/landart3/400/500' },
  { id: 'ta4', title: 'Digital Dream', artist: 'Artisan D', image: 'https://picsum.photos/seed/landart4/400/500' },
  { id: 'ta5', title: 'Sculpted Harmony', artist: 'Artisan E', image: 'https://picsum.photos/seed/landart5/400/500' },
  { id: 'ta6', title: 'Portrait of Soul', artist: 'Artisan F', image: 'https://picsum.photos/seed/landart6/400/500' },
  { id: 'ta7', title: 'Vibrant Energy', artist: 'Artisan G', image: 'https://picsum.photos/seed/landart7/400/500' },
  { id: 'ta8', title: 'Mystic Forest', artist: 'Artisan H', image: 'https://picsum.photos/seed/landart8/400/500' },
];

const trendingArtistsData = [
  { id: 'tar1', name: 'Priya Artisan', avatar: 'https://picsum.photos/seed/landartist1/100/100', specialty: 'Ceramics' },
  { id: 'tar2', name: 'Rajesh Kumar', avatar: 'https://picsum.photos/seed/landartist2/100/100', specialty: 'Digital Art' },
  { id: 'tar3', name: 'Sneha Sharma', avatar: 'https://picsum.photos/seed/landartist3/100/100', specialty: 'Oil Painting' },
  { id: 'tar4', name: 'Vikram Singh', avatar: 'https://picsum.photos/seed/landartist4/100/100', specialty: 'Photography' },
  { id: 'tar5', name: 'Anjali Devi', avatar: 'https://picsum.photos/seed/landartist5/100/100', specialty: 'Mixed Media' },
  { id: 'tar6', name: 'Karan Mehta', avatar: 'https://picsum.photos/seed/landartist6/100/100', specialty: 'Sculpture' },
  { id: 'tar7', name: 'Deepak Verma', avatar: 'https://picsum.photos/seed/landartist7/100/100', specialty: 'Watercolor' },
  { id: 'tar8', name: 'Nisha Patel', avatar: 'https://picsum.photos/seed/landartist8/100/100', specialty: 'Textile Art' },
];

const artworks = [
  { id: 'la1', title: 'Golden Hour', artist: 'Artist 1', image: 'https://picsum.photos/seed/landauc1/400/500', currentBid: 25000, endsIn: '01:30:20' },
  { id: 'la2', title: 'Midnight Bloom', artist: 'Artist 2', image: 'https://picsum.photos/seed/landauc2/400/500', currentBid: 18000, endsIn: '00:45:10' },
  { id: 'la3', title: 'Urban Pulse', artist: 'Artist 3', image: 'https://picsum.photos/seed/landauc3/400/500', currentBid: 32000, endsIn: '02:15:05' },
  { id: 'la4', title: 'Forest Whisper', artist: 'Artist 4', image: 'https://picsum.photos/seed/landauc4/400/500', currentBid: 12000, endsIn: '00:20:55' },
  { id: 'la5', title: 'Ocean Depths', artist: 'Artist 5', image: 'https://picsum.photos/seed/landauc5/400/500', currentBid: 45000, endsIn: '03:00:00' },
  { id: 'la6', title: 'Desert Sunset', artist: 'Artist 6', image: 'https://picsum.photos/seed/landauc6/400/500', currentBid: 21000, endsIn: '00:55:30' },
  { id: 'la1', title: 'Golden Hour', artist: 'Artist 1', image: 'https://picsum.photos/seed/landauc1/400/500', currentBid: 25000, endsIn: '01:30:20' },
  { id: 'la2', title: 'Midnight Bloom', artist: 'Artist 2', image: 'https://picsum.photos/seed/landauc2/400/500', currentBid: 18000, endsIn: '00:45:10' },
  { id: 'la3', title: 'Urban Pulse', artist: 'Artist 3', image: 'https://picsum.photos/seed/landauc3/400/500', currentBid: 32000, endsIn: '02:15:05' },
  { id: 'la4', title: 'Forest Whisper', artist: 'Artist 4', image: 'https://picsum.photos/seed/landauc4/400/500', currentBid: 12000, endsIn: '00:20:55' },
  { id: 'la5', title: 'Ocean Depths', artist: 'Artist 5', image: 'https://picsum.photos/seed/landauc5/400/500', currentBid: 45000, endsIn: '03:00:00' },
  { id: 'la6', title: 'Desert Sunset', artist: 'Artist 6', image: 'https://picsum.photos/seed/landauc6/400/500', currentBid: 21000, endsIn: '00:55:30' },
  { id: 'la1', title: 'Golden Hour', artist: 'Artist 1', image: 'https://picsum.photos/seed/landauc1/400/500', currentBid: 25000, endsIn: '01:30:20' },
  { id: 'la2', title: 'Midnight Bloom', artist: 'Artist 2', image: 'https://picsum.photos/seed/landauc2/400/500', currentBid: 18000, endsIn: '00:45:10' },
  { id: 'la3', title: 'Urban Pulse', artist: 'Artist 3', image: 'https://picsum.photos/seed/landauc3/400/500', currentBid: 32000, endsIn: '02:15:05' },
  { id: 'la4', title: 'Forest Whisper', artist: 'Artist 4', image: 'https://picsum.photos/seed/landauc4/400/500', currentBid: 12000, endsIn: '00:20:55' },
  { id: 'la5', title: 'Ocean Depths', artist: 'Artist 5', image: 'https://picsum.photos/seed/landauc5/400/500', currentBid: 45000, endsIn: '03:00:00' },
  { id: 'la6', title: 'Desert Sunset', artist: 'Artist 6', image: 'https://picsum.photos/seed/landauc6/400/500', currentBid: 21000, endsIn: '00:55:30' },
];

const liveAuctionsData = [
  { id: 'la1', title: 'Golden Hour', artist: 'Artist 1', image: 'https://picsum.photos/seed/landauc1/400/500', currentBid: 25000, endsIn: '01:30:20' },
  { id: 'la2', title: 'Midnight Bloom', artist: 'Artist 2', image: 'https://picsum.photos/seed/landauc2/400/500', currentBid: 18000, endsIn: '00:45:10' },
  { id: 'la3', title: 'Urban Pulse', artist: 'Artist 3', image: 'https://picsum.photos/seed/landauc3/400/500', currentBid: 32000, endsIn: '02:15:05' },
  { id: 'la4', title: 'Forest Whisper', artist: 'Artist 4', image: 'https://picsum.photos/seed/landauc4/400/500', currentBid: 12000, endsIn: '00:20:55' },
  { id: 'la5', title: 'Ocean Depths', artist: 'Artist 5', image: 'https://picsum.photos/seed/landauc5/400/500', currentBid: 45000, endsIn: '03:00:00' },
  { id: 'la6', title: 'Desert Sunset', artist: 'Artist 6', image: 'https://picsum.photos/seed/landauc6/400/500', currentBid: 21000, endsIn: '00:55:30' },
];

function formatINR(n) {
  return n.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 });
}

function renderCards(containerId, data, cardHtmlGenerator) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'trending-card';
    card.setAttribute('data-id', item.id);
    card.innerHTML = cardHtmlGenerator(item);
    container.appendChild(card);
  });

  const wrapper = container.closest('.trending-grid-wrapper');
  if (wrapper) {
    const leftArrow = wrapper.querySelector('.scroll-arrow.left');
    const rightArrow = wrapper.querySelector('.scroll-arrow.right');

    const checkArrows = () => {
      if (data.length > 5) {
        leftArrow.classList.toggle('hidden', container.scrollLeft === 0);
        rightArrow.classList.toggle('hidden', container.scrollLeft + container.clientWidth >= container.scrollWidth - 1); // -1 for tolerance
      } else {
        leftArrow.classList.add('hidden');
        rightArrow.classList.add('hidden');
      }
    };

    checkArrows();

    container.addEventListener('scroll', checkArrows);

    leftArrow.onclick = () => {
      container.scrollBy({
        left: -container.clientWidth / 2,
        behavior: 'smooth'
      });
    };
    rightArrow.onclick = () => {
      container.scrollBy({
        left: container.clientWidth / 2,
        behavior: 'smooth'
      });
    };

    window.addEventListener('resize', checkArrows);
  }
}

renderCards('trendingArtworks', trendingArtworksData, (artwork) => `
  <img src="${artwork.image}" alt="${artwork.title}">
  <div class="trending-card-body">
    <div class="trending-card-title">${artwork.title}</div>
    <div class="trending-card-meta">by ${artwork.artist}</div>
  </div>
`);

renderCards('trendingArtists', trendingArtistsData, (artist) => `
  <img src="${artist.avatar}" alt="${artist.name}"style="border-radius: 50%; width: 150px; height: 150px; margin: 0 auto; display: block; object-fit: cover; border: 3px solid var(--gold);">
  <div class="trending-card-body" style="text-align: center;">
    <div class="trending-card-title">${artist.name}</div>
    <div class="trending-card-meta">${artist.specialty}</div>
  </div>
`);

function timeStringToSeconds(timeStr) {
  const parts = timeStr.split(':').map(Number);
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

function secondsToTimeString(seconds) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

const liveAuctionsTimers = liveAuctionsData.map(auction => ({
  id: auction.id,
  remainingSeconds: timeStringToSeconds(auction.endsIn),
  originalSeconds: timeStringToSeconds(auction.endsIn)
}));

setInterval(() => {
  liveAuctionsTimers.forEach(timer => {
    timer.remainingSeconds--;
    if (timer.remainingSeconds < 0) {
      timer.remainingSeconds = timer.originalSeconds;
    }
    const card = document.querySelector(`#liveAuctions .trending-card[data-id="${timer.id}"]`);
    if (card) {
      const endsInSpan = card.querySelector('.ends-in');
      if (endsInSpan) {
        endsInSpan.textContent = 'Ends in: ' + secondsToTimeString(timer.remainingSeconds);
      }
    }
  });
}, 1000);

renderCards('liveAuctions', liveAuctionsData, (auction) => `
  <img src="${auction.image}" alt="${auction.title}">
  <div class="trending-card-body">
    <div class="trending-card-title">${auction.title}</div>
    <div class="trending-card-meta">by ${auction.artist}</div>
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
      <span class="badge-price">${formatINR(auction.currentBid)}</span>
      <span class="ends-in" style="font-size: 0.9em; color: var(--brown-600); font-weight: 600;">
        Ends in: ${auction.endsIn}
      </span>
    </div>
  </div>
`);

function populateBackgroundCollage() {
  const collageContainer = document.querySelector('.background-collage');
  if (!collageContainer) return;

  const collageImages = artworks
    .slice(0, 20);
  const duplicatedImages = [...collageImages, ...collageImages, ...collageImages];

  duplicatedImages.forEach(item => {
    const img = document.createElement('img');
    img.src = item.image || item.avatar;
    img.alt = item.title || item.name || 'Artwork';
    collageContainer.appendChild(img);
  });
}
populateBackgroundCollage();