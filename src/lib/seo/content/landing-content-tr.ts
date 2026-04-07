import type { LandingContentData } from "./landing-content";

export const landingContentTr: Record<string, LandingContentData> = {
  pdf: {
    title: "ToolPop PDF Hakkında",
    description:
      "ToolPop PDF, tarayıcı tabanlı ücretsiz bir PDF araçları paketidir. PDF belgelerinizi herhangi bir sunucuya dosya yüklemeden birleştirin, bölün, sıkıştırın, dönüştürün, düzenleyin ve koruyun - her şey maksimum gizlilik ve hız için tarayıcınızda yerel olarak çalışır.",
    sections: [
      {
        heading: "Gizlilik Öncelikli İşleme",
        text: "Tüm PDF işlemleri WebAssembly ve JavaScript kullanarak tamamen tarayıcınızda gerçekleşir. Dosyalarınız cihazınızı hiçbir zaman terk etmez, bu nedenle hassas belgeler özel kalır. Hesap gerekli değil, dosya boyutu sınırı yok, filigran yok.",
      },
      {
        heading: "Kapsamlı Araç Seti",
        text: "Birleştirme ve bölme gibi temel görevlerden redaksiyon, dijital imzalar ve PDF/A dönüştürmesi gibi gelişmiş özelliklere kadar - ToolPop PDF her PDF iş akışını kapsar. Sayfaları düzenleyin, filigranlar ekleyin, e-posta için sıkıştırın veya birkaç tıklama ile biçimleri dönüştürün.",
      },
    ],
  },
  image: {
    title: "ToolPop Görüntü Hakkında",
    description:
      "ToolPop Image, ücretsiz çevrimiçi görüntü düzenleme ve dönüştürme araçları sağlar. Yeniden boyutlandırın, kırpın, sıkıştırın, biçimleri dönüştürün, filtreler uygulayın ve grafikler oluşturun - tümü tarayıcınızda yerel olarak işlenir, sunucu yüklemesi yoktur.",
    sections: [
      {
        heading: "Yazılım Olmadan Düzenle",
        text: "Photoshop veya GIMP yüklemeye gerek yoktur. ToolPop Image gündelik görüntü görevlerini doğrudan tarayıcınızda işler - sosyal medya için yeniden boyutlandırın, belirli boyutlara kırpın, metin veya filigran ekleyin ve profesyonel filtreleri anında uygulayın.",
      },
      {
        heading: "Format Dönüştürme Kolaylaştırıldı",
        text: "JPG, PNG, WebP, SVG, HEIC, TIFF, PSD, EPS ve daha fazlası arasında dönüştürün. Toplu işleme, aynı anda birden fazla dosyayı dönüştürmenizi sağlar. Her dönüştürme dosya boyutunu optimize ederken kaliteyi korur.",
      },
    ],
  },
  text: {
    title: "ToolPop Metin Hakkında",
    description:
      "ToolPop Text, ücretsiz metin manipülasyonu, analiz ve kodlama araçlarının bir koleksiyonu sunmaktadır. Kelimeleri sayın, durumu dönüştürün, bulun ve değiştirin, hash oluşturun, JSON formatını yaplandırın ve daha fazlasını yapın - tümü tarayıcınızda anında çalıştırılır.",
    sections: [
      {
        heading: "Yazarlar ve Geliştiriciler İçin",
        text: "Bir deneme için kelime sayılarına, kod için regex testine, API çalışması için Base64 kodlamasına veya mockuplar için Lorem Ipsum'a ihtiyacınız olsun - ToolPop Text her metin görevi için özel bir araca sahiptir.",
      },
      {
        heading: "Anında Sonuçlar",
        text: "Her araç yazarken metni gerçek zamanlı olarak işler. Bekleme yok, sunucu gidiş dönüş yok. Optimize edilmiş istemci tarafı işleme sayesinde büyük belgeleri kolayca işleyin.",
      },
    ],
  },
  converter: {
    title: "ToolPop Dönüştürücü Hakkında",
    description:
      "ToolPop Converter, ücretsiz birim ve veri dönüştürme araç setidir. Ölçümleri, renkleri, tarihleri, veri biçimlerini ve CSS birimlerini tarayıcınızda anında dönüştürün. Günlük pişirme ölçümlerinden geliştirici odaklı JSON/YAML dönüştürmelerine kadar.",
    sections: [
      {
        heading: "İhtiyacınız Olan Her Dönüştürme",
        text: "Uzunluk, ağırlık, sıcaklık, alan, hacim, hız, basınç, enerji - gerçek zamanlı sonuçlarla tüm standart birim dönüştürmeleri. Ayrıca renk biçimleri, saat dilimi dönüştürmeleri, koordinat sistemleri ve daha fazlası için özel araçlar.",
      },
      {
        heading: "Geliştirici Araçları",
        text: "JSON, YAML, CSV, XML, TOML ve TypeScript türleri arasında dönüştürün. CSS'yi küçültün, px/rem/em arasında dönüştürün ve Tailwind yardımcı programları oluşturun. Modern geliştirme iş akışı için tasarlanmıştır.",
      },
    ],
  },
  calculator: {
    title: "ToolPop Hesaplayıcı Hakkında",
    description:
      "ToolPop Hesaplayıcı, matematik, finans, sağlık, istatistik ve günlük görevler için ücretsiz çevrimiçi hesaplayıcılar sağlar. Bileşik faizden ve BMI'dan matris işlemleri ve alt ağ hesaplamalarına kadar - doğru sonuçlar açık açıklamalarla.",
    sections: [
      {
        heading: "Profesyonel Doğruluk",
        text: "Her hesaplayıcı uygun yuvarlamave sınır durumu işleme ile hassas matematiksel formüller kullanır. Mali hesaplayıcılar bileşik dönemleri hesaba katırken, sağlık hesaplayıcıları klinik olarak doğrulanmış denklemleri kullanır ve istatistik araçları gerçek dünya veri dağılımlarını işler.",
      },
      {
        heading: "Herkes İçin",
        text: "Öğrenciler ikinci dereceden denklemleri çözebilir ve GPA hesaplayabilir. Profesyoneller ROI ve kırılma noktalarını analiz edebilir. Ev sahipleri boya, beton ve fayans ihtiyaçlarını tahmin edebilir. Her hesaplayıcı açık girdiler, anında sonuçlar ve faydalı bağlam sağlar.",
      },
    ],
  },
};
