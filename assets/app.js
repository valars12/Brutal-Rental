// ====== Data ======
const bikes = [
  // Motor
  {id:1, type:'motor', name:'Honda Scoopy Prestige White', price:80, gear:'Automatic', cc:'125cc', fuel:'Irit', img:'assets/img/scoopy_white.png', rating:4.9, delivery:true},
  {id:2, type:'motor', name:'Honda Beat Deluxe', price:60, gear:'Automatic', cc:'110cc', fuel:'Irit', img:'assets/img/beat_deluxe.jpg', rating:4.8, delivery:false},
  {id:3, type:'motor', name:'Vespa Matic LX', price:160, gear:'Automatic', cc:'125cc', fuel:'Irit', img:'assets/img/Vespa-matic.jpg', rating:4.7, delivery:true},
  {id:4, type:'motor', name:'Yamaha Fazzio', price:60, gear:'Automatic', cc:'160cc', fuel:'Irit', img:'assets/img/yamaha-fazzio.jpg', rating:4.6, delivery:false},
  {id:5, type:'motor', name:'Yamaha Fazzio Red', price:60, gear:'Automatic', cc:'160cc', fuel:'Irit', img:'assets/img/yamaha-fazzio-red.png', rating:4.5, delivery:false},
  // Mobil
  {id:6, type:'mobil', name:'Toyota Yaris', price:250, gear:'Manual', cc:'1496cc', fuel:'Irit', img:'assets/img/toyota-yaris.png', rating:4.5, delivery:true},
  {id:7, type:'mobil', name:'Toyota Hiace', price:800, gear:'Manual', cc:'2755cc', fuel:'Irit', img:'assets/img/toyota-hiace.png', rating:4.5, delivery:true},
  {id:8, type:'mobil', name:'VW Tiguan Allspace', price:400, gear:'Automatic', cc:'1395cc', fuel:'Irit', img:'assets/img/mobil-vw.png', rating:4.5, delivery:true},
  {id:9, type:'mobil', name:'Toyota Yaris Blue', price:275, gear:'Automatic', cc:'1496cc', fuel:'Irit', img:'assets/img/toyota-yaris-blue.png', rating:4.5, delivery:true},
  {id:10, type:'mobil', name:'Toyota Avanza', price:275, gear:'Manual', cc:'1329cc', fuel:'Irit', img:'assets/img/toyota-avanza.png', rating:4.5, delivery:true},
  {id:11, type:'mobil', name:'Toyota Avanza 2', price:275, gear:'Manual', cc:'1329cc', fuel:'Irit', img:'assets/img/toyota-avanza2.jpg', rating:4.5, delivery:true},
];

// ====== Helpers ======
const qs  = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));
const rupiah = n => n.toLocaleString('id-ID');
const pad2 = n => String(n).padStart(2,'0');

// Date helpers
const today = new Date();
const startOfDay = d => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate()+n);
const sameDay = (a,b) => a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
const fmtISO = d => `${d.getFullYear()}-${pad2(d.getMonth()+1)}-${pad2(d.getDate())}`;
const fmtHuman = d => d.toLocaleDateString('id-ID', {weekday:'short', day:'numeric', month:'short', year:'numeric'});

// ====== Init ======
document.addEventListener('DOMContentLoaded', () => {
  markActiveNav();
  initBurger();
  initHomePage();
  initKatalogPage();
  initBookingPage();
  initTestimoni();
});

// ====== Navbar active ======
function markActiveNav(){
  const page = document.body.dataset.page;
  qsa('.nav-links a').forEach(a=>{ if(a.dataset.page===page) a.classList.add('active'); });
}

// ====== Burger menu ======
function initBurger(){
  const btn = qs('#navToggle');
  if(!btn) return;
  const links = qsa('.nav-links a');
  const toggle = (open) => {
    const willOpen = open ?? !document.body.classList.contains('nav-open');
    document.body.classList.toggle('nav-open', willOpen);
    btn.setAttribute('aria-expanded', String(willOpen));
  };
  btn.addEventListener('click', ()=> toggle());
  links.forEach(a => a.addEventListener('click', ()=> toggle(false)));
  // klik di luar panel untuk menutup
  document.addEventListener('click', (e)=>{
    if(!document.body.classList.contains('nav-open')) return;
    const panel = qs('.nav-links');
    if(panel && !panel.contains(e.target) && !btn.contains(e.target)) toggle(false);
  });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') toggle(false); });
}

// ====== HOME (search -> ke katalog) ======
function initHomePage(){
  if(!qs('#homePage')) return;
  qs('#searchBtn')?.addEventListener('click', ()=>{
    const url = new URL('katalog.html', location.href);
    const loc = qs('#loc').value || '';
    const s = qs('#start').value || '';
    const e = qs('#end').value || '';
    const g = qs('#gear').value || '';
    if(loc) url.searchParams.set('loc', loc);
    if(s) url.searchParams.set('s', s);
    if(e) url.searchParams.set('e', e);
    if(g) url.searchParams.set('g', g);
    location.href = url;
  });
}

