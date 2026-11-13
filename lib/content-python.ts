// Materi Python tambahan (sintaks + proyek berbasis kemampuan), kategori, urutan, dan baris "Setelah ini kamu bisa".
// File ini berisi data saja. Dipakai oleh lib/content.ts. Tambah topik baru dengan menambah objek di PY_LESSONS.
// Di teks, tip, dan catatan: {{kode}} ditampilkan sebagai kode.

export interface RawLesson {
  id: string;
  group: string;
  title: string;
  desc: string;
  kw: string;
  text: string;
  ex: { t: string; n?: string; p: string }[];
  tip?: string;
}

export const PY_LESSONS: RawLesson[] = [
  {
    id: 'p-comment',
    group: 'Dasar Python',
    title: 'Comments: catatan di dalam kode',
    desc: 'Menulis komentar dengan #',
    kw: 'comment,komentar,catatan,hash,tanda pagar,nonaktifkan',
    text: 'Baris yang diawali {{#}} adalah komentar. Python mengabaikannya, jadi kamu bebas menulis catatan untuk diri sendiri atau orang lain. Komentar juga berguna untuk menonaktifkan satu baris kode sementara.',
    ex: [
      {
        t: 'Komentar di Python',
        p: '# ini catatan, tidak dijalankan\nprint("Halo")  # komentar di ujung baris\n# print("baris ini dinonaktifkan")',
      },
    ],
    tip: 'Tulis komentar untuk menjelaskan MENGAPA kodenya begitu, bukan mengulang apa yang sudah jelas terbaca.',
  },
  {
    id: 'p-input',
    group: 'Input dan Konversi',
    title: 'Input: bertanya ke pengguna',
    desc: 'Mengambil masukan dengan input()',
    kw: 'input,masukan,tanya,keyboard,interaktif,ketik,jawaban',
    text: '{{input()}} menampilkan pertanyaan, menunggu pengguna mengetik, lalu mengembalikan jawabannya. Hasilnya SELALU berupa teks ({{str}}), bahkan kalau yang diketik adalah angka.',
    ex: [
      {
        t: 'Menyapa pengguna',
        n: 'Tekan Run, lalu ketik jawabanmu. Di editor utama, kolom ketiknya muncul langsung di terminal.',
        p: 'nama = input("Siapa namamu? ")\nprint("Halo, " + nama + "!")',
      },
      {
        t: 'Hasilnya selalu teks',
        p: 'umur = input("Umurmu? ")\nprint(umur)\nprint(type(umur))   # str, bukan int',
      },
    ],
    tip: 'Karena hasil {{input()}} selalu teks, kamu perlu mengubahnya dulu kalau ingin menghitung. Itu materi berikutnya.',
  },
  {
    id: 'p-konversi',
    group: 'Input dan Konversi',
    title: 'Type conversion: int(), float(), str()',
    desc: 'Mengubah satu jenis data ke jenis lain',
    kw: 'konversi,type conversion,casting,int,float,str,ubah tipe,angka,teks,desimal',
    text: 'Mengubah satu jenis data ke jenis lain disebut type conversion. {{int()}} mengubah ke bilangan bulat, {{float()}} ke desimal, dan {{str()}} ke teks. Gabungan {{input()}} dan {{int()}} adalah kunci membuat program interaktif yang bisa menghitung.',
    ex: [
      {
        t: 'Tiga pengubah dasar',
        p: 'print(int("5") + 5)          # 10\nprint(float("2.5") * 2)      # 5.0\nprint("Umur: " + str(17))    # teks digabung teks\nprint(int(7.9))              # 7 (dibulatkan ke bawah)',
      },
      {
        t: 'Input lalu dihitung',
        n: 'Inilah pola yang paling sering dipakai di program interaktif: ambil teks, ubah jadi angka, hitung.',
        p: 'angka = int(input("Masukkan angka: "))\nprint("Dua kali lipatnya:", angka * 2)\nprint("Kuadratnya:", angka ** 2)',
      },
    ],
    tip: 'Kalau teksnya bukan angka (mis. "abc"), {{int()}} akan error. Cara menanganinya ada di materi Exception handling.',
  },
  {
    id: 'p-banding',
    group: 'Operator dan Kondisi',
    title: 'Comparison operators',
    desc: '==, !=, >, <, >=, <=',
    kw: 'perbandingan,comparison,sama dengan,tidak sama,lebih besar,lebih kecil,==,!=,bandingkan',
    text: 'Operator perbandingan membandingkan dua nilai dan menghasilkan {{True}} atau {{False}}. {{==}} berarti sama dengan, {{!=}} tidak sama, lalu {{>}} {{<}} {{>=}} {{<=}} untuk lebih besar atau lebih kecil. Hasilnya inilah yang dipakai {{if}} untuk mengambil keputusan.',
    ex: [
      {
        t: 'Membandingkan nilai',
        p: 'print(5 == 5)       # True\nprint(5 != 3)       # True\nprint(7 > 10)       # False\nprint(7 <= 7)       # True\nprint("a" == "A")   # False, huruf besar dan kecil dianggap beda',
      },
    ],
    tip: '{{==}} untuk membandingkan, {{=}} untuk menyimpan nilai. Tertukar keduanya adalah kesalahan yang sangat umum.',
  },
  {
    id: 'p-logika',
    group: 'Operator dan Kondisi',
    title: 'Logical operators: and, or, not',
    desc: 'Menggabungkan beberapa kondisi',
    kw: 'logika,logical,and,or,not,dan,atau,bukan,gabung kondisi,boolean',
    text: 'Operator logika menggabungkan beberapa kondisi. {{and}} benar kalau semuanya benar. {{or}} benar kalau salah satunya benar. {{not}} membalik {{True}} menjadi {{False}}, dan sebaliknya.',
    ex: [
      {
        t: 'Tiga operator logika',
        p: 'umur = 17\npunya_kartu = True\n\nprint(umur >= 17 and punya_kartu)   # True\nprint(umur < 17 or punya_kartu)     # True\nprint(not punya_kartu)              # False',
      },
      {
        t: 'Dipakai di if',
        p: 'jam = 20\n\nif jam >= 6 and jam < 18:\n    print("Siang")\nelse:\n    print("Malam")',
      },
    ],
  },
  {
    id: 'p-list-method',
    group: 'Koleksi Data',
    title: 'List methods',
    desc: 'append, remove, pop, sort',
    kw: 'list,method,append,remove,pop,sort,insert,hapus,urutkan,tambah,reverse',
    text: 'List punya banyak method bawaan. {{append}} menambah item di belakang, {{remove}} menghapus item berdasarkan nilainya, {{pop}} mengambil sekaligus menghapus item (default yang terakhir), dan {{sort}} mengurutkan isinya.',
    ex: [
      {
        t: 'Menambah dan menghapus',
        p: 'buah = ["jeruk", "apel"]\nbuah.append("mangga")\nbuah.remove("apel")\nprint(buah)\n\nterakhir = buah.pop()\nprint(terakhir, buah)',
      },
      {
        t: 'Mengurutkan',
        p: 'angka = [3, 1, 2]\nangka.sort()\nprint(angka)\n\nangka.sort(reverse=True)\nprint(angka)',
      },
    ],
  },
  {
    id: 'p-tuple-set',
    group: 'Koleksi Data',
    title: 'Tuple dan set',
    desc: 'Dua jenis koleksi data lainnya',
    kw: 'tuple,set,himpunan,unik,tidak bisa diubah,immutable,duplikat,koleksi',
    text: 'Tuple mirip list tapi tidak bisa diubah setelah dibuat (pakai kurung biasa). Set adalah kumpulan nilai unik tanpa urutan (pakai kurung kurawal): nilai yang sama otomatis hanya disimpan sekali.',
    ex: [
      {
        t: 'Tuple',
        p: 'titik = (3, 4)\nprint(titik[0])\nprint(len(titik))\n# titik[0] = 9   <- error, tuple tidak bisa diubah',
      },
      {
        t: 'Set',
        p: 'tag = {"python", "web", "python"}\nprint(tag)            # "python" hanya muncul sekali\n\ntag.add("css")\nprint("web" in tag)   # True\nprint(len(tag))',
      },
    ],
    tip: 'Mau membuang duplikat dari sebuah list? Ubah dulu ke set: {{set(daftar)}}.',
  },
  {
    id: 'p-dict-method',
    group: 'Koleksi Data',
    title: 'Dictionary methods',
    desc: 'keys, values, items, get',
    kw: 'dictionary,dict,method,keys,values,items,get,kunci,nilai,kamus',
    text: '{{keys()}} memberi semua kunci, {{values()}} semua nilai, dan {{items()}} pasangan kunci dan nilainya (enak dipakai di {{for}}). {{get()}} mengambil nilai tanpa error kalau kuncinya ternyata tidak ada.',
    ex: [
      {
        t: 'Menelusuri dictionary',
        p: 'siswa = {"nama": "Sari", "umur": 17}\n\nprint(siswa.keys())\nprint(siswa.values())\n\nfor kunci, nilai in siswa.items():\n    print(kunci, "=", nilai)',
      },
      {
        t: 'get untuk kunci yang mungkin tidak ada',
        p: 'siswa = {"nama": "Sari"}\n\nprint(siswa.get("nama"))\nprint(siswa.get("kelas", "belum ada"))   # nilai cadangan\n# print(siswa["kelas"])  <- KeyError',
      },
    ],
  },
  {
    id: 'p-param',
    group: 'Fungsi',
    title: 'Parameter dan argument',
    desc: 'Memberi bahan ke fungsi',
    kw: 'parameter,argument,argumen,default,keyword,fungsi,kirim,bahan',
    text: 'Parameter adalah nama bahan yang diminta fungsi (ditulis di dalam kurung saat membuatnya). Argument adalah nilai sebenarnya yang kamu kirim saat memanggil. Parameter boleh punya nilai bawaan, dan argument boleh dikirim lewat namanya.',
    ex: [
      {
        t: 'Parameter dengan nilai bawaan',
        p: 'def sapa(nama, sapaan="Halo"):\n    print(sapaan + ", " + nama + "!")\n\nsapa("Sari")\nsapa("Budi", "Selamat pagi")',
      },
      {
        t: 'Argument lewat nama',
        p: 'def luas(panjang, lebar):\n    print(panjang * lebar)\n\nluas(4, 5)\nluas(lebar=2, panjang=10)   # urutan bebas kalau pakai nama',
      },
    ],
  },
  {
    id: 'p-return',
    group: 'Fungsi',
    title: 'Return value',
    desc: 'Mengembalikan hasil dari fungsi',
    kw: 'return,kembalikan,hasil,none,nilai balik,fungsi',
    text: '{{print}} hanya menampilkan. {{return}} mengirim hasil keluar dari fungsi supaya bisa disimpan atau dipakai lagi. Begitu {{return}} dijalankan, fungsi langsung berhenti. Fungsi tanpa {{return}} menghasilkan {{None}} (artinya: tidak ada nilai).',
    ex: [
      {
        t: 'Fungsi yang menghasilkan nilai',
        p: 'def kali(a, b):\n    return a * b\n\nhasil = kali(4, 5)\nprint(hasil + 1)   # hasilnya bisa dipakai lagi',
      },
      {
        t: 'Return lebih dari sekali',
        p: 'def cek_umur(umur):\n    if umur >= 17:\n        return "Dewasa"\n    return "Belum dewasa"\n\nprint(cek_umur(20))\nprint(cek_umur(10))',
      },
      {
        t: 'Tanpa return',
        p: 'def sapa():\n    print("hai")\n\nhasil = sapa()\nprint(hasil)   # None',
      },
    ],
    tip: 'Fungsi yang hanya mencetak sulit dipakai ulang. Biasakan fungsi menghasilkan nilai lewat {{return}}, lalu cetak di luar.',
  },
  {
    id: 'p-scope',
    group: 'Fungsi',
    title: 'Scope: variabel lokal dan global',
    desc: 'Di mana sebuah variabel bisa dipakai',
    kw: 'scope,lokal,global,local,variabel,jangkauan,global keyword',
    text: 'Variabel yang dibuat di dalam fungsi hanya hidup di dalam fungsi itu (lokal). Variabel di luar semua fungsi bersifat global dan bisa dibaca dari mana saja. Kalau fungsi perlu MENGUBAH variabel global, tulis {{global}} di dalamnya.',
    ex: [
      {
        t: 'Lokal dan global',
        p: 'nama = "global"\n\ndef tes():\n    nama = "lokal"      # variabel baru, hanya hidup di dalam fungsi\n    print(nama)\n\ntes()\nprint(nama)            # tetap "global"',
      },
      {
        t: 'Mengubah variabel global',
        p: 'hitung = 0\n\ndef tambah():\n    global hitung\n    hitung += 1\n\ntambah()\ntambah()\nprint(hitung)',
      },
      {
        t: 'Variabel lokal tidak bisa dipakai di luar',
        n: 'Baris terakhir sengaja dibuat error. Di editor utama, lihat tab Problems untuk penjelasannya.',
        p: 'def tes():\n    rahasia = 42\n\ntes()\nprint(rahasia)',
      },
    ],
    tip: 'Sebisa mungkin kirim data lewat parameter dan {{return}}, bukan lewat variabel global. Kodemu jadi lebih mudah dilacak.',
  },
  {
    id: 'p-except',
    group: 'Menangani Error',
    title: 'Exception handling: try, except, finally',
    desc: 'Menangani error tanpa program berhenti',
    kw: 'try,except,finally,error,exception,tangkap,valueerror,zerodivisionerror,raise',
    text: 'Kalau sebuah baris menimbulkan error, program berhenti. Dengan {{try}} dan {{except}}, kamu mencoba kode yang berisiko lalu menyiapkan rencana cadangan kalau gagal. {{finally}} selalu dijalankan di akhir, berhasil atau tidak.',
    ex: [
      {
        t: 'try dan except',
        p: 'try:\n    angka = int("abc")\nexcept ValueError:\n    print("Itu bukan angka!")\nfinally:\n    print("Selesai dicoba")',
      },
      {
        t: 'Input yang aman',
        n: 'Coba ketik huruf, lalu coba isi angka kedua dengan 0.',
        p: 'try:\n    a = int(input("Angka pertama: "))\n    b = int(input("Angka kedua: "))\n    print("Hasil bagi:", a / b)\nexcept ValueError:\n    print("Masukkan angka saja ya.")\nexcept ZeroDivisionError:\n    print("Tidak bisa dibagi nol.")',
      },
    ],
    tip: 'Tangkap jenis error yang spesifik (mis. {{ValueError}}), jangan {{except}} kosong. Error yang disembunyikan sulit dicari.',
  },
  {
    id: 'p-module',
    group: 'Module',
    title: 'Module dan import',
    desc: 'Memakai kode yang sudah ditulis orang lain',
    kw: 'module,import,from,math,random,library,pustaka,paket',
    text: 'Module adalah file berisi kode siap pakai. {{import}} mengambilnya ke programmu, lalu kamu memanggil isinya lewat {{nama.module}}. Python sudah punya banyak module bawaan, misalnya {{math}} untuk hitungan dan {{random}} untuk angka acak.',
    ex: [
      {
        t: 'Module math',
        p: 'import math\n\nprint(math.sqrt(16))\nprint(math.pi)\nprint(math.ceil(4.2))',
      },
      {
        t: 'from ... import',
        p: 'from random import randint\n\nprint(randint(1, 6))   # lempar dadu, hasilnya beda tiap Run',
      },
    ],
    tip: 'File .py buatanmu sendiri juga bisa di-import. Di editor utama, buat file baru lewat tombol +, misalnya alat.py, lalu tulis {{import alat}} di main.py.',
  },
  {
    id: 'p-proj-sapa',
    group: 'Proyek Kecil',
    title: 'Proyek: program menyapa',
    desc: 'Program yang bertanya lalu menjawab',
    kw: 'proyek,latihan,interaktif,input,sapa,f-string,ktp,umur',
    text: 'Ini program interaktif pertamamu. Kita bangun selangkah demi selangkah, memakai {{input()}}, {{int()}}, f-string, dan {{if}} yang sudah kamu pelajari.',
    ex: [
      {
        t: 'Langkah 1: bertanya nama',
        p: 'nama = input("Siapa namamu? ")\nprint(f"Halo, {nama}!")',
      },
      {
        t: 'Langkah 2: tanya umur lalu hitung',
        p: 'nama = input("Siapa namamu? ")\numur = int(input("Berapa umurmu? "))\n\nprint(f"Halo, {nama}!")\nprint(f"Tahun depan kamu berumur {umur + 1} tahun.")',
      },
      {
        t: 'Langkah 3: beri tanggapan sesuai jawaban',
        p: 'nama = input("Siapa namamu? ")\numur = int(input("Berapa umurmu? "))\n\nprint(f"Halo, {nama}!")\nif umur >= 17:\n    print("Kamu sudah boleh membuat KTP.")\nelse:\n    print(f"{17 - umur} tahun lagi kamu boleh membuat KTP.")',
      },
    ],
    tip: 'Tantangan: tambahkan pertanyaan kota asal, lalu tampilkan di kalimat sapaan.',
  },
  {
    id: 'p-proj-kalkulator',
    group: 'Proyek Kecil',
    title: 'Proyek: kalkulator sederhana',
    desc: 'Menerima dua angka dan satu operator',
    kw: 'proyek,latihan,kalkulator,hitung,input,float,if,elif,try,except',
    text: 'Kita buat kalkulator yang menerima dua angka dan operator. Kamu akan menggabungkan {{input()}}, {{float()}}, {{if}} / {{elif}}, lalu membuatnya tahan salah ketik dengan {{try}} dan {{except}}.',
    ex: [
      {
        t: 'Langkah 1: kalkulator dasar',
        p: 'a = float(input("Angka pertama: "))\nop = input("Operator (+ - * /): ")\nb = float(input("Angka kedua: "))\n\nif op == "+":\n    print(a + b)\nelif op == "-":\n    print(a - b)\nelif op == "*":\n    print(a * b)\nelif op == "/":\n    print(a / b)\nelse:\n    print("Operator tidak dikenal")',
      },
      {
        t: 'Langkah 2: dibungkus fungsi dan tahan salah input',
        n: 'Coba bagi dengan 0, atau ketik huruf sebagai angka.',
        p: 'def hitung(a, op, b):\n    if op == "+":\n        return a + b\n    if op == "-":\n        return a - b\n    if op == "*":\n        return a * b\n    if op == "/":\n        return a / b\n    raise ValueError("Operator tidak dikenal")\n\ntry:\n    a = float(input("Angka pertama: "))\n    op = input("Operator (+ - * /): ")\n    b = float(input("Angka kedua: "))\n    print("Hasil:", hitung(a, op, b))\nexcept ZeroDivisionError:\n    print("Tidak bisa dibagi nol.")\nexcept ValueError as e:\n    print("Input tidak valid:", e)',
      },
    ],
    tip: 'Tantangan: tambahkan operator ** (pangkat) dan % (sisa bagi).',
  },
  {
    id: 'p-proj-tebak',
    group: 'Proyek Kecil',
    title: 'Proyek: game tebak angka',
    desc: 'Game dengan perulangan dan petunjuk',
    kw: 'proyek,latihan,game,tebak angka,random,while,break,input,perulangan',
    text: 'Komputer memilih angka rahasia, kamu menebak sampai benar. Proyek ini memakai {{random}}, {{while}}, {{break}}, dan perbandingan yang sudah kamu pelajari.',
    ex: [
      {
        t: 'Langkah 1: game dasar',
        n: 'Tebakanmu di-input satu per satu. Terus tebak sampai benar.',
        p: 'import random\n\nrahasia = random.randint(1, 10)\npercobaan = 0\n\nwhile True:\n    tebakan = int(input("Tebak angka 1-10: "))\n    percobaan += 1\n    if tebakan == rahasia:\n        print(f"Benar! Kamu butuh {percobaan} kali.")\n        break\n    elif tebakan < rahasia:\n        print("Terlalu kecil")\n    else:\n        print("Terlalu besar")',
      },
      {
        t: 'Langkah 2: tahan salah input',
        p: 'import random\n\nrahasia = random.randint(1, 10)\npercobaan = 0\n\nwhile True:\n    teks = input("Tebak angka 1-10: ")\n    if not teks.isdigit():\n        print("Ketik angka saja ya.")\n        continue\n    tebakan = int(teks)\n    percobaan += 1\n    if tebakan == rahasia:\n        print(f"Benar! Kamu butuh {percobaan} kali.")\n        break\n    print("Terlalu kecil" if tebakan < rahasia else "Terlalu besar")',
      },
    ],
    tip: 'Tantangan: batasi jumlah tebakan jadi 5 kali, lalu beri tahu angka rahasianya kalau kalah.',
  },
  {
    id: 'p-proj-nilai',
    group: 'Proyek Kecil',
    title: 'Proyek: penghitung rata-rata nilai',
    desc: 'Mengolah banyak angka sekaligus',
    kw: 'proyek,latihan,rata-rata,nilai,list,fungsi,sum,len,max,min,while',
    text: 'Kita hitung rata-rata, nilai tertinggi, dan nilai terendah dari sekumpulan angka. Proyek ini menggabungkan list, fungsi, {{return}}, dan perulangan.',
    ex: [
      {
        t: 'Langkah 1: fungsi untuk list tetap',
        p: 'def rata_rata(daftar):\n    return sum(daftar) / len(daftar)\n\nnilai = [80, 90, 75, 85]\nprint("Rata-rata:", rata_rata(nilai))\nprint("Tertinggi:", max(nilai))\nprint("Terendah:", min(nilai))',
      },
      {
        t: 'Langkah 2: nilai diketik oleh pengguna',
        n: 'Ketik nilai satu per satu. Kosongkan lalu Enter untuk selesai.',
        p: 'def rata_rata(daftar):\n    return sum(daftar) / len(daftar)\n\nnilai = []\nwhile True:\n    teks = input("Nilai (kosongkan untuk selesai): ")\n    if teks == "":\n        break\n    nilai.append(int(teks))\n\nif nilai:\n    print("Rata-rata:", rata_rata(nilai))\n    print("Tertinggi:", max(nilai))\n    print("Terendah:", min(nilai))\nelse:\n    print("Belum ada nilai.")',
      },
    ],
    tip: 'Tantangan: urutkan nilainya dengan {{sort}} dan tampilkan dari yang terbesar.',
  },
  {
    id: 'p-proj-todo',
    group: 'Proyek Kecil',
    title: 'Proyek: daftar tugas di terminal',
    desc: 'Program dengan menu yang terus berjalan',
    kw: 'proyek,latihan,todo,daftar tugas,menu,list,append,remove,while,enumerate',
    text: 'Program berbasis menu yang terus berjalan sampai kamu memilih keluar. Kamu akan memakai list, {{append}}, {{pop}}, {{while}}, dan {{enumerate}} untuk memberi nomor.',
    ex: [
      {
        t: 'Daftar tugas dengan menu',
        n: 'Coba: tambah, lihat, hapus, lalu keluar.',
        p: 'tugas = []\n\nwhile True:\n    perintah = input("tambah / lihat / hapus / keluar: ")\n\n    if perintah == "tambah":\n        tugas.append(input("Tugas baru: "))\n    elif perintah == "lihat":\n        if not tugas:\n            print("Belum ada tugas.")\n        for no, isi in enumerate(tugas, start=1):\n            print(f"{no}. {isi}")\n    elif perintah == "hapus":\n        nomor = int(input("Nomor yang dihapus: "))\n        print("Dihapus:", tugas.pop(nomor - 1))\n    elif perintah == "keluar":\n        print("Sampai jumpa!")\n        break\n    else:\n        print("Perintah tidak dikenal.")',
      },
    ],
    tip: 'Tantangan: tangani nomor yang tidak ada dengan {{try}} dan {{except}} {{IndexError}}.',
  },
];

