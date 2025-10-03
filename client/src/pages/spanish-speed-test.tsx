import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Wifi, Globe } from "lucide-react";
import SpeedTestModal from "@/components/SpeedTestModal";
import ProviderFooter from "@/components/ProviderFooter";
import { Link } from "wouter";

export default function SpanishSpeedTest() {
  const [showSpeedTest, setShowSpeedTest] = useState(false);

  useEffect(() => {
    document.title = "Test de Velocidad Internet - Mide tu Velocidad WiFi Gratis 2025";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Test de velocidad de internet gratis en español. Mide tu velocidad de descarga, subida y ping para proveedores en España, México, Argentina y América Latina. Resultados precisos en tiempo real.');
    }

    const canonical = document.querySelector('link[rel="canonical"]#canonical-tag');
    if (canonical) {
      canonical.setAttribute('href', 'https://speedtestboost.com/es');
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Test de Velocidad Internet - Español",
      "description": "Test de velocidad de internet gratis en español para medir tu conexión WiFi y fibra óptica",
      "url": "https://speedtestboost.com/es",
      "inLanguage": "es",
      "about": {
        "@type": "Thing",
        "name": "Internet Speed Test",
        "description": "Herramienta gratuita para medir velocidad de internet en español"
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
      <Header currentPath="/es" />
      
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Globe className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Test de Velocidad Internet
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Mide la <span className="font-semibold text-primary">velocidad de tu internet</span> gratis. Prueba tu conexión WiFi, fibra óptica o datos móviles con resultados precisos en tiempo real.
            </p>
            
            <div className="mb-12">
              <Button 
                onClick={() => setShowSpeedTest(true)} 
                size="lg" 
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                data-testid="button-start-test-es"
              >
                <Zap className="mr-2 h-5 w-5" />
                Iniciar Test de Velocidad
              </Button>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Test de Velocidad de Internet en Español</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
                <p className="text-lg text-muted-foreground">
                  Nuestro test de velocidad de internet es la herramienta más precisa y confiable para medir el rendimiento de tu conexión en países de habla hispana. Con cobertura especializada para España, México, Argentina, Chile y toda América Latina, proporcionamos mediciones exactas de velocidad de descarga, velocidad de subida, latencia (ping) y estabilidad de conexión para todos los principales proveedores de servicios de internet.
                </p>
                
                <h3 className="text-xl font-semibold mb-3">¿Por Qué Realizar un Test de Velocidad?</h3>
                <p className="text-muted-foreground">
                  Un test de velocidad de internet te permite verificar si estás recibiendo la velocidad contratada con tu proveedor. En España, donde operadores como Movistar, Orange, Vodafone y MásOrange ofrecen fibra óptica de hasta 1 Gbps, es crucial confirmar el rendimiento real. En México, con Telmex Infinitum, Izzi, Megacable y Totalplay expandiendo sus redes de fibra, los usuarios necesitan herramientas confiables para monitorear su conexión. Argentina cuenta con Movistar, Personal, Claro y Telecentro compitiendo por ofrecer las mejores velocidades, mientras que en Chile, los proveedores entregan algunas de las velocidades más altas de Latinoamérica.
                </p>

                <h3 className="text-xl font-semibold mb-3">Proveedores Soportados</h3>
                <p className="text-muted-foreground">
                  Nuestro test de velocidad está optimizado para todos los principales proveedores de internet en el mundo hispanohablante. En España medimos con precisión las conexiones de Movistar fibra, Orange Livebox, Vodafone One y MásOrange. Para usuarios en México, soportamos Telmex Infinitum (el mayor proveedor con 40% del mercado), Izzi fibra y cable, Megacable, y Totalplay. En Argentina, probamos conexiones de Movistar, Personal Flow, Claro y Telecentro. Todos los resultados se muestran en tiempo real con métricas detalladas de descarga, subida, ping y jitter.
                </p>

                <h3 className="text-xl font-semibold mb-3">Tecnologías de Internet en Países Hispanos</h3>
                <p className="text-muted-foreground">
                  La infraestructura de internet en países de habla hispana ha evolucionado dramáticamente. España lidera Europa con despliegue masivo de FTTH (fibra hasta el hogar), alcanzando velocidades simétricas de 1 Gbps en la mayoría de ciudades principales. México invierte miles de millones en expandir fibra óptica, con Telmex y CFE Telecomunicaciones desplegando redes de nueva generación. Chile mantiene las velocidades más rápidas de Sudamérica con promedio de 297 Mbps. Argentina acelera su transformación digital con fibra llegando a Buenos Aires, Córdoba y Rosario. Nuestro test mide con precisión todas estas tecnologías: fibra óptica FTTH, cable DOCSIS 3.1, VDSL2, y redes móviles 4G/5G.
                </p>

                <h3 className="text-xl font-semibold mb-3">Cómo Interpretar los Resultados</h3>
                <p className="text-muted-foreground">
                  Los resultados de tu test de velocidad incluyen cuatro métricas esenciales. La velocidad de descarga (download) mide cuán rápido tu dispositivo recibe datos, crucial para streaming de Netflix/Disney+, YouTube 4K y descargas. La velocidad de subida (upload) determina qué tan rápido envías datos, importante para videollamadas de Zoom, subir archivos a la nube y streaming en Twitch. El ping o latencia indica el tiempo de respuesta en milisegundos, fundamental para gaming online, videoconferencias y aplicaciones en tiempo real. El jitter mide la variación en latencia, afectando la estabilidad de llamadas VoIP y videojuegos competitivos. Para fibra óptica, espera 300-1000 Mbps descarga, 300-1000 Mbps subida, ping bajo 15ms. Cable ofrece 100-500 Mbps descarga, 10-50 Mbps subida, ping 15-30ms.
                </p>

                <h3 className="text-xl font-semibold mb-3">Optimización de Velocidad WiFi</h3>
                <p className="text-muted-foreground">
                  Si tu test muestra velocidades bajas, varios factores pueden estar afectando tu conexión WiFi. La distancia al router reduce señal significativamente, especialmente en casas grandes con paredes gruesas comunes en España y Latinoamérica. Las interferencias de redes vecinas en edificios de departamentos saturan canales WiFi, particularmente en ciudades como Madrid, Ciudad de México o Buenos Aires. Dispositivos antiguos con WiFi 802.11n no aprovechan conexiones de fibra modernas. Soluciones efectivas incluyen: colocar el router en posición central elevada, usar banda de 5 GHz menos congestionada, actualizar a router WiFi 6 (802.11ax) para aprovechar fibra gigabit, y considerar extensores mesh o PLC para casas de varios pisos. Nuestro test te ayuda identificar exactamente dónde está el cuello de botella en tu red doméstica.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Proveedores por País</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">🇪🇸 España</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><Link href="/providers/es/movistar" className="hover:text-primary transition-colors">• Movistar España</Link></li>
                    <li><Link href="/providers/es/orange-es" className="hover:text-primary transition-colors">• Orange España</Link></li>
                    <li><Link href="/providers/es/vodafone-es" className="hover:text-primary transition-colors">• Vodafone España</Link></li>
                    <li><Link href="/providers/es/masorange" className="hover:text-primary transition-colors">• MásOrange</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">🇲🇽 México</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><Link href="/providers/mx/telmex" className="hover:text-primary transition-colors">• Telmex Infinitum</Link></li>
                    <li><Link href="/providers/mx/izzi" className="hover:text-primary transition-colors">• Izzi</Link></li>
                    <li><Link href="/providers/mx/megacable" className="hover:text-primary transition-colors">• Megacable</Link></li>
                    <li><Link href="/providers/mx/totalplay" className="hover:text-primary transition-colors">• Totalplay</Link></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">🇦🇷 Argentina</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><Link href="/providers/ar/movistar-ar" className="hover:text-primary transition-colors">• Movistar Argentina</Link></li>
                    <li><Link href="/providers/ar/personal" className="hover:text-primary transition-colors">• Personal Flow</Link></li>
                    <li><Link href="/providers/ar/claro" className="hover:text-primary transition-colors">• Claro Argentina</Link></li>
                    <li><Link href="/providers/ar/telecentro" className="hover:text-primary transition-colors">• Telecentro</Link></li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">🇧🇷 Brasil</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><Link href="/providers/br/vivo" className="hover:text-primary transition-colors">• Vivo Fibra</Link></li>
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
      
      <ProviderFooter />
    </div>
  );
}