// ====== KATALOG ======
function initKatalogPage(){
  if(!qs('#katalogPage')) return;
  const grid = qs('#cardGrid');

  function cardMarkup(b){
    const priceHuman = rupiah(b.price*1000);
    const waText = `Halo Brutal Rental, saya ingin sewa ${b.name} (per hari Rp ${priceHuman}). Mohon info ketersediaan.`;
    return `
      <article class="card" data-gear="${b.gear}" data-delivery="${b.delivery}" data-price="${b.price}">
        <div class="card-media">
          <img src="${b.img}" alt="${b.name}" style="width:100%; height:100%; object-fit:cover" />
          <span class="badge">${b.delivery ? 'Gratis antar' : 'Ambil ditempat'}</span>
        </div>
        <div class="card-body">
          <div class="card-title">
            <strong>${b.name}</strong>
            <span class="subtitle" aria-label="Rating">★ ${b.rating}</span>
          </div>
          <div class="specs"><span>${b.cc}</span><span>${b.gear}</span><span>${b.fuel}</span></div>
          <div class="price">
            <div class="price-val"><strong>Rp ${priceHuman}</strong> <small class="subtitle">/ hari</small></div>
            <div class="actions">
              <a class="btn btn-outline btn-book" href="booking.html?bike=${b.id}">Booking</a>
              <a class="btn btn-primary" style="background:#25D366; border:none; color:#0a0a0a" target="_blank" href="https://wa.me/6282141642703?text=${encodeURIComponent(waText)}">WhatsApp</a>
            </div>
          </div>
        </div>
      </article>`;
  }

  // Clean markup to avoid encoding glitches in rating/star
  function cleanCardMarkup(b){
    const priceHuman = rupiah(b.price*1000);
    const waText = `Halo Brutal Rental, saya ingin sewa ${b.name} (per hari Rp ${priceHuman}). Mohon info ketersediaan.`;
    return `
      <article class="card" data-gear="${b.gear}" data-delivery="${b.delivery}" data-price="${b.price}">
        <div class="card-media">
          <img src="${b.img}" alt="${b.name}" style="width:100%; height:100%; object-fit:cover" />
          <span class="badge">${b.delivery ? 'Gratis antar' : 'Ambil ditempat'}</span>
        </div>
        <div class="card-body">
          <div class="card-title">
            <strong>${b.name}</strong>
            <span class="subtitle" aria-label="Rating">★ ${b.rating}</span>
          </div>
          <div class="specs"><span>${b.cc}</span><span>${b.gear}</span><span>${b.fuel}</span></div>
          <div class="price">
            <div class="price-val"><strong>Rp ${priceHuman}</strong> <small class="subtitle">/ hari</small></div>
            <div class="actions">
              <a class="btn btn-outline btn-book" href="booking.html?bike=${b.id}">Booking</a>
              <a class="btn btn-primary" style="background:#25D366; border:none; color:#0a0a0a" target="_blank" href="https://wa.me/6282141642703?text=${encodeURIComponent(waText)}">WhatsApp</a>
            </div>
          </div>
        </div>
      </article>`;
  }

  function render(){ grid.innerHTML = bikes.map(cleanCardMarkup).join(''); }
  render();

  // Filters
  const fAuto = qs('#f-auto'), fManual = qs('#f-manual'), fDel = qs('#f-delivery'), fPrice = qs('#f-price');
  function applyFilter(){
    qsa('.card', grid).forEach(card=>{
      const okGear = (fAuto?.checked && card.dataset.gear==='Automatic') || (fManual?.checked && card.dataset.gear==='Manual');
      const okDel = fDel?.checked ? card.dataset.delivery==='true' : true;
      const okPrice = Number(card.dataset.price) <= Number(fPrice?.value||Infinity);
      const show = (okGear || (!fAuto?.checked && !fManual?.checked)) && okDel && okPrice;
      card.style.display = show ? '' : 'none';
    });
  }
  [fAuto,fManual,fDel,fPrice].forEach(el=> el?.addEventListener('input', applyFilter));
  qs('#resetFilter')?.addEventListener('click', ()=>{
    if(fAuto) fAuto.checked = true; if(fManual) fManual.checked = true; if(fDel) fDel.checked = true; if(fPrice) { fPrice.value = 300; qs('#priceVal').textContent = 300; }
    applyFilter();
  });
  applyFilter();

  // Pre-filter from query (optional)
  const q = new URLSearchParams(location.search);
  const g = q.get('g'); if(g==='Automatic'){ if(fManual) fManual.checked=true; if(fAuto) fAuto.checked=true; }
}