export const PY_CATEGORIES = [
  'Dasar Python',
  'Input dan Konversi',
  'Operator dan Kondisi',
  'Perulangan',
  'Koleksi Data',
  'Fungsi',
  'Menangani Error',
  'Module',
  'Proyek Kecil',
];

// Urutan topik Python di dalam kategori. Topik yang tidak terdaftar mengikuti urutan array lessons.
export const LESSON_ORDER = [
  'p-print',
  'p-comment',
  'p-variabel',
  'p-tipe',
  'p-string',
  'p-input',
  'p-konversi',
  'p-banding',
  'p-logika',
  'p-kondisi',
  'p-loop',
  'p-list',
  'p-list-method',
  'p-tuple-set',
  'p-dict',
  'p-dict-method',
  'p-fungsi',
  'p-param',
  'p-return',
  'p-scope',
  'p-except',
  'p-module',
  'p-proj-sapa',
  'p-proj-kalkulator',
  'p-proj-tebak',
  'p-proj-nilai',
  'p-proj-todo',
];

// Kemampuan yang dibangun tiap topik (Web dan Python). Topik tanpa entri di sini tidak menampilkan baris kemampuan.
export const GOALS: Record<string, string> = {
  'p-print': 'menampilkan hasil program ke terminal',
  'p-comment': 'menulis catatan di kode tanpa memengaruhi program',
  'p-variabel': 'menyimpan nilai dan mengganti isinya kapan saja',
  'p-tipe': 'membedakan angka, teks, dan True/False, lalu menghitung dengannya',
  'p-string': 'mengolah teks dan menyisipkan variabel ke dalam kalimat',
  'p-input': 'membuat program yang bertanya ke pengguna dan menunggu jawabannya',
  'p-konversi': 'mengubah jawaban input() menjadi angka agar bisa dihitung',
  'p-banding': 'membandingkan dua nilai dan mendapat jawaban True atau False',
  'p-logika': 'menggabungkan beberapa syarat sekaligus',
  'p-kondisi': 'membuat program mengambil keputusan sendiri',
  'p-loop': 'mengulang pekerjaan tanpa menulis kode berkali-kali',
  'p-list': 'menyimpan banyak nilai dalam satu daftar dan mengambilnya lagi',
  'p-list-method': 'menambah, menghapus, dan mengurutkan isi list',
  'p-tuple-set': 'memilih jenis koleksi yang tepat: tuple untuk data tetap, set untuk data unik',
  'p-dict': 'menyimpan data lengkap tentang satu hal (mis. satu siswa)',
  'p-dict-method': 'menelusuri dan membaca isi dictionary dengan aman',
  'p-fungsi': 'membungkus kode agar bisa dipakai berulang',
  'p-param': 'membuat fungsi yang menerima bahan berbeda-beda',
  'p-return': 'membuat fungsi yang menghasilkan nilai untuk dipakai lagi',
  'p-scope': 'tahu di mana sebuah variabel bisa dipakai',
  'p-except': 'membuat programmu tidak berhenti total saat ada input yang salah',
  'p-module': 'memakai fungsi siap pakai dari module, termasuk file buatanmu sendiri',
  'p-proj-sapa': 'membuat program interaktif pertama yang bertanya lalu menanggapi jawabanmu',
  'p-proj-kalkulator': 'membuat kalkulator yang menerima angka dan operator dari pengguna',
  'p-proj-tebak': 'membuat game kecil dengan perulangan, angka acak, dan petunjuk',
  'p-proj-nilai': 'mengolah banyak angka sekaligus: rata-rata, tertinggi, terendah',
  'p-proj-todo': 'membuat program berbasis menu yang terus berjalan sampai kamu keluar',
  'w-struktur': 'menulis kerangka halaman dengan tag HTML',
  'w-teks': 'membuat judul, paragraf, teks tebal, dan teks miring',
  'w-daftar': 'membuat daftar bertitik dan bernomor',
  'w-link': 'menautkan ke halaman lain dan memasang gambar',
  'w-form': 'membuat kotak isian dan tombol',
  'w-div': 'mengelompokkan elemen dan memberinya nama lewat class dan id',
  'w-tabel': 'menyajikan data dalam bentuk tabel',
  'w-selector': 'memilih elemen mana yang ingin diubah tampilannya',
  'w-warna': 'mengatur warna teks dan latar',
  'w-font': 'mengatur ukuran, ketebalan, dan posisi teks',
  'w-padding': 'mengatur ruang di dalam kotak',
  'w-margin': 'mengatur jarak antar kotak dan menaruh kotak di tengah',
  'w-border': 'memberi garis tepi dan sudut yang membulat',
  'w-size': 'mengatur lebar dan tinggi elemen',
  'w-display': 'mengatur cara elemen menempati ruang',
  'w-flex': 'menyusun elemen sejajar dan menaruhnya tepat di tengah',
  'w-position': 'menumpuk elemen dan menempatkannya di posisi tertentu',
  'w-hover': 'membuat elemen bereaksi saat disentuh kursor',
  'w-log': 'mengintip nilai di Console untuk mengecek kodemu',
  'w-variabel': 'menyimpan nilai dan mengganti isinya',
  'w-tipe': 'membedakan teks, angka, dan boolean, lalu menghitung dengannya',
  'w-if': 'membuat program mengambil keputusan',
  'w-fungsi': 'membungkus kode agar bisa dipakai berulang',
  'w-array': 'menyimpan banyak nilai dalam satu daftar',
  'w-loop': 'mengulang pekerjaan tanpa menulis kode berkali-kali',
  'w-dom': 'mengambil dan mengubah elemen halaman lewat JavaScript',
  'w-event': 'membuat halaman bereaksi saat diklik',
};
