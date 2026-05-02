import { useEffect, useState } from "react";
import { setCanonicalHref } from "@/lib/seo";
import Header from "@/components/Header";
import GenericFooter from "@/components/GenericFooter";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, Globe } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import { Link } from "wouter";

export default function IndonesianSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Tes Kecepatan Internet Gratis - Cek WiFi & Broadband 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Tes kecepatan internet gratis untuk WiFi dan broadband. Cek download, upload, ping & jitter akurat untuk IndiHome, Biznet, First Media.');
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const keywords = document.createElement('meta');
      keywords.setAttribute('name', 'keywords');
      keywords.setAttribute('content', 'tes kecepatan internet gratis, cek kecepatan wifi, uji kecepatan broadband, test internet speed indonesia, cek ping dan jitter, kecepatan indihome, kecepatan biznet');
      document.head.appendChild(keywords);
    }

    let contentLanguage = document.querySelector('meta[http-equiv="content-language"]');
    if (!contentLanguage) {
      contentLanguage = document.createElement('meta');
      contentLanguage.setAttribute('http-equiv', 'content-language');
      document.head.appendChild(contentLanguage);
    }
    contentLanguage.setAttribute('content', 'id');

    setCanonicalHref('https://speedtestboost.com/id');

    const existingHreflang = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflang.forEach(link => link.remove());

    const hreflangEn = document.createElement('link');
    hreflangEn.setAttribute('rel', 'alternate');
    hreflangEn.setAttribute('hreflang', 'en');
    hreflangEn.setAttribute('href', 'https://speedtestboost.com/');
    document.head.appendChild(hreflangEn);

    const hreflangEs = document.createElement('link');
    hreflangEs.setAttribute('rel', 'alternate');
    hreflangEs.setAttribute('hreflang', 'es');
    hreflangEs.setAttribute('href', 'https://speedtestboost.com/es');
    document.head.appendChild(hreflangEs);

    const hreflangId = document.createElement('link');
    hreflangId.setAttribute('rel', 'alternate');
    hreflangId.setAttribute('hreflang', 'id');
    hreflangId.setAttribute('href', 'https://speedtestboost.com/id');
    document.head.appendChild(hreflangId);

    const hreflangPtBr = document.createElement('link');
    hreflangPtBr.setAttribute('rel', 'alternate');
    hreflangPtBr.setAttribute('hreflang', 'pt-BR');
    hreflangPtBr.setAttribute('href', 'https://speedtestboost.com/pt-br');
    document.head.appendChild(hreflangPtBr);

    const hreflangFr = document.createElement('link');
    hreflangFr.setAttribute('rel', 'alternate');
    hreflangFr.setAttribute('hreflang', 'fr');
    hreflangFr.setAttribute('href', 'https://speedtestboost.com/fr');
    document.head.appendChild(hreflangFr);

    const hreflangDefault = document.createElement('link');
    hreflangDefault.setAttribute('rel', 'alternate');
    hreflangDefault.setAttribute('hreflang', 'x-default');
    hreflangDefault.setAttribute('href', 'https://speedtestboost.com/');
    document.head.appendChild(hreflangDefault);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Tes Kecepatan Internet - Indonesia",
      "description": "Tes kecepatan internet gratis untuk mengukur koneksi WiFi dan fiber optik di Indonesia",
      "url": "https://speedtestboost.com/id",
      "inLanguage": "id",
      "about": {
        "@type": "Thing",
        "name": "Internet Speed Test",
        "description": "Alat gratis untuk mengukur kecepatan internet di Indonesia"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) document.head.removeChild(existingScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header currentPath="/id" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Tes Kecepatan Internet", href: "/id" }]} />
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Globe className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Tes Kecepatan Internet Gratis untuk WiFi dan Broadband
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Alat terbaik untuk cek kecepatan unduh dan unggah secara online akurat. Tes koneksi WiFi, fiber optik atau data seluler dengan hasil real-time untuk ping dan jitter.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                data-testid="button-start-test-id"
              >
                <Zap className="mr-2 h-5 w-5" />
                Mulai Tes Kecepatan
              </Button>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Tes Kecepatan Internet di Indonesia</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Alat tes kecepatan internet kami adalah solusi paling akurat dan terpercaya untuk mengukur performa koneksi internet Anda di Indonesia. Dengan dukungan khusus untuk semua penyedia layanan internet utama termasuk IndiHome, Biznet, First Media, dan MyRepublic, kami menyediakan pengukuran presisi untuk kecepatan download, kecepatan upload, latensi (ping), dan stabilitas koneksi di seluruh jaringan Indonesia.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">Cara Menguji Kecepatan Internet di HP dan Komputer</h3>
                <p className="text-muted-foreground">
                  Kami menyediakan <strong>alat terbaik untuk cek ping dan jitter koneksi internet</strong> yang bekerja sempurna di semua perangkat. Untuk menguji kecepatan internet di smartphone Android atau iPhone, cukup buka browser dan klik tombol "Mulai Tes Kecepatan". Untuk pengguna desktop Windows atau Mac, tes berjalan langsung di browser tanpa perlu install aplikasi. Alat kami mengukur <strong>kecepatan unduh dan unggah secara online akurat</strong> dengan teknologi multi-server untuk hasil presisi tinggi.
                </p>

                <h3 className="text-xl font-semibold mb-3">Uji Kecepatan Jaringan untuk Pengguna IndiHome dan Biznet</h3>
                <p className="text-muted-foreground">
                  <strong>Tes kecepatan internet gratis untuk WiFi dan broadband</strong> ini dioptimalkan khusus untuk pengguna IndiHome dan Biznet. IndiHome sebagai penyedia terbesar di Indonesia menawarkan fiber optik hingga 300 Mbps di kota-kota besar seperti Jakarta, Surabaya, Bandung, dan Medan. Biznet Home dengan jaringan fiber premium mereka mengklaim kecepatan simetris hingga 1 Gbps untuk segmen premium. First Media yang melayani area Jabodetabek menyediakan kabel internet berkecepatan tinggi, sementara MyRepublic fokus pada gamer dan streamer dengan paket low-latency. Dengan kondisi geografis Indonesia yang unik sebagai negara kepulauan terbesar di dunia, kualitas internet bisa sangat bervariasi antar wilayah.
                </p>

                <h3 className="text-xl font-semibold mb-3">Provider Internet yang Didukung</h3>
                <p className="text-muted-foreground">
                  Tes kecepatan kami dioptimalkan untuk semua penyedia internet utama di Indonesia. IndiHome (PT Telkom Indonesia) mendominasi pasar dengan 60% market share, melayani jutaan pelanggan dari Sabang sampai Merauke dengan teknologi FTTH (Fiber to the Home). Biznet Networks terkenal dengan SLA 99.5% dan kecepatan konsisten, populer di kalangan profesional dan bisnis. First Media melayani Jakarta, Tangerang, Bekasi, Depok dengan kabel coaxial berkecepatan tinggi dan paket bundling TV kabel. MyRepublic Indonesia menawarkan paket gaming dengan ping rendah ke server Singapore dan cloud gaming. Semua hasil ditampilkan dalam Bahasa Indonesia dengan metrik lengkap download, upload, ping, dan jitter.
                </p>

                <h3 className="text-xl font-semibold mb-3">Infrastruktur Internet di Indonesia</h3>
                <p className="text-muted-foreground">
                  Infrastruktur internet Indonesia berkembang pesat namun masih menghadapi tantangan geografis. Kabel laut internasional seperti SEA-ME-WE 5, Jasuka (Jakarta-Surabaya-Kalimantan), dan Palapa Ring menghubungkan pulau-pulau utama. Jabodetabek memimpin dengan penetrasi fiber optik tertinggi, disusul Surabaya, Bandung, Semarang, dan Medan. Pemerintah melalui proyek Palapa Ring berupaya meratakan akses internet ke wilayah 3T (Terdepan, Terluar, Tertinggal). Kecepatan rata-rata broadband Indonesia mencapai 25 Mbps, dengan Jakarta dan kota besar mencapai 50-100 Mbps. Teknologi yang umum digunakan: FTTH fiber optik untuk urban area, FWA (Fixed Wireless Access) untuk suburban, dan satelit VSAT untuk remote area. Tes kami mengukur semua teknologi ini: fiber GPON, HFC cable, VDSL2, dan jaringan seluler 4G LTE/5G.
                </p>

                <h3 className="text-xl font-semibold mb-3">Cara Membaca Hasil Tes</h3>
                <p className="text-muted-foreground">
                  Hasil tes kecepatan menampilkan empat metrik penting. Kecepatan download mengukur seberapa cepat perangkat menerima data, krusial untuk streaming Netflix/Disney+ Hotstar, nonton YouTube 4K, dan download file. Kecepatan upload menentukan kecepatan mengirim data, penting untuk video call Zoom/Google Meet, upload ke Google Drive, dan live streaming di Facebook/TikTok. Ping atau latensi menunjukkan waktu respons dalam milidetik, fundamental untuk game online Mobile Legends/PUBG, video conference, dan trading saham online. Jitter mengukur variasi latensi, mempengaruhi stabilitas panggilan WhatsApp dan kualitas gaming kompetitif. Untuk fiber IndiHome/Biznet, harapkan 100-300 Mbps download, 50-300 Mbps upload, ping di bawah 10ms ke Jakarta. First Media cable menawarkan 50-150 Mbps download, 5-25 Mbps upload, ping 15-25ms. Untuk paket standar 20-50 Mbps, download mencapai 20-50 Mbps, upload 10-20 Mbps.
                </p>

                <h3 className="text-xl font-semibold mb-3">Optimasi Kecepatan WiFi Rumah</h3>
                <p className="text-muted-foreground">
                  Jika hasil tes menunjukkan kecepatan lambat, beberapa faktor bisa mempengaruhi koneksi WiFi Anda. Jarak ke router sangat berpengaruh, terutama di rumah bertingkat umum di Indonesia dengan dinding bata tebal. Gangguan dari WiFi tetangga di kompleks perumahan padat seperti di Jakarta, Surabaya atau Bandung menyebabkan channel WiFi penuh sesak. Cuaca tropis Indonesia dengan kelembaban tinggi juga bisa melemahkan sinyal WiFi. Perangkat lama dengan WiFi 802.11n tidak bisa memanfaatkan kecepatan fiber modern. Solusi efektif: posisikan router di tengah rumah dengan ketinggian 1-2 meter dari lantai, gunakan WiFi 5 GHz yang lebih lapang dari 2.4 GHz, upgrade ke router WiFi 6 untuk fiber 100 Mbps keatas, pertimbangkan mesh WiFi atau powerline adapter untuk rumah 2-3 lantai. Tes rutin membantu identifikasi bottleneck di jaringan rumah Anda dan memastikan Anda mendapat value terbaik dari paket internet berlangganan.
                </p>

                <h3 className="text-xl font-semibold mb-3">Tips Gaming dan Streaming</h3>
                <p className="text-muted-foreground">
                  Untuk gaming online optimal di server Indonesia dan Singapore, pilih paket dengan ping rendah dibawah 20ms. Game populer seperti Mobile Legends, PUBG Mobile, Free Fire, dan Valorant membutuhkan koneksi stabil dengan jitter minimal. MyRepublic dan Biznet menawarkan routing khusus ke server gaming Singapore dengan latency 10-15ms. Untuk streaming ke YouTube, Facebook Gaming atau TikTok Live, upload speed minimal 5 Mbps untuk 720p, 10 Mbps untuk 1080p. IndiHome paket 30 Mbps keatas dan First Media 50 Mbps sudah cukup untuk streaming HD. Gunakan kabel LAN langsung ke router untuk stabilitas maksimal, terutama saat turnamen atau live streaming penting. Tes kecepatan secara berkala memastikan koneksi selalu optimal untuk aktivitas gaming dan content creation Anda.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Provider Internet Indonesia</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">🇮🇩 Indonesia</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><Link href="/providers/id/indihome" className="hover:text-primary transition-colors">• IndiHome (Telkom)</Link></li>
                    <li><Link href="/providers/id/biznet" className="hover:text-primary transition-colors">• Biznet Home</Link></li>
                    <li><Link href="/providers/id/first-media" className="hover:text-primary transition-colors">• First Media</Link></li>
                    <li><Link href="/providers/id/myrepublic" className="hover:text-primary transition-colors">• MyRepublic Indonesia</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Teknologi Internet</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Fiber Optik FTTH (IndiHome, Biznet)</li>
                    <li>• Kabel HFC (First Media)</li>
                    <li>• Fixed Wireless FWA</li>
                    <li>• 4G LTE & 5G Mobile</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {showSpeedTest && (
        <SpeedTestModal onClose={() => setShowSpeedTest(false)} />
      )}

      <GenericFooter />
    </div>
  );
}
