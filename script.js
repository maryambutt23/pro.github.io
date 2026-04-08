// ================= Data =================
let cart = [];
const brands = ["Qalamkar","MNR","Coco","Breeze","Maryam Hussain"];
const products = [
  {name:"qalam1",price:8500,img:"images/brands/Qalamkar/qalam1.jpg",brand:"Qalamkar"},
  {name:"qalam2",price:10700,img:"images/brands/Qalamkar/qalam2.jpg",brand:"Qalamkar"},
{name:"qalam3",price:12700,img:"images/brands/Qalamkar/qalam3.jpg",brand:"Qalamkar"},
{name:"qalam4",price:14700,img:"images/brands/Qalamkar/qalam4.jpg",brand:"Qalamkar"},
{name:"qalam5",price:16700,img:"images/brands/Qalamkar/qalam5.jpg",brand:"Qalamkar"},
{name:"qalam6",price:10700,img:"images/brands/Qalamkar/qalam6.jpg",brand:"Qalamkar"},
{name:"qalam7",price:17000,img:"images/brands/Qalamkar/qalam7.jpg",brand:"Qalamkar"},
{name:"qalam8",price:10700,img:"images/brands/Qalamkar/qalam8.jpg",brand:"Qalamkar"},
{name:"qalam9",price:11700,img:"images/brands/Qalamkar/qalam9.jpg",brand:"Qalamkar"},

  {name:"MNR1",price:30000,img:"images/brands/MNR/mnr1.jpg",brand:"MNR"},
  {name:"MNR2",price:24000,img:"images/brands/MNR/mnr2.jpg",brand:"MNR"},
{name:"MNR3",price:27000,img:"images/brands/MNR/mnr3.jpg",brand:"MNR"},
{name:"MNR4",price:15000,img:"images/brands/MNR/mnr4.jpg",brand:"MNR"},
{name:"MNR5",price:15000,img:"images/brands/MNR/mnr5.jpg",brand:"MNR"},

  {name:"Coco1",price:8000,img:"images/brands/Coco/coco1.jpg",brand:"Coco"},
  {name:"Coco2",price:7500,img:"images/brands/Coco/coco2.jpg",brand:"Coco"},
{name:"Coco3",price:7500,img:"images/brands/Coco/coco3.jpg",brand:"Coco"},
{name:"Coco4",price:7500,img:"images/brands/Coco/coco4.jpg",brand:"Coco"},
 
  {name:"Breeze1",price:15000,img:"images/brands/Breeze/breeze1.jpg",brand:"Breeze"}
];

