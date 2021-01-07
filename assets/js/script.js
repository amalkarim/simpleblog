const COMMENTS = "COMMENTS";

showComments();

/* --------------- comment script --------------- */

let submitButton = document.getElementById("submit-comment");

submitButton.addEventListener('click', function(event) {
  let comment = {
    author: document.getElementById("your-name").value,
    post: document.getElementById("your-comment").value,
    date: getFormattedDate()
  }

  if (comment.author == false || comment.post == false) return;

  renderComment(comment);
  saveComment(comment);
});

function renderComment(comment) {
  let img = comment.author.replace(/ /g, "+");

  let blogComments = document.querySelector(".blog-comments");

  let article = document.createElement("article");
  article.setAttribute("class", "comment");
  
  article.innerHTML = `
    <div class="comment-photo">
      <img src="https://ui-avatars.com/api/?name=${img}" alt="Foto Yang Komentar">
    </div>

    <div class="comment-content">
      <p class="comment-author">${comment.author}</p>
      <p class="comment-post">${comment.post}</p>
      <p class="comment-date">${comment.date}</p>
    </div>
  `;

  blogComments.insertBefore(article, blogComments.childNodes[0]);

  document.getElementById("your-name").value = "";
  document.getElementById("your-comment").value = ""

}

function getFormattedDate() {
  let today = new Date();

  function getBulan(today) {
    let bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    return bulan[today.getMonth()];
  }

  let date = today.getDate() + " " + getBulan(today) + " " + today.getFullYear();
  let time = String(today.getHours()).padStart(2, "0") + ":"
    + String(today.getMinutes()).padStart(2, "0") + ":"
    + String(today.getSeconds()).padStart(2, "0");

  return date + " " + time;
}

/* --------------- comment to web storage function --------------- */

function isDefined(obj) {
  return obj !== undefined;
}

function saveComment(comment) {
  if (!isDefined(Storage)) return;

  let comments;

  if (!isDefined(localStorage.COMMENTS)) {
    localStorage.setItem(COMMENTS, '');
    comments = [];
  }
  else {
    comments = JSON.parse(localStorage.getItem(COMMENTS));
  }

  comments.push(comment);

  if (comments.length > 20) {
    comments.shift();
}

  localStorage.setItem(COMMENTS, JSON.stringify(comments));
}

function showComments() {
  if (isDefined(localStorage.COMMENTS) && localStorage.COMMENTS != '') {
    let comments = JSON.parse(localStorage.getItem(COMMENTS));
    if (comments.length > 0) {
      for(comment of comments) {
        renderComment(comment);
      }
    }
  }
}

function clearComments() {
  if (isDefined(localStorage.comments)) {
    localStorage.removeItem(COMMENTS);
    location.reload();
  }
}

/* --------------- password generator function --------------- */

function generatePassword() {
  function genString() {
    let string = "";
    for (key of Object.keys(randomWords)) {
      let random = randomWords[key][Math.floor(Math.random() * randomWords[key].length)];
      string += random;
    }

    return string;
  }

  let word = genString();

  if (word.length < 20) word += genString();
  if (word.length > 20) word = word.slice(0, 20);

  let alayWord = '';
  for(char in word) {
    alayWord += (Math.floor(Math.random() * 2)) ? word[char].toUpperCase() : word[char].toLowerCase();
  }

  return alayWord;
}

function showPassword() {
  let container = document.getElementById("generated");
  container.innerText = generatePassword();
}

let randomWords = {
  cities: [
    "BandaAceh", "Langsa", "Lhokseumawe", "Meulaboh", "Sabang", "Subulussalam", "Denpasar", "Pangkalpinang", "Cilegon", "Serang", "TangerangSelatan", "Tangerang", "Bengkulu", "Gorontalo", "JakartaBarat", "JakartaPusat", "JakartaSelatan", "JakartaTimur", "JakartaUtara", "SungaiPenuh", "Jambi", "Bandung", "Bekasi", "Bogor", "Cimahi", "Cirebon", "Depok", "Sukabumi", "Tasikmalaya", "Banjar", "Magelang", "Pekalongan", "Purwokerto", "Salatiga", "Semarang", "Surakarta", "Tegal", "Batu", "Blitar", "Kediri", "Madiun", "Malang", "Mojokerto", "Pasuruan", "Probolinggo", "Surabaya", "Pontianak", "Singkawang", "Banjarbaru", "Banjarmasin", "Palangkaraya", "Balikpapan", "Bontang", "Samarinda", "Tarakan", "Batam", "Tanjungpinang", "BandarLampung", "Metro", "Ternate", "TidoreKepulauan", "Ambon", "Tual", "Bima", "Mataram", "Kupang", "Sorong", "Jayapura", "Dumai", "Pekanbaru", "Makassar", "Palopo", "Parepare", "Palu", "BauBau", "Kendari", "Bitung", "Kotamobagu", "Manado", "Tomohon", "Bukittinggi", "Padang", "Padangpanjang", "Pariaman", "Payakumbuh", "Sawahlunto", "Solok", "Lubuklinggau", "Pagaralam", "Palembang", "Prabumulih", "Binjai", "Medan", "PadangSidempuan", "Pematangsiantar", "Sibolga", "Tanjungbalai", "Tebingtinggi", "Yogyakarta"
  ],
  mammals: [
    "Domba", "Sapi", "Rusa", "Kerbau", "Jerapah", "Babi", "Kambing", "Banteng", "Gajah", "Anjing", "Cerpelai", "Kucing", "Serigala", "Harimau", "Macan Tutul", "Singa", "Dubuk", "Cheetah", "Beruang", "Musang", "Panda", "Sigung", "Berangberang", "Binturung", "Tikus", "Mencit", "Bajing", "Marmut", "Hamster", "Kapibara", "Kelinci", "TerweluPaus", "Lumbalumba", "Duyung", "Manate", "Platipus", "Echidna", "Kuda", "Keledai", "Zebra", "Badak", "Tapir", "Lemur", "Loris", "Monyet", "Gorila", "Orangutan", "Simpanse", "Owa", "Siamang", "Ungko"
  ],
  flowers: [
    "Abelmoschusmanihot", "Ajangkelicung", "Alternanthera", "Amarilis", "Anggrekjamrud", "Anggreklarat", "Anggrekmutiara", "Anggrekserat", "Anyelir", "Aster", "Azalea", "Bakunglelabahmerah", "Bauhiniacoccinea", "Bellisperennis", "Botan", "Bungaairmancur", "Bungakukumacan", "Bungapukulempat", "Bungatasbih", "Campsisgrandiflora", "Cempakahutankasar", "Crinum", "Crocus", "Dahlia", "Datura", "Episcia", "Episciacupreata"
  ]
};