// ====== BOOKING (Kalender Dinamis) ======
function initBookingPage(){
  if(!qs('#bookingPage')) return;

  // Ambil info unit (dari query ?bike=ID)
  const params = new URLSearchParams(location.search);
  const bikeId = parseInt(params.get('bike')||'0',10);
  const unit = bikes.find(b=>b.id===bikeId) || bikes[0];

  qs('#bkName').textContent = unit.name;
  qs('#bkPrice').textContent = `Rp ${rupiah(unit.price*1000)} / hari`;
  const fac = qs('#bkFacility'); if(fac) fac.style.display = unit.type==='motor' ? '' : 'none';

  // State range + time
  let selStart = startOfDay(today);
  let selEnd = addDays(selStart, 1);
  let tStart = '08:00', tEnd = '20:00';

  // Inputs
  const startDisp = qs('#dateStartDisplay');
  const endDisp = qs('#dateEndDisplay');
  const timeStart = qs('#timeStart');
  const timeEnd = qs('#timeEnd');
  if(timeStart) timeStart.value = tStart; if(timeEnd) timeEnd.value = tEnd;

  function updateDisplays(){
    if(startDisp) startDisp.value = fmtHuman(selStart);
    if(endDisp) endDisp.value = fmtHuman(selEnd);
  }
  updateDisplays();

  // ===== Range Picker Dialog =====
  const dlg = qs('#drDialog');
  const prevBtn = qs('#prevMonth'), nextBtn = qs('#nextMonth');
  const body = qs('#calBody');
  const clearBtn = qs('#calClear'), applyBtn = qs('#calApply');

  let viewMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const DOW = ['Sen','Sel','Rab','Kam','Jum','Sab','Min'];

  function monthInfo(year, monthIndex){
    const first = new Date(year, monthIndex, 1);
    const days = new Date(year, monthIndex+1, 0).getDate();
    const js = first.getDay(); // 0=Min
    const offset = (js+6)%7;   // Sen=0
    return {first, days, offset};
  }
  function cellClass(d, inThisMonth){
    const cls = ['cal-cell'];
    const minDate = startOfDay(today);
    if(!inThisMonth) cls.push('other');
    if(d < minDate) cls.push('disabled');
    if(sameDay(d, startOfDay(new Date()))) cls.push('today');
    if(selStart && sameDay(d, selStart)) cls.push('start');
    if(selEnd && sameDay(d, selEnd)) cls.push('end');
    if(selStart && selEnd && d > selStart && d < selEnd) cls.push('range');
    return cls.join(' ');
  }
  function drawOneMonth(year, monthIndex){
    const wrap = document.createElement('div'); wrap.className = 'cal-month';
    const title = document.createElement('div'); title.className = 'cal-title';
    title.textContent = new Date(year, monthIndex, 1).toLocaleDateString('id-ID', {month:'long', year:'numeric'});
    const grid = document.createElement('div'); grid.className = 'cal-grid';

    // DOW header
    DOW.forEach(d => { const el = document.createElement('div'); el.className = 'cal-dow'; el.textContent = d; grid.appendChild(el); });

    const {offset} = monthInfo(year, monthIndex);
    const firstCellDate = new Date(year, monthIndex, 1 - offset);
    for(let i=0;i<42;i++){
      const d = addDays(firstCellDate, i);
      const inThisMonth = d.getMonth() === monthIndex;
      const cell = document.createElement('button'); cell.type='button'; cell.className = cellClass(d, inThisMonth);
      cell.textContent = d.getDate(); cell.dataset.iso = fmtISO(d);
      cell.addEventListener('click', ()=>{
        if(!selStart || (selStart && selEnd)){
          selStart = startOfDay(d); selEnd = null;
        }else{
          if(d < selStart){ selStart = startOfDay(d); selEnd = null; }
          else { selEnd = startOfDay(d); }
        }
        renderCal();
      });
      grid.appendChild(cell);
    }
    wrap.appendChild(title); wrap.appendChild(grid); return wrap;
  }
  function renderCal(){ if(!body) return; body.innerHTML = ''; const y=viewMonth.getFullYear(), m=viewMonth.getMonth(); body.appendChild(drawOneMonth(y,m)); body.appendChild(drawOneMonth(y,m+1)); }
  function openDialog(){ renderCal(); dlg?.showModal(); }
  function closeDialog(){ dlg?.close(); }

  qs('#openCalendar')?.addEventListener('click', openDialog);
  prevBtn?.addEventListener('click', ()=>{ viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth()-1, 1); renderCal(); });
  nextBtn?.addEventListener('click', ()=>{ viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth()+1, 1); renderCal(); });
  clearBtn?.addEventListener('click', ()=>{ selStart = startOfDay(today); selEnd = addDays(selStart,1); renderCal(); });
  applyBtn?.addEventListener('click', ()=>{ if(!selEnd) selEnd = addDays(selStart,1); updateDisplays(); updatePrice(); closeDialog(); });
  dlg?.addEventListener('cancel', e=>{ e.preventDefault(); closeDialog(); });

  // ===== Quick Presets =====
  qs('#qToday')?.addEventListener('click', ()=>{ selStart = startOfDay(today); selEnd = addDays(selStart,1); updateDisplays(); updatePrice(); });
  qs('#qTomorrow')?.addEventListener('click', ()=>{ selStart = startOfDay(addDays(today,1)); selEnd = addDays(selStart,1); updateDisplays(); updatePrice(); });
  qs('#qWeekend')?.addEventListener('click', ()=>{
    const dow = today.getDay(); const toSat = (6 - dow + 7) % 7; const sat = startOfDay(addDays(today, toSat)); const sun = startOfDay(addDays(sat,1)); selStart = sat; selEnd = addDays(sun,1); updateDisplays(); updatePrice();
  });
  qs('#q3d')?.addEventListener('click', ()=>{ selStart = startOfDay(today); selEnd = addDays(selStart,3); updateDisplays(); updatePrice(); });
  qs('#q7d')?.addEventListener('click', ()=>{ selStart = startOfDay(today); selEnd = addDays(selStart,7); updateDisplays(); updatePrice(); });

  // ===== Time & Options =====
  timeStart?.addEventListener('change', ()=>{ tStart = timeStart.value||'08:00'; updatePrice(); });
  timeEnd?.addEventListener('change', ()=>{ tEnd = timeEnd.value||'20:00'; updatePrice(); });
  qs('#optDelivery')?.addEventListener('change', updatePrice);

  function updatePrice(){
    // Perhitungan durasi berbasis selisih tanggal (24 jam = 1 hari)
    const dayMs = 24*60*60*1000;
    const sDate = startOfDay(selStart);
    const eDate = startOfDay(selEnd);
    const rawDays = Math.round((eDate - sDate)/dayMs);
    const days = Math.max(1, rawDays);

    const perDay = unit.price * 1000;
    const base = perDay * days;
    const discRate = 0; // diskon otomatis dinonaktifkan
    const deliveryChecked = qs('#optDelivery')?.checked;
    const deliveryFee = deliveryChecked ? (unit.delivery ? 0 : 15000) : 0;
    const total = Math.round(base*(1-discRate) + deliveryFee);

    qs('#sumDays').textContent = `${days} hari`;
    qs('#sumBase').textContent = `Rp ${rupiah(base)}`;
    qs('#sumDisc').textContent = discRate>0 ? `- ${Math.round(discRate*100)}%` : '-';
    qs('#sumDeliv').textContent = deliveryFee>0 ? `Rp ${rupiah(deliveryFee)}` : (deliveryChecked ? 'Gratis' : '-');
    qs('#sumTotal').textContent = `Rp ${rupiah(total)}`;
  }
  updatePrice();

  // Submit booking -> direct to WhatsApp
  qs('#bkForm')?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = (qs('#bkForm input[placeholder="Nama lengkap"]')?.value||'').trim();
    const phone = (qs('#bkForm input[type="tel"]')?.value||'').trim();
    const loc = (qs('#bkForm input[placeholder="Alamat / titik temu"]')?.value||'').trim();
    const deliveryTxt = qs('#optDelivery')?.checked ? 'Ya (antar)' : 'Tidak (ambil sendiri)';
    const msg = [
      `Halo Brutal Rental, saya ingin memesan:`,
      `Unit: ${unit.name}`,
      unit.type==='motor' ? `Fasilitas: termasuk 2 helm + jas hujan` : null,
      `Dari: ${startDisp?.value||fmtHuman(selStart)} ${timeStart?.value||tStart}`,
      `Sampai: ${endDisp?.value||fmtHuman(selEnd)} ${timeEnd?.value||tEnd}`,
      `Antar ke alamat: ${deliveryTxt}`,
      loc ? `Lokasi: ${loc}` : null,
      name ? `Nama: ${name}` : null,
      phone ? `No.WA: ${phone}` : null,
      `Perkiraan Total: ${qs('#sumTotal').textContent}`
    ].filter(Boolean).join('\n');
    const wa = `https://wa.me/6282141642703?text=${encodeURIComponent(msg)}`;
    window.open(wa, '_blank', 'noopener');
  });
}

// ====== TESTIMONI (carousel sederhana) ======
function initTestimoni(){
  const slides = qs('#slides');
  if(!slides) return;
  let idx = 0; setInterval(()=>{ idx = (idx+1)%qsa('.slide', slides).length; slides.style.transform = `translateX(-${idx*100}%)`; }, 3500);
}