// ================= Navbar / Brands =================
const brandsMenu = document.getElementById("brands-menu");
brands.forEach(b=>{
  const li=document.createElement("li");
  li.innerText=b;
  li.onclick=function(){
    filterBrand(b);
    document.querySelectorAll("#brands-menu li").forEach(x=>x.classList.remove("active"));
    this.classList.add("active");
    document.getElementById("products").scrollIntoView({behavior:"smooth"});
  };
  brandsMenu.appendChild(li);
});
function goHome(){
  displayProducts(products);
  document.querySelectorAll("#brands-menu li").forEach(x=>x.classList.remove("active"));
  document.getElementById("home-btn").classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

// ================= Products =================
const productCards=document.getElementById("product-cards");
function displayProducts(list){
  productCards.innerHTML="";
  list.forEach(p=>{
    const div=document.createElement("div");
    div.className="card";
    div.innerHTML=`<img src="${p.img}" alt="${p.name}" onclick="openQuickView('${p.name}','${p.brand}','${p.price}','${p.img}')">
                   <h3>${p.name}</h3>
                   <p>Rs ${p.price}</p>
                   <button onclick="addToCart('${p.name}',${p.price},'${p.img}')">Add to Cart</button>`;
    productCards.appendChild(div);
    setTimeout(()=>div.classList.add("visible"),100);
  });
}
function filterBrand(brand){ displayProducts(products.filter(p=>p.brand===brand)); }
goHome();

// ================= Cart =================
function addToCart(name,price,img){ cart.push({name,price,img}); updateCart(); }
function updateCart(){
  const items=document.getElementById("cart-items"); items.innerHTML="";
  let total=0;
  cart.forEach((item,i)=>{
    const li=document.createElement("li");
    li.innerHTML=`<img src="${item.img}"><span>${item.name}-Rs ${item.price}</span><button onclick="removeItem(${i})">❌</button>`;
    items.appendChild(li);
    total+=item.price;
  });
  document.getElementById("total").innerText=total;
  document.getElementById("cart-count").innerText=cart.length;
}
function removeItem(i){ cart.splice(i,1); updateCart(); }
function openCart(){ document.getElementById("cart").classList.toggle("active"); }
function checkout(){
  if(cart.length===0){alert("Cart is empty"); return;}
  let msg="Order:%0A";
  cart.forEach(i=>msg+=`${i.name}-Rs ${i.price}%0A`);
  window.open("https://wa.me/923029197159?text="+msg);
}
function contactWhatsApp(){ window.open("https://wa.me/923029197159","_blank"); }

// ================= Hero Carousel =================
const heroImages=document.querySelectorAll(".hero-carousel img");
const heroDotsContainer=document.getElementById("hero-dots");
let heroIndex=0;
heroImages.forEach((img,i)=>{
  const dot=document.createElement("span");
  if(i===0)dot.classList.add("active");
  dot.onclick=()=>goToHero(i);
  heroDotsContainer.appendChild(dot);
});
const heroDots=document.querySelectorAll("#hero-dots span");
function showNextHero(){
  heroImages[heroIndex].classList.remove("active");
  heroDots[heroIndex].classList.remove("active");
  heroIndex=(heroIndex+1)%heroImages.length;
  heroImages[heroIndex].classList.add("active");
  heroDots[heroIndex].classList.add("active");
}
function goToHero(i){
  heroImages[heroIndex].classList.remove("active");
  heroDots[heroIndex].classList.remove("active");
  heroIndex=i;
  heroImages[heroIndex].classList.add("active");
  heroDots[heroIndex].classList.add("active");
}
setInterval(showNextHero,4000);

// ================= Publicity Gallery =================
const publicityImages=["AB.jpg","BC.jpg","CD.jpg","DE.jpg"];
const publicityGallery=document.getElementById("publicity-gallery");
publicityImages.forEach(img=>{
  const image=document.createElement("img");
  image.src="images/publicity/"+img;
  publicityGallery.appendChild(image);
});
let scrollAmount=0;
function autoScrollGallery(){
  scrollAmount+=2;
  if(scrollAmount>=publicityGallery.scrollWidth-publicityGallery.clientWidth)scrollAmount=0;
  publicityGallery.scrollTo({left:scrollAmount,behavior:'smooth'});
}
setInterval(autoScrollGallery,50);
function scrollGallery(dir){
  scrollAmount+=dir*150;
  if(scrollAmount<0)scrollAmount=0;
  if(scrollAmount>publicityGallery.scrollWidth-publicityGallery.clientWidth)scrollAmount=publicityGallery.scrollWidth-publicityGallery.clientWidth;
  publicityGallery.scrollTo({left:scrollAmount,behavior:'smooth'});
}

// ================= Quick View =================
function openQuickView(name,brand,price,img){
  document.getElementById("popup-img").src=img;
  document.getElementById("popup-name").innerText=name;
  document.getElementById("popup-brand").innerText=brand;
  document.getElementById("popup-price").innerText="Rs "+price;
  document.getElementById("popup-add-cart").onclick=()=>{ addToCart(name,price,img); closeQuickView(); };
  document.getElementById("quick-view").style.display="flex";
}
function closeQuickView(){ document.getElementById("quick-view").style.display="none"; }

// ================= Responsive Menu =================
function toggleMenu(){document.querySelector('.nav-links').classList.toggle('active');